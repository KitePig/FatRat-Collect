const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_token = require('./token.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");
let lodash_unified = require("lodash-unified");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/select/src/option-group.vue?vue&type=script&lang.ts
var option_group_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElOptionGroup",
	componentName: "ElOptionGroup",
	props: {
		label: String,
		disabled: Boolean
	},
	setup(props) {
		const ns = require_index.useNamespace("select");
		const groupRef = (0, vue.ref)();
		const instance = (0, vue.getCurrentInstance)();
		const children = (0, vue.ref)([]);
		(0, vue.provide)(require_token.selectGroupKey, (0, vue.reactive)({ ...(0, vue.toRefs)(props) }));
		const visible = (0, vue.computed)(() => children.value.some((option) => option.visible === true));
		const isOption = (node) => node.type.name === "ElOption" && !!node.component?.proxy;
		const flattedChildren = (node) => {
			const nodes = (0, lodash_unified.castArray)(node);
			const children = [];
			nodes.forEach((child) => {
				if (!(0, vue.isVNode)(child)) return;
				if (isOption(child)) children.push(child.component.proxy);
				else if ((0, _vue_shared.isArray)(child.children) && child.children.length) children.push(...flattedChildren(child.children));
				else if (child.component?.subTree) children.push(...flattedChildren(child.component.subTree));
			});
			return children;
		};
		const updateChildren = () => {
			children.value = flattedChildren(instance.subTree);
		};
		(0, vue.onMounted)(() => {
			updateChildren();
		});
		(0, _vueuse_core.useMutationObserver)(groupRef, updateChildren, {
			attributes: true,
			subtree: true,
			childList: true
		});
		return {
			groupRef,
			visible,
			ns
		};
	}
});

//#endregion
exports.default = option_group_vue_vue_type_script_lang_default;
//# sourceMappingURL=option-group.vue_vue_type_script_lang.js.map