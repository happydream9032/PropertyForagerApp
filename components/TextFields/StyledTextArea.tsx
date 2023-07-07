import { styled } from "@mui/material/styles";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "@mui/material/TextareaAutosize";

const StyledTextArea = styled(TextareaAutosize)<TextareaAutosizeProps>(
  ({ theme }) => ({})
);

export default StyledTextArea;
