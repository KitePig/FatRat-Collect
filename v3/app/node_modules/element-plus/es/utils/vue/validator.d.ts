import { DatePickType } from "../../constants/date.js";
import { ComponentSize } from "../../constants/size.js";

//#region ../../packages/utils/vue/validator.d.ts
declare const isValidComponentSize: (val: string) => val is ComponentSize | "";
declare const isValidDatePickType: (val: string) => val is DatePickType;
//#endregion
export { isValidComponentSize, isValidDatePickType };