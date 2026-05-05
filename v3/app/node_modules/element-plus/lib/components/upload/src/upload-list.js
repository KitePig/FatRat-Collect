Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_typescript = require('../../../utils/typescript.js');
const require_upload = require('./upload.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/upload/src/upload-list.ts
/**
* @deprecated Removed after 3.0.0, Use `UploadListProps` instead.
*/
const uploadListProps = require_runtime$1.buildProps({
	files: {
		type: require_runtime$1.definePropType(Array),
		default: () => require_typescript.mutable([])
	},
	disabled: {
		type: Boolean,
		default: void 0
	},
	handlePreview: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	listType: {
		type: String,
		values: require_upload.uploadListTypes,
		default: "text"
	},
	crossorigin: { type: require_runtime$1.definePropType(String) }
});
const uploadListEmits = { remove: (file) => !!file };

//#endregion
exports.uploadListEmits = uploadListEmits;
exports.uploadListProps = uploadListProps;
//# sourceMappingURL=upload-list.js.map