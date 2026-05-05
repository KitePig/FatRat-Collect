const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-ordered-children/index.js');
const require_steps = require('./steps.js');
const require_tokens = require('./tokens.js');
let vue = require("vue");

//#region ../../packages/components/steps/src/steps.vue?vue&type=script&setup=true&lang.ts
var steps_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElSteps",
	__name: "steps",
	props: require_steps.stepsProps,
	emits: require_steps.stepsEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index.useNamespace("steps");
		const { children: steps, addChild: addStep, removeChild: removeStep, ChildrenSorter: StepsSorter } = require_index$1.useOrderedChildren((0, vue.getCurrentInstance)(), "ElStep");
		(0, vue.watch)(steps, () => {
			steps.value.forEach((instance, index) => {
				instance.setIndex(index);
			});
		});
		(0, vue.provide)(require_tokens.STEPS_INJECTION_KEY, {
			props,
			steps,
			addStep,
			removeStep
		});
		(0, vue.watch)(() => props.active, (newVal, oldVal) => {
			emit(require_event.CHANGE_EVENT, newVal, oldVal);
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).b(), (0, vue.unref)(ns).m(__props.simple ? "simple" : __props.direction)]) }, [(0, vue.renderSlot)(_ctx.$slots, "default"), (0, vue.createVNode)((0, vue.unref)(StepsSorter))], 2);
		};
	}
});

//#endregion
exports.default = steps_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=steps.vue_vue_type_script_setup_true_lang.js.map