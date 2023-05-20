import { useEffect, useRef, useState } from "react";
import { Layer, Line, Stage } from "react-konva";

type Props = {
  width: number;
  height: number;
  setResult: (result: number[]) => void;
};

const ReactKonvaStage = ({ width, height, setResult }: Props) => {
  // both line and points are defined as [startX, startY, endX, endY]
  const [line, setLine] = useState<number[]>([]);
  const [points, setPoints] = useState<number[]>([]);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (
      points.every((val) => Number.isFinite(val) && !Number.isNaN(val)) &&
      points.length === 4 &&
      isDrawing.current === false
    ) {
      // console.log("setting result", points);
      setResult([
        points[0] / width,
        points[1] / height,
        points[2] / width,
        points[3] / height,
      ]);
    }
  }, [points]);

  const relativePointerPosition = (node: any) => {
    var transform = node.getAbsoluteTransform().copy();
    transform.invert();

    var pos = node.getStage().getPointerPosition();

    return transform.point(pos);
  };

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    const pos = relativePointerPosition(stage);
    setPoints(() => [pos.x, pos.y]);
    setLine(() => [pos.x, pos.y]);
  };

  const handleMouseUp = (e: any) => {
    isDrawing.current = false;
    const stage = e.target.getStage();
    const pos = relativePointerPosition(stage);
    const finalPoint = [pos.x, pos.y];
    setPoints((prev) => [prev[0], prev[1], finalPoint[0], finalPoint[1]]);

    // (y2 - y1) / (x2 - x1)
    const slope = (finalPoint[1] - points[1]) / (finalPoint[0] - points[0]);
    // console.log(slope);
    if (isFinite(slope) && slope !== 0) {
      const c = points[1] - slope * points[0];
      const yForXZero = c;
      const yForXWidth = slope * width + c;
      setLine([0, yForXZero, width, yForXWidth]);
    } else if (slope === 0) {
      setLine((prev) => [0, prev[1], width, prev[3]]);
    } else {
      setLine((prev) => [prev[0], 0, prev[2], height]);
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) {
      return;
    }

    const stage = e.target.getStage();
    const pos = relativePointerPosition(stage);
    setPoints((prev) => [prev[0], prev[1], pos.x, pos.y]);
    setLine((prev) => [prev[0], prev[1], pos.x, pos.y]);
  };

  return (
    <Stage
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
    >
      <Layer>
        {line.length === 4 && (
          <Line points={line} stroke="#000000" strokeWidth={3} tension={0.5} />
        )}
      </Layer>
    </Stage>
  );
};

export default ReactKonvaStage;
