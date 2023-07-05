import * as React from "react";
import Popover, { PopoverOrigin } from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface IProps extends React.PropsWithChildren {
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: (target: HTMLButtonElement | null) => void;
  anchorOrigin: PopoverOrigin;
}
const GenericPopover: React.FC<IProps> = ({
  anchorEl,
  setAnchorEl,
  anchorOrigin,
  children,
}) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "generic-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
      >
        {children}
      </Popover>
    </div>
  );
};

export default GenericPopover;
