Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_column_alignment = require('../../../constants/column-alignment.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_constants = require('./constants.js');
let vue = require("vue");

//#region ../../packages/components/descriptions/src/description-item.ts
const descriptionItemProps = require_runtime$1.buildProps({
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
		values: require_column_alignment.columnAlignment,
		default: "left"
	},
	labelAlign: {
		type: String,
		values: require_column_alignment.columnAlignment
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
const DescriptionItem = (0, vue.defineComponent)({
	name: require_constants.COMPONENT_NAME,
	props: descriptionItemProps
});

//#endregion
exports.default = DescriptionItem;
exports.descriptionItemProps = descriptionItemProps;
//# sourceMappingURL=description-item.js.map