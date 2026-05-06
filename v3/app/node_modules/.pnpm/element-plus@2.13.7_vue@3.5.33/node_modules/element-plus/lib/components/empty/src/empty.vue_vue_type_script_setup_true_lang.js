const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_style = require('../../../utils/dom/style.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_empty = require('./empty.js');
const require_img_empty = require('./img-empty.js');
let vue = require("vue");

//#region ../../packages/components/empty/src/empty.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["src"];
const _hoisted_2 = { key: 1 };
var empty_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElEmpty",
	__name: "empty",
	props: require_empty.emptyProps,
	setup(__props) {
		const props = __props;
		const { t } = require_index.useLocale();
		const ns = require_index$1.useNamespace("empty");
		const emptyDescription = (0, vue.computed)(() => props.description || t("el.table.emptyText"));
		const imageStyle = (0, vue.computed)(() => ({ width: require_style.addUnit(props.imageSize) }));
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()) }, [
				(0, vue.createElementVNode)("div", {
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("image")),
					style: (0, vue.normalizeStyle)(imageStyle.value)
				}, [__props.image ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("img", {
					key: 0,
					src: __props.image,
					ondragstart: "return false"
				}, null, 8, _hoisted_1)) : (0, vue.renderSlot)(_ctx.$slots, "image", { key: 1 }, () => [(0, vue.createVNode)(require_img_empty.default)])], 6),
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("description")) }, [_ctx.$slots.description ? (0, vue.renderSlot)(_ctx.$slots, "description", { key: 0 }) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("p", _hoisted_2, (0, vue.toDisplayString)(emptyDescription.value), 1))], 2),
				_ctx.$slots.default ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("bottom"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 2);
		};
	}
});

//#endregion
exports.default = empty_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=empty.vue_vue_type_script_setup_true_lang.js.map