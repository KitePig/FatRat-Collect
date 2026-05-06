const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_style = require('../../../utils/dom/style.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_avatar = require('./avatar.js');
const require_constants = require('./constants.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/avatar/src/avatar.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"src",
	"alt",
	"srcset"
];
var avatar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElAvatar",
	__name: "avatar",
	props: require_avatar.avatarProps,
	emits: require_avatar.avatarEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const avatarGroupContext = (0, vue.inject)(require_constants.avatarGroupContextKey, void 0);
		const ns = require_index.useNamespace("avatar");
		const hasLoadError = (0, vue.ref)(false);
		const size = (0, vue.computed)(() => props.size ?? avatarGroupContext?.size);
		const shape = (0, vue.computed)(() => props.shape ?? avatarGroupContext?.shape ?? "circle");
		const avatarClass = (0, vue.computed)(() => {
			const { icon } = props;
			const classList = [ns.b()];
			if ((0, _vue_shared.isString)(size.value)) classList.push(ns.m(size.value));
			if (icon) classList.push(ns.m("icon"));
			if (shape.value) classList.push(ns.m(shape.value));
			return classList;
		});
		const sizeStyle = (0, vue.computed)(() => {
			return require_types.isNumber(size.value) ? ns.cssVarBlock({ size: require_style.addUnit(size.value) }) : void 0;
		});
		const fitStyle = (0, vue.computed)(() => ({ objectFit: props.fit }));
		(0, vue.watch)(() => [props.src, props.srcSet], () => hasLoadError.value = false);
		function handleError(e) {
			hasLoadError.value = true;
			emit("error", e);
		}
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
				class: (0, vue.normalizeClass)(avatarClass.value),
				style: (0, vue.normalizeStyle)(sizeStyle.value)
			}, [(__props.src || __props.srcSet) && !hasLoadError.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("img", {
				key: 0,
				src: __props.src,
				alt: __props.alt,
				srcset: __props.srcSet,
				style: (0, vue.normalizeStyle)(fitStyle.value),
				onError: handleError
			}, null, 44, _hoisted_1)) : __props.icon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), { key: 1 }, {
				default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.icon)))]),
				_: 1
			})) : (0, vue.renderSlot)(_ctx.$slots, "default", { key: 2 })], 6);
		};
	}
});

//#endregion
exports.default = avatar_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=avatar.vue_vue_type_script_setup_true_lang.js.map