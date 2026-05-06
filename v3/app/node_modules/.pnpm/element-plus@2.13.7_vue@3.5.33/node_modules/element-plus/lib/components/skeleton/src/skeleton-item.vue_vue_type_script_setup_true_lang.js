const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_skeleton_item = require('./skeleton-item.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/skeleton/src/skeleton-item.vue?vue&type=script&setup=true&lang.ts
var skeleton_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElSkeletonItem",
	__name: "skeleton-item",
	props: require_skeleton_item.skeletonItemProps,
	setup(__props) {
		const ns = require_index.useNamespace("skeleton");
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("item"), (0, vue.unref)(ns).e(__props.variant)]) }, [__props.variant === "image" ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(_element_plus_icons_vue.PictureFilled), { key: 0 })) : (0, vue.createCommentVNode)("v-if", true)], 2);
		};
	}
});

//#endregion
exports.default = skeleton_item_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=skeleton-item.vue_vue_type_script_setup_true_lang.js.map