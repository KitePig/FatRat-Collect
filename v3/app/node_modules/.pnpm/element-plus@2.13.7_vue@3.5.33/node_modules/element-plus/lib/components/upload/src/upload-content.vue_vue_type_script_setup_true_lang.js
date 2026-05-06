const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_objects = require('../../../utils/objects.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_upload = require('./upload.js');
const require_upload_content = require('./upload-content.js');
const require_upload_dragger = require('./upload-dragger2.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/upload/src/upload-content.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"tabindex",
	"aria-disabled",
	"onKeydown"
];
const _hoisted_2 = [
	"name",
	"disabled",
	"multiple",
	"accept",
	"webkitdirectory"
];
var upload_content_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElUploadContent",
	inheritAttrs: false,
	__name: "upload-content",
	props: require_upload_content.uploadContentProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const ns = require_index.useNamespace("upload");
		const disabled = require_use_form_common_props.useFormDisabled();
		const requests = (0, vue.shallowRef)({});
		const inputRef = (0, vue.shallowRef)();
		const uploadFiles = (files) => {
			if (files.length === 0) return;
			const { autoUpload, limit, fileList, multiple, onStart, onExceed } = props;
			if (limit && fileList.length + files.length > limit) {
				onExceed(files, fileList);
				return;
			}
			if (!multiple) files = files.slice(0, 1);
			for (const file of files) {
				const rawFile = file;
				rawFile.uid = require_upload.genFileId();
				onStart(rawFile);
				if (autoUpload) upload(rawFile);
			}
		};
		const upload = async (rawFile) => {
			inputRef.value.value = "";
			if (!props.beforeUpload) return doUpload(rawFile);
			let hookResult;
			let beforeData = {};
			try {
				const originData = props.data;
				const beforeUploadPromise = props.beforeUpload(rawFile);
				beforeData = (0, _vue_shared.isPlainObject)(props.data) ? (0, lodash_unified.cloneDeep)(props.data) : props.data;
				hookResult = await beforeUploadPromise;
				if ((0, _vue_shared.isPlainObject)(props.data) && (0, lodash_unified.isEqual)(originData, beforeData)) beforeData = (0, lodash_unified.cloneDeep)(props.data);
			} catch {
				hookResult = false;
			}
			if (hookResult === false) {
				props.onRemove(rawFile);
				return;
			}
			let file = rawFile;
			if (hookResult instanceof Blob) if (hookResult instanceof File) file = hookResult;
			else file = new File([hookResult], rawFile.name, { type: rawFile.type });
			doUpload(Object.assign(file, { uid: rawFile.uid }), beforeData);
		};
		const resolveData = async (data, rawFile) => {
			if ((0, _vue_shared.isFunction)(data)) return data(rawFile);
			return data;
		};
		const doUpload = async (rawFile, beforeData) => {
			const { headers, data, method, withCredentials, name: filename, action, onProgress, onSuccess, onError, httpRequest } = props;
			try {
				beforeData = await resolveData(beforeData ?? data, rawFile);
			} catch {
				props.onRemove(rawFile);
				return;
			}
			const { uid } = rawFile;
			const options = {
				headers: headers || {},
				withCredentials,
				file: rawFile,
				data: beforeData,
				method,
				filename,
				action,
				onProgress: (evt) => {
					onProgress(evt, rawFile);
				},
				onSuccess: (res) => {
					onSuccess(res, rawFile);
					delete requests.value[uid];
				},
				onError: (err) => {
					onError(err, rawFile);
					delete requests.value[uid];
				}
			};
			const request = httpRequest(options);
			requests.value[uid] = request;
			if (request instanceof Promise) request.then(options.onSuccess, options.onError);
		};
		const handleChange = (e) => {
			const files = e.target.files;
			if (!files) return;
			uploadFiles(Array.from(files));
		};
		const handleClick = () => {
			if (!disabled.value) {
				inputRef.value.value = "";
				inputRef.value.click();
			}
		};
		const handleKeydown = () => {
			handleClick();
		};
		const abort = (file) => {
			require_objects.entriesOf(requests.value).filter(file ? ([uid]) => String(file.uid) === uid : () => true).forEach(([uid, req]) => {
				if (req instanceof XMLHttpRequest) req.abort();
				delete requests.value[uid];
			});
		};
		__expose({
			abort,
			upload
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				class: (0, vue.normalizeClass)([
					(0, vue.unref)(ns).b(),
					(0, vue.unref)(ns).m(__props.listType),
					(0, vue.unref)(ns).is("drag", __props.drag),
					(0, vue.unref)(ns).is("disabled", (0, vue.unref)(disabled))
				]),
				tabindex: (0, vue.unref)(disabled) ? void 0 : 0,
				"aria-disabled": (0, vue.unref)(disabled),
				role: "button",
				onClick: handleClick,
				onKeydown: (0, vue.withKeys)((0, vue.withModifiers)(handleKeydown, ["self"]), ["enter", "space"])
			}, [__props.drag ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_upload_dragger.default, {
				key: 0,
				disabled: (0, vue.unref)(disabled),
				directory: __props.directory,
				onFile: uploadFiles
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["disabled", "directory"])) : (0, vue.renderSlot)(_ctx.$slots, "default", { key: 1 }), (0, vue.createElementVNode)("input", {
				ref_key: "inputRef",
				ref: inputRef,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("input")),
				name: __props.name,
				disabled: (0, vue.unref)(disabled),
				multiple: __props.multiple,
				accept: __props.accept,
				webkitdirectory: __props.directory || void 0,
				type: "file",
				onChange: handleChange,
				onClick: _cache[0] || (_cache[0] = (0, vue.withModifiers)(() => {}, ["stop"]))
			}, null, 42, _hoisted_2)], 42, _hoisted_1);
		};
	}
});

//#endregion
exports.default = upload_content_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=upload-content.vue_vue_type_script_setup_true_lang.js.map