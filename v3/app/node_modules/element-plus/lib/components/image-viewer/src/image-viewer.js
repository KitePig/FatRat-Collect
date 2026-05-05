Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_types = require('../../../utils/types.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_typescript = require('../../../utils/typescript.js');

//#region ../../packages/components/image-viewer/src/image-viewer.ts
/**
* @deprecated Removed after 3.0.0, Use `ImageViewerProps` instead.
*/
const imageViewerProps = require_runtime.buildProps({
	urlList: {
		type: require_runtime.definePropType(Array),
		default: () => require_typescript.mutable([])
	},
	zIndex: { type: Number },
	initialIndex: {
		type: Number,
		default: 0
	},
	infinite: {
		type: Boolean,
		default: true
	},
	hideOnClickModal: Boolean,
	teleported: Boolean,
	closeOnPressEscape: {
		type: Boolean,
		default: true
	},
	zoomRate: {
		type: Number,
		default: 1.2
	},
	scale: {
		type: Number,
		default: 1
	},
	minScale: {
		type: Number,
		default: .2
	},
	maxScale: {
		type: Number,
		default: 7
	},
	showProgress: Boolean,
	crossorigin: { type: require_runtime.definePropType(String) }
});
const imageViewerEmits = {
	close: () => true,
	error: (evt) => evt instanceof Event,
	switch: (index) => require_types.isNumber(index),
	rotate: (deg) => require_types.isNumber(deg)
};

//#endregion
exports.imageViewerEmits = imageViewerEmits;
exports.imageViewerProps = imageViewerProps;
//# sourceMappingURL=image-viewer.js.map