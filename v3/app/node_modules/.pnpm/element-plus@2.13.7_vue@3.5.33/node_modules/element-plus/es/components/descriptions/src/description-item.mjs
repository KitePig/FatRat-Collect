import { columnAlignment } from "../../../constants/column-alignment.mjs";
import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { COMPONENT_NAME } from "./constants.mjs";
import { defineComponent } from "vue";

//#region ../../packages/components/descriptions/src/description-item.ts
const descriptionItemProps = buildProps({
	label: {
		type: String,
		default: ""
	},
	span: {
		type: Number,
		default: 1
	},
	rowspan: {
		type: Number,
		default: 1
	},
	width: {
		type: [String, Number],
		default: ""
	},
	minWidth: {
		type: [String, Number],
		default: ""
	},
	labelWidth: { type: [String, Number] },
	align: {
		type: String,
		values: columnAlignment,
		default: "left"
	},
	labelAlign: {
		type: String,
		values: columnAlignment
	},
	className: {
		type: String,
		default: ""
	},
	labelClassName: {
		type: String,
		default: ""
	}
});
const DescriptionItem = defineComponent({
	name: COMPONENT_NAME,
	props: descriptionItemProps
});

//#endregion
export { DescriptionItem as default, descriptionItemProps };
//# sourceMappingURL=description-item.mjs.map