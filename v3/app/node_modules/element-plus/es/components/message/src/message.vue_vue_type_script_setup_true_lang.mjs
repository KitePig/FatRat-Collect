import { EVENT_CODE } from "../../../constants/aria.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { TypeComponents, TypeComponentsMap } from "../../../utils/vue/icon.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { ElBadge } from "../../badge/index.mjs";
import { useGlobalComponentSettings } from "../../config-provider/src/hooks/use-global-config.mjs";
import { MESSAGE_DEFAULT_PLACEMENT, messageEmits, messageProps } from "./message.mjs";
import { getLastOffset, getOffsetOrSpace } from "./instance.mjs";
import { useEventListener, useResizeObserver, useTimeoutFn } from "@vueuse/core";
import { Fragment, Transition, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, nextTick, normalizeClass, normalizeStyle, onMounted, openBlock, ref, renderSlot, resolveDynamicComponent, toDisplayString, unref, vShow, watch, withCtx, withDirectives, withModifiers } from "vue";

//#region ../../packages/components/message/src/message.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["id"];
const _hoisted_2 = ["innerHTML"];
var message_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElMessage",
	__name: "message",
	props: messageProps,
	emits: messageEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const { Close } = TypeComponents;
		const props = __props;
		const emit = __emit;
		const isStartTransition = ref(false);
		const { ns, zIndex } = useGlobalComponentSettings("message");
		const { currentZIndex, nextZIndex } = zIndex;
		const messageRef = ref();
		const visible = ref(false);
		const height = ref(0);
		let stopTimer = void 0;
		const badgeType = computed(() => props.type ? props.type === "error" ? "danger" : props.type : "info");
		const typeClass = computed(() => {
			const type = props.type;
			return { [ns.bm("icon", type)]: type && TypeComponentsMap[type] };
		});
		const iconComponent = computed(() => props.icon || TypeComponentsMap[props.type] || "");
		const placement = computed(() => props.placement || MESSAGE_DEFAULT_PLACEMENT);
		const lastOffset = computed(() => getLastOffset(props.id, placement.value));
		const offset = computed(() => {
			return Math.max(getOffsetOrSpace(props.id, props.offset, placement.value) + lastOffset.value, props.offset);
		});
		const bottom = computed(() => height.value + offset.value);
		const horizontalClass = computed(() => {
			if (placement.value.includes("left")) return ns.is("left");
			if (placement.value.includes("right")) return ns.is("right");
			return ns.is("center");
		});
		const verticalProperty = computed(() => placement.value.startsWith("top") ? "top" : "bottom");
		const customStyle = computed(() => ({
			[verticalProperty.value]: `${offset.value}px`,
			zIndex: currentZIndex.value
		}));
		function startTimer() {
			if (props.duration === 0) return;
			({stop: stopTimer} = useTimeoutFn(() => {
				close();
			}, props.duration));
		}
		function clearTimer() {
			stopTimer?.();
		}
		function close() {
			visible.value = false;
			nextTick(() => {
				if (!isStartTransition.value) {
					props.onClose?.();
					emit("destroy");
				}
			});
		}
		function keydown(event) {
			if (getEventCode(event) === EVENT_CODE.esc) close();
		}
		onMounted(() => {
			startTimer();
			nextZIndex();
			visible.value = true;
		});
		watch(() => props.repeatNum, () => {
			clearTimer();
			startTimer();
		});
		useEventListener(document, "keydown", keydown);
		useResizeObserver(messageRef, () => {
			height.value = messageRef.value.getBoundingClientRect().height;
		});
		__expose({
			visible,
			bottom,
			close
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Transition, {
				name: unref(ns).b("fade"),
				onBeforeEnter: _cache[0] || (_cache[0] = ($event) => isStartTransition.value = true),
				onBeforeLeave: __props.onClose,
				onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("destroy")),
				persisted: ""
			}, {
				default: withCtx(() => [withDirectives(createElementVNode("div", {
					id: __props.id,
					ref_key: "messageRef",
					ref: messageRef,
					class: normalizeClass([
						unref(ns).b(),
						{ [unref(ns).m(__props.type)]: __props.type },
						unref(ns).is("closable", __props.showClose),
						unref(ns).is("plain", __props.plain),
						unref(ns).is("bottom", verticalProperty.value === "bottom"),
						horizontalClass.value,
						__props.customClass
					]),
					style: normalizeStyle(customStyle.value),
					role: "alert",
					onMouseenter: clearTimer,
					onMouseleave: startTimer
				}, [
					__props.repeatNum > 1 ? (openBlock(), createBlock(unref(ElBadge), {
						key: 0,
						value: __props.repeatNum,
						type: badgeType.value,
						class: normalizeClass(unref(ns).e("badge"))
					}, null, 8, [
						"value",
						"type",
						"class"
					])) : createCommentVNode("v-if", true),
					iconComponent.value ? (openBlock(), createBlock(unref(ElIcon), {
						key: 1,
						class: normalizeClass([unref(ns).e("icon"), typeClass.value])
					}, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(iconComponent.value)))]),
						_: 1
					}, 8, ["class"])) : createCommentVNode("v-if", true),
					renderSlot(_ctx.$slots, "default", {}, () => [!__props.dangerouslyUseHTMLString ? (openBlock(), createElementBlock("p", {
						key: 0,
						class: normalizeClass(unref(ns).e("content"))
					}, toDisplayString(__props.message), 3)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "), createElementVNode("p", {
						class: normalizeClass(unref(ns).e("content")),
						innerHTML: __props.message
					}, null, 10, _hoisted_2)], 2112))]),
					__props.showClose ? (openBlock(), createBlock(unref(ElIcon), {
						key: 2,
						class: normalizeClass(unref(ns).e("closeBtn")),
						onClick: withModifiers(close, ["stop"])
					}, {
						default: withCtx(() => [createVNode(unref(Close))]),
						_: 1
					}, 8, ["class"])) : createCommentVNode("v-if", true)
				], 46, _hoisted_1), [[vShow, visible.value]])]),
				_: 3
			}, 8, ["name", "onBeforeLeave"]);
		};
	}
});

//#endregion
export { message_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=message.vue_vue_type_script_setup_true_lang.mjs.map