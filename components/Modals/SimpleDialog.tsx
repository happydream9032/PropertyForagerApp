import * as React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface IProps extends React.PropsWithChildren, DialogProps {
  modalTitle: string;
  open: boolean;
  handleClose: () => void;
}

const SimpleDialog: React.FC<IProps> = ({
  handleClose,
  modalTitle,
  open,
  children,
  ...props
}) => {
  return (
    <Dialog {...props} open={open} onClose={handleClose}>
      <DialogTitle
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <span>{modalTitle} </span>
        <IconButton onClick={handleClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default SimpleDialog;
