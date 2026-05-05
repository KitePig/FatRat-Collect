const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_upload = require('./upload.js');
const require_constants = require('./constants.js');
const require_upload_list = require('./upload-list2.js');
const require_upload_content = require('./upload-content2.js');
const require_use_handlers = require('./use-handlers.js');
let vue = require("vue");

//#region ../../packages/components/upload/src/upload.vue?vue&type=script&setup=true&lang.ts
var upload_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElUpload",
	__name: "upload",
	props: require_upload.uploadProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const disabled = require_use_form_common_props.useFormDisabled();
		const uploadRef = (0, vue.shallowRef)();
		const { abort, submit, clearFiles, uploadFiles, handleStart, handleError, handleRemove, handleSuccess, handleProgress, revokeFileObjectURL } = require_use_handlers.useHandlers(props, uploadRef);
		const isPictureCard = (0, vue.computed)(() => props.listType === "picture-card");
		const uploadContentProps = (0, vue.computed)(() => ({
			...props,
			fileList: uploadFiles.value,
			onStart: handleStart,
			onProgress: handleProgress,
			onSuccess: handleSuccess,
			onError: handleError,
			onRemove: handleRemove
		}));
		(0, vue.onBeforeUnmount)(() => {
			uploadFiles.value.forEach(revokeFileObjectURL);
		});
		(0, vue.provide)(require_constants.uploadContextKey, { accept: (0, vue.toRef)(props, "accept") });
		__expose({
			abort,
			submit,
			clearFiles,
			handleStart,
			handleRemove
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", null, [
				isPictureCard.value && __props.showFileList ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_upload_list.default, {
					key: 0,
					disabled: (0, vue.unref)(disabled),
					"list-type": __props.listType,
					files: (0, vue.unref)(uploadFiles),
					crossorigin: __props.crossorigin,
					"handle-preview": __props.onPreview,
					onRemove: (0, vue.unref)(handleRemove)
				}, (0, vue.createSlots)({
					append: (0, vue.withCtx)(() => [(0, vue.createVNode)(require_upload_content.default, (0, vue.mergeProps)({
						ref_key: "uploadRef",
						ref: uploadRef
					}, uploadContentProps.value), {
						default: (0, vue.withCtx)(() => [_ctx.$slots.trigger ? (0, vue.renderSlot)(_ctx.$slots, "trigger", { key: 0 }) : (0, vue.createCommentVNode)("v-if", true), !_ctx.$slots.trigger && _ctx.$slots.default ? (0, vue.renderSlot)(_ctx.$slots, "default", { key: 1 }) : (0, vue.createCommentVNode)("v-if", true)]),
						_: 3
					}, 16)]),
					_: 2
				}, [_ctx.$slots.file ? {
					name: "default",
					fn: (0, vue.withCtx)(({ file, index }) => [(0, vue.renderSlot)(_ctx.$slots, "file", {
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
				])) : (0, vue.createCommentVNode)("v-if", true),
				!isPictureCard.value || isPictureCard.value && !__props.showFileList ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_upload_content.default, (0, vue.mergeProps)({
					key: 1,
					ref_key: "uploadRef",
					ref: uploadRef
				}, uploadContentProps.value), {
					default: (0, vue.withCtx)(() => [_ctx.$slots.trigger ? (0, vue.renderSlot)(_ctx.$slots, "trigger", { key: 0 }) : (0, vue.createCommentVNode)("v-if", true), !_ctx.$slots.trigger && _ctx.$slots.default ? (0, vue.renderSlot)(_ctx.$slots, "default", { key: 1 }) : (0, vue.createCommentVNode)("v-if", true)]),
					_: 3
				}, 16)) : (0, vue.createCommentVNode)("v-if", true),
				_ctx.$slots.trigger ? (0, vue.renderSlot)(_ctx.$slots, "default", { key: 2 }) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.renderSlot)(_ctx.$slots, "tip"),
				!isPictureCard.value && __props.showFileList ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_upload_list.default, {
					key: 3,
					disabled: (0, vue.unref)(disabled),
					"list-type": __props.listType,
					files: (0, vue.unref)(uploadFiles),
					crossorigin: __props.crossorigin,
					"handle-preview": __props.onPreview,
					onRemove: (0, vue.unref)(handleRemove)
				}, (0, vue.createSlots)({ _: 2 }, [_ctx.$slots.file ? {
					name: "default",
					fn: (0, vue.withCtx)(({ file, index }) => [(0, vue.renderSlot)(_ctx.$slots, "file", {
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
				])) : (0, vue.createCommentVNode)("v-if", true)
			]);
		};
	}
});

//#endregion
exports.default = upload_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=upload.vue_vue_type_script_setup_true_lang.js.map