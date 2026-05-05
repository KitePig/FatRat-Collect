import { debugWarn, throwError } from "../../../utils/error.mjs";
import { genFileId } from "./upload.mjs";
import { useVModel } from "@vueuse/core";
import { isNil } from "lodash-unified";
import { nextTick, watch } from "vue";

//#region ../../packages/components/upload/src/use-handlers.ts
const SCOPE = "ElUpload";
const revokeFileObjectURL = (file) => {
	if (file.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
};
const useHandlers = (props, uploadRef) => {
	const uploadFiles = useVModel(props, "fileList", void 0, { passive: true });
	const getFile = (rawFile) => uploadFiles.value.find((file) => file.uid === rawFile.uid);
	function abort(file) {
		uploadRef.value?.abort(file);
	}
	function clearFiles(states = [
		"ready",
		"uploading",
		"success",
		"fail"
	]) {
		uploadFiles.value = uploadFiles.value.filter((row) => !states.includes(row.status));
	}
	function removeFile(file) {
		uploadFiles.value = uploadFiles.value.filter((uploadFile) => uploadFile.uid !== file.uid);
	}
	const emitChange = (file) => {
		nextTick(() => props.onChange(file, uploadFiles.value));
	};
	const handleError = (err, rawFile) => {
		const file = getFile(rawFile);
		if (!file) return;
		console.error(err);
		file.status = "fail";
		removeFile(file);
		props.onError(err, file, uploadFiles.value);
		emitChange(file);
	};
	const handleProgress = (evt, rawFile) => {
		const file = getFile(rawFile);
		if (!file) return;
		props.onProgress(evt, file, uploadFiles.value);
		file.status = "uploading";
		file.percentage = Math.round(evt.percent);
	};
	const handleSuccess = (response, rawFile) => {
		const file = getFile(rawFile);
		if (!file) return;
		file.status = "success";
		file.response = response;
		props.onSuccess(response, file, uploadFiles.value);
		emitChange(file);
	};
	const handleStart = (file) => {
		if (isNil(file.uid)) file.uid = genFileId();
		const uploadFile = {
			name: file.name,
			percentage: 0,
			status: "ready",
			size: file.size,
			raw: file,
			uid: file.uid
		};
		if (props.listType === "picture-card" || props.listType === "picture") try {
			uploadFile.url = URL.createObjectURL(file);
		} catch (err) {
			debugWarn(SCOPE, err.message);
			props.onError(err, uploadFile, uploadFiles.value);
		}
		uploadFiles.value = [...uploadFiles.value, uploadFile];
		emitChange(uploadFile);
	};
	const handleRemove = async (file) => {
		const uploadFile = file instanceof File ? getFile(file) : file;
		if (!uploadFile) throwError(SCOPE, "file to be removed not found");
		const doRemove = (file) => {
			abort(file);
			removeFile(file);
			props.onRemove(file, uploadFiles.value);
			revokeFileObjectURL(file);
		};
		if (props.beforeRemove) {
			if (await props.beforeRemove(uploadFile, uploadFiles.value) !== false) doRemove(uploadFile);
		} else doRemove(uploadFile);
	};
	function submit() {
		uploadFiles.value.filter(({ status }) => status === "ready").forEach(({ raw }) => raw && uploadRef.value?.upload(raw));
	}
	watch(() => props.listType, (val) => {
		if (val !== "picture-card" && val !== "picture") return;
		uploadFiles.value = uploadFiles.value.map((file) => {
			const { raw, url } = file;
			if (!url && raw) try {
				file.url = URL.createObjectURL(raw);
			} catch (err) {
				props.onError(err, file, uploadFiles.value);
			}
			return file;
		});
	});
	watch(uploadFiles, (files) => {
		for (const file of files) {
			file.uid ||= genFileId();
			file.status ||= "success";
		}
	}, {
		immediate: true,
		deep: true
	});
	return {
		uploadFiles,
		abort,
		clearFiles,
		handleError,
		handleProgress,
		handleStart,
		handleSuccess,
		handleRemove,
		submit,
		revokeFileObjectURL
	};
};

//#endregion
export { useHandlers };
//# sourceMappingURL=use-handlers.mjs.map