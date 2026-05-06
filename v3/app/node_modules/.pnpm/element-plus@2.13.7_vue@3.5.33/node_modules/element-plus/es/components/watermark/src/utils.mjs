//#region ../../packages/components/watermark/src/utils.ts
/** converting camel-cased strings to be lowercase and link it with Separator */
function toLowercaseSeparator(key) {
	return key.replace(/([A-Z])/g, "-$1").toLowerCase();
}
function getStyleStr(style) {
	return Object.keys(style).map((key) => `${toLowercaseSeparator(key)}: ${style[key]};`).join(" ");
}
/** Returns the ratio of the device's physical pixel resolution to the css pixel resolution */
function getPixelRatio() {
	return window.devicePixelRatio || 1;
}
/** Whether to re-render the watermark */
const reRendering = (mutation, watermarkElement) => {
	let flag = false;
	if (mutation.removedNodes.length && watermarkElement) flag = Array.from(mutation.removedNodes).includes(watermarkElement);
	if (mutation.type === "attributes" && mutation.target === watermarkElement) flag = true;
	return flag;
};

//#endregion
export { getPixelRatio, getStyleStr, reRendering, toLowercaseSeparator };
//# sourceMappingURL=utils.mjs.map