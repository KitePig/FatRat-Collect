const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_index$2 = require('../../checkbox/index.js');
const require_index$3 = require('../../radio/index.js');
const require_types = require('./types.js');
const require_node_content = require('./node-content.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/cascader-panel/src/node.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"aria-haspopup",
	"aria-owns",
	"aria-expanded",
	"tabindex"
];
var node_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElCascaderNode",
	__name: "node",
	props: {
		node: {
			type: Object,
			required: true
		},
		menuId: String
	},
	emits: ["expand"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const panel = (0, vue.inject)(require_types.CASCADER_PANEL_INJECTION_KEY);
		const ns = require_index.useNamespace("cascader-node");
		const isHoverMenu = (0, vue.computed)(() => panel.isHoverMenu);
		const multiple = (0, vue.computed)(() => panel.config.multiple);
		const checkStrictly = (0, vue.computed)(() => panel.config.checkStrictly);
		const showPrefix = (0, vue.computed)(() => panel.config.showPrefix);
		const checkedNodeId = (0, vue.computed)(() => panel.checkedNodes[0]?.uid);
		const isDisabled = (0, vue.computed)(() => props.node.isDisabled);
		const isLeaf = (0, vue.computed)(() => props.node.isLeaf);
		const expandable = (0, vue.computed)(() => checkStrictly.value && !isLeaf.value || !isDisabled.value);
		const inExpandingPath = (0, vue.computed)(() => isInPath(panel.expandingNode));
		const inCheckedPath = (0, vue.computed)(() => checkStrictly.value && panel.checkedNodes.some(isInPath));
		const isInPath = (node) => {
			const { level, uid } = props.node;
			return node?.pathNodes[level - 1]?.uid === uid;
		};
		const doExpand = () => {
			if (inExpandingPath.value) return;
			panel.expandNode(props.node);
		};
		const doCheck = (checked) => {
			const { node } = props;
			if (checked === node.checked) return;
			panel.handleCheckChange(node, checked);
		};
		const doLoad = () => {
			panel.lazyLoad(props.node, () => {
				if (!isLeaf.value) doExpand();
			});
		};
		const handleHoverExpand = (e) => {
			if (!isHoverMenu.value) return;
			handleExpand();
			!isLeaf.value && emit("expand", e);
		};
		const handleExpand = () => {
			const { node } = props;
			if (!expandable.value || node.loading) return;
			node.loaded ? doExpand() : doLoad();
		};
		const handleClick = () => {
			if (isLeaf.value && !isDisabled.value && !checkStrictly.value && !multiple.value) handleCheck(true);
			else if ((panel.config.checkOnClickNode && (multiple.value || checkStrictly.value) || isLeaf.value && panel.config.checkOnClickLeaf) && !isDisabled.value) handleSelectCheck(!props.node.checked);
			else if (!isHoverMenu.value) handleExpand();
		};
		const handleSelectCheck = (checked) => {
			if (checkStrictly.value) {
				doCheck(checked);
				if (props.node.loaded) doExpand();
			} else handleCheck(checked);
		};
		const handleCheck = (checked) => {
			if (!props.node.loaded) doLoad();
			else {
				doCheck(checked);
				!checkStrictly.value && doExpand();
			}
		};
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
				id: `${__props.menuId}-${__props.node.uid}`,
				role: "menuitem",
				"aria-haspopup": !isLeaf.value,
				"aria-owns": isLeaf.value ? void 0 : __props.menuId,
				"aria-expanded": inExpandingPath.value,
				tabindex: expandable.value ? -1 : void 0,
				class: (0, vue.normalizeClass)([
					(0, vue.unref)(ns).b(),
					(0, vue.unref)(ns).is("selectable", checkStrictly.value),
					(0, vue.unref)(ns).is("active", __props.node.checked),
					(0, vue.unref)(ns).is("disabled", !expandable.value),
					inExpandingPath.value && "in-active-path",
					inCheckedPath.value && "in-checked-path"
				]),
				onMouseenter: handleHoverExpand,
				onFocus: handleHoverExpand,
				onClick: handleClick
			}, [
				(0, vue.createCommentVNode)(" prefix "),
				multiple.value && showPrefix.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElCheckbox), {
					key: 0,
					"model-value": __props.node.checked,
					indeterminate: __props.node.indeterminate,
					disabled: isDisabled.value,
					onClick: _cache[0] || (_cache[0] = (0, vue.withModifiers)(() => {}, ["stop"])),
					"onUpdate:modelValue": handleSelectCheck
				}, null, 8, [
					"model-value",
					"indeterminate",
					"disabled"
				])) : checkStrictly.value && showPrefix.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$3.ElRadio), {
					key: 1,
					"model-value": checkedNodeId.value,
					label: __props.node.uid,
					disabled: isDisabled.value,
					"onUpdate:modelValue": handleSelectCheck,
					onClick: _cache[1] || (_cache[1] = (0, vue.withModifiers)(() => {}, ["stop"]))
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createCommentVNode)("\n        Add an empty element to avoid render label,\n        do not use empty fragment here for https://github.com/vuejs/vue-next/pull/2485\n      "), _cache[2] || (_cache[2] = (0, vue.createElementVNode)("span", null, null, -1))]),
					_: 1
				}, 8, [
					"model-value",
					"label",
					"disabled"
				])) : isLeaf.value && __props.node.checked ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), {
					key: 2,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("prefix"))
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Check))]),
					_: 1
				}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createCommentVNode)(" content "),
				(0, vue.createVNode)((0, vue.unref)(require_node_content.default), { node: __props.node }, null, 8, ["node"]),
				(0, vue.createCommentVNode)(" postfix "),
				!isLeaf.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 3 }, [__props.node.loading ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), {
					key: 0,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).is("loading"), (0, vue.unref)(ns).e("postfix")])
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Loading))]),
					_: 1
				}, 8, ["class"])) : ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), {
					key: 1,
					class: (0, vue.normalizeClass)(["arrow-right", (0, vue.unref)(ns).e("postfix")])
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowRight))]),
					_: 1
				}, 8, ["class"]))], 64)) : (0, vue.createCommentVNode)("v-if", true)
			], 42, _hoisted_1);
		};
	}
});

//#endregion
exports.default = node_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=node.vue_vue_type_script_setup_true_lang.js.map