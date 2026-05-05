const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../icon/index.js');
const require_prev = require('./prev.js');
let vue = require("vue");

//#region ../../packages/components/pagination/src/components/prev.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"disabled",
	"aria-label",
	"aria-disabled"
];
const _hoisted_2 = { key: 0 };
var prev_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElPaginationPrev",
	__name: "prev",
	props: require_prev.paginationPrevProps,
	emits: require_prev.paginationPrevEmits,
	setup(__props) {
		const props = __props;
		const { t } = require_index.useLocale();
		const internalDisabled = (0, vue.computed)(() => props.disabled || props.currentPage <= 1);
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
				type: "button",
				class: "btn-prev",
				disabled: internalDisabled.value,
				"aria-label": _ctx.prevText || (0, vue.unref)(t)("el.pagination.prev"),
				"aria-disabled": internalDisabled.value,
				onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
			}, [_ctx.prevText ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", _hoisted_2, (0, vue.toDisplayString)(_ctx.prevText), 1)) : ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), { key: 1 }, {
				default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(_ctx.prevIcon)))]),
				_: 1
			}))], 8, _hoisted_1);
		};
	}
});

//#endregion
exports.default = prev_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=prev.vue_vue_type_script_setup_true_lang.js.map