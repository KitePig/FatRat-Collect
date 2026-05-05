const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_tokens = require('./tokens.js');
const require_item = require('./item.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/steps/src/item.vue?vue&type=script&setup=true&lang.ts
var item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElStep",
	__name: "item",
	props: require_item.stepProps,
	setup(__props) {
		const props = __props;
		const ns = require_index.useNamespace("step");
		const index = (0, vue.ref)(-1);
		const lineStyle = (0, vue.ref)({});
		const internalStatus = (0, vue.ref)("");
		const parent = (0, vue.inject)(require_tokens.STEPS_INJECTION_KEY);
		const currentInstance = (0, vue.getCurrentInstance)();
		let stepDiff = 0;
		let beforeActive = 0;
		(0, vue.onMounted)(() => {
			(0, vue.watch)([
				() => parent.props.active,
				() => parent.props.processStatus,
				() => parent.props.finishStatus
			], ([active], [oldActive]) => {
				beforeActive = oldActive || 0;
				stepDiff = active - beforeActive;
				updateStatus(active);
			}, { immediate: true });
		});
		const currentStatus = (0, vue.computed)(() => {
			return props.status || internalStatus.value;
		});
		const prevInternalStatus = (0, vue.computed)(() => {
			const prevStep = parent.steps.value[index.value - 1];
			return prevStep ? prevStep.internalStatus.value : "wait";
		});
		const isCenter = (0, vue.computed)(() => {
			return parent.props.alignCenter;
		});
		const isVertical = (0, vue.computed)(() => {
			return parent.props.direction === "vertical";
		});
		const isSimple = (0, vue.computed)(() => {
			return parent.props.simple;
		});
		const stepsCount = (0, vue.computed)(() => {
			return parent.steps.value.length;
		});
		const isLast = (0, vue.computed)(() => {
			return parent.steps.value[stepsCount.value - 1]?.uid === currentInstance.uid;
		});
		const space = (0, vue.computed)(() => {
			return isSimple.value ? "" : parent.props.space;
		});
		const containerKls = (0, vue.computed)(() => {
			return [
				ns.b(),
				ns.is(isSimple.value ? "simple" : parent.props.direction),
				ns.is("flex", isLast.value && !space.value && !isCenter.value),
				ns.is("center", isCenter.value && !isVertical.value && !isSimple.value)
			];
		});
		const style = (0, vue.computed)(() => {
			const style = { flexBasis: require_types.isNumber(space.value) ? `${space.value}px` : space.value ? space.value : `${100 / (stepsCount.value - (isCenter.value ? 0 : 1))}%` };
			if (isVertical.value) return style;
			if (isLast.value) style.maxWidth = `${100 / stepsCount.value}%`;
			return style;
		});
		const setIndex = (val) => {
			index.value = val;
		};
		const calcProgress = (status) => {
			const isWait = status === "wait";
			const style = { transitionDelay: `${Math.abs(stepDiff) === 1 ? 0 : stepDiff > 0 ? (index.value + 1 - beforeActive) * 150 : -(index.value + 1 - parent.props.active) * 150}ms` };
			const step = status === parent.props.processStatus || isWait ? 0 : 100;
			style.borderWidth = step && !isSimple.value ? "1px" : 0;
			style[parent.props.direction === "vertical" ? "height" : "width"] = `${step}%`;
			lineStyle.value = style;
		};
		const updateStatus = (activeIndex) => {
			if (activeIndex > index.value) internalStatus.value = parent.props.finishStatus;
			else if (activeIndex === index.value && prevInternalStatus.value !== "error") internalStatus.value = parent.props.processStatus;
			else internalStatus.value = "wait";
			const prevChild = parent.steps.value[index.value - 1];
			if (prevChild) prevChild.calcProgress(internalStatus.value);
		};
		const stepItemState = {
			uid: currentInstance.uid,
			getVnode: () => currentInstance.vnode,
			currentStatus,
			internalStatus,
			setIndex,
			calcProgress
		};
		parent.addStep(stepItemState);
		(0, vue.onBeforeUnmount)(() => {
			parent.removeStep(stepItemState);
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				style: (0, vue.normalizeStyle)(style.value),
				class: (0, vue.normalizeClass)(containerKls.value)
			}, [
				(0, vue.createCommentVNode)(" icon & line "),
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("head"), (0, vue.unref)(ns).is(currentStatus.value)]) }, [!isSimple.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("line"))
				}, [(0, vue.createElementVNode)("i", {
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("line-inner")),
					style: (0, vue.normalizeStyle)(lineStyle.value)
				}, null, 6)], 2)) : (0, vue.createCommentVNode)("v-if", true), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("icon"), (0, vue.unref)(ns).is(__props.icon || _ctx.$slots.icon ? "icon" : "text")]) }, [(0, vue.renderSlot)(_ctx.$slots, "icon", {}, () => [__props.icon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("icon-inner"))
				}, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.icon)))]),
					_: 1
				}, 8, ["class"])) : currentStatus.value === "success" ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), {
					key: 1,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("icon-inner"), (0, vue.unref)(ns).is("status")])
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Check))]),
					_: 1
				}, 8, ["class"])) : currentStatus.value === "error" ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), {
					key: 2,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("icon-inner"), (0, vue.unref)(ns).is("status")])
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Close))]),
					_: 1
				}, 8, ["class"])) : !isSimple.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 3,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("icon-inner"))
				}, (0, vue.toDisplayString)(index.value + 1), 3)) : (0, vue.createCommentVNode)("v-if", true)])], 2)], 2),
				(0, vue.createCommentVNode)(" title & description "),
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("main")) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("title"), (0, vue.unref)(ns).is(currentStatus.value)]) }, [(0, vue.renderSlot)(_ctx.$slots, "title", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.title), 1)])], 2), isSimple.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("arrow"))
				}, null, 2)) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 1,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("description"), (0, vue.unref)(ns).is(currentStatus.value)])
				}, [(0, vue.renderSlot)(_ctx.$slots, "description", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.description), 1)])], 2))], 2)
			], 6);
		};
	}
});

//#endregion
exports.default = item_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=item.vue_vue_type_script_setup_true_lang.js.map