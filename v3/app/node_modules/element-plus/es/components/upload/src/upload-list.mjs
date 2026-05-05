import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { NOOP } from "../../../utils/functions.mjs";
import { mutable } from "../../../utils/typescript.mjs";
import { uploadListTypes } from "./upload.mjs";

//#region ../../packages/components/upload/src/upload-list.ts
/**
* @deprecated Removed after 3.0.0, Use `UploadListProps` instead.
*/
const uploadListProps = buildProps({
	files: {
		type: definePropType(Array),
		default: () => mutable([])
	},
	disabled: {
		type: Boolean,
		default: void 0
	},
	handlePreview: {
		type: definePropType(Function),
		default: NOOP
	},
	listType: {
		type: String,
		values: uploadListTypes,
		default: "text"
	},
	crossorigin: { type: definePropType(String) }
});
const uploadListEmits = { remove: (file) => !!file };

//#endregion
export { uploadListEmits, uploadListProps };
//# sourceMappingURL=upload-list.mjs.map