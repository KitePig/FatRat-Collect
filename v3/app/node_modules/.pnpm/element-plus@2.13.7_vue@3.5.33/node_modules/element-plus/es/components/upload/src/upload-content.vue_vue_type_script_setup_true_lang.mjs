import { isFunction, isPlainObject as isPlainObject$1 } from "../../../utils/types.mjs";
import { entriesOf } from "../../../utils/objects.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useFormDisabled } from "../../form/src/hooks/use-form-common-props.mjs";
import { genFileId } from "./upload.mjs";
import { uploadContentProps } from "./upload-content.mjs";
import upload_dragger_default from "./upload-dragger2.mjs";
import { cloneDeep, isEqual } from "lodash-unified";
import { createBlock, createElementBlock, createElementVNode, defineComponent, normalizeClass, openBlock, renderSlot, shallowRef, unref, withCtx, withKeys, withModifiers } from "vue";

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
var upload_content_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElUploadContent",
	inheritAttrs: false,
	__name: "upload-content",
	props: uploadContentProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const ns = useNamespace("upload");
		const disabled = useFormDisabled();
		const requests = shallowRef({});
		const inputRef = shallowRef();
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
				rawFile.uid = genFileId();
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
				beforeData = isPlainObject$1(props.data) ? cloneDeep(props.data) : props.data;
				hookResult = await beforeUploadPromise;
				if (isPlainObject$1(props.data) && isEqual(originData, beforeData)) beforeData = cloneDeep(props.data);
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
			if (isFunction(data)) return data(rawFile);
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
			entriesOf(requests.value).filter(file ? ([uid]) => String(file.uid) === uid : () => true).forEach(([uid, req]) => {
				if (req instanceof XMLHttpRequest) req.abort();
				delete requests.value[uid];
			});
		};
		__expose({
			abort,
			upload
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass([
					unref(ns).b(),
					unref(ns).m(__props.listType),
					unref(ns).is("drag", __props.drag),
					unref(ns).is("disabled", unref(disabled))
				]),
				tabindex: unref(disabled) ? void 0 : 0,
				"aria-disabled": unref(disabled),
				role: "button",
				onClick: handleClick,
				onKeydown: withKeys(withModifiers(handleKeydown, ["self"]), ["enter", "space"])
			}, [__props.drag ? (openBlock(), createBlock(upload_dragger_default, {
				key: 0,
				disabled: unref(disabled),
				directory: __props.directory,
				onFile: uploadFiles
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["disabled", "directory"])) : renderSlot(_ctx.$slots, "default", { key: 1 }), createElementVNode("input", {
				ref_key: "inputRef",
				ref: inputRef,
				class: normalizeClass(unref(ns).e("input")),
				name: __props.name,
				disabled: unref(disabled),
				multiple: __props.multiple,
				accept: __props.accept,
				webkitdirectory: __props.directory || void 0,
				type: "file",
				onChange: handleChange,
				onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
			}, null, 42, _hoisted_2)], 42, _hoisted_1);
		};
	}
});

//#endregion
export { upload_content_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=upload-content.vue_vue_type_script_setup_true_lang.mjs.map