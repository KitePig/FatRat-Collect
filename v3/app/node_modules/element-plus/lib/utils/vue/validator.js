Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_date = require('../../constants/date.js');
const require_size = require('../../constants/size.js');

//#region ../../packages/utils/vue/validator.ts
const isValidComponentSize = (val) => ["", ...require_size.componentSizes].includes(val);
const isValidDatePickType = (val) => [...require_date.datePickTypes].includes(val);

//#endregion
exports.isValidComponentSize = isValidComponentSize;
exports.isValidDatePickType = isValidDatePickType;
//# sourceMappingURL=validator.js.map