const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../utils/dom/aria.js');
const require_event = require('../../../utils/dom/event.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_trigger = require('../../popper/src/trigger2.js');
const require_trigger$1 = require('./trigger.js');
const require_constants = require('./constants.js');
const require_utils = require('./utils.js');
let vue = require("vue");

//#region ../../packages/components/tooltip/src/trigger.vue?vue&type=script&setup=true&lang.ts
var trigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTooltipTrigger",
	__name: "trigger",
	props: require_trigger$1.useTooltipTriggerProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const ns = require_index.useNamespace("tooltip");
		const { controlled, id, open, onOpen, onClose, onToggle } = (0, vue.inject)(require_constants.TOOLTIP_INJECTION_KEY, void 0);
		const triggerRef = (0, vue.ref)(null);
		const stopWhenControlledOrDisabled = () => {
			if ((0, vue.unref)(controlled) || props.disabled) return true;
		};
		const trigger = (0, vue.toRef)(props, "trigger");
		const onMouseenter = require_event.composeEventHandlers(stopWhenControlledOrDisabled, require_utils.whenTrigger(trigger, "hover", (e) => {
			onOpen(e);
			if (props.focusOnTarget && e.target) (0, vue.nextTick)(() => {
				require_aria.focusElement(e.target, { preventScroll: true });
			});
		}));
		const onMouseleave = require_event.composeEventHandlers(stopWhenControlledOrDisabled, require_utils.whenTrigger(trigger, "hover", onClose));
		const onClick = require_event.composeEventHandlers(stopWhenControlledOrDisabled, require_utils.whenTrigger(trigger, "click", (e) => {
			if (e.button === 0) onToggle(e);
		}));
		const onFocus = require_event.composeEventHandlers(stopWhenControlledOrDisabled, require_utils.whenTrigger(trigger, "focus", onOpen));
		const onBlur = require_event.composeEventHandlers(stopWhenControlledOrDisabled, require_utils.whenTrigger(trigger, "focus", onClose));
		const onContextMenu = require_event.composeEventHandlers(stopWhenControlledOrDisabled, require_utils.whenTrigger(trigger, "contextmenu", (e) => {
			e.preventDefault();
			onToggle(e);
		}));
		const onKeydown = require_event.composeEventHandlers(stopWhenControlledOrDisabled, (e) => {
			const code = require_event.getEventCode(e);
			if (props.triggerKeys.includes(code)) {
				e.preventDefault();
				onToggle(e);
			}
		});
		__expose({ triggerRef });
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_trigger.default), {
				id: (0, vue.unref)(id),
				"virtual-ref": __props.virtualRef,
				open: (0, vue.unref)(open),
				"virtual-triggering": __props.virtualTriggering,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("trigger")),
				onBlur: (0, vue.unref)(onBlur),
				onClick: (0, vue.unref)(onClick),
				onContextmenu: (0, vue.unref)(onContextMenu),
				onFocus: (0, vue.unref)(onFocus),
				onMouseenter: (0, vue.unref)(onMouseenter),
				onMouseleave: (0, vue.unref)(onMouseleave),
				onKeydown: (0, vue.unref)(onKeydown)
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"virtual-ref",
				"open",
				"virtual-triggering",
				"class",
				"onBlur",
				"onClick",
				"onContextmenu",
				"onFocus",
				"onMouseenter",
				"onMouseleave",
				"onKeydown"
			]);
		};
	}
});

//#endregion
exports.default = trigger_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=trigger.vue_vue_type_script_setup_true_lang.js.map