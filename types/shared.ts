export type Steps = {
  stepLabel: string;
  stepComponent: React.ReactNode;
};
export interface IStepperProps {
  steps: Steps[];
  handleNext: () => void;
  handleBack: () => void;
  handleFinish: () => void;
  activeStep: number;
}
