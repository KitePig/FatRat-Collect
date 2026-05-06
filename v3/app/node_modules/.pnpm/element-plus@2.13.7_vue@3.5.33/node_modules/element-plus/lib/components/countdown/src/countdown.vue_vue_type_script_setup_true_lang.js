const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_raf = require('../../../utils/raf.js');
const require_index = require('../../statistic/index.js');
const require_countdown = require('./countdown.js');
const require_utils = require('./utils.js');
let vue = require("vue");

//#region ../../packages/components/countdown/src/countdown.vue?vue&type=script&setup=true&lang.ts
var countdown_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElCountdown",
	__name: "countdown",
	props: require_countdown.countdownProps,
	emits: require_countdown.countdownEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		let timer;
		const rawValue = (0, vue.ref)(0);
		const displayValue = (0, vue.computed)(() => require_utils.formatTime(rawValue.value, props.format));
		const formatter = (val) => require_utils.formatTime(val, props.format);
		const stopTimer = () => {
			if (timer) {
				require_raf.cAF(timer);
				timer = void 0;
			}
		};
		const startTimer = () => {
			const timestamp = require_utils.getTime(props.value);
			const frameFunc = () => {
				let diff = timestamp - Date.now();
				emit(require_event.CHANGE_EVENT, diff);
				if (diff <= 0) {
					diff = 0;
					stopTimer();
					emit("finish");
				} else timer = require_raf.rAF(frameFunc);
				rawValue.value = diff;
			};
			timer = require_raf.rAF(frameFunc);
		};
		(0, vue.onMounted)(() => {
			rawValue.value = require_utils.getTime(props.value) - Date.now();
			(0, vue.watch)(() => [props.value, props.format], () => {
				stopTimer();
				startTimer();
			}, { immediate: true });
		});
		(0, vue.onBeforeUnmount)(() => {
			stopTimer();
		});
		__expose({ displayValue });
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index.ElStatistic), {
				value: rawValue.value,
				title: __props.title,
				prefix: __props.prefix,
				suffix: __props.suffix,
				"value-style": __props.valueStyle,
				formatter
			}, (0, vue.createSlots)({ _: 2 }, [(0, vue.renderList)(_ctx.$slots, (_, name) => {
				return {
					name,
					fn: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, name)])
				};
			})]), 1032, [
				"value",
				"title",
				"prefix",
				"suffix",
				"value-style"
			]);
		};
	}
});

//#endregion
exports.default = countdown_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=countdown.vue_vue_type_script_setup_true_lang.js.map