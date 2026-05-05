import { isObject } from "../../../utils/types.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { NOOP } from "../../../utils/functions.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { FORWARD_REF_INJECTION_KEY, useForwardRefDirective } from "../../../hooks/use-forward-ref/index.mjs";
import { Comment, Fragment, Text, cloneVNode, createVNode, defineComponent, inject, withDirectives } from "vue";

//#region ../../packages/components/slot/src/only-child.tsx
const NAME = "ElOnlyChild";
const OnlyChild = /* @__PURE__ */ defineComponent({
	name: NAME,
	setup(_, { slots, attrs }) {
		const forwardRefDirective = useForwardRefDirective(inject(FORWARD_REF_INJECTION_KEY)?.setForwardRef ?? NOOP);
		return () => {
			const defaultSlot = slots.default?.(attrs);
			if (!defaultSlot) return null;
			const [firstLegitNode, length] = findFirstLegitChild(defaultSlot);
			if (!firstLegitNode) {
				debugWarn(NAME, "no valid child node found");
				return null;
			}
			if (length > 1) debugWarn(NAME, "requires exact only one valid child.");
			return withDirectives(cloneVNode(firstLegitNode, attrs), [[forwardRefDirective]]);
		};
	}
});
function findFirstLegitChild(node) {
	if (!node) return [null, 0];
	const children = node;
	const len = children.filter((c) => c.type !== Comment).length;
	for (const child of children) {
		/**
		* when user uses h(Fragment, [text]) to render plain string,
		* this switch case just cannot handle, when the value is primitives
		* we should just return the wrapped string
		*/
		if (isObject(child)) switch (child.type) {
			case Comment: continue;
			case Text:
			case "svg": return [wrapTextContent(child), len];
			case Fragment: return findFirstLegitChild(child.children);
			default: return [child, len];
		}
		return [wrapTextContent(child), len];
	}
	return [null, 0];
}
function wrapTextContent(s) {
	const ns = useNamespace("only-child");
	return createVNode("span", { "class": ns.e("content") }, [s]);
}

//#endregion
export { OnlyChild };
//# sourceMappingURL=only-child.mjs.map