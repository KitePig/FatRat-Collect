import { _default } from "./date-picker.js";

//#region ../../packages/components/date-picker/src/instance.d.ts
type DatePickerInstance = InstanceType<typeof _default> & DatePickerExpose;
type DatePickerExpose = {
  focus: () => void;
  blur: () => void;
  handleOpen: () => void;
  handleClose: () => void;
};
//#endregion
export { DatePickerInstance };