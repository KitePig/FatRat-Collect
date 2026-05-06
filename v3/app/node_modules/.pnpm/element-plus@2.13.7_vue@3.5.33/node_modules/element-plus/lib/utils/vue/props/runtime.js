Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/utils/vue/props/runtime.ts
const epPropKey = "__epPropKey";
const definePropType = (val) => val;
const isEpProp = (val) => (0, _vue_shared.isObject)(val) && !!val[epPropKey];
/**
* @description Build prop. It can better optimize prop types
* @description 生成 prop，能更好地优化类型
* @example
// limited options
// the type will be PropType<'light' | 'dark'>
buildProp({
type: String,
values: ['light', 'dark'],
} as const)
* @example
// limited options and other types
// the type will be PropType<'small' | 'large' | number>
buildProp({
type: [String, Number],
values: ['small', 'large'],
validator: (val: unknown): val is number => typeof val === 'number',
} as const)
@link see more: https://github.com/element-plus/element-plus/pull/3341
*/
const buildProp = (prop, key) => {
	if (!(0, _vue_shared.isObject)(prop) || isEpProp(prop)) return prop;
	const { values, required, default: defaultValue, type, validator } = prop;
	const epProp = {
		type,
		required: !!required,
		validator: values || validator ? (val) => {
			let valid = false;
			let allowedValues = [];
			if (values) {
				allowedValues = Array.from(values);
				if ((0, _vue_shared.hasOwn)(prop, "default")) allowedValues.push(defaultValue);
				valid ||= allowedValues.includes(val);
			}
			if (validator) valid ||= validator(val);
			if (!valid && allowedValues.length > 0) {
				const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
				(0, vue.warn)(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
			}
			return valid;
		} : void 0,
		[epPropKey]: true
	};
	if ((0, _vue_shared.hasOwn)(prop, "default")) epProp.default = defaultValue;
	return epProp;
};
const buildProps = (props) => (0, lodash_unified.fromPairs)(Object.entries(props).map(([key, option]) => [key, buildProp(option, key)]));

//#endregion
exports.buildProp = buildProp;
exports.buildProps = buildProps;
exports.definePropType = definePropType;
exports.epPropKey = epPropKey;
exports.isEpProp = isEpProp;
//# sourceMappingURL=runtime.js.map