import { focusElement } from "../../../utils/dom/aria.mjs";
import { composeEventHandlers, getEventCode } from "../../../utils/dom/event.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import trigger_default from "../../popper/src/trigger2.mjs";
import { useTooltipTriggerProps } from "./trigger.mjs";
import { TOOLTIP_INJECTION_KEY } from "./constants.mjs";
import { whenTrigger } from "./utils.mjs";
import { createBlock, defineComponent, inject, nextTick, normalizeClass, openBlock, ref, renderSlot, toRef, unref, withCtx } from "vue";

//#region ../../packages/components/tooltip/src/trigger.vue?vue&type=script&setup=true&lang.ts
var trigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElTooltipTrigger",
	__name: "trigger",
	props: useTooltipTriggerProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const ns = useNamespace("tooltip");
		const { controlled, id, open, onOpen, onClose, onToggle } = inject(TOOLTIP_INJECTION_KEY, void 0);
		const triggerRef = ref(null);
		const stopWhenControlledOrDisabled = () => {
			if (unref(controlled) || props.disabled) return true;
		};
		const trigger = toRef(props, "trigger");
		const onMouseenter = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "hover", (e) => {
			onOpen(e);
			if (props.focusOnTarget && e.target) nextTick(() => {
				focusElement(e.target, { preventScroll: true });
			});
		}));
		const onMouseleave = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "hover", onClose));
		const onClick = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "click", (e) => {
			if (e.button === 0) onToggle(e);
		}));
		const onFocus = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "focus", onOpen));
		const onBlur = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "focus", onClose));
		const onContextMenu = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "contextmenu", (e) => {
			e.preventDefault();
			onToggle(e);
		}));
		const onKeydown = composeEventHandlers(stopWhenControlledOrDisabled, (e) => {
			const code = getEventCode(e);
			if (props.triggerKeys.includes(code)) {
				e.preventDefault();
				onToggle(e);
			}
		});
		__expose({ triggerRef });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(trigger_default), {
				id: unref(id),
				"virtual-ref": __props.virtualRef,
				open: unref(open),
				"virtual-triggering": __props.virtualTriggering,
				class: normalizeClass(unref(ns).e("trigger")),
				onBlur: unref(onBlur),
				onClick: unref(onClick),
				onContextmenu: unref(onContextMenu),
				onFocus: unref(onFocus),
				onMouseenter: unref(onMouseenter),
				onMouseleave: unref(onMouseleave),
				onKeydown: unref(onKeydown)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
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
export { trigger_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=trigger.vue_vue_type_script_setup_true_lang.mjs.map