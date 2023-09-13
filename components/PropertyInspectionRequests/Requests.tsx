import { _getPropertyInspectionRequests } from "@/services/propertyService";
import React, { FC, useCallback, useEffect, useState } from "react";
import useAuthData from "../Shared/useAuthData";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { propertyInspectionRequest } from "@/types/property";
import Snackbar from "@mui/material/Snackbar";

import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Request from "./Request";

const Requests: FC = () => {
  const router = useRouter();
  const { authData } = useAuthData();

  const [isLoading, setIsLoading] = useState(false);
  const [requests, setReqests] = useState<propertyInspectionRequest[] | []>([]);
  const [response, setResponse] = useState({ success: false, message: "" });
  const [refetch, setRefetch] = useState(false);

  const getRequests = useCallback(async () => {
    if (!authData) return;
    setIsLoading(true);
    try {
      const agencyId = router.query.agencyId?.toString();
      const res = await _getPropertyInspectionRequests(
        authData.token,
        agencyId ?? ""
      );
      if (res.status !== 200) {
        return setResponse({ success: false, message: res.data.message });
      }

      setReqests(res.data.inspectionRequestData as propertyInspectionRequest[]);
    } catch (error) {
      console.log("Error fetching property inspection requests", error);
      setResponse({
        success: false,
        message: "Error fetching property inspection requests",
      });
    } finally {
      setIsLoading(false);
    }
  }, [router.query.agencyId, authData]);

  useEffect(() => {
    getRequests();
  }, [getRequests, refetch]);

  return (
    <Box px={4} py={4} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        message={response.message}
        open={response.message.length > 0}
      />
      {isLoading ? (
        <CircularProgress />
      ) : Boolean(requests.length) ? (
        <Grid container justifyContent="center" spacing={1}>
          {requests.map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request.id}>
              <Request
                refetch={() => setRefetch(true)}
                agencyId={router.query.agencyId?.toString()}
                authData={authData!}
                {...request}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>
          You don&apos;t have any property inspection request
        </Typography>
      )}
    </Box>
  );
};

export default Requests;
