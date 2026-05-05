const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../utils/dom/event.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_index = require('../../icon/index.js');
const require_index$1 = require('../../badge/index.js');
const require_use_global_config = require('../../config-provider/src/hooks/use-global-config.js');
const require_message = require('./message.js');
const require_instance = require('./instance.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/message/src/message.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["id"];
const _hoisted_2 = ["innerHTML"];
var message_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElMessage",
	__name: "message",
	props: require_message.messageProps,
	emits: require_message.messageEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const { Close } = require_icon.TypeComponents;
		const props = __props;
		const emit = __emit;
		const isStartTransition = (0, vue.ref)(false);
		const { ns, zIndex } = require_use_global_config.useGlobalComponentSettings("message");
		const { currentZIndex, nextZIndex } = zIndex;
		const messageRef = (0, vue.ref)();
		const visible = (0, vue.ref)(false);
		const height = (0, vue.ref)(0);
		let stopTimer = void 0;
		const badgeType = (0, vue.computed)(() => props.type ? props.type === "error" ? "danger" : props.type : "info");
		const typeClass = (0, vue.computed)(() => {
			const type = props.type;
			return { [ns.bm("icon", type)]: type && require_icon.TypeComponentsMap[type] };
		});
		const iconComponent = (0, vue.computed)(() => props.icon || require_icon.TypeComponentsMap[props.type] || "");
		const placement = (0, vue.computed)(() => props.placement || require_message.MESSAGE_DEFAULT_PLACEMENT);
		const lastOffset = (0, vue.computed)(() => require_instance.getLastOffset(props.id, placement.value));
		const offset = (0, vue.computed)(() => {
			return Math.max(require_instance.getOffsetOrSpace(props.id, props.offset, placement.value) + lastOffset.value, props.offset);
		});
		const bottom = (0, vue.computed)(() => height.value + offset.value);
		const horizontalClass = (0, vue.computed)(() => {
			if (placement.value.includes("left")) return ns.is("left");
			if (placement.value.includes("right")) return ns.is("right");
			return ns.is("center");
		});
		const verticalProperty = (0, vue.computed)(() => placement.value.startsWith("top") ? "top" : "bottom");
		const customStyle = (0, vue.computed)(() => ({
			[verticalProperty.value]: `${offset.value}px`,
			zIndex: currentZIndex.value
		}));
		function startTimer() {
			if (props.duration === 0) return;
			({stop: stopTimer} = (0, _vueuse_core.useTimeoutFn)(() => {
				close();
			}, props.duration));
		}
		function clearTimer() {
			stopTimer?.();
		}
		function close() {
			visible.value = false;
			(0, vue.nextTick)(() => {
				if (!isStartTransition.value) {
					props.onClose?.();
					emit("destroy");
				}
			});
		}
		function keydown(event) {
			if (require_event.getEventCode(event) === require_aria.EVENT_CODE.esc) close();
		}
		(0, vue.onMounted)(() => {
			startTimer();
			nextZIndex();
			visible.value = true;
		});
		(0, vue.watch)(() => props.repeatNum, () => {
			clearTimer();
			startTimer();
		});
		(0, _vueuse_core.useEventListener)(document, "keydown", keydown);
		(0, _vueuse_core.useResizeObserver)(messageRef, () => {
			height.value = messageRef.value.getBoundingClientRect().height;
		});
		__expose({
			visible,
			bottom,
			close
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)(vue.Transition, {
				name: (0, vue.unref)(ns).b("fade"),
				onBeforeEnter: _cache[0] || (_cache[0] = ($event) => isStartTransition.value = true),
				onBeforeLeave: __props.onClose,
				onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("destroy")),
				persisted: ""
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.withDirectives)((0, vue.createElementVNode)("div", {
					id: __props.id,
					ref_key: "messageRef",
					ref: messageRef,
					class: (0, vue.normalizeClass)([
						(0, vue.unref)(ns).b(),
						{ [(0, vue.unref)(ns).m(__props.type)]: __props.type },
						(0, vue.unref)(ns).is("closable", __props.showClose),
						(0, vue.unref)(ns).is("plain", __props.plain),
						(0, vue.unref)(ns).is("bottom", verticalProperty.value === "bottom"),
						horizontalClass.value,
						__props.customClass
					]),
					style: (0, vue.normalizeStyle)(customStyle.value),
					role: "alert",
					onMouseenter: clearTimer,
					onMouseleave: startTimer
				}, [
					__props.repeatNum > 1 ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElBadge), {
						key: 0,
						value: __props.repeatNum,
						type: badgeType.value,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("badge"))
					}, null, 8, [
						"value",
						"type",
						"class"
					])) : (0, vue.createCommentVNode)("v-if", true),
					iconComponent.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index.ElIcon), {
						key: 1,
						class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("icon"), typeClass.value])
					}, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(iconComponent.value)))]),
						_: 1
					}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true),
					(0, vue.renderSlot)(_ctx.$slots, "default", {}, () => [!__props.dangerouslyUseHTMLString ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("p", {
						key: 0,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("content"))
					}, (0, vue.toDisplayString)(__props.message), 3)) : ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 1 }, [(0, vue.createCommentVNode)(" Caution here, message could've been compromised, never use user's input as message "), (0, vue.createElementVNode)("p", {
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("content")),
						innerHTML: __props.message
					}, null, 10, _hoisted_2)], 2112))]),
					__props.showClose ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index.ElIcon), {
						key: 2,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("closeBtn")),
						onClick: (0, vue.withModifiers)(close, ["stop"])
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(Close))]),
						_: 1
					}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true)
				], 46, _hoisted_1), [[vue.vShow, visible.value]])]),
				_: 3
			}, 8, ["name", "onBeforeLeave"]);
		};
	}
});

//#endregion
exports.default = message_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=message.vue_vue_type_script_setup_true_lang.js.map