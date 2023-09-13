import {
  PropertyInspectionStage,
  propertyInspectionRequest,
} from "@/types/property";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import React, { FC, useState } from "react";
import CustomLinkComponent from "../CustomLinkComponent";
import dayjs from "dayjs";
import PrimaryButton from "../Buttons/PrimaryButton";
import { IAuthenticateResponse } from "@/types/user";
import { isOrdinaryUser } from "@/utils/functions";
import {
  _acceptPropertyInspectionRequest,
  _cancelPropertyInspectionRequest,
  _completePropertyInspectionRequest,
  _rejectPropertyInspectionRequest,
} from "@/services/propertyService";
import SimpleDialog from "../Modals/SimpleDialog";
import TextFieldWithoutLabel from "../TextFields/TextFieldWithoutLabel";
import Snackbar from "@mui/material/Snackbar";

const Request: FC<
  propertyInspectionRequest & {
    authData: IAuthenticateResponse;
    agencyId?: string;
    refetch: () => void;
  }
> = (props) => {
  const theme = useTheme();
  const inspectionRequestStage = {
    [PropertyInspectionStage.Pending]: "Pending",
    [PropertyInspectionStage.InProgress]: "In Progress",
    [PropertyInspectionStage.Rejected]: "Rejected",
    [PropertyInspectionStage.Done]: "Completed",
  };
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const [rejectionReason, setRejectionReason] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRejectionModal, setOpenRejectionModal] = useState(false);

  const cancelRequest = async () => {
    setIsProcessing(true);
    try {
      const res = await _cancelPropertyInspectionRequest(
        props.id,
        props.authData.token
      );
      if (res.status !== 200) {
        return setResponse({
          success: false,
          message: res.data.message ?? "Something went wrong",
        });
      }
      setResponse({ success: true, message: res.data.message });
      props.refetch();
    } catch (error) {
      setResponse({
        success: false,
        message: "Error encountered while deleting request.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const rejectRequest = async () => {
    setIsProcessing(true);
    try {
      const res = await _rejectPropertyInspectionRequest(
        props.id,
        rejectionReason,
        props.authData.token
      );
      if (res.status !== 200) {
        return setResponse({
          success: false,
          message: res.data.message ?? "Something went wrong",
        });
      }
      setResponse({ success: true, message: res.data.message });
      props.refetch();
    } catch (error) {
      setResponse({
        success: false,
        message: "Error encountered while cancelling request.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const acceptRequest = async () => {
    setIsProcessing(true);
    try {
      const res = await _acceptPropertyInspectionRequest(
        props.id,
        props.authData.token
      );
      if (res.status !== 200) {
        return setResponse({
          success: false,
          message: res.data.message ?? "Something went wrong",
        });
      }
      setResponse({ success: true, message: res.data.message });
      props.refetch();
    } catch (error) {
      setResponse({
        success: false,
        message: "Error encountered while accepting request.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const completeRequest = async () => {
    setIsProcessing(true);
    try {
      const res = await _completePropertyInspectionRequest(
        props.id,
        props.authData.token,
        props.agencyId
      );
      if (res.status !== 200) {
        return setResponse({
          success: false,
          message: res.data.message ?? "Something went wrong",
        });
      }

      setResponse({ success: true, message: res.data.message });
      props.refetch();
    } catch (error) {
      setResponse({
        success: false,
        message: "Error encountered while completing request.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box>
      {response.message?.length > 0 && (
        <Snackbar
          autoHideDuration={4000}
          onClose={() => setResponse({ ...response, message: "" })}
          open={response.message.length > 0}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          message={response.message}
        />
      )}
      <SimpleDialog
        modalTitle=""
        handleClose={() => {
          if (isProcessing) return;
          setOpenDeleteModal(false);
        }}
        open={openDeleteModal}
      >
        <Typography sx={{ mb: 2 }}>
          Are you sure you want to delete this request?
        </Typography>
        <PrimaryButton
          fullWidth
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "red",
            color: "red",
            ":hover": {
              borderColor: "red",
              color: "red",
            },
          }}
          onClick={cancelRequest}
        >
          {isProcessing ? "Deleting..." : "Delete"}
        </PrimaryButton>
      </SimpleDialog>
      <SimpleDialog
        modalTitle=""
        handleClose={() => {
          if (isProcessing) return;

          setOpenRejectionModal(false);
        }}
        open={openRejectionModal}
      >
        <Typography sx={{ mb: 2 }}>
          Are you sure you want to reject this request?
        </Typography>
        <TextFieldWithoutLabel
          fullWidth
          sx={{ mb: 1 }}
          onChange={(e) => setRejectionReason(e.target.value)}
          value={rejectionReason}
          placeholder="Rejection Reason"
        />
        <PrimaryButton
          size="large"
          fullWidth
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "red",
            color: "red",
            ":hover": {
              borderColor: "red",
              color: "red",
            },
          }}
          onClick={rejectRequest}
          disabled={isProcessing || !rejectionReason.length}
        >
          {isProcessing ? "Processing..." : "Proceed"}
        </PrimaryButton>
      </SimpleDialog>
      <Paper
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 1.5,
          borderRadius: "1rem",
        }}
        elevation={3}
      >
        <Typography
          sx={{
            backgroundColor: "orange",
            width: "fit-content",
            px: 1,
            py: 0.5,
            fontWeight: 700,
            borderRadius: "0.6rem",
            color: "white",
            mb: 3,
          }}
        >
          {inspectionRequestStage[props.stage]}
        </Typography>
        {!isOrdinaryUser(props.authData) ? (
          <Typography>
            This request was sent by {props.senderFullName} ({props.senderEmail}
            ) on{" "}
            <strong>{dayjs(props.createdAt).format("MMMM DD, YYYY")}</strong>.
            You can check your email to be sure.
          </Typography>
        ) : (
          <Typography>
            This request was sent on{" "}
            <strong>{dayjs(props.createdAt).format("MMMM DD, YYYY")}</strong>
          </Typography>
        )}

        <Box gap={1} display="flex" alignItems="center">
          <PrimaryButton
            variant="outlined"
            sx={{
              display:
                (!isOrdinaryUser(props.authData) &&
                  props.stage === PropertyInspectionStage.Rejected) ||
                props.stage === PropertyInspectionStage.Done
                  ? "none"
                  : "",
              width: "6rem",
              textTransform: "none",
              borderColor: "red",
              color: "red",
              ":hover": {
                borderColor: "red",
                color: "red",
              },
            }}
            onClick={() => {
              if (isOrdinaryUser(props.authData)) {
                setOpenDeleteModal(true);
              } else {
                setOpenRejectionModal(true);
              }
            }}
          >
            {isOrdinaryUser(props.authData) ? "Cancel" : "Reject"}
          </PrimaryButton>
          {props.stage === PropertyInspectionStage.Pending &&
            !isOrdinaryUser(props.authData) && (
              <PrimaryButton
                onClick={acceptRequest}
                variant="outlined"
                sx={{
                  width: isProcessing ? "fit-content" : "6rem",
                  textTransform: "none",
                }}
              >
                {isProcessing ? "Processing..." : "Accept"}
              </PrimaryButton>
            )}
          {props.stage === PropertyInspectionStage.InProgress && (
            <PrimaryButton
              onClick={completeRequest}
              variant="outlined"
              sx={{
                width: isProcessing ? "fit-content" : "6rem",
                textTransform: "none",
              }}
            >
              {isProcessing ? "Processing..." : "Complete"}
            </PrimaryButton>
          )}
        </Box>
        <CustomLinkComponent
          sx={{
            border: `1px solid ${theme.palette.primary.main}`,
            // backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            width: "100%",
            textAlign: "center",
            fontWeight: 700,
            padding: 2,
            borderRadius: "0.5rem",
          }}
          href={`/property/${props.propertyId}`}
        >
          View property
        </CustomLinkComponent>
      </Paper>
    </Box>
  );
};

export default Request;
