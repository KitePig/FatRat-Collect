import { useFormDisabled } from "../../form/src/hooks/use-form-common-props.mjs";
import { uploadProps } from "./upload.mjs";
import { uploadContextKey } from "./constants.mjs";
import upload_list_default from "./upload-list2.mjs";
import upload_content_default from "./upload-content2.mjs";
import { useHandlers } from "./use-handlers.mjs";
import { computed, createBlock, createCommentVNode, createElementBlock, createSlots, createVNode, defineComponent, mergeProps, onBeforeUnmount, openBlock, provide, renderSlot, shallowRef, toRef, unref, withCtx } from "vue";

//#region ../../packages/components/upload/src/upload.vue?vue&type=script&setup=true&lang.ts
var upload_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElUpload",
	__name: "upload",
	props: uploadProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const disabled = useFormDisabled();
		const uploadRef = shallowRef();
		const { abort, submit, clearFiles, uploadFiles, handleStart, handleError, handleRemove, handleSuccess, handleProgress, revokeFileObjectURL } = useHandlers(props, uploadRef);
		const isPictureCard = computed(() => props.listType === "picture-card");
		const uploadContentProps = computed(() => ({
			...props,
			fileList: uploadFiles.value,
			onStart: handleStart,
			onProgress: handleProgress,
			onSuccess: handleSuccess,
			onError: handleError,
			onRemove: handleRemove
		}));
		onBeforeUnmount(() => {
			uploadFiles.value.forEach(revokeFileObjectURL);
		});
		provide(uploadContextKey, { accept: toRef(props, "accept") });
		__expose({
			abort,
			submit,
			clearFiles,
			handleStart,
			handleRemove
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", null, [
				isPictureCard.value && __props.showFileList ? (openBlock(), createBlock(upload_list_default, {
					key: 0,
					disabled: unref(disabled),
					"list-type": __props.listType,
					files: unref(uploadFiles),
					crossorigin: __props.crossorigin,
					"handle-preview": __props.onPreview,
					onRemove: unref(handleRemove)
				}, createSlots({
					append: withCtx(() => [createVNode(upload_content_default, mergeProps({
						ref_key: "uploadRef",
						ref: uploadRef
					}, uploadContentProps.value), {
						default: withCtx(() => [_ctx.$slots.trigger ? renderSlot(_ctx.$slots, "trigger", { key: 0 }) : createCommentVNode("v-if", true), !_ctx.$slots.trigger && _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("v-if", true)]),
						_: 3
					}, 16)]),
					_: 2
				}, [_ctx.$slots.file ? {
					name: "default",
					fn: withCtx(({ file, index }) => [renderSlot(_ctx.$slots, "file", {
						file,
						index
					})]),
					key: "0"
				} : void 0]), 1032, [
					"disabled",
					"list-type",
					"files",
					"crossorigin",
					"handle-preview",
					"onRemove"
				])) : createCommentVNode("v-if", true),
				!isPictureCard.value || isPictureCard.value && !__props.showFileList ? (openBlock(), createBlock(upload_content_default, mergeProps({
					key: 1,
					ref_key: "uploadRef",
					ref: uploadRef
				}, uploadContentProps.value), {
					default: withCtx(() => [_ctx.$slots.trigger ? renderSlot(_ctx.$slots, "trigger", { key: 0 }) : createCommentVNode("v-if", true), !_ctx.$slots.trigger && _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("v-if", true)]),
					_: 3
				}, 16)) : createCommentVNode("v-if", true),
				_ctx.$slots.trigger ? renderSlot(_ctx.$slots, "default", { key: 2 }) : createCommentVNode("v-if", true),
				renderSlot(_ctx.$slots, "tip"),
				!isPictureCard.value && __props.showFileList ? (openBlock(), createBlock(upload_list_default, {
					key: 3,
					disabled: unref(disabled),
					"list-type": __props.listType,
					files: unref(uploadFiles),
					crossorigin: __props.crossorigin,
					"handle-preview": __props.onPreview,
					onRemove: unref(handleRemove)
				}, createSlots({ _: 2 }, [_ctx.$slots.file ? {
					name: "default",
					fn: withCtx(({ file, index }) => [renderSlot(_ctx.$slots, "file", {
						file,
						index
					})]),
					key: "0"
				} : void 0]), 1032, [
					"disabled",
					"list-type",
					"files",
					"crossorigin",
					"handle-preview",
					"onRemove"
				])) : createCommentVNode("v-if", true)
			]);
		};
	}
});

//#endregion
export { upload_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=upload.vue_vue_type_script_setup_true_lang.mjs.map