const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_util = require('./util.js');
const require_thumb = require('./thumb.js');
const require_constants = require('./constants.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/scrollbar/src/thumb.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "Thumb";
var thumb_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	__name: "thumb",
	props: require_thumb.thumbProps,
	setup(__props) {
		const props = __props;
		const scrollbar = (0, vue.inject)(require_constants.scrollbarContextKey);
		const ns = require_index.useNamespace("scrollbar");
		if (!scrollbar) require_error.throwError(COMPONENT_NAME, "can not inject scrollbar context");
		const instance = (0, vue.ref)();
		const thumb = (0, vue.ref)();
		const thumbState = (0, vue.ref)({});
		const visible = (0, vue.ref)(false);
		let cursorDown = false;
		let cursorLeave = false;
		let baseScrollHeight = 0;
		let baseScrollWidth = 0;
		let originalOnSelectStart = _vueuse_core.isClient ? document.onselectstart : null;
		const bar = (0, vue.computed)(() => require_util.BAR_MAP[props.vertical ? "vertical" : "horizontal"]);
		const thumbStyle = (0, vue.computed)(() => require_util.renderThumbStyle({
			size: props.size,
			move: props.move,
			bar: bar.value
		}));
		const offsetRatio = (0, vue.computed)(() => instance.value[bar.value.offset] ** 2 / scrollbar.wrapElement[bar.value.scrollSize] / props.ratio / thumb.value[bar.value.offset]);
		const clickThumbHandler = (e) => {
			e.stopPropagation();
			if (e.ctrlKey || [1, 2].includes(e.button)) return;
			window.getSelection()?.removeAllRanges();
			startDrag(e);
			const el = e.currentTarget;
			if (!el) return;
			thumbState.value[bar.value.axis] = el[bar.value.offset] - (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction]);
		};
		const clickTrackHandler = (e) => {
			if (!thumb.value || !instance.value || !scrollbar.wrapElement) return;
			const thumbPositionPercentage = (Math.abs(e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) - thumb.value[bar.value.offset] / 2) * 100 * offsetRatio.value / instance.value[bar.value.offset];
			scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize] / 100;
		};
		const startDrag = (e) => {
			e.stopImmediatePropagation();
			cursorDown = true;
			baseScrollHeight = scrollbar.wrapElement.scrollHeight;
			baseScrollWidth = scrollbar.wrapElement.scrollWidth;
			document.addEventListener("mousemove", mouseMoveDocumentHandler);
			document.addEventListener("mouseup", mouseUpDocumentHandler);
			originalOnSelectStart = document.onselectstart;
			document.onselectstart = () => false;
		};
		const mouseMoveDocumentHandler = (e) => {
			if (!instance.value || !thumb.value) return;
			if (cursorDown === false) return;
			const prevPage = thumbState.value[bar.value.axis];
			if (!prevPage) return;
			const thumbPositionPercentage = ((instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1 - (thumb.value[bar.value.offset] - prevPage)) * 100 * offsetRatio.value / instance.value[bar.value.offset];
			if (bar.value.scroll === "scrollLeft") scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * baseScrollWidth / 100;
			else scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * baseScrollHeight / 100;
		};
		const mouseUpDocumentHandler = () => {
			cursorDown = false;
			thumbState.value[bar.value.axis] = 0;
			document.removeEventListener("mousemove", mouseMoveDocumentHandler);
			document.removeEventListener("mouseup", mouseUpDocumentHandler);
			restoreOnselectstart();
			if (cursorLeave) visible.value = false;
		};
		const mouseMoveScrollbarHandler = () => {
			cursorLeave = false;
			visible.value = !!props.size;
		};
		const mouseLeaveScrollbarHandler = () => {
			cursorLeave = true;
			visible.value = cursorDown;
		};
		(0, vue.onBeforeUnmount)(() => {
			restoreOnselectstart();
			document.removeEventListener("mouseup", mouseUpDocumentHandler);
		});
		const restoreOnselectstart = () => {
			if (document.onselectstart !== originalOnSelectStart) document.onselectstart = originalOnSelectStart;
		};
		(0, _vueuse_core.useEventListener)((0, vue.toRef)(scrollbar, "scrollbarElement"), "mousemove", mouseMoveScrollbarHandler);
		(0, _vueuse_core.useEventListener)((0, vue.toRef)(scrollbar, "scrollbarElement"), "mouseleave", mouseLeaveScrollbarHandler);
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)(vue.Transition, {
				name: (0, vue.unref)(ns).b("fade"),
				persisted: ""
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.withDirectives)((0, vue.createElementVNode)("div", {
					ref_key: "instance",
					ref: instance,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("bar"), (0, vue.unref)(ns).is(bar.value.key)]),
					onMousedown: clickTrackHandler,
					onClick: _cache[0] || (_cache[0] = (0, vue.withModifiers)(() => {}, ["stop"]))
				}, [(0, vue.createElementVNode)("div", {
					ref_key: "thumb",
					ref: thumb,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("thumb")),
					style: (0, vue.normalizeStyle)(thumbStyle.value),
					onMousedown: clickThumbHandler
				}, null, 38)], 34), [[vue.vShow, __props.always || visible.value]])]),
				_: 1
			}, 8, ["name"]);
		};
	}
});

//#endregion
exports.default = thumb_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=thumb.vue_vue_type_script_setup_true_lang.js.map