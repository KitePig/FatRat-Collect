const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../../input/index.js');
const require_usePagination = require('../usePagination.js');
const require_jumper = require('./jumper.js');
let vue = require("vue");

//#region ../../packages/components/pagination/src/components/jumper.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["disabled"];
var jumper_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElPaginationJumper",
	__name: "jumper",
	props: require_jumper.paginationJumperProps,
	setup(__props) {
		const { t } = require_index.useLocale();
		const ns = require_index$1.useNamespace("pagination");
		const { pageCount, disabled, currentPage, changeEvent } = require_usePagination.usePagination();
		const userInput = (0, vue.ref)();
		const innerValue = (0, vue.computed)(() => userInput.value ?? currentPage?.value);
		function handleInput(val) {
			userInput.value = val ? +val : "";
		}
		function handleChange(val) {
			val = Math.trunc(+val);
			changeEvent?.(val);
			userInput.value = void 0;
		}
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("jump")),
				disabled: (0, vue.unref)(disabled)
			}, [
				(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("goto")]) }, (0, vue.toDisplayString)((0, vue.unref)(t)("el.pagination.goto")), 3),
				(0, vue.createVNode)((0, vue.unref)(require_index$2.ElInput), {
					size: _ctx.size,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("editor"), (0, vue.unref)(ns).is("in-pagination")]),
					min: 1,
					max: (0, vue.unref)(pageCount),
					disabled: (0, vue.unref)(disabled),
					"model-value": innerValue.value,
					"validate-event": false,
					"aria-label": (0, vue.unref)(t)("el.pagination.page"),
					type: "number",
					"onUpdate:modelValue": handleInput,
					onChange: handleChange
				}, null, 8, [
					"size",
					"class",
					"max",
					"disabled",
					"model-value",
					"aria-label"
				]),
				(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("classifier")]) }, (0, vue.toDisplayString)((0, vue.unref)(t)("el.pagination.pageClassifier")), 3)
			], 10, _hoisted_1);
		};
	}
});

//#endregion
exports.default = jumper_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=jumper.vue_vue_type_script_setup_true_lang.js.map