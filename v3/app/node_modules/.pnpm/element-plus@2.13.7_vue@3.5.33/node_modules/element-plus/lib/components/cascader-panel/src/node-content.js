const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_types = require('./types.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/cascader-panel/src/node-content.tsx
function isVNodeEmpty(vnodes) {
	return !!((0, _vue_shared.isArray)(vnodes) ? vnodes.every(({ type }) => type === vue.Comment) : vnodes?.type === vue.Comment);
}
var node_content_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "NodeContent",
	props: { node: {
		type: Object,
		required: true
	} },
	setup(props) {
		const ns = require_index.useNamespace("cascader-node");
		const { renderLabelFn } = (0, vue.inject)(require_types.CASCADER_PANEL_INJECTION_KEY);
		const { node } = props;
		const { data, label: nodeLabel } = node;
		const label = () => {
			const renderLabel = renderLabelFn?.({
				node,
				data
			});
			return isVNodeEmpty(renderLabel) ? nodeLabel : renderLabel ?? nodeLabel;
		};
		return () => (0, vue.createVNode)("span", { "class": ns.e("label") }, [label()]);
	}
});

//#endregion
exports.default = node_content_default;
//# sourceMappingURL=node-content.js.map