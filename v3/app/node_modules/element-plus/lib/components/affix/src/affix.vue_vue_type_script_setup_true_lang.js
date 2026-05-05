const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_error = require('../../../utils/error.js');
const require_style = require('../../../utils/dom/style.js');
const require_scroll = require('../../../utils/dom/scroll.js');
const require_index = require('../../teleport/index.js');
const require_affix = require('./affix.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/affix/src/affix.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "ElAffix";
var affix_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	__name: "affix",
	props: require_affix.affixProps,
	emits: require_affix.affixEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index$1.useNamespace("affix");
		const target = (0, vue.shallowRef)();
		const root = (0, vue.shallowRef)();
		const scrollContainer = (0, vue.shallowRef)();
		const { height: windowHeight } = (0, _vueuse_core.useWindowSize)();
		const { height: rootHeight, width: rootWidth, top: rootTop, bottom: rootBottom, left: rootLeft, update: updateRoot } = (0, _vueuse_core.useElementBounding)(root, { windowScroll: false });
		const targetRect = (0, _vueuse_core.useElementBounding)(target);
		const fixed = (0, vue.ref)(false);
		const scrollTop = (0, vue.ref)(0);
		const transform = (0, vue.ref)(0);
		const teleportDisabled = (0, vue.computed)(() => {
			return !props.teleported || !fixed.value;
		});
		const rootStyle = (0, vue.computed)(() => {
			return {
				display: "flow-root",
				height: fixed.value ? `${rootHeight.value}px` : "",
				width: fixed.value ? `${rootWidth.value}px` : ""
			};
		});
		const affixStyle = (0, vue.computed)(() => {
			if (!fixed.value) return {};
			const offset = require_style.addUnit(props.offset);
			return {
				height: `${rootHeight.value}px`,
				width: `${rootWidth.value}px`,
				top: props.position === "top" ? offset : "",
				bottom: props.position === "bottom" ? offset : "",
				left: props.teleported ? `${rootLeft.value}px` : "",
				transform: transform.value ? `translateY(${transform.value}px)` : "",
				zIndex: props.zIndex
			};
		});
		const update = () => {
			if (!scrollContainer.value) return;
			scrollTop.value = scrollContainer.value instanceof Window ? document.documentElement.scrollTop : scrollContainer.value.scrollTop || 0;
			const { position, target, offset } = props;
			const rootHeightOffset = offset + rootHeight.value;
			if (position === "top") if (target) {
				const difference = targetRect.bottom.value - rootHeightOffset;
				fixed.value = offset > rootTop.value && targetRect.bottom.value > 0;
				transform.value = difference < 0 ? difference : 0;
			} else fixed.value = offset > rootTop.value;
			else if (target) {
				const difference = windowHeight.value - targetRect.top.value - rootHeightOffset;
				fixed.value = windowHeight.value - offset < rootBottom.value && windowHeight.value > targetRect.top.value;
				transform.value = difference < 0 ? -difference : 0;
			} else fixed.value = windowHeight.value - offset < rootBottom.value;
		};
		const updateRootRect = async () => {
			if (!fixed.value) {
				updateRoot();
				return;
			}
			fixed.value = false;
			await (0, vue.nextTick)();
			updateRoot();
			fixed.value = true;
		};
		const handleScroll = async () => {
			updateRoot();
			await (0, vue.nextTick)();
			emit("scroll", {
				scrollTop: scrollTop.value,
				fixed: fixed.value
			});
		};
		(0, vue.watch)(fixed, (val) => emit(require_event.CHANGE_EVENT, val));
		(0, vue.onMounted)(() => {
			if (props.target) {
				target.value = document.querySelector(props.target) ?? void 0;
				if (!target.value) require_error.throwError(COMPONENT_NAME, `Target does not exist: ${props.target}`);
			} else target.value = document.documentElement;
			scrollContainer.value = require_scroll.getScrollContainer(root.value, true);
			updateRoot();
		});
		(0, vue.onActivated)(() => {
			(0, vue.nextTick)(updateRootRect);
		});
		(0, vue.onDeactivated)(() => {
			fixed.value = false;
		});
		(0, _vueuse_core.useEventListener)(scrollContainer, "scroll", handleScroll);
		(0, vue.watchEffect)(update);
		__expose({
			update,
			updateRoot: updateRootRect
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "root",
				ref: root,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()),
				style: (0, vue.normalizeStyle)(rootStyle.value)
			}, [(0, vue.createVNode)((0, vue.unref)(require_index.ElTeleport), {
				disabled: teleportDisabled.value,
				to: __props.appendTo
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
					class: (0, vue.normalizeClass)({ [(0, vue.unref)(ns).m("fixed")]: fixed.value }),
					style: (0, vue.normalizeStyle)(affixStyle.value)
				}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 6)]),
				_: 3
			}, 8, ["disabled", "to"])], 6);
		};
	}
});

//#endregion
exports.default = affix_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=affix.vue_vue_type_script_setup_true_lang.js.map