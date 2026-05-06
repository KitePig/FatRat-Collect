const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../utils/dom/event.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_index = require('../../icon/index.js');
const require_use_global_config = require('../../config-provider/src/hooks/use-global-config.js');
const require_notification = require('./notification.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/notification/src/notification.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["id"];
const _hoisted_2 = ["textContent"];
const _hoisted_3 = { key: 0 };
const _hoisted_4 = ["innerHTML"];
var notification_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElNotification",
	__name: "notification",
	props: require_notification.notificationProps,
	emits: require_notification.notificationEmits,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { ns, zIndex } = require_use_global_config.useGlobalComponentSettings("notification");
		const { nextZIndex, currentZIndex } = zIndex;
		const visible = (0, vue.ref)(false);
		let timer = void 0;
		const typeClass = (0, vue.computed)(() => {
			const type = props.type;
			return type && require_icon.TypeComponentsMap[props.type] ? ns.m(type) : "";
		});
		const iconComponent = (0, vue.computed)(() => {
			if (!props.type) return props.icon;
			return require_icon.TypeComponentsMap[props.type] || props.icon;
		});
		const horizontalClass = (0, vue.computed)(() => props.position.endsWith("right") ? "right" : "left");
		const verticalProperty = (0, vue.computed)(() => props.position.startsWith("top") ? "top" : "bottom");
		const positionStyle = (0, vue.computed)(() => {
			return {
				[verticalProperty.value]: `${props.offset}px`,
				zIndex: props.zIndex ?? currentZIndex.value
			};
		});
		function startTimer() {
			if (props.duration > 0) ({stop: timer} = (0, _vueuse_core.useTimeoutFn)(() => {
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
			switch (require_event.getEventCode(event)) {
				case require_aria.EVENT_CODE.delete:
				case require_aria.EVENT_CODE.backspace:
					clearTimer();
					break;
				case require_aria.EVENT_CODE.esc:
					if (visible.value) close();
					break;
				default:
					startTimer();
					break;
			}
		}
		(0, vue.onMounted)(() => {
			startTimer();
			nextZIndex();
			visible.value = true;
		});
		(0, _vueuse_core.useEventListener)(document, "keydown", onKeydown);
		__expose({
			visible,
			close
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)(vue.Transition, {
				name: (0, vue.unref)(ns).b("fade"),
				onBeforeLeave: __props.onClose,
				onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("destroy")),
				persisted: ""
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.withDirectives)((0, vue.createElementVNode)("div", {
					id: __props.id,
					class: (0, vue.normalizeClass)([
						(0, vue.unref)(ns).b(),
						__props.customClass,
						horizontalClass.value
					]),
					style: (0, vue.normalizeStyle)(positionStyle.value),
					role: "alert",
					onMouseenter: clearTimer,
					onMouseleave: startTimer,
					onClick: _cache[0] || (_cache[0] = (...args) => __props.onClick && __props.onClick(...args))
				}, [iconComponent.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index.ElIcon), {
					key: 0,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("icon"), typeClass.value])
				}, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(iconComponent.value)))]),
					_: 1
				}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("group")) }, [
					(0, vue.createElementVNode)("h2", {
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("title")),
						textContent: (0, vue.toDisplayString)(__props.title)
					}, null, 10, _hoisted_2),
					(0, vue.withDirectives)((0, vue.createElementVNode)("div", {
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("content")),
						style: (0, vue.normalizeStyle)(!!__props.title ? void 0 : { margin: 0 })
					}, [(0, vue.renderSlot)(_ctx.$slots, "default", {}, () => [!__props.dangerouslyUseHTMLString ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("p", _hoisted_3, (0, vue.toDisplayString)(__props.message), 1)) : ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 1 }, [(0, vue.createCommentVNode)(" Caution here, message could've been compromised, never use user's input as message "), (0, vue.createElementVNode)("p", { innerHTML: __props.message }, null, 8, _hoisted_4)], 2112))])], 6), [[vue.vShow, __props.message]]),
					__props.showClose ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index.ElIcon), {
						key: 0,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("closeBtn")),
						onClick: (0, vue.withModifiers)(close, ["stop"])
					}, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.closeIcon)))]),
						_: 1
					}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true)
				], 2)], 46, _hoisted_1), [[vue.vShow, visible.value]])]),
				_: 3
			}, 8, ["name", "onBeforeLeave"]);
		};
	}
});

//#endregion
exports.default = notification_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=notification.vue_vue_type_script_setup_true_lang.js.map