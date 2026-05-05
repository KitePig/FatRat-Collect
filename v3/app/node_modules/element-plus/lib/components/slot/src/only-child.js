const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-forward-ref/index.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/slot/src/only-child.tsx
const NAME = "ElOnlyChild";
const OnlyChild = /* @__PURE__ */ (0, vue.defineComponent)({
	name: NAME,
	setup(_, { slots, attrs }) {
		const forwardRefDirective = require_index$1.useForwardRefDirective((0, vue.inject)(require_index$1.FORWARD_REF_INJECTION_KEY)?.setForwardRef ?? _vue_shared.NOOP);
		return () => {
			const defaultSlot = slots.default?.(attrs);
			if (!defaultSlot) return null;
			const [firstLegitNode, length] = findFirstLegitChild(defaultSlot);
			if (!firstLegitNode) {
				require_error.debugWarn(NAME, "no valid child node found");
				return null;
			}
			if (length > 1) require_error.debugWarn(NAME, "requires exact only one valid child.");
			return (0, vue.withDirectives)((0, vue.cloneVNode)(firstLegitNode, attrs), [[forwardRefDirective]]);
		};
	}
});
function findFirstLegitChild(node) {
	if (!node) return [null, 0];
	const children = node;
	const len = children.filter((c) => c.type !== vue.Comment).length;
	for (const child of children) {
		/**
		* when user uses h(Fragment, [text]) to render plain string,
		* this switch case just cannot handle, when the value is primitives
		* we should just return the wrapped string
		*/
		if ((0, _vue_shared.isObject)(child)) switch (child.type) {
			case vue.Comment: continue;
			case vue.Text:
			case "svg": return [wrapTextContent(child), len];
			case vue.Fragment: return findFirstLegitChild(child.children);
			default: return [child, len];
		}
		return [wrapTextContent(child), len];
	}
	return [null, 0];
}
function wrapTextContent(s) {
	const ns = require_index.useNamespace("only-child");
	return (0, vue.createVNode)("span", { "class": ns.e("content") }, [s]);
}

//#endregion
exports.OnlyChild = OnlyChild;
//# sourceMappingURL=only-child.js.map