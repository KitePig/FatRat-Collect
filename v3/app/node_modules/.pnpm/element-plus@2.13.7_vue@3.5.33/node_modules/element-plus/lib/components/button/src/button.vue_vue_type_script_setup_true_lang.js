const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_button = require('./button.js');
const require_use_button = require('./use-button.js');
const require_button_custom = require('./button-custom.js');
let vue = require("vue");

//#region ../../packages/components/button/src/button.vue?vue&type=script&setup=true&lang.ts
var button_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElButton",
	__name: "button",
	props: require_button.buttonProps,
	emits: require_button.buttonEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const buttonStyle = require_button_custom.useButtonCustomStyle(props);
		const ns = require_index.useNamespace("button");
		const { _ref, _size, _type, _disabled, _props, _plain, _round, _text, _dashed, shouldAddSpace, handleClick } = require_use_button.useButton(props, emit);
		const buttonKls = (0, vue.computed)(() => [
			ns.b(),
			ns.m(_type.value),
			ns.m(_size.value),
			ns.is("disabled", _disabled.value),
			ns.is("loading", props.loading),
			ns.is("plain", _plain.value),
			ns.is("round", _round.value),
			ns.is("circle", props.circle),
			ns.is("text", _text.value),
			ns.is("dashed", _dashed.value),
			ns.is("link", props.link),
			ns.is("has-bg", props.bg)
		]);
		__expose({
			ref: _ref,
			size: _size,
			type: _type,
			disabled: _disabled,
			shouldAddSpace
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.tag), (0, vue.mergeProps)({
				ref_key: "_ref",
				ref: _ref
			}, (0, vue.unref)(_props), {
				class: buttonKls.value,
				style: (0, vue.unref)(buttonStyle),
				onClick: (0, vue.unref)(handleClick)
			}), {
				default: (0, vue.withCtx)(() => [__props.loading ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [_ctx.$slots.loading ? (0, vue.renderSlot)(_ctx.$slots, "loading", { key: 0 }) : ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), {
					key: 1,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).is("loading"))
				}, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.loadingIcon)))]),
					_: 1
				}, 8, ["class"]))], 64)) : __props.icon || _ctx.$slots.icon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), { key: 1 }, {
					default: (0, vue.withCtx)(() => [__props.icon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.icon), { key: 0 })) : (0, vue.renderSlot)(_ctx.$slots, "icon", { key: 1 })]),
					_: 3
				})) : (0, vue.createCommentVNode)("v-if", true), _ctx.$slots.default ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
					key: 2,
					class: (0, vue.normalizeClass)({ [(0, vue.unref)(ns).em("text", "expand")]: (0, vue.unref)(shouldAddSpace) })
				}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2)) : (0, vue.createCommentVNode)("v-if", true)]),
				_: 3
			}, 16, [
				"class",
				"style",
				"onClick"
			]);
		};
	}
});

//#endregion
exports.default = button_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=button.vue_vue_type_script_setup_true_lang.js.map