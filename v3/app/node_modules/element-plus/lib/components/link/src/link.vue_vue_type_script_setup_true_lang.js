const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-deprecated/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../icon/index.js');
const require_use_global_config = require('../../config-provider/src/hooks/use-global-config.js');
const require_link = require('./link.js');
let vue = require("vue");

//#region ../../packages/components/link/src/link.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["href", "target"];
var link_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElLink",
	__name: "link",
	props: require_link.linkProps,
	emits: require_link.linkEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const globalConfig = require_use_global_config.useGlobalConfig("link");
		require_index.useDeprecated({
			scope: "el-link",
			from: "The underline option (boolean)",
			replacement: "'always' | 'hover' | 'never'",
			version: "3.0.0",
			ref: "https://element-plus.org/en-US/component/link.html#underline"
		}, (0, vue.computed)(() => require_types.isBoolean(props.underline)));
		const ns = require_index$1.useNamespace("link");
		const linkKls = (0, vue.computed)(() => [
			ns.b(),
			ns.m(props.type ?? globalConfig.value?.type ?? "default"),
			ns.is("disabled", props.disabled),
			ns.is("underline", underline.value === "always"),
			ns.is("hover-underline", underline.value === "hover" && !props.disabled)
		]);
		const underline = (0, vue.computed)(() => {
			if (require_types.isBoolean(props.underline)) return props.underline ? "hover" : "never";
			else return props.underline ?? globalConfig.value?.underline ?? "hover";
		});
		function handleClick(event) {
			if (!props.disabled) emit("click", event);
		}
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("a", {
				class: (0, vue.normalizeClass)(linkKls.value),
				href: __props.disabled || !__props.href ? void 0 : __props.href,
				target: __props.disabled || !__props.href ? void 0 : __props.target,
				onClick: handleClick
			}, [
				__props.icon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElIcon), { key: 0 }, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.icon)))]),
					_: 1
				})) : (0, vue.createCommentVNode)("v-if", true),
				_ctx.$slots.default ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
					key: 1,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("inner"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2)) : (0, vue.createCommentVNode)("v-if", true),
				_ctx.$slots.icon ? (0, vue.renderSlot)(_ctx.$slots, "icon", { key: 2 }) : (0, vue.createCommentVNode)("v-if", true)
			], 10, _hoisted_1);
		};
	}
});

//#endregion
exports.default = link_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=link.vue_vue_type_script_setup_true_lang.js.map