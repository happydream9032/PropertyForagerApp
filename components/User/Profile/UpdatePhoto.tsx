import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton";
import { _uploadProfilePhoto } from "@/services/userService";
import { IAuthenticateResponse } from "@/types/user";
import AlertComponent from "../../Alerts/AlertComponent";

interface IProps {
  authData: IAuthenticateResponse | null;
  image: File;
  previewImageString: string | null;
  isUploading: boolean;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  setUserAvatarData: ({
    avatarUrl,
    imageFileId,
  }: {
    avatarUrl: string;
    imageFileId: string;
  }) => void;
  close: () => void;
}
const UpdatePhoto: FC<IProps> = ({
  image,
  authData,
  previewImageString,
  isUploading,
  setIsUploading,
  setUserAvatarData,
  close,
}) => {
  const [response, setResponse] = useState({ success: false, message: "" });

  const handleImageUpload = async () => {
    if (!image || !authData) {
      return setResponse({
        success: false,
        message: "No valid image was selected",
      });
    }
    setIsUploading(true);
    try {
      const res = await _uploadProfilePhoto(image, authData?.token);
      if (res.status !== 200) {
        return setResponse({
          success: false,
          message: "Error uploading photo. Please try again",
        });
      }
      setUserAvatarData({
        avatarUrl: res.data.url,
        imageFileId: res.data.fileId,
      });
      close();
    } catch (error) {
      console.log("Error", error);
      return setResponse({
        success: false,
        message: "Oops! Error encountered while uploading photo.",
      });
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ height: "fit-content" }}
      gap={2}
    >
      <Avatar
        sx={{
          height: { xs: "10rem", sm: "15rem", md: "20rem" },
          width: { xs: "10rem", sm: "15rem", md: "20rem" },
        }}
        src={previewImageString ?? ""}
      />
      {response.message.trim().length > 0 && (
        <AlertComponent
          onClose={() => setResponse({ ...response, message: "" })}
          message={response.message}
          severity={response.success ? "success" : "error"}
        />
      )}
      <Box display="flex" gap={2}>
        <PrimaryButton
          disabled={isUploading}
          sx={{ textTransform: "none", width: "5rem" }}
          size="small"
          variant="outlined"
          onClick={close}
        >
          Cancel
        </PrimaryButton>
        <PrimaryButton
          sx={{ textTransform: "none", width: "5rem" }}
          disableElevation
          disableRipple
          disabled={isUploading}
          size="small"
          variant="contained"
          onClick={handleImageUpload}
        >
          {isUploading ? "Saving.." : "Save"}
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default UpdatePhoto;
