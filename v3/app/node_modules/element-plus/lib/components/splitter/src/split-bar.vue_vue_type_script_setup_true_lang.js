const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/splitter/src/split-bar.vue?vue&type=script&setup=true&lang.ts
var split_bar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElSplitterBar",
	__name: "split-bar",
	props: {
		index: {
			type: Number,
			required: true
		},
		layout: {
			type: String,
			values: ["horizontal", "vertical"],
			default: "horizontal"
		},
		resizable: {
			type: Boolean,
			default: true
		},
		lazy: Boolean,
		startCollapsible: Boolean,
		endCollapsible: Boolean
	},
	emits: [
		"moveStart",
		"moving",
		"moveEnd",
		"collapse"
	],
	setup(__props, { emit: __emit }) {
		const ns = require_index.useNamespace("splitter-bar");
		const props = __props;
		const emit = __emit;
		const isHorizontal = (0, vue.computed)(() => props.layout === "horizontal");
		const barWrapStyles = (0, vue.computed)(() => {
			if (isHorizontal.value) return { width: 0 };
			return { height: 0 };
		});
		const draggerStyles = (0, vue.computed)(() => {
			return {
				width: isHorizontal.value ? "16px" : "100%",
				height: isHorizontal.value ? "100%" : "16px",
				cursor: !props.resizable ? "auto" : isHorizontal.value ? "ew-resize" : "ns-resize",
				touchAction: "none"
			};
		});
		const draggerPseudoClass = (0, vue.computed)(() => {
			const prefix = ns.e("dragger");
			return {
				[`${prefix}-horizontal`]: isHorizontal.value,
				[`${prefix}-vertical`]: !isHorizontal.value,
				[`${prefix}-active`]: !!startPos.value
			};
		});
		const startPos = (0, vue.ref)(null);
		const onMousedown = (e) => {
			if (!props.resizable) return;
			startPos.value = [e.pageX, e.pageY];
			emit("moveStart", props.index);
			window.addEventListener("mouseup", onMouseUp);
			window.addEventListener("mousemove", onMouseMove);
		};
		const onTouchStart = (e) => {
			if (props.resizable && e.touches.length === 1) {
				e.preventDefault();
				const touch = e.touches[0];
				startPos.value = [touch.pageX, touch.pageY];
				emit("moveStart", props.index);
				window.addEventListener("touchend", onTouchEnd);
				window.addEventListener("touchmove", onTouchMove);
			}
		};
		const onMouseMove = (e) => {
			const { pageX, pageY } = e;
			const offsetX = pageX - startPos.value[0];
			const offsetY = pageY - startPos.value[1];
			const offset = isHorizontal.value ? offsetX : offsetY;
			emit("moving", props.index, offset);
		};
		const onTouchMove = (e) => {
			if (e.touches.length === 1) {
				e.preventDefault();
				const touch = e.touches[0];
				const offsetX = touch.pageX - startPos.value[0];
				const offsetY = touch.pageY - startPos.value[1];
				const offset = isHorizontal.value ? offsetX : offsetY;
				emit("moving", props.index, offset);
			}
		};
		const onMouseUp = () => {
			startPos.value = null;
			window.removeEventListener("mouseup", onMouseUp);
			window.removeEventListener("mousemove", onMouseMove);
			emit("moveEnd", props.index);
		};
		const onTouchEnd = () => {
			startPos.value = null;
			window.removeEventListener("touchend", onTouchEnd);
			window.removeEventListener("touchmove", onTouchMove);
			emit("moveEnd", props.index);
		};
		const StartIcon = (0, vue.computed)(() => isHorizontal.value ? _element_plus_icons_vue.ArrowLeft : _element_plus_icons_vue.ArrowUp);
		const EndIcon = (0, vue.computed)(() => isHorizontal.value ? _element_plus_icons_vue.ArrowRight : _element_plus_icons_vue.ArrowDown);
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				class: (0, vue.normalizeClass)([(0, vue.unref)(ns).b()]),
				style: (0, vue.normalizeStyle)(barWrapStyles.value)
			}, [
				__props.startCollapsible ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("collapse-icon"), (0, vue.unref)(ns).e(`${__props.layout}-collapse-icon-start`)]),
					onClick: _cache[0] || (_cache[0] = ($event) => emit("collapse", __props.index, "start"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "start-collapsible", {}, () => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(StartIcon.value), { style: {
					"width": "12px",
					"height": "12px"
				} }))])], 2)) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("div", {
					class: (0, vue.normalizeClass)([
						(0, vue.unref)(ns).e("dragger"),
						draggerPseudoClass.value,
						(0, vue.unref)(ns).is("disabled", !__props.resizable),
						(0, vue.unref)(ns).is("lazy", __props.resizable && __props.lazy)
					]),
					style: (0, vue.normalizeStyle)(draggerStyles.value),
					onMousedown,
					onTouchstart: onTouchStart
				}, null, 38),
				__props.endCollapsible ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 1,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("collapse-icon"), (0, vue.unref)(ns).e(`${__props.layout}-collapse-icon-end`)]),
					onClick: _cache[1] || (_cache[1] = ($event) => emit("collapse", __props.index, "end"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "end-collapsible", {}, () => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(EndIcon.value), { style: {
					"width": "12px",
					"height": "12px"
				} }))])], 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 6);
		};
	}
});

//#endregion
exports.default = split_bar_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=split-bar.vue_vue_type_script_setup_true_lang.js.map