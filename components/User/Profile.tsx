import { IAuthenticateResponse, IUser } from "@/types/user";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import BusinessIcon from "@mui/icons-material/Business";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import {
  setUser as saveUserInLocalStorage,
  setAgency as saveAgencyInLocalStorage,
  isOrdinaryUser,
} from "@/utils/functions";
import { IAgency } from "@/types/agency";
import CheckBox from "@mui/material/Checkbox";
import PrimaryButton from "../Buttons/PrimaryButton";
import Chip from "@mui/material/Chip";
import dayjs from "dayjs";
import SimpleDialog from "../Modals/SimpleDialog";
import StyledFileInput from "../Shared/StyledFileInput";
import UpdatePhoto from "./UpdatePhoto";
import { useRouter } from "next/router";
import UpdateUserInfo from "./UpdateUserInfo";
import {
  _getAgency,
  _getCurrentUser,
  _updateProfile,
} from "@/services/userService";
import WorkIcon from "@mui/icons-material/Work";
import Snackbar from "@mui/material/Snackbar";

interface IProps {
  authData: IAuthenticateResponse | null;
}
const Profile: FC<IProps> = ({ authData }) => {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [userDataCopy, setUserDataCopy] = useState(userData);
  const [editProfile, setEditProfile] = useState(false);
  const [agencyData, setAgencyData] = useState<IAgency | null>(null);
  const [agencyDataCopy, setAgencyDataCopy] = useState(agencyData);
  const [hasNotificationsChanged, setHasNotificationsChanged] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });

  useEffect(() => {
    if (authData) {
      (async () => {
        setLoading(true);
        try {
          if (authData.roles.includes("Agency")) {
            const response = await _getAgency(authData.token);
            if (response.status === 200) {
              const agencyData = response.data as IAgency;
              setAgencyData(agencyData);
              setAgencyDataCopy(agencyData);
              saveAgencyInLocalStorage(agencyData);
              setUserData(agencyData.owner);
              setUserDataCopy(agencyData.owner);
              saveUserInLocalStorage(agencyData.owner);
            }
          } else {
            const response = await _getCurrentUser(authData.token);
            if (response.status === 200) {
              const userData = response.data;
              setUserData(userData);
              setUserDataCopy(userData);
              saveUserInLocalStorage(userData);
            }
          }
        } catch (error) {
          // router.reload();
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [authData, router]);

  const closeModal = () => {
    if (isUpdatingProfile) return;
    setOpenModal(false);
    setImage(null);
    setEditProfile(false);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);

    setAgencyDataCopy(agencyData);
    setUserDataCopy(userData);
  };

  const handleUserDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (userDataCopy) {
      setUserDataCopy({ ...userDataCopy, [e.target.name]: e.target.value });
    }
  };

  const handleAgencyDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (agencyDataCopy) {
      setAgencyDataCopy({ ...agencyDataCopy, [e.target.name]: e.target.value });
    }
  };
  const handleNotificationsSetting = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (userDataCopy) {
      const name = event.target.name as keyof IUser;
      if (
        name === "allowNewPropertyNotifications" ||
        name === "allowRentDueNotifications" ||
        name === "allowRentPaymentNotifications"
      ) {
        setUserDataCopy({ ...userDataCopy, [name]: checked });

        setHasNotificationsChanged(true);
      }
    }
  };

  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const imgPrev = URL.createObjectURL(file);
        setImagePreview(imgPrev);
        setImage(file);
      }
      setOpenModal(true);
    }
  };

  const SaveNotificationSettings = async () => {
    if (!authData) return;
    setIsUpdatingProfile(true);
    try {
      const res = await _updateProfile(
        {
          allowNewPropertyNotifications:
            userDataCopy?.allowNewPropertyNotifications,
          allowRentDueNotifications: userDataCopy?.allowRentDueNotifications,
          allowRentPaymentNotifications:
            userDataCopy?.allowRentPaymentNotifications,
        },
        authData.token
      );
      if (res.status !== 200) {
        return setResponse({
          success: false,
          message: "Error encountered while updating settings",
        });
      }
      setResponse({
        success: true,
        message: "Successfully updated notifications settings",
      });
      setUserData({ ...userData, ...res.data });
      setUserDataCopy({ ...userDataCopy, ...res.data });
      setHasNotificationsChanged(false);
    } catch (error) {
      console.log("Oops! Error encountered while updating settings", error);
      setResponse({
        success: false,
        message: "Oops! Error encountered while updating settings",
      });
    } finally {
      setIsUpdatingProfile(false);
      setTimeout(() => setResponse({ ...response, message: "" }), 4000);
    }
  };

  return (
    <Box py={{ xs: 0, sm: 4 }} sx={{ width: "100%" }}>
      <Snackbar message={response.message} open={response.message.length > 0} />
      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            borderRadius: { xs: 0, sm: "1rem" },
            width: { xs: "100%", sm: "80%", md: "60%" },
            mx: "auto",
            overflow: "hidden",
            backgroundColor: "whitesmoke",
          }}
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.primary.dark,
              height: { xs: "6rem", sm: "10rem" },
              width: "100%",
              position: "relative",
            }}
          >
            <Avatar
              src={userData?.avatarUrl}
              sx={{
                cursor: "pointer",
                width: { xs: "6rem", sm: "8rem" },
                height: { xs: "6rem", sm: "8rem" },
                position: "absolute",
                left: 30,
                bottom: -45,
              }}
            />
            <label htmlFor="avatar-upload">
              <StyledFileInput
                accept="image/*"
                id="avatar-upload"
                type="file"
                sx={{ display: "none" }}
                onChange={handleFileSelection}
                disabled={isUpdatingProfile}
              />
              <Button
                startIcon={<AddAPhotoIcon />}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: { xs: "0.6rem", md: "0.8rem" },
                  position: "absolute",
                  borderRadius: "0.6rem",
                  color: "white",
                  borderColor: "white",
                  left: { xs: "40%", sm: "30%", md: "20%" },
                  bottom: 5,
                  height: { xs: "2rem", sm: "auto" },
                  ":hover": {
                    color: "white",
                    borderColor: "white",
                  },
                }}
                size="small"
                component="span"
              >
                {userData?.avatarUrl ? "Update" : "Add"} Photo
              </Button>
            </label>
          </Box>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              py: 1,
            }}
            display="flex"
          >
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "0.8rem",
                fontWeight: 800,
                position: "absolute",
                right: 10,
                top: -5,
                height: { xs: "2rem", sm: "auto" },
              }}
              onClick={() => {
                setOpenModal(true);
                setEditProfile(true);
              }}
            >
              Edit Profile
            </Button>
          </Box>
          <Box sx={{ width: "100%", px: 4, py: 3 }}>
            <Box display="flex" alignItems="center" gap={0.3}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#3D3C3A",
                }}
                variant="body1"
              >
                {`${userData?.firstName} ${userData?.lastName}`}
              </Typography>
              {userData?.gender && (
                <em>
                  {`(${userData.gender === "Male" ? "he/him" : "she/her"})`}
                </em>
              )}
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "#3B3131",
                fontSize: "1rem",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                py: 0.5,
              }}
            >
              <EmailOutlinedIcon /> {userData?.email}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#3B3131",
                fontSize: "1rem",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                py: 0.5,
              }}
            >
              <PhoneOutlinedIcon /> {userData?.phoneNumber}
            </Typography>
            {authData &&
              isOrdinaryUser(authData) &&
              !userData?.city &&
              !userData?.state && (
                <Chip
                  color="secondary"
                  label="Update your location"
                  size="small"
                  onClick={() => {
                    setOpenModal(true);
                    setEditProfile(true);
                  }}
                />
              )}

            {(userData?.employmentStatus ||
              (userData?.city !== null && userData?.state)) && (
              <Box sx={{ width: "100%" }}>
                {userData?.city && userData.state && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#3B3131",
                      fontSize: "1rem",
                      textTransform: "capitalize",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      py: 0.5,
                    }}
                  >
                    <LocationOnOutlinedIcon />{" "}
                    {`${userData.city}, ${userData.state}`}
                  </Typography>
                )}
                {userData?.employmentStatus && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#3B3131",
                      fontSize: "1rem",
                      textTransform: "capitalize",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      py: 0.5,
                    }}
                  >
                    <WorkIcon /> {userData?.employmentStatus}
                  </Typography>
                )}
              </Box>
            )}
          </Box>

          {authData?.roles.includes("Agency") && (
            <Box sx={{ width: "100%", px: 4, py: 3 }}>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  color: theme.palette.primary.main,
                }}
                variant="body1"
              >
                Agency Information
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#3B3131",
                  fontSize: "1rem",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  py: 0.5,
                }}
              >
                <BusinessIcon /> {agencyData?.agencyName}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#3B3131",
                  fontSize: "1rem",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  py: 0.5,
                }}
              >
                <LocationOnOutlinedIcon />{" "}
                {`${agencyData?.street ? agencyData.street + ", " : ""}${
                  agencyData?.city
                }, ${agencyData?.state}`}{" "}
              </Typography>
              {!agencyData?.street && (
                <Chip
                  color="secondary"
                  label="Add street information"
                  size="small"
                  onClick={() => {
                    setOpenModal(true);
                    setEditProfile(true);
                  }}
                />
              )}
              <Typography
                variant="body1"
                sx={{
                  color: "#3B3131",
                  fontSize: "1rem",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  py: 0.5,
                }}
              >
                <CalendarMonthOutlinedIcon />{" "}
                {`Joined ${dayjs(agencyData?.createdAt).format(
                  "MMMM DD, YYYY"
                )}`}
              </Typography>
            </Box>
          )}
          <Box sx={{ width: "100%", px: 4, py: 3 }}>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 500,
                color: theme.palette.primary.main,
              }}
              variant="body1"
            >
              Notifications Settings
            </Typography>
            <FormGroup sx={{ width: "fit-content" }}>
              <FormControlLabel
                control={
                  <CheckBox
                    name="allowRentDueNotifications"
                    checked={
                      userDataCopy !== null &&
                      Boolean(userDataCopy.allowRentDueNotifications)
                    }
                    onChange={handleNotificationsSetting}
                  />
                }
                label="Rent Due Notifications"
              />
              <FormControlLabel
                control={
                  <CheckBox
                    name="allowNewPropertyNotifications"
                    checked={
                      userDataCopy !== null &&
                      Boolean(userDataCopy.allowNewPropertyNotifications)
                    }
                    onChange={handleNotificationsSetting}
                  />
                }
                label="New Property Notifications"
              />
              {authData && !isOrdinaryUser(authData) && (
                <FormControlLabel
                  control={
                    <CheckBox
                      name="allowRentPaymentNotifications"
                      checked={
                        userDataCopy !== null &&
                        Boolean(userDataCopy.allowRentPaymentNotifications)
                      }
                      onChange={handleNotificationsSetting}
                    />
                  }
                  label="Rent Payment Notification"
                />
              )}
              <Box display="flex" gap={2}>
                <PrimaryButton
                  disabled={!hasNotificationsChanged}
                  disableElevation
                  disableRipple
                  variant="outlined"
                  sx={{ width: "5rem", textTransform: "none" }}
                  size="small"
                  onClick={() => {
                    setUserDataCopy(userData);
                    setHasNotificationsChanged(false);
                  }}
                >
                  Undo
                </PrimaryButton>
                <PrimaryButton
                  disabled={!hasNotificationsChanged}
                  disableElevation
                  disableRipple
                  variant="contained"
                  sx={{ width: "5rem", textTransform: "none" }}
                  size="small"
                  onClick={SaveNotificationSettings}
                >
                  {isUpdatingProfile && hasNotificationsChanged
                    ? "Saving..."
                    : "Save"}
                </PrimaryButton>
              </Box>
            </FormGroup>
          </Box>
          <SimpleDialog
            modalTitle="Update Profile"
            open={openModal}
            handleClose={closeModal}
            sx={{ mx: "auto", width: { xs: "100%", md: "70%" } }}
          >
            {image !== null && imagePreview && !editProfile && (
              <UpdatePhoto
                authData={authData}
                close={() => closeModal()}
                image={image}
                isUploading={isUpdatingProfile}
                previewImageString={imagePreview}
                setIsUploading={setIsUpdatingProfile}
                setUserAvatarData={({ avatarUrl, imageFileId }) => {
                  if (userData) {
                    setUserData({ ...userData, avatarUrl, imageFileId });
                  }

                  if (userDataCopy) {
                    setUserDataCopy({
                      ...userDataCopy,
                      avatarUrl,
                      imageFileId,
                    });
                  }
                }}
              />
            )}
            {editProfile && (
              <UpdateUserInfo
                close={closeModal}
                authData={authData}
                isUpdating={isUpdatingProfile}
                setIsUpdating={setIsUpdatingProfile}
                handleAgencyDataChange={handleAgencyDataChange}
                handleUserDataChange={handleUserDataChange}
                userData={userDataCopy}
                agencyData={agencyDataCopy}
                setAgencyData={(data) => {
                  if (agencyData) {
                    setAgencyData({ ...agencyData, ...data });
                  }
                  if (agencyDataCopy) {
                    setAgencyDataCopy({ ...agencyDataCopy, ...data });
                  }
                }}
                setUserData={(data) => {
                  if (userData) {
                    setUserData({ ...userData, ...data });
                  }

                  if (userDataCopy) {
                    setUserDataCopy({ ...userDataCopy, ...data });
                  }
                }}
              />
            )}
          </SimpleDialog>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
