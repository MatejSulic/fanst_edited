import {
  openMultiUploadWidget,
  openUploadWidget,
} from "../lib/cloudinary/uploadWidget";

export const handleOpenCloudinaryUploadWidget = ({
  onSuccess,
}: {
  onSuccess: (result: any) => void;
}) => {
  openUploadWidget({
    onSuccess: (result) => onSuccess(result),
    onError: (error) => {
      console.log(error);
    },
  });
};

export const handleOpenCloudinaryMultiUploadWidget = ({
  onSuccess,
  onQueuesEnd,
}: {
  onSuccess: (result: any) => void;
  onQueuesEnd: () => void;
}) => {
  openMultiUploadWidget({
    onSuccess: (result) => onSuccess(result),
    onQueuesEnd,
    onError: (error) => {
      console.log(error);
    },
  });
};
