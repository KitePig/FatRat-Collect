import { throwError } from "../../../utils/error.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useFormDisabled } from "../../form/src/hooks/use-form-common-props.mjs";
import { uploadContextKey } from "./constants.mjs";
import { uploadDraggerEmits, uploadDraggerProps } from "./upload-dragger.mjs";
import { flatten } from "lodash-unified";
import { createElementBlock, defineComponent, inject, normalizeClass, openBlock, ref, renderSlot, unref, withModifiers } from "vue";

//#region ../../packages/components/upload/src/upload-dragger.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "ElUploadDrag";
var upload_dragger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	__name: "upload-dragger",
	props: uploadDraggerProps,
	emits: uploadDraggerEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		if (!inject(uploadContextKey)) throwError(COMPONENT_NAME, "usage: <el-upload><el-upload-dragger /></el-upload>");
		const ns = useNamespace("upload");
		const dragover = ref(false);
		const disabled = useFormDisabled();
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
					return flatten(await Promise.all(filePromises));
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
				emit("file", flatten(await Promise.all(entries.map(getAllFiles))));
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
			return openBlock(), createElementBlock("div", {
				class: normalizeClass([unref(ns).b("dragger"), unref(ns).is("dragover", dragover.value)]),
				onDrop: withModifiers(onDrop, ["prevent"]),
				onDragover: withModifiers(onDragover, ["prevent"]),
				onDragleave: withModifiers(onDragleave, ["prevent"])
			}, [renderSlot(_ctx.$slots, "default")], 34);
		};
	}
});

//#endregion
export { upload_dragger_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=upload-dragger.vue_vue_type_script_setup_true_lang.mjs.map