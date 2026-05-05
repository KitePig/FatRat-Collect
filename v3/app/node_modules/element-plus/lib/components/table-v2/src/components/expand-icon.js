const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../icon/index.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/table-v2/src/components/expand-icon.tsx
const ExpandIcon = (props) => {
	const { expanded, expandable, onExpand, style, size, ariaLabel } = props;
	return (0, vue.createVNode)("button", (0, vue.mergeProps)({
		onClick: expandable ? () => onExpand(!expanded) : void 0,
		ariaLabel,
		ariaExpanded: expanded,
		class: props.class
	}, { "type": "button" }), [(0, vue.createVNode)(require_index.ElIcon, {
		"size": size,
		"style": style
	}, { default: () => [(0, vue.createVNode)(_element_plus_icons_vue.ArrowRight, null, null)] })]);
};
ExpandIcon.inheritAttrs = false;

//#endregion
exports.default = ExpandIcon;
//# sourceMappingURL=expand-icon.js.map