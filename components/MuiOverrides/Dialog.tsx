import MuiDialog, { DialogProps } from "@mui/material/Dialog";
import { useEffect, useRef } from "react";

const Dialog = ({ children, ...props }: DialogProps) => {
  const nextRootElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // attach the Modal to the next root element, not to document.body directly
    // for `document` to work, we need to run this script on the client side (after mount)
    nextRootElement.current = document.getElementById("__next");

    return () => {
      nextRootElement.current = null;
    };
  }, []);

  return nextRootElement.current ? (
    <MuiDialog {...props} container={nextRootElement.current}>
      {children}
    </MuiDialog>
  ) : null;
};

export default Dialog;
