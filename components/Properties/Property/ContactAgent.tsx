import React, { FC, useEffect, useState } from "react";
import { IProperty, PropertyInspectionRequestPayload } from "@/types/property";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextFieldWithoutLabel from "@/components/TextFields/TextFieldWithoutLabel";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import useAuthData from "@/components/Shared/useAuthData";
import { useRouter } from "next/router";
import AlertComponent from "@/components/Alerts/AlertComponent";
import { getUser } from "@/utils/functions";
import { _sendPropertyInspectionRequest } from "@/services/propertyService";
import { PREVIOUS_ROUTE_QUERY_KEY } from "@/utils/constants";

const ContactAgent: FC<IProperty> = (props) => {
  const router = useRouter();
  const { authData } = useAuthData();

  const [requestInspectionData, setRequestInspectionData] =
    useState<PropertyInspectionRequestPayload>({
      phoneNumber: "",
      propertyId: props.id,
      senderEmail: "",
      senderFullName: "",
      propertyAgencyId: props.agencyId,
      propertyOwnerId: props.ownerId,
    });
  const [response, setResponse] = useState({ message: "", success: false });
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  useEffect(() => {
    const user = getUser();
    setRequestInspectionData({
      ...requestInspectionData,
      phoneNumber: user?.phoneNumber ?? "",
      senderEmail: user?.email ?? "",
      senderFullName: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authData || !authData.token) {
      setResponse({
        success: false,
        message: "Please login before you continue",
      });
      setTimeout(() => {
        return router.push(
          `/login?${PREVIOUS_ROUTE_QUERY_KEY}=${router.pathname}`
        );
      }, 5000);
    }

    if (!authData?.roles.includes("Tenant")) {
      return setResponse({
        success: false,
        message:
          "It is only a tenant that can request for property inspection. Please register or login as a tenant to continue.",
      });
    }
    if (
      !requestInspectionData.phoneNumber ||
      !requestInspectionData.senderEmail ||
      !requestInspectionData.senderFullName
    ) {
      return setResponse({
        success: false,
        message: "Please fill out all the fields",
      });
    }
    setIsSendingRequest(true);
    try {
      const res = await _sendPropertyInspectionRequest(
        requestInspectionData,
        authData.token
      );
      if (res.status !== 200) {
        return setResponse({
          success: false,
          message: res.data.Message,
        });
      }

      setResponse({ success: true, message: res.data.message });
      setRequestInspectionData({
        ...requestInspectionData,
        senderEmail: "",
        senderFullName: "",
        phoneNumber: "",
      });
    } catch (error) {
      return setResponse({
        success: false,
        message:
          "An error was encountered why sending your request. Please try again later.",
      });
    } finally {
      setIsSendingRequest(false);
    }
  };
  return (
    <Box
      px={4}
      py={12}
      display="flex"
      gap={6}
      sx={{
        width: "100%",
        flexDirection: { xs: "column-reverse", sm: "row" },
        alignItems: { xs: "center", sm: "flex-start" },
      }}
    >
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: { xs: "100%", sm: "40%" },
        }}
      >
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(180deg, rgba(40, 46, 56, 0), rgba(40, 46, 56, 0) 51%, rgba(40, 46, 56, 0.75) 72%)",
            zIndex: 1,
            position: "absolute",
            top: "0%",
            bottom: "0%",
            left: "0%",
            right: "0%",
            borderRadius: "1rem",
          }}
        ></Box>
        <Box
          sx={{
            maxWidth: "100%",
            borderRadius: "1rem",
            backgroundColor: "transparent",
          }}
          component="img"
          alt="Agent image"
          src={
            props.agency ? props.agency.owner.avatarUrl : props.owner?.avatarUrl
          }
        ></Box>
        {props.agency && (
          <Box
            sx={{
              position: "absolute",
              bottom: 5,
              p: 2,
              zIndex: 3,
            }}
          >
            <Typography
              sx={{ color: "white" }}
              fontSize={20}
              fontWeight={900}
              variant="h5"
            >
              {`${props.agency.owner.firstName} ${props.agency.owner.lastName}`}
            </Typography>
            <Typography
              sx={{ color: "GrayText" }}
              fontSize={19}
              fontWeight={400}
              variant="body1"
            >
              Your Agent
            </Typography>
          </Box>
        )}
        {props.owner && (
          <Box position="absolute">
            <Typography fontSize={19} fontWeight={500} variant="body1">
              {`${props.owner.firstName} ${props.owner.lastName}`}
            </Typography>
            <Typography
              color="GrayText"
              fontSize={19}
              fontWeight={400}
              variant="body1"
            >
              Property Owner
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{ width: { xs: "100%", sm: "50%" } }}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <Typography fontWeight={500} variant="h5">
          Interested in this property? Request a visit.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextFieldWithoutLabel
            fullWidth
            placeholder="Enter your name"
            value={requestInspectionData.senderFullName}
            onChange={(e) =>
              setRequestInspectionData({
                ...requestInspectionData,
                senderFullName: e.target.value,
              })
            }
          />
          <TextFieldWithoutLabel
            fullWidth
            type="email"
            placeholder="Enter your email"
            value={requestInspectionData.senderEmail}
            onChange={(e) =>
              setRequestInspectionData({
                ...requestInspectionData,
                senderEmail: e.target.value,
              })
            }
          />
          <TextFieldWithoutLabel
            fullWidth
            placeholder="Enter your phone number"
            value={requestInspectionData.phoneNumber}
            onChange={(e) =>
              setRequestInspectionData({
                ...requestInspectionData,
                phoneNumber: e.target.value,
              })
            }
          />
          {response.message.trim().length > 0 && (
            <AlertComponent
              message={response.message}
              severity={response.success ? "success" : "error"}
              onClose={() => setResponse({ ...response, message: "" })}
            />
          )}
          <PrimaryButton
            disableElevation
            disableRipple
            sx={{
              textTransform: "none",
              width: isSendingRequest ? "fit-content" : "30%",
              borderRadius: "0.5rem",
            }}
            variant="contained"
            size="large"
            type="submit"
          >
            {isSendingRequest ? "Processing..." : "Submit"}
          </PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactAgent;
