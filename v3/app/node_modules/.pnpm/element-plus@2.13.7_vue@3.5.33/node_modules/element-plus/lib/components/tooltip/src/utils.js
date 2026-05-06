Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/tooltip/src/utils.ts
const isTriggerType = (trigger, type) => {
	if ((0, _vue_shared.isArray)(trigger)) return trigger.includes(type);
	return trigger === type;
};
const whenTrigger = (trigger, type, handler) => {
	return (e) => {
		isTriggerType((0, vue.unref)(trigger), type) && handler(e);
	};
};

//#endregion
exports.isTriggerType = isTriggerType;
exports.whenTrigger = whenTrigger;
//# sourceMappingURL=utils.js.map