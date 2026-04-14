import { cloudinaryCloudName, cloudinaryUploadPreset } from ".";

type Props = {
  onSuccess: (result: any) => void;
  onError?: (error: any) => void;
};

export const openUploadWidget = ({ onSuccess, onError }: Props) => {
  // create the widget
  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudinaryCloudName,
      uploadPreset: cloudinaryUploadPreset,
      sources: ["local", "url"],
    },
    (error: any, result: any) => {
      if (result.event === "success") {
        onSuccess(result);
      } else {
        if (onError) onError(error);
      }
    }
  );
  // open up the widget after creation
  widget.open();
};

type MultiProps = {
  onSuccess: (result: any) => void;
  onQueuesEnd: () => void;
  onError?: (error: any) => void;
};

export const openMultiUploadWidget = ({
  onSuccess,
  onQueuesEnd,
  onError,
}: MultiProps) => {
  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudinaryCloudName,
      uploadPreset: cloudinaryUploadPreset,
      sources: ["local", "url"],
      multiple: true,
    },
    (error: any, result: any) => {
      if (result.event === "success") {
        onSuccess(result);
      } else if (result.event === "queues-end") {
        onQueuesEnd();
      } else {
        if (onError) onError(error);
      }
    }
  );
  widget.open();
};
