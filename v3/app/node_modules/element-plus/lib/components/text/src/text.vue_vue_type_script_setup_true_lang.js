const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_text = require('./text.js');
let vue = require("vue");

//#region ../../packages/components/text/src/text.vue?vue&type=script&setup=true&lang.ts
var text_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElText",
	__name: "text",
	props: require_text.textProps,
	setup(__props) {
		const props = __props;
		const textRef = (0, vue.ref)();
		const textSize = require_use_form_common_props.useFormSize();
		const ns = require_index.useNamespace("text");
		const textKls = (0, vue.computed)(() => [
			ns.b(),
			ns.m(props.type),
			ns.m(textSize.value),
			ns.is("truncated", props.truncated),
			ns.is("line-clamp", !require_types.isUndefined(props.lineClamp))
		]);
		const bindTitle = () => {
			if ((0, vue.useAttrs)().title) return;
			let shouldAddTitle = false;
			const text = textRef.value?.textContent || "";
			if (props.truncated) {
				const width = textRef.value?.offsetWidth;
				const scrollWidth = textRef.value?.scrollWidth;
				if (width && scrollWidth && scrollWidth > width) shouldAddTitle = true;
			} else if (!require_types.isUndefined(props.lineClamp)) {
				const height = textRef.value?.offsetHeight;
				const scrollHeight = textRef.value?.scrollHeight;
				if (height && scrollHeight && scrollHeight > height) shouldAddTitle = true;
			}
			if (shouldAddTitle) textRef.value?.setAttribute("title", text);
			else textRef.value?.removeAttribute("title");
		};
		(0, vue.onMounted)(bindTitle);
		(0, vue.onUpdated)(bindTitle);
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.tag), {
				ref_key: "textRef",
				ref: textRef,
				class: (0, vue.normalizeClass)(textKls.value),
				style: (0, vue.normalizeStyle)({ "-webkit-line-clamp": __props.lineClamp })
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class", "style"]);
		};
	}
});

//#endregion
exports.default = text_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=text.vue_vue_type_script_setup_true_lang.js.map