import { datePickTypes } from "../../constants/date.mjs";
import { componentSizes } from "../../constants/size.mjs";

//#region ../../packages/utils/vue/validator.ts
const isValidComponentSize = (val) => ["", ...componentSizes].includes(val);
const isValidDatePickType = (val) => [...datePickTypes].includes(val);

//#endregion
export { isValidComponentSize, isValidDatePickType };
//# sourceMappingURL=validator.mjs.map