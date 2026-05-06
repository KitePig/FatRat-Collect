const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../icon/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_index$3 = require('../../progress/index.js');
const require_upload_list = require('./upload-list.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/upload/src/upload-list.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"tabindex",
	"aria-disabled",
	"onKeydown"
];
const _hoisted_2 = ["src", "crossorigin"];
const _hoisted_3 = ["onClick"];
const _hoisted_4 = ["title"];
const _hoisted_5 = ["onClick"];
const _hoisted_6 = ["onClick"];
var upload_list_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElUploadList",
	__name: "upload-list",
	props: require_upload_list.uploadListProps,
	emits: require_upload_list.uploadListEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { t } = require_index.useLocale();
		const nsUpload = require_index$1.useNamespace("upload");
		const nsIcon = require_index$1.useNamespace("icon");
		const nsList = require_index$1.useNamespace("list");
		const disabled = require_use_form_common_props.useFormDisabled();
		const focusing = (0, vue.ref)(false);
		const containerKls = (0, vue.computed)(() => [
			nsUpload.b("list"),
			nsUpload.bm("list", props.listType),
			nsUpload.is("disabled", disabled.value)
		]);
		const handleRemove = (file) => {
			emit("remove", file);
		};
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)(vue.TransitionGroup, {
				tag: "ul",
				class: (0, vue.normalizeClass)(containerKls.value),
				name: (0, vue.unref)(nsList).b()
			}, {
				default: (0, vue.withCtx)(() => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.files, (file, index) => {
					return (0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
						key: file.uid || file.name,
						class: (0, vue.normalizeClass)([
							(0, vue.unref)(nsUpload).be("list", "item"),
							(0, vue.unref)(nsUpload).is(file.status),
							{ focusing: focusing.value }
						]),
						tabindex: (0, vue.unref)(disabled) ? void 0 : 0,
						"aria-disabled": (0, vue.unref)(disabled),
						role: "button",
						onKeydown: (0, vue.withKeys)(($event) => !(0, vue.unref)(disabled) && handleRemove(file), ["delete"]),
						onFocus: _cache[0] || (_cache[0] = ($event) => focusing.value = true),
						onBlur: _cache[1] || (_cache[1] = ($event) => focusing.value = false),
						onClick: _cache[2] || (_cache[2] = ($event) => focusing.value = false)
					}, [(0, vue.renderSlot)(_ctx.$slots, "default", {
						file,
						index
					}, () => [
						__props.listType === "picture" || file.status !== "uploading" && __props.listType === "picture-card" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("img", {
							key: 0,
							class: (0, vue.normalizeClass)((0, vue.unref)(nsUpload).be("list", "item-thumbnail")),
							src: file.url,
							crossorigin: __props.crossorigin,
							alt: ""
						}, null, 10, _hoisted_2)) : (0, vue.createCommentVNode)("v-if", true),
						file.status === "uploading" || __props.listType !== "picture-card" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
							key: 1,
							class: (0, vue.normalizeClass)((0, vue.unref)(nsUpload).be("list", "item-info"))
						}, [(0, vue.createElementVNode)("a", {
							class: (0, vue.normalizeClass)((0, vue.unref)(nsUpload).be("list", "item-name")),
							onClick: (0, vue.withModifiers)(($event) => __props.handlePreview(file), ["prevent"])
						}, [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), { class: (0, vue.normalizeClass)((0, vue.unref)(nsIcon).m("document")) }, {
							default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Document))]),
							_: 1
						}, 8, ["class"]), (0, vue.createElementVNode)("span", {
							class: (0, vue.normalizeClass)((0, vue.unref)(nsUpload).be("list", "item-file-name")),
							title: file.name
						}, (0, vue.toDisplayString)(file.name), 11, _hoisted_4)], 10, _hoisted_3), file.status === "uploading" ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$3.ElProgress), {
							key: 0,
							type: __props.listType === "picture-card" ? "circle" : "line",
							"stroke-width": __props.listType === "picture-card" ? 6 : 2,
							percentage: Number(file.percentage),
							style: (0, vue.normalizeStyle)(__props.listType === "picture-card" ? "" : "margin-top: 0.5rem")
						}, null, 8, [
							"type",
							"stroke-width",
							"percentage",
							"style"
						])) : (0, vue.createCommentVNode)("v-if", true)], 2)) : (0, vue.createCommentVNode)("v-if", true),
						(0, vue.createElementVNode)("label", { class: (0, vue.normalizeClass)((0, vue.unref)(nsUpload).be("list", "item-status-label")) }, [__props.listType === "text" ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElIcon), {
							key: 0,
							class: (0, vue.normalizeClass)([(0, vue.unref)(nsIcon).m("upload-success"), (0, vue.unref)(nsIcon).m("circle-check")])
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.CircleCheck))]),
							_: 1
						}, 8, ["class"])) : ["picture-card", "picture"].includes(__props.listType) ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElIcon), {
							key: 1,
							class: (0, vue.normalizeClass)([(0, vue.unref)(nsIcon).m("upload-success"), (0, vue.unref)(nsIcon).m("check")])
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Check))]),
							_: 1
						}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true)], 2),
						!(0, vue.unref)(disabled) ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElIcon), {
							key: 2,
							class: (0, vue.normalizeClass)((0, vue.unref)(nsIcon).m("close")),
							"aria-label": (0, vue.unref)(t)("el.upload.delete"),
							role: "button",
							tabindex: "0",
							onClick: ($event) => handleRemove(file),
							onKeydown: (0, vue.withKeys)((0, vue.withModifiers)(($event) => handleRemove(file), ["prevent"]), ["enter", "space"])
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Close))]),
							_: 1
						}, 8, [
							"class",
							"aria-label",
							"onClick",
							"onKeydown"
						])) : (0, vue.createCommentVNode)("v-if", true),
						!(0, vue.unref)(disabled) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("i", {
							key: 3,
							class: (0, vue.normalizeClass)((0, vue.unref)(nsIcon).m("close-tip"))
						}, (0, vue.toDisplayString)((0, vue.unref)(t)("el.upload.deleteTip")), 3)) : (0, vue.createCommentVNode)("v-if", true),
						__props.listType === "picture-card" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
							key: 4,
							class: (0, vue.normalizeClass)((0, vue.unref)(nsUpload).be("list", "item-actions"))
						}, [(0, vue.createElementVNode)("span", {
							class: (0, vue.normalizeClass)((0, vue.unref)(nsUpload).be("list", "item-preview")),
							onClick: ($event) => __props.handlePreview(file)
						}, [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), { class: (0, vue.normalizeClass)((0, vue.unref)(nsIcon).m("zoom-in")) }, {
							default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ZoomIn))]),
							_: 1
						}, 8, ["class"])], 10, _hoisted_5), !(0, vue.unref)(disabled) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
							key: 0,
							class: (0, vue.normalizeClass)((0, vue.unref)(nsUpload).be("list", "item-delete")),
							onClick: ($event) => handleRemove(file)
						}, [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), { class: (0, vue.normalizeClass)((0, vue.unref)(nsIcon).m("delete")) }, {
							default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Delete))]),
							_: 1
						}, 8, ["class"])], 10, _hoisted_6)) : (0, vue.createCommentVNode)("v-if", true)], 2)) : (0, vue.createCommentVNode)("v-if", true)
					])], 42, _hoisted_1);
				}), 128)), (0, vue.renderSlot)(_ctx.$slots, "append")]),
				_: 3
			}, 8, ["class", "name"]);
		};
	}
});

//#endregion
exports.default = upload_list_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=upload-list.vue_vue_type_script_setup_true_lang.js.map