import { IAuthenticateResponse, IUser } from "@/types/user";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { getAgency, getUser } from "@/utils/functions";
import { IAgency } from "@/types/agency";
import { boolean } from "yup";
import CheckBox from "@mui/material/Checkbox";
import PrimaryButton from "../Buttons/PrimaryButton";

interface IProps {
  authData: IAuthenticateResponse | null;
}
const Profile: FC<IProps> = ({ authData }) => {
  const theme = useTheme();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [agencyData, setAgencyData] = useState<IAgency | null>(null);

  useEffect(() => {
    const user = getUser();
    setUserData(user);
  }, []);

  useEffect(() => {
    if (authData && authData.roles.includes("Agency")) {
      setAgencyData(getAgency());
    }
  }, [authData]);

  const handleNotificationsSetting = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (userData) {
      const name = event.target.name as keyof IUser;
      if (
        name === "allowNewPropertyNotifications" ||
        name === "allowRentDueNotifications" ||
        name === "allowRentPaymentNotifications"
      ) {
        setUserData({ ...userData, [name]: checked });
      }
    }
  };

  const SaveNotificationSettings = async () => {};

  return (
    <Box py={4} sx={{ width: "100%" }}>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          borderRadius: { xs: 0, sm: "1rem" },
          width: { xs: "100%", sm: "60%" },
          mx: "auto",
          overflow: "hidden",
          backgroundColor: "whitesmoke",
        }}
        alignItems="center"
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
            sx={{
              width: { xs: "6rem", sm: "8rem" },
              height: { xs: "6rem", sm: "8rem" },
              position: "absolute",
              left: 30,
              bottom: -45,
            }}
          />
        </Box>
        <Box sx={{ position: "relative", width: "100%", py: 1 }} display="flex">
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
          >
            Edit Profile
          </Button>
        </Box>
        <Box sx={{ width: "100%", px: 4, py: 3 }}>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#3D3C3A",
            }}
            variant="body1"
          >
            {`${userData?.firstName} ${userData?.lastName}`}
            {userData?.gender &&
              `(${
                userData.gender.toLowerCase() === "male" ? "He/Him" : "She/Her"
              })`}
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
        </Box>
        {userData?.employmentStatus ||
          (userData?.city && userData.state && (
            <Box sx={{ width: "100%", px: 4, py: 3, mt: 2 }}>
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
                  {`${userData.city} ${userData.state}`}
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
                  {userData?.employmentStatus}
                </Typography>
              )}
            </Box>
          ))}
        <Box sx={{ width: "100%", px: 4, py: 3 }}>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 500,
              color: "#3B3131",
            }}
            variant="body1"
          >
            Notifications Settings
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <CheckBox
                  name="allowNewPropertyNotifications"
                  checked={userData?.allowNewPropertyNotifications ?? false}
                  onChange={handleNotificationsSetting}
                />
              }
              label="New Property Notifications"
            />
            <FormControlLabel
              control={
                <CheckBox
                  name="allowRentDueNotifications"
                  checked={userData?.allowRentDueNotifications ?? false}
                  onChange={handleNotificationsSetting}
                />
              }
              label="Rent Due Notifications"
            />
            {!authData?.roles.includes("Tenant") && (
              <FormControlLabel
                control={
                  <CheckBox
                    name="allowRentPaymentNotifications"
                    checked={userData?.allowRentPaymentNotifications ?? false}
                    onChange={handleNotificationsSetting}
                  />
                }
                label="Rent Payment Notification"
              />
            )}
            <Box display="flex" gap={2}>
              <PrimaryButton
                disableElevation
                disableRipple
                variant="outlined"
                sx={{ width: "5rem", textTransform: "none" }}
                size="small"
                onClick={() => window.location.reload()}
              >
                Undo
              </PrimaryButton>
              <PrimaryButton
                disableElevation
                disableRipple
                variant="contained"
                sx={{ width: "5rem", textTransform: "none" }}
                size="small"
                onClick={SaveNotificationSettings}
              >
                Save
              </PrimaryButton>
            </Box>
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
