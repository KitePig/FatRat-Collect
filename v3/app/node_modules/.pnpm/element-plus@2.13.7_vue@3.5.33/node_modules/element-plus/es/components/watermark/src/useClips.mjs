import { isArray } from "../../../utils/types.mjs";

//#region ../../packages/components/watermark/src/useClips.ts
const TEXT_ALIGN_RATIO_MAP = {
	left: [0, .5],
	start: [0, .5],
	center: [.5, 0],
	right: [1, -.5],
	end: [1, -.5]
};
function prepareCanvas(width, height, ratio = 1) {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	const realWidth = width * ratio;
	const realHeight = height * ratio;
	canvas.setAttribute("width", `${realWidth}px`);
	canvas.setAttribute("height", `${realHeight}px`);
	ctx.save();
	return [
		ctx,
		canvas,
		realWidth,
		realHeight
	];
}
/**
* Get the clips of text content.
* This is a lazy hook function since SSR no need this
*/
function useClips() {
	function getClips(content, rotate, ratio, width, height, font, gapX, gapY, space) {
		const [ctx, canvas, contentWidth, contentHeight] = prepareCanvas(width, height, ratio);
		let baselineOffset = 0;
		if (content instanceof HTMLImageElement) ctx.drawImage(content, 0, 0, contentWidth, contentHeight);
		else {
			const { color, fontSize, fontStyle, fontWeight, fontFamily, textAlign, textBaseline } = font;
			const mergedFontSize = Number(fontSize) * ratio;
			ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${height}px ${fontFamily}`;
			ctx.fillStyle = color;
			ctx.textAlign = textAlign;
			ctx.textBaseline = textBaseline;
			const contents = isArray(content) ? content : [content];
			if (textBaseline !== "top" && contents[0]) {
				const argumentMetrics = ctx.measureText(contents[0]);
				ctx.textBaseline = "top";
				const topMetrics = ctx.measureText(contents[0]);
				baselineOffset = argumentMetrics.actualBoundingBoxAscent - topMetrics.actualBoundingBoxAscent;
			}
			contents?.forEach((item, index) => {
				const [alignRatio, spaceRatio] = TEXT_ALIGN_RATIO_MAP[textAlign];
				ctx.fillText(item ?? "", contentWidth * alignRatio + space * spaceRatio, index * (mergedFontSize + font.fontGap * ratio));
			});
		}
		const angle = Math.PI / 180 * Number(rotate);
		const maxSize = Math.max(width, height);
		const [rCtx, rCanvas, realMaxSize] = prepareCanvas(maxSize, maxSize, ratio);
		rCtx.translate(realMaxSize / 2, realMaxSize / 2);
		rCtx.rotate(angle);
		if (contentWidth > 0 && contentHeight > 0) rCtx.drawImage(canvas, -contentWidth / 2, -contentHeight / 2);
		function getRotatePos(x, y) {
			return [x * Math.cos(angle) - y * Math.sin(angle), x * Math.sin(angle) + y * Math.cos(angle)];
		}
		let left = 0;
		let right = 0;
		let top = 0;
		let bottom = 0;
		const halfWidth = contentWidth / 2;
		const halfHeight = contentHeight / 2;
		[
			[0 - halfWidth, 0 - halfHeight],
			[0 + halfWidth, 0 - halfHeight],
			[0 + halfWidth, 0 + halfHeight],
			[0 - halfWidth, 0 + halfHeight]
		].forEach(([x, y]) => {
			const [targetX, targetY] = getRotatePos(x, y);
			left = Math.min(left, targetX);
			right = Math.max(right, targetX);
			top = Math.min(top, targetY);
			bottom = Math.max(bottom, targetY);
		});
		const cutLeft = left + realMaxSize / 2;
		const cutTop = top + realMaxSize / 2;
		const cutWidth = right - left;
		const cutHeight = bottom - top;
		const realGapX = gapX * ratio;
		const realGapY = gapY * ratio;
		const filledWidth = (cutWidth + realGapX) * 2;
		const filledHeight = cutHeight + realGapY;
		const [fCtx, fCanvas] = prepareCanvas(filledWidth, filledHeight);
		function drawImg(targetX = 0, targetY = 0) {
			fCtx.drawImage(rCanvas, cutLeft, cutTop, cutWidth, cutHeight, targetX, targetY + baselineOffset, cutWidth, cutHeight);
		}
		drawImg();
		drawImg(cutWidth + realGapX, -cutHeight / 2 - realGapY / 2);
		drawImg(cutWidth + realGapX, +cutHeight / 2 + realGapY / 2);
		return [
			fCanvas.toDataURL(),
			filledWidth / ratio,
			filledHeight / ratio
		];
	}
	return getClips;
}

//#endregion
export { useClips as default };
//# sourceMappingURL=useClips.mjs.map