import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { useFormDisabled } from "../../form/src/hooks/use-form-common-props.mjs";
import { ElProgress } from "../../progress/index.mjs";
import { uploadListEmits, uploadListProps } from "./upload-list.mjs";
import { Check, CircleCheck, Close, Delete, Document, ZoomIn } from "@element-plus/icons-vue";
import { Fragment, TransitionGroup, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, ref, renderList, renderSlot, toDisplayString, unref, withCtx, withKeys, withModifiers } from "vue";

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
var upload_list_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElUploadList",
	__name: "upload-list",
	props: uploadListProps,
	emits: uploadListEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { t } = useLocale();
		const nsUpload = useNamespace("upload");
		const nsIcon = useNamespace("icon");
		const nsList = useNamespace("list");
		const disabled = useFormDisabled();
		const focusing = ref(false);
		const containerKls = computed(() => [
			nsUpload.b("list"),
			nsUpload.bm("list", props.listType),
			nsUpload.is("disabled", disabled.value)
		]);
		const handleRemove = (file) => {
			emit("remove", file);
		};
		return (_ctx, _cache) => {
			return openBlock(), createBlock(TransitionGroup, {
				tag: "ul",
				class: normalizeClass(containerKls.value),
				name: unref(nsList).b()
			}, {
				default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.files, (file, index) => {
					return openBlock(), createElementBlock("li", {
						key: file.uid || file.name,
						class: normalizeClass([
							unref(nsUpload).be("list", "item"),
							unref(nsUpload).is(file.status),
							{ focusing: focusing.value }
						]),
						tabindex: unref(disabled) ? void 0 : 0,
						"aria-disabled": unref(disabled),
						role: "button",
						onKeydown: withKeys(($event) => !unref(disabled) && handleRemove(file), ["delete"]),
						onFocus: _cache[0] || (_cache[0] = ($event) => focusing.value = true),
						onBlur: _cache[1] || (_cache[1] = ($event) => focusing.value = false),
						onClick: _cache[2] || (_cache[2] = ($event) => focusing.value = false)
					}, [renderSlot(_ctx.$slots, "default", {
						file,
						index
					}, () => [
						__props.listType === "picture" || file.status !== "uploading" && __props.listType === "picture-card" ? (openBlock(), createElementBlock("img", {
							key: 0,
							class: normalizeClass(unref(nsUpload).be("list", "item-thumbnail")),
							src: file.url,
							crossorigin: __props.crossorigin,
							alt: ""
						}, null, 10, _hoisted_2)) : createCommentVNode("v-if", true),
						file.status === "uploading" || __props.listType !== "picture-card" ? (openBlock(), createElementBlock("div", {
							key: 1,
							class: normalizeClass(unref(nsUpload).be("list", "item-info"))
						}, [createElementVNode("a", {
							class: normalizeClass(unref(nsUpload).be("list", "item-name")),
							onClick: withModifiers(($event) => __props.handlePreview(file), ["prevent"])
						}, [createVNode(unref(ElIcon), { class: normalizeClass(unref(nsIcon).m("document")) }, {
							default: withCtx(() => [createVNode(unref(Document))]),
							_: 1
						}, 8, ["class"]), createElementVNode("span", {
							class: normalizeClass(unref(nsUpload).be("list", "item-file-name")),
							title: file.name
						}, toDisplayString(file.name), 11, _hoisted_4)], 10, _hoisted_3), file.status === "uploading" ? (openBlock(), createBlock(unref(ElProgress), {
							key: 0,
							type: __props.listType === "picture-card" ? "circle" : "line",
							"stroke-width": __props.listType === "picture-card" ? 6 : 2,
							percentage: Number(file.percentage),
							style: normalizeStyle(__props.listType === "picture-card" ? "" : "margin-top: 0.5rem")
						}, null, 8, [
							"type",
							"stroke-width",
							"percentage",
							"style"
						])) : createCommentVNode("v-if", true)], 2)) : createCommentVNode("v-if", true),
						createElementVNode("label", { class: normalizeClass(unref(nsUpload).be("list", "item-status-label")) }, [__props.listType === "text" ? (openBlock(), createBlock(unref(ElIcon), {
							key: 0,
							class: normalizeClass([unref(nsIcon).m("upload-success"), unref(nsIcon).m("circle-check")])
						}, {
							default: withCtx(() => [createVNode(unref(CircleCheck))]),
							_: 1
						}, 8, ["class"])) : ["picture-card", "picture"].includes(__props.listType) ? (openBlock(), createBlock(unref(ElIcon), {
							key: 1,
							class: normalizeClass([unref(nsIcon).m("upload-success"), unref(nsIcon).m("check")])
						}, {
							default: withCtx(() => [createVNode(unref(Check))]),
							_: 1
						}, 8, ["class"])) : createCommentVNode("v-if", true)], 2),
						!unref(disabled) ? (openBlock(), createBlock(unref(ElIcon), {
							key: 2,
							class: normalizeClass(unref(nsIcon).m("close")),
							"aria-label": unref(t)("el.upload.delete"),
							role: "button",
							tabindex: "0",
							onClick: ($event) => handleRemove(file),
							onKeydown: withKeys(withModifiers(($event) => handleRemove(file), ["prevent"]), ["enter", "space"])
						}, {
							default: withCtx(() => [createVNode(unref(Close))]),
							_: 1
						}, 8, [
							"class",
							"aria-label",
							"onClick",
							"onKeydown"
						])) : createCommentVNode("v-if", true),
						!unref(disabled) ? (openBlock(), createElementBlock("i", {
							key: 3,
							class: normalizeClass(unref(nsIcon).m("close-tip"))
						}, toDisplayString(unref(t)("el.upload.deleteTip")), 3)) : createCommentVNode("v-if", true),
						__props.listType === "picture-card" ? (openBlock(), createElementBlock("span", {
							key: 4,
							class: normalizeClass(unref(nsUpload).be("list", "item-actions"))
						}, [createElementVNode("span", {
							class: normalizeClass(unref(nsUpload).be("list", "item-preview")),
							onClick: ($event) => __props.handlePreview(file)
						}, [createVNode(unref(ElIcon), { class: normalizeClass(unref(nsIcon).m("zoom-in")) }, {
							default: withCtx(() => [createVNode(unref(ZoomIn))]),
							_: 1
						}, 8, ["class"])], 10, _hoisted_5), !unref(disabled) ? (openBlock(), createElementBlock("span", {
							key: 0,
							class: normalizeClass(unref(nsUpload).be("list", "item-delete")),
							onClick: ($event) => handleRemove(file)
						}, [createVNode(unref(ElIcon), { class: normalizeClass(unref(nsIcon).m("delete")) }, {
							default: withCtx(() => [createVNode(unref(Delete))]),
							_: 1
						}, 8, ["class"])], 10, _hoisted_6)) : createCommentVNode("v-if", true)], 2)) : createCommentVNode("v-if", true)
					])], 42, _hoisted_1);
				}), 128)), renderSlot(_ctx.$slots, "append")]),
				_: 3
			}, 8, ["class", "name"]);
		};
	}
});

//#endregion
export { upload_list_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=upload-list.vue_vue_type_script_setup_true_lang.mjs.map