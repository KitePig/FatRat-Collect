const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_vnode = require('../../../utils/vue/vnode.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_alert = require('./alert.js');
const require_index$1 = require('../../icon/index.js');
let vue = require("vue");

//#region ../../packages/components/alert/src/alert.vue?vue&type=script&setup=true&lang.ts
var alert_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElAlert",
	__name: "alert",
	props: require_alert.alertProps,
	emits: require_alert.alertEmits,
	setup(__props, { emit: __emit }) {
		const { Close } = require_icon.TypeComponents;
		const props = __props;
		const emit = __emit;
		const slots = (0, vue.useSlots)();
		const ns = require_index.useNamespace("alert");
		const visible = (0, vue.ref)(true);
		const iconComponent = (0, vue.computed)(() => require_icon.TypeComponentsMap[props.type]);
		const hasDesc = (0, vue.computed)(() => {
			if (props.description) return true;
			const slotContent = slots.default?.();
			if (!slotContent) return false;
			return require_vnode.flattedChildren(slotContent).some((child) => !require_vnode.isComment(child));
		});
		const close = (evt) => {
			visible.value = false;
			emit("close", evt);
		};
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)(vue.Transition, {
				name: (0, vue.unref)(ns).b("fade"),
				persisted: ""
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.withDirectives)((0, vue.createElementVNode)("div", {
					class: (0, vue.normalizeClass)([
						(0, vue.unref)(ns).b(),
						(0, vue.unref)(ns).m(__props.type),
						(0, vue.unref)(ns).is("center", __props.center),
						(0, vue.unref)(ns).is(__props.effect)
					]),
					role: "alert"
				}, [__props.showIcon && (_ctx.$slots.icon || iconComponent.value) ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), {
					key: 0,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("icon"), (0, vue.unref)(ns).is("big", hasDesc.value)])
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "icon", {}, () => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(iconComponent.value)))])]),
					_: 3
				}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("content")) }, [
					__props.title || _ctx.$slots.title ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
						key: 0,
						class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("title"), { "with-description": hasDesc.value }])
					}, [(0, vue.renderSlot)(_ctx.$slots, "title", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.title), 1)])], 2)) : (0, vue.createCommentVNode)("v-if", true),
					hasDesc.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("p", {
						key: 1,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("description"))
					}, [(0, vue.renderSlot)(_ctx.$slots, "default", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.description), 1)])], 2)) : (0, vue.createCommentVNode)("v-if", true),
					__props.closable ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 2 }, [__props.closeText ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 0,
						class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("close-btn"), (0, vue.unref)(ns).is("customed")]),
						onClick: close
					}, (0, vue.toDisplayString)(__props.closeText), 3)) : ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), {
						key: 1,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("close-btn")),
						onClick: close
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(Close))]),
						_: 1
					}, 8, ["class"]))], 64)) : (0, vue.createCommentVNode)("v-if", true)
				], 2)], 2), [[vue.vShow, visible.value]])]),
				_: 3
			}, 8, ["name"]);
		};
	}
});

//#endregion
exports.default = alert_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=alert.vue_vue_type_script_setup_true_lang.js.map