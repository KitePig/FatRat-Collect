const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_constants = require('./constants.js');
const require_upload_dragger = require('./upload-dragger.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/upload/src/upload-dragger.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "ElUploadDrag";
var upload_dragger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	__name: "upload-dragger",
	props: require_upload_dragger.uploadDraggerProps,
	emits: require_upload_dragger.uploadDraggerEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		if (!(0, vue.inject)(require_constants.uploadContextKey)) require_error.throwError(COMPONENT_NAME, "usage: <el-upload><el-upload-dragger /></el-upload>");
		const ns = require_index.useNamespace("upload");
		const dragover = (0, vue.ref)(false);
		const disabled = require_use_form_common_props.useFormDisabled();
		const getFile = (entry) => {
			return new Promise((resolve, reject) => entry.file(resolve, reject));
		};
		const getAllFiles = async (entry) => {
			try {
				if (entry.isFile) {
					const file = await getFile(entry);
					file.isDirectory = false;
					return [file];
				}
				if (entry.isDirectory) {
					const dirReader = entry.createReader();
					const getEntries = () => {
						return new Promise((resolve, reject) => dirReader.readEntries(resolve, reject));
					};
					const entries = [];
					let readEntries = await getEntries();
					/**
					* In Chromium-based browsers, readEntries() will only return the first 100 FileSystemEntry instances.
					* https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryReader/readEntries#:~:text=In%20Chromium%2Dbased%20browsers%2C%20readEntries()%20will%20only%20return%20the%20first%20100%20FileSystemEntry%20instances.%20In%20order%20to%20obtain%20all%20of%20the%20instances%2C%20readEntries()%20must%20be%20called%20multiple%20times.
					*/
					while (readEntries.length > 0) {
						entries.push(...readEntries);
						readEntries = await getEntries();
					}
					const filePromises = entries.map((entry) => getAllFiles(entry).catch(() => []));
					return (0, lodash_unified.flatten)(await Promise.all(filePromises));
				}
			} catch {
				return [];
			}
			return [];
		};
		const onDrop = async (e) => {
			if (disabled.value) return;
			dragover.value = false;
			e.stopPropagation();
			const files = Array.from(e.dataTransfer.files);
			const items = e.dataTransfer.items || [];
			if (props.directory) {
				const entries = Array.from(items).map((item) => item?.webkitGetAsEntry?.()).filter((entry) => entry);
				emit("file", (0, lodash_unified.flatten)(await Promise.all(entries.map(getAllFiles))));
				return;
			}
			files.forEach((file, index) => {
				const entry = items[index]?.webkitGetAsEntry?.();
				if (entry) file.isDirectory = entry.isDirectory;
			});
			emit("file", files);
		};
		const onDragover = () => {
			if (!disabled.value) dragover.value = true;
		};
		const onDragleave = (e) => {
			if (!e.currentTarget.contains(e.relatedTarget)) dragover.value = false;
		};
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				class: (0, vue.normalizeClass)([(0, vue.unref)(ns).b("dragger"), (0, vue.unref)(ns).is("dragover", dragover.value)]),
				onDrop: (0, vue.withModifiers)(onDrop, ["prevent"]),
				onDragover: (0, vue.withModifiers)(onDragover, ["prevent"]),
				onDragleave: (0, vue.withModifiers)(onDragleave, ["prevent"])
			}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 34);
		};
	}
});

//#endregion
exports.default = upload_dragger_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=upload-dragger.vue_vue_type_script_setup_true_lang.js.map