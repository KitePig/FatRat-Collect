const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_bar = require('./bar.js');
const require_util = require('./util.js');
const require_constants = require('./constants.js');
const require_thumb = require('./thumb2.js');
let vue = require("vue");

//#region ../../packages/components/scrollbar/src/bar.vue?vue&type=script&setup=true&lang.ts
var bar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	__name: "bar",
	props: require_bar.barProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const scrollbar = (0, vue.inject)(require_constants.scrollbarContextKey);
		const moveX = (0, vue.ref)(0);
		const moveY = (0, vue.ref)(0);
		const sizeWidth = (0, vue.ref)("");
		const sizeHeight = (0, vue.ref)("");
		const ratioY = (0, vue.ref)(1);
		const ratioX = (0, vue.ref)(1);
		const handleScroll = (wrap) => {
			if (wrap) {
				const offsetHeight = wrap.offsetHeight - require_util.GAP;
				const offsetWidth = wrap.offsetWidth - require_util.GAP;
				moveY.value = wrap.scrollTop * 100 / offsetHeight * ratioY.value;
				moveX.value = wrap.scrollLeft * 100 / offsetWidth * ratioX.value;
			}
		};
		const update = () => {
			const wrap = scrollbar?.wrapElement;
			if (!wrap) return;
			const offsetHeight = wrap.offsetHeight - require_util.GAP;
			const offsetWidth = wrap.offsetWidth - require_util.GAP;
			const originalHeight = offsetHeight ** 2 / wrap.scrollHeight;
			const originalWidth = offsetWidth ** 2 / wrap.scrollWidth;
			const height = Math.max(originalHeight, props.minSize);
			const width = Math.max(originalWidth, props.minSize);
			ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height));
			ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width));
			sizeHeight.value = height + require_util.GAP < offsetHeight ? `${height}px` : "";
			sizeWidth.value = width + require_util.GAP < offsetWidth ? `${width}px` : "";
		};
		__expose({
			handleScroll,
			update
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [(0, vue.createVNode)(require_thumb.default, {
				move: moveX.value,
				ratio: ratioX.value,
				size: sizeWidth.value,
				always: __props.always
			}, null, 8, [
				"move",
				"ratio",
				"size",
				"always"
			]), (0, vue.createVNode)(require_thumb.default, {
				move: moveY.value,
				ratio: ratioY.value,
				size: sizeHeight.value,
				vertical: "",
				always: __props.always
			}, null, 8, [
				"move",
				"ratio",
				"size",
				"always"
			])], 64);
		};
	}
});

//#endregion
exports.default = bar_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=bar.vue_vue_type_script_setup_true_lang.js.map