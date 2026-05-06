import { isArray } from "../../../utils/types.mjs";
import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/upload/src/upload-dragger.ts
/**
* @deprecated Removed after 3.0.0, Use `UploadDraggerProps` instead.
*/
const uploadDraggerProps = buildProps({
	disabled: {
		type: Boolean,
		default: void 0
	},
	directory: Boolean
});
const uploadDraggerEmits = { file: (file) => isArray(file) };

//#endregion
export { uploadDraggerEmits, uploadDraggerProps };
//# sourceMappingURL=upload-dragger.mjs.map