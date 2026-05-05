import { isNumber } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { mutable } from "../../../utils/typescript.mjs";

//#region ../../packages/components/image-viewer/src/image-viewer.ts
/**
* @deprecated Removed after 3.0.0, Use `ImageViewerProps` instead.
*/
const imageViewerProps = buildProps({
	urlList: {
		type: definePropType(Array),
		default: () => mutable([])
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
	crossorigin: { type: definePropType(String) }
});
const imageViewerEmits = {
	close: () => true,
	error: (evt) => evt instanceof Event,
	switch: (index) => isNumber(index),
	rotate: (deg) => isNumber(deg)
};

//#endregion
export { imageViewerEmits, imageViewerProps };
//# sourceMappingURL=image-viewer.mjs.map