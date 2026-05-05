Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_browser = require('../../../utils/browser.js');
let lodash_unified = require("lodash-unified");

//#region ../../packages/components/mention/src/helper.ts
const filterOption = (pattern, option) => {
	const lowerCase = pattern.toLowerCase();
	return (option.label || option.value || "").toLowerCase().includes(lowerCase);
};
const getMentionCtx = (inputEl, prefix, split) => {
	const { selectionEnd } = inputEl;
	if (selectionEnd === null) return;
	const inputValue = inputEl.value;
	const prefixArray = (0, lodash_unified.castArray)(prefix);
	let splitIndex = -1;
	let mentionCtx;
	for (let i = selectionEnd - 1; i >= 0; --i) {
		const char = inputValue[i];
		if (splitIndex === -1 && (char === split || char === "\n" || char === "\r")) {
			splitIndex = i;
			continue;
		}
		if (prefixArray.includes(char)) {
			const end = splitIndex === -1 ? selectionEnd : splitIndex;
			mentionCtx = {
				pattern: inputValue.slice(i + 1, end),
				start: i + 1,
				end,
				prefix: char,
				prefixIndex: i,
				splitIndex,
				selectionEnd
			};
			break;
		}
	}
	return mentionCtx;
};
/**
* fork from textarea-caret-position
* https://github.com/component/textarea-caret-position
* The MIT License (MIT)
* Copyright (c) 2015 Jonathan Ong me@jongleberry.com
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
const getCursorPosition = (element, options = {
	debug: false,
	useSelectionEnd: false
}) => {
	const selectionStart = element.selectionStart !== null ? element.selectionStart : 0;
	const selectionEnd = element.selectionEnd !== null ? element.selectionEnd : 0;
	const position = options.useSelectionEnd ? selectionEnd : selectionStart;
	const properties = [
		"direction",
		"boxSizing",
		"width",
		"height",
		"overflowX",
		"overflowY",
		"borderTopWidth",
		"borderRightWidth",
		"borderBottomWidth",
		"borderLeftWidth",
		"borderStyle",
		"paddingTop",
		"paddingRight",
		"paddingBottom",
		"paddingLeft",
		"fontStyle",
		"fontVariant",
		"fontWeight",
		"fontStretch",
		"fontSize",
		"fontSizeAdjust",
		"lineHeight",
		"fontFamily",
		"textAlign",
		"textTransform",
		"textIndent",
		"textDecoration",
		"letterSpacing",
		"wordSpacing",
		"tabSize",
		"MozTabSize"
	];
	if (options.debug) {
		const el = document.querySelector("#input-textarea-caret-position-mirror-div");
		if (el?.parentNode) el.parentNode.removeChild(el);
	}
	const div = document.createElement("div");
	div.id = "input-textarea-caret-position-mirror-div";
	document.body.appendChild(div);
	const style = div.style;
	const computed = window.getComputedStyle(element);
	const isInput = element.nodeName === "INPUT";
	style.whiteSpace = isInput ? "nowrap" : "pre-wrap";
	if (!isInput) style.wordWrap = "break-word";
	style.position = "absolute";
	if (!options.debug) style.visibility = "hidden";
	properties.forEach((prop) => {
		if (isInput && prop === "lineHeight") if (computed.boxSizing === "border-box") {
			const height = Number.parseInt(computed.height);
			const outerHeight = Number.parseInt(computed.paddingTop) + Number.parseInt(computed.paddingBottom) + Number.parseInt(computed.borderTopWidth) + Number.parseInt(computed.borderBottomWidth);
			const targetHeight = outerHeight + Number.parseInt(computed.lineHeight);
			if (height > targetHeight) style.lineHeight = `${height - outerHeight}px`;
			else if (height === targetHeight) style.lineHeight = computed.lineHeight;
			else style.lineHeight = "0";
		} else style.lineHeight = computed.height;
		else style[prop] = computed[prop];
	});
	if (require_browser.isFirefox()) {
		if (element.scrollHeight > Number.parseInt(computed.height)) style.overflowY = "scroll";
	} else style.overflow = "hidden";
	div.textContent = element.value.slice(0, Math.max(0, position));
	if (isInput && div.textContent) div.textContent = div.textContent.replace(/\s/g, "\xA0");
	const span = document.createElement("span");
	span.textContent = element.value.slice(Math.max(0, position)) || ".";
	span.style.position = "relative";
	span.style.left = `${-element.scrollLeft}px`;
	span.style.top = `${-element.scrollTop}px`;
	div.appendChild(span);
	const relativePosition = {
		top: span.offsetTop + Number.parseInt(computed.borderTopWidth),
		left: span.offsetLeft + Number.parseInt(computed.borderLeftWidth),
		height: Number.parseInt(computed.fontSize) * 1.5
	};
	if (options.debug) span.style.backgroundColor = "#aaa";
	else document.body.removeChild(div);
	if (relativePosition.left >= element.clientWidth) relativePosition.left = element.clientWidth;
	return relativePosition;
};

//#endregion
exports.filterOption = filterOption;
exports.getCursorPosition = getCursorPosition;
exports.getMentionCtx = getMentionCtx;
//# sourceMappingURL=helper.js.map