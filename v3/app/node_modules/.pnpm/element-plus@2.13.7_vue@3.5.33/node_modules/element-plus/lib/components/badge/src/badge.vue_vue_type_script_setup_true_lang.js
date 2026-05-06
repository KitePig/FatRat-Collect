const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_style = require('../../../utils/dom/style.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_badge = require('./badge.js');
let vue = require("vue");

//#region ../../packages/components/badge/src/badge.vue?vue&type=script&setup=true&lang.ts
var badge_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElBadge",
	__name: "badge",
	props: require_badge.badgeProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const ns = require_index.useNamespace("badge");
		const content = (0, vue.computed)(() => {
			if (props.isDot) return "";
			if (require_types.isNumber(props.value) && require_types.isNumber(props.max)) return props.max < props.value ? `${props.max}+` : `${props.value}`;
			return `${props.value}`;
		});
		const style = (0, vue.computed)(() => {
			return [{
				backgroundColor: props.color,
				marginRight: require_style.addUnit(-props.offset[0]),
				marginTop: require_style.addUnit(props.offset[1])
			}, props.badgeStyle ?? {}];
		});
		__expose({ content });
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()) }, [(0, vue.renderSlot)(_ctx.$slots, "default"), (0, vue.createVNode)(vue.Transition, { name: `${(0, vue.unref)(ns).namespace.value}-zoom-in-center` }, {
				default: (0, vue.withCtx)(() => [!__props.hidden && (content.value || __props.isDot || _ctx.$slots.content) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("sup", {
					key: 0,
					class: (0, vue.normalizeClass)([
						(0, vue.unref)(ns).e("content"),
						(0, vue.unref)(ns).em("content", __props.type),
						(0, vue.unref)(ns).is("fixed", !!_ctx.$slots.default),
						(0, vue.unref)(ns).is("dot", __props.isDot),
						(0, vue.unref)(ns).is("hide-zero", !__props.showZero && __props.value === 0),
						__props.badgeClass
					]),
					style: (0, vue.normalizeStyle)(style.value)
				}, [(0, vue.renderSlot)(_ctx.$slots, "content", { value: content.value }, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(content.value), 1)])], 6)) : (0, vue.createCommentVNode)("v-if", true)]),
				_: 3
			}, 8, ["name"])], 2);
		};
	}
});

//#endregion
exports.default = badge_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=badge.vue_vue_type_script_setup_true_lang.js.map