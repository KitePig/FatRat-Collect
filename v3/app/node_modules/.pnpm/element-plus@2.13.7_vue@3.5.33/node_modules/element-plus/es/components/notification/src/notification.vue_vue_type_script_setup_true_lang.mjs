import { EVENT_CODE } from "../../../constants/aria.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { TypeComponentsMap } from "../../../utils/vue/icon.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { useGlobalComponentSettings } from "../../config-provider/src/hooks/use-global-config.mjs";
import { notificationEmits, notificationProps } from "./notification.mjs";
import { useEventListener, useTimeoutFn } from "@vueuse/core";
import { Fragment, Transition, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, defineComponent, normalizeClass, normalizeStyle, onMounted, openBlock, ref, renderSlot, resolveDynamicComponent, toDisplayString, unref, vShow, withCtx, withDirectives, withModifiers } from "vue";

//#region ../../packages/components/notification/src/notification.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["id"];
const _hoisted_2 = ["textContent"];
const _hoisted_3 = { key: 0 };
const _hoisted_4 = ["innerHTML"];
var notification_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElNotification",
	__name: "notification",
	props: notificationProps,
	emits: notificationEmits,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { ns, zIndex } = useGlobalComponentSettings("notification");
		const { nextZIndex, currentZIndex } = zIndex;
		const visible = ref(false);
		let timer = void 0;
		const typeClass = computed(() => {
			const type = props.type;
			return type && TypeComponentsMap[props.type] ? ns.m(type) : "";
		});
		const iconComponent = computed(() => {
			if (!props.type) return props.icon;
			return TypeComponentsMap[props.type] || props.icon;
		});
		const horizontalClass = computed(() => props.position.endsWith("right") ? "right" : "left");
		const verticalProperty = computed(() => props.position.startsWith("top") ? "top" : "bottom");
		const positionStyle = computed(() => {
			return {
				[verticalProperty.value]: `${props.offset}px`,
				zIndex: props.zIndex ?? currentZIndex.value
			};
		});
		function startTimer() {
			if (props.duration > 0) ({stop: timer} = useTimeoutFn(() => {
				if (visible.value) close();
			}, props.duration));
		}
		function clearTimer() {
			timer?.();
		}
		function close() {
			visible.value = false;
		}
		function onKeydown(event) {
			switch (getEventCode(event)) {
				case EVENT_CODE.delete:
				case EVENT_CODE.backspace:
					clearTimer();
					break;
				case EVENT_CODE.esc:
					if (visible.value) close();
					break;
				default:
					startTimer();
					break;
			}
		}
		onMounted(() => {
			startTimer();
			nextZIndex();
			visible.value = true;
		});
		useEventListener(document, "keydown", onKeydown);
		__expose({
			visible,
			close
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Transition, {
				name: unref(ns).b("fade"),
				onBeforeLeave: __props.onClose,
				onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("destroy")),
				persisted: ""
			}, {
				default: withCtx(() => [withDirectives(createElementVNode("div", {
					id: __props.id,
					class: normalizeClass([
						unref(ns).b(),
						__props.customClass,
						horizontalClass.value
					]),
					style: normalizeStyle(positionStyle.value),
					role: "alert",
					onMouseenter: clearTimer,
					onMouseleave: startTimer,
					onClick: _cache[0] || (_cache[0] = (...args) => __props.onClick && __props.onClick(...args))
				}, [iconComponent.value ? (openBlock(), createBlock(unref(ElIcon), {
					key: 0,
					class: normalizeClass([unref(ns).e("icon"), typeClass.value])
				}, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(iconComponent.value)))]),
					_: 1
				}, 8, ["class"])) : createCommentVNode("v-if", true), createElementVNode("div", { class: normalizeClass(unref(ns).e("group")) }, [
					createElementVNode("h2", {
						class: normalizeClass(unref(ns).e("title")),
						textContent: toDisplayString(__props.title)
					}, null, 10, _hoisted_2),
					withDirectives(createElementVNode("div", {
						class: normalizeClass(unref(ns).e("content")),
						style: normalizeStyle(!!__props.title ? void 0 : { margin: 0 })
					}, [renderSlot(_ctx.$slots, "default", {}, () => [!__props.dangerouslyUseHTMLString ? (openBlock(), createElementBlock("p", _hoisted_3, toDisplayString(__props.message), 1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "), createElementVNode("p", { innerHTML: __props.message }, null, 8, _hoisted_4)], 2112))])], 6), [[vShow, __props.message]]),
					__props.showClose ? (openBlock(), createBlock(unref(ElIcon), {
						key: 0,
						class: normalizeClass(unref(ns).e("closeBtn")),
						onClick: withModifiers(close, ["stop"])
					}, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.closeIcon)))]),
						_: 1
					}, 8, ["class"])) : createCommentVNode("v-if", true)
				], 2)], 46, _hoisted_1), [[vShow, visible.value]])]),
				_: 3
			}, 8, ["name", "onBeforeLeave"]);
		};
	}
});

//#endregion
export { notification_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=notification.vue_vue_type_script_setup_true_lang.mjs.map