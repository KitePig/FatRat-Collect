const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_watermark = require('./watermark.js');
const require_utils = require('./utils.js');
const require_useClips = require('./useClips.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/watermark/src/watermark.vue?vue&type=script&setup=true&lang.ts
var watermark_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElWatermark",
	__name: "watermark",
	props: require_watermark.watermarkProps,
	setup(__props) {
		const style = { position: "relative" };
		const props = __props;
		const fontGap = (0, vue.computed)(() => props.font?.fontGap ?? 3);
		const color = (0, vue.computed)(() => props.font?.color ?? "rgba(0,0,0,.15)");
		const fontSize = (0, vue.computed)(() => props.font?.fontSize ?? 16);
		const fontWeight = (0, vue.computed)(() => props.font?.fontWeight ?? "normal");
		const fontStyle = (0, vue.computed)(() => props.font?.fontStyle ?? "normal");
		const fontFamily = (0, vue.computed)(() => props.font?.fontFamily ?? "sans-serif");
		const textAlign = (0, vue.computed)(() => props.font?.textAlign ?? "center");
		const textBaseline = (0, vue.computed)(() => props.font?.textBaseline ?? "hanging");
		const gapX = (0, vue.computed)(() => props.gap[0]);
		const gapY = (0, vue.computed)(() => props.gap[1]);
		const gapXCenter = (0, vue.computed)(() => gapX.value / 2);
		const gapYCenter = (0, vue.computed)(() => gapY.value / 2);
		const offsetLeft = (0, vue.computed)(() => props.offset?.[0] ?? gapXCenter.value);
		const offsetTop = (0, vue.computed)(() => props.offset?.[1] ?? gapYCenter.value);
		const getMarkStyle = () => {
			const markStyle = {
				zIndex: props.zIndex,
				position: "absolute",
				left: 0,
				top: 0,
				width: "100%",
				height: "100%",
				pointerEvents: "none",
				backgroundRepeat: "repeat"
			};
			/** Calculate the style of the offset */
			let positionLeft = offsetLeft.value - gapXCenter.value;
			let positionTop = offsetTop.value - gapYCenter.value;
			if (positionLeft > 0) {
				markStyle.left = `${positionLeft}px`;
				markStyle.width = `calc(100% - ${positionLeft}px)`;
				positionLeft = 0;
			}
			if (positionTop > 0) {
				markStyle.top = `${positionTop}px`;
				markStyle.height = `calc(100% - ${positionTop}px)`;
				positionTop = 0;
			}
			markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;
			return markStyle;
		};
		const containerRef = (0, vue.shallowRef)(null);
		const watermarkRef = (0, vue.shallowRef)();
		const stopObservation = (0, vue.ref)(false);
		const destroyWatermark = () => {
			if (watermarkRef.value) {
				watermarkRef.value.remove();
				watermarkRef.value = void 0;
			}
		};
		const appendWatermark = (base64Url, markWidth) => {
			if (containerRef.value && watermarkRef.value) {
				stopObservation.value = true;
				watermarkRef.value.setAttribute("style", require_utils.getStyleStr({
					...getMarkStyle(),
					backgroundImage: `url('${base64Url}')`,
					backgroundSize: `${Math.floor(markWidth)}px`
				}));
				containerRef.value?.append(watermarkRef.value);
				setTimeout(() => {
					stopObservation.value = false;
				});
			}
		};
		/**
		* Get the width and height of the watermark. The default values are as follows
		* Image: [120, 64]; Content: It's calculated by content;
		*/
		const getMarkSize = (ctx) => {
			let defaultWidth = 120;
			let defaultHeight = 64;
			let space = 0;
			const { image, content, width, height, rotate } = props;
			if (!image && ctx.measureText) {
				ctx.font = `${Number(fontSize.value)}px ${fontFamily.value}`;
				const contents = (0, _vue_shared.isArray)(content) ? content : [content];
				let maxWidth = 0;
				let maxHeight = 0;
				contents.forEach((item) => {
					const { width, fontBoundingBoxAscent, fontBoundingBoxDescent, actualBoundingBoxAscent, actualBoundingBoxDescent } = ctx.measureText(item);
					const height = require_types.isUndefined(fontBoundingBoxAscent) ? actualBoundingBoxAscent + actualBoundingBoxDescent : fontBoundingBoxAscent + fontBoundingBoxDescent;
					if (width > maxWidth) maxWidth = Math.ceil(width);
					if (height > maxHeight) maxHeight = Math.ceil(height);
				});
				defaultWidth = maxWidth;
				defaultHeight = maxHeight * contents.length + (contents.length - 1) * fontGap.value;
				const angle = Math.PI / 180 * Number(rotate);
				space = Math.ceil(Math.abs(Math.sin(angle) * defaultHeight) / 2);
				defaultWidth += space;
			}
			return [
				width ?? defaultWidth,
				height ?? defaultHeight,
				space
			];
		};
		const getClips = require_useClips.default();
		const renderWatermark = () => {
			const ctx = document.createElement("canvas").getContext("2d");
			const image = props.image;
			const content = props.content;
			const rotate = props.rotate;
			if (ctx) {
				if (!watermarkRef.value) watermarkRef.value = document.createElement("div");
				const ratio = require_utils.getPixelRatio();
				const [markWidth, markHeight, space] = getMarkSize(ctx);
				const drawCanvas = (drawContent) => {
					const [textClips, clipWidth] = getClips(drawContent || "", rotate, ratio, markWidth, markHeight, {
						color: color.value,
						fontSize: fontSize.value,
						fontStyle: fontStyle.value,
						fontWeight: fontWeight.value,
						fontFamily: fontFamily.value,
						fontGap: fontGap.value,
						textAlign: textAlign.value,
						textBaseline: textBaseline.value
					}, gapX.value, gapY.value, space);
					appendWatermark(textClips, clipWidth);
				};
				if (image) {
					const img = new Image();
					img.onload = () => {
						drawCanvas(img);
					};
					img.onerror = () => {
						drawCanvas(content);
					};
					img.crossOrigin = "anonymous";
					img.referrerPolicy = "no-referrer";
					img.src = image;
				} else drawCanvas(content);
			}
		};
		(0, vue.onMounted)(() => {
			renderWatermark();
		});
		(0, vue.watch)(() => props, () => {
			renderWatermark();
		}, {
			deep: true,
			flush: "post"
		});
		(0, vue.onBeforeUnmount)(() => {
			destroyWatermark();
		});
		const onMutate = (mutations) => {
			if (stopObservation.value) return;
			mutations.forEach((mutation) => {
				if (require_utils.reRendering(mutation, watermarkRef.value)) {
					destroyWatermark();
					renderWatermark();
				}
			});
		};
		(0, _vueuse_core.useMutationObserver)(containerRef, onMutate, {
			attributes: true,
			subtree: true,
			childList: true
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "containerRef",
				ref: containerRef,
				style: (0, vue.normalizeStyle)([style])
			}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 4);
		};
	}
});

//#endregion
exports.default = watermark_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=watermark.vue_vue_type_script_setup_true_lang.js.map