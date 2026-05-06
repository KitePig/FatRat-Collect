import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/select/src/option.ts
const COMPONENT_NAME = "ElOption";
const optionProps = buildProps({
	value: {
		type: [
			String,
			Number,
			Boolean,
			Object
		],
		required: true
	},
	label: { type: [String, Number] },
	created: Boolean,
	disabled: Boolean
});

//#endregion
export { COMPONENT_NAME, optionProps };
//# sourceMappingURL=option.mjs.map