export type Steps = {
  stepLabel: string;
  stepComponent: React.ReactNode;
};
export interface IStepperProps {
  steps: Steps[];
  activeStep: number;
  backButtonElement: React.ReactElement;
  nextButtonElement: React.ReactElement;
}

export interface ILocation {
  location: string;
  neighbourhood?: string;
}
