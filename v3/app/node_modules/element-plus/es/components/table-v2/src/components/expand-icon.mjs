import { ElIcon } from "../../../icon/index.mjs";
import { ArrowRight } from "@element-plus/icons-vue";
import { createVNode, mergeProps } from "vue";

//#region ../../packages/components/table-v2/src/components/expand-icon.tsx
const ExpandIcon = (props) => {
	const { expanded, expandable, onExpand, style, size, ariaLabel } = props;
	return createVNode("button", mergeProps({
		onClick: expandable ? () => onExpand(!expanded) : void 0,
		ariaLabel,
		ariaExpanded: expanded,
		class: props.class
	}, { "type": "button" }), [createVNode(ElIcon, {
		"size": size,
		"style": style
	}, { default: () => [createVNode(ArrowRight, null, null)] })]);
};
ExpandIcon.inheritAttrs = false;

//#endregion
export { ExpandIcon as default };
//# sourceMappingURL=expand-icon.mjs.map