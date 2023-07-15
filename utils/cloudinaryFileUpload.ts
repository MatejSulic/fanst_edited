import { openUploadWidget } from "../lib/cloudinary/uploadWidget";

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
