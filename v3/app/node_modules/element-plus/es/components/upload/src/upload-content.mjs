import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { NOOP } from "../../../utils/functions.mjs";
import { uploadBaseProps, uploadBasePropsDefaults } from "./upload.mjs";

//#region ../../packages/components/upload/src/upload-content.ts
/**
* @deprecated Removed after 3.0.0, Use `UploadContentProps` instead.
*/
const uploadContentProps = buildProps({
	...uploadBaseProps,
	beforeUpload: {
		type: definePropType(Function),
		default: NOOP
	},
	onRemove: {
		type: definePropType(Function),
		default: NOOP
	},
	onStart: {
		type: definePropType(Function),
		default: NOOP
	},
	onSuccess: {
		type: definePropType(Function),
		default: NOOP
	},
	onProgress: {
		type: definePropType(Function),
		default: NOOP
	},
	onError: {
		type: definePropType(Function),
		default: NOOP
	},
	onExceed: {
		type: definePropType(Function),
		default: NOOP
	}
});
const uploadContentPropsDefaults = {
	...uploadBasePropsDefaults,
	beforeUpload: NOOP,
	onRemove: NOOP,
	onStart: NOOP,
	onSuccess: NOOP,
	onProgress: NOOP,
	onError: NOOP,
	onExceed: NOOP
};

//#endregion
export { uploadContentProps, uploadContentPropsDefaults };
//# sourceMappingURL=upload-content.mjs.map