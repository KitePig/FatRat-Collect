import { isArray } from "../../../utils/types.mjs";
import { unref } from "vue";

//#region ../../packages/components/tooltip/src/utils.ts
const isTriggerType = (trigger, type) => {
	if (isArray(trigger)) return trigger.includes(type);
	return trigger === type;
};
const whenTrigger = (trigger, type, handler) => {
	return (e) => {
		isTriggerType(unref(trigger), type) && handler(e);
	};
};

//#endregion
export { isTriggerType, whenTrigger };
//# sourceMappingURL=utils.mjs.map