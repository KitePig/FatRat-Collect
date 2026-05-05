import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/carousel/src/carousel-item.ts
/**
* @deprecated Removed after 3.0.0, Use `CarouselItemProps` instead.
*/
const carouselItemProps = buildProps({
	name: {
		type: String,
		default: ""
	},
	label: {
		type: [String, Number],
		default: ""
	}
});

//#endregion
export { carouselItemProps };
//# sourceMappingURL=carousel-item.mjs.map