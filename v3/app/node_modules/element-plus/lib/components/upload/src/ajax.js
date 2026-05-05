Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_error = require('../../../utils/error.js');
let lodash_unified = require("lodash-unified");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/upload/src/ajax.ts
const SCOPE = "ElUpload";
var UploadAjaxError = class extends Error {
	constructor(message, status, method, url) {
		super(message);
		this.name = "UploadAjaxError";
		this.status = status;
		this.method = method;
		this.url = url;
	}
};
function getError(action, option, xhr) {
	let msg;
	if (xhr.response) msg = `${xhr.response.error || xhr.response}`;
	else if (xhr.responseText) msg = `${xhr.responseText}`;
	else msg = `fail to ${option.method} ${action} ${xhr.status}`;
	return new UploadAjaxError(msg, xhr.status, option.method, action);
}
function getBody(xhr) {
	const text = xhr.responseText || xhr.response;
	if (!text) return text;
	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
}
const ajaxUpload = (option) => {
	if (typeof XMLHttpRequest === "undefined") require_error.throwError(SCOPE, "XMLHttpRequest is undefined");
	const xhr = new XMLHttpRequest();
	const action = option.action;
	if (xhr.upload) xhr.upload.addEventListener("progress", (evt) => {
		const progressEvt = evt;
		progressEvt.percent = evt.total > 0 ? evt.loaded / evt.total * 100 : 0;
		option.onProgress(progressEvt);
	});
	const formData = new FormData();
	if (option.data) for (const [key, value] of Object.entries(option.data)) if ((0, _vue_shared.isArray)(value)) if (value.length === 2 && value[0] instanceof Blob && (0, _vue_shared.isString)(value[1])) formData.append(key, value[0], value[1]);
	else value.forEach((item) => {
		formData.append(key, item);
	});
	else formData.append(key, value);
	formData.append(option.filename, option.file, option.file.name);
	xhr.addEventListener("error", () => {
		option.onError(getError(action, option, xhr));
	});
	xhr.addEventListener("load", () => {
		if (xhr.status < 200 || xhr.status >= 300) return option.onError(getError(action, option, xhr));
		option.onSuccess(getBody(xhr));
	});
	xhr.open(option.method, action, true);
	if (option.withCredentials && "withCredentials" in xhr) xhr.withCredentials = true;
	const headers = option.headers || {};
	if (headers instanceof Headers) headers.forEach((value, key) => xhr.setRequestHeader(key, value));
	else for (const [key, value] of Object.entries(headers)) {
		if ((0, lodash_unified.isNil)(value)) continue;
		xhr.setRequestHeader(key, String(value));
	}
	xhr.send(formData);
	return xhr;
};

//#endregion
exports.UploadAjaxError = UploadAjaxError;
exports.ajaxUpload = ajaxUpload;
//# sourceMappingURL=ajax.js.map