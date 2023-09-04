import Box from "@mui/material/Box";
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";
import TextFieldWithLabel from "../../TextFields/TextFieldWithLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import {
  EmploymentStatus,
  Gender,
  IAuthenticateResponse,
  IUser,
  UserProfileUpdateRequest,
} from "@/types/user";
import PrimaryButton from "../../Buttons/PrimaryButton";
import { IAgency, UpdateAgencyRequest } from "@/types/agency";
import { _updateAgency, _updateProfile } from "@/services/userService";
import AlertComponent from "../../Alerts/AlertComponent";

interface IProps {
  authData: IAuthenticateResponse | null;
  userData: IUser | null;
  setUserData: Dispatch<SetStateAction<IUser | null>>;
  agencyData?: IAgency | null;
  setAgencyData: Dispatch<SetStateAction<IAgency | null>>;
  handleUserDataChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAgencyDataChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isUpdating: boolean;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
  close: () => void;
}
const UpdateUserInfo: FC<IProps> = ({
  authData,
  userData,
  agencyData,
  setAgencyData,
  setUserData,
  handleAgencyDataChange,
  handleUserDataChange,
  close,
  isUpdating,
  setIsUpdating,
}) => {
  const [response, setResponse] = useState({ success: false, message: "" });

  const handleProfileUpdate = async (
    userUpdatePayload: Partial<UserProfileUpdateRequest>,
    agencyUpdateData?: UpdateAgencyRequest
  ) => {
    if (!authData) return;
    setIsUpdating(true);
    _updateProfile(userUpdatePayload, authData.token)
      .then((profileUpdateRes) => {
        if (profileUpdateRes.status !== 200) {
          return setResponse({
            success: false,
            message: "Error encountered while updating profile data",
          });
        }
        if (userData) {
          setUserData({ ...userData, ...profileUpdateRes.data });
        } else {
          setUserData(profileUpdateRes.data);
        }
        if (agencyUpdateData) {
          agencyUpdateData["agencyId"] = agencyData!.id;
          _updateAgency(agencyUpdateData, authData.token)
            .then((agencyUpdateRes) => {
              if (agencyUpdateRes.status !== 200) {
                return setResponse({
                  success: false,
                  message: "Error encountered while updating agency data",
                });
              }

              if (agencyData) {
                setAgencyData({ ...agencyData, ...agencyUpdateRes.data });
              } else {
                setAgencyData(agencyUpdateRes.data);
              }
            })
            .catch((err) => {
              console.log("Error encountered while updating agency data", err);
              setResponse({
                success: false,
                message: "Error encountered while updating agency data",
              });
            });
        }
        close();
      })
      .catch((err) => {
        console.log("Error encountered while updating profile data", err);
        setResponse({
          success: false,
          message: "Error encountered while updating profile data",
        });
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };
  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={1}
      pt={2}
      onSubmit={(e) => {
        e.preventDefault();
        const agencyPayload: UpdateAgencyRequest | undefined = agencyData
          ? {
              agencyId: agencyData?.id,
              agencyName: agencyData?.agencyName,
              city: agencyData?.city,
              state: agencyData?.state,
              street: agencyData?.street,
            }
          : undefined;
        handleProfileUpdate(
          userData as UserProfileUpdateRequest,
          authData?.roles.includes("Tenant") ? undefined : agencyPayload
        );
      }}
    >
      <TextFieldWithLabel
        fullWidth
        type="text"
        name="firstName"
        label="First Name"
        InputLabelProps={{ style: { fontWeight: 600, fontSize: "1.1rem" } }}
        value={userData?.firstName}
        onChange={handleUserDataChange}
      />
      <TextFieldWithLabel
        fullWidth
        type="text"
        name="lastName"
        label="Last Name"
        InputLabelProps={{ style: { fontWeight: 600, fontSize: "1.1rem" } }}
        value={userData?.lastName}
        onChange={handleUserDataChange}
      />

      <FormControl>
        <FormLabel
          sx={{ fontWeight: 500, color: "#212121" }}
          id="demo-radio-buttons-group-label"
        >
          Gender
        </FormLabel>
        <RadioGroup
          sx={{ display: "flex", flexDirection: "row" }}
          aria-labelledby="demo-radio-buttons-group-label"
          name="gender"
          value={userData?.gender}
          onChange={handleUserDataChange}
        >
          <FormControlLabel
            checked={userData?.gender === Gender.Male}
            value={Gender.Male}
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            value={Gender.Female}
            checked={userData?.gender === Gender.Female}
            control={<Radio />}
            label="Female"
          />
          <FormControlLabel
            checked={userData?.gender === Gender.Others}
            value={Gender.Others}
            control={<Radio />}
            label="Others"
          />
        </RadioGroup>
      </FormControl>

      <TextFieldWithLabel
        fullWidth
        type="text"
        name="city"
        label="City"
        InputLabelProps={{ style: { fontWeight: 600, fontSize: "1.1rem" } }}
        value={userData?.city}
        onChange={handleUserDataChange}
      />
      <TextFieldWithLabel
        fullWidth
        type="text"
        name="state"
        label="State"
        InputLabelProps={{ style: { fontWeight: 600, fontSize: "1.1rem" } }}
        value={userData?.state}
        onChange={handleUserDataChange}
      />

      <FormControl>
        <FormLabel
          sx={{ fontWeight: 500, color: "#212121" }}
          id="demo-radio-buttons-group-label"
        >
          Employment Status
        </FormLabel>
        <RadioGroup
          sx={{ display: "flex", flexDirection: "row" }}
          aria-labelledby="demo-radio-buttons-group-label"
          name="employmentStatus"
          value={userData?.employmentStatus}
          onChange={handleUserDataChange}
        >
          <FormControlLabel
            checked={userData?.employmentStatus === EmploymentStatus.Employed}
            value={EmploymentStatus.Employed}
            control={<Radio />}
            label="Employed"
          />
          <FormControlLabel
            checked={
              userData?.employmentStatus === EmploymentStatus.SelfEmployed
            }
            value={EmploymentStatus.SelfEmployed}
            control={<Radio />}
            label="Self employed"
          />
          <FormControlLabel
            checked={userData?.employmentStatus === EmploymentStatus.Student}
            value={EmploymentStatus.Student}
            control={<Radio />}
            label="Student"
          />
          <FormControlLabel
            checked={userData?.employmentStatus === EmploymentStatus.UnEmployed}
            value={EmploymentStatus.UnEmployed}
            control={<Radio />}
            label="Unemployed"
          />
        </RadioGroup>
      </FormControl>
      {authData?.roles.includes("Agency") && (
        <FormControl sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <FormLabel
            sx={{ fontWeight: 500, color: "#212121" }}
            id="agency-details"
          >
            Agency Information
          </FormLabel>
          <TextFieldWithLabel
            fullWidth
            type="text"
            name="street"
            label="Agency Street"
            InputLabelProps={{ style: { fontWeight: 600, fontSize: "1.1rem" } }}
            value={agencyData?.street ?? ""}
            onChange={handleAgencyDataChange}
          />
          <TextFieldWithLabel
            fullWidth
            type="text"
            name="agencyName"
            label="Agency Name"
            InputLabelProps={{ style: { fontWeight: 600, fontSize: "1.1rem" } }}
            value={agencyData?.agencyName}
            onChange={handleAgencyDataChange}
          />
          <TextFieldWithLabel
            fullWidth
            type="text"
            name="city"
            label="Agency City"
            InputLabelProps={{ style: { fontWeight: 600, fontSize: "1.1rem" } }}
            value={agencyData?.city}
            onChange={handleAgencyDataChange}
          />
          <TextFieldWithLabel
            fullWidth
            type="text"
            name="state"
            label="Agency State"
            InputLabelProps={{ style: { fontWeight: 600, fontSize: "1.1rem" } }}
            value={agencyData?.state}
            onChange={handleAgencyDataChange}
          />
        </FormControl>
      )}
      {response.message && (
        <AlertComponent
          severity={response.success ? "success" : "error"}
          onClose={() => setResponse({ ...response, message: "" })}
          message={response.message}
        />
      )}
      <PrimaryButton
        fullWidth
        type="submit"
        disableElevation
        variant="contained"
        size="large"
      >
        {isUpdating ? "Updating..." : "Submit"}
      </PrimaryButton>
    </Box>
  );
};

export default UpdateUserInfo;
