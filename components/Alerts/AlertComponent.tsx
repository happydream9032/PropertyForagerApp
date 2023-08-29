import React, { FC } from "react";
import Alert from "@mui/material/Alert";

interface IProps {
  severity: "error" | "warning" | "info" | "success";
  message: string;
  onClose: () => void;
}

const AlertComponent: FC<IProps> = ({ severity, message, onClose }) => {
  return (
    <Alert onClose={onClose} variant="filled" severity={severity}>
      {message}
    </Alert>
  );
};

export default AlertComponent;
