Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_error = require('../../../utils/error.js');
const require_index = require('./index.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/components/message-box/src/messageBox.ts
const messageInstance = /* @__PURE__ */ new Map();
const getAppendToElement = (props) => {
	let appendTo = document.body;
	if (props.appendTo) {
		if ((0, _vue_shared.isString)(props.appendTo)) appendTo = document.querySelector(props.appendTo);
		if (require_types.isElement(props.appendTo)) appendTo = props.appendTo;
		if (!require_types.isElement(appendTo)) {
			require_error.debugWarn("ElMessageBox", "the appendTo option is not an HTMLElement. Falling back to document.body.");
			appendTo = document.body;
		}
	}
	return appendTo;
};
const initInstance = (props, container, appContext = null) => {
	const vnode = (0, vue.createVNode)(require_index.default, props, (0, _vue_shared.isFunction)(props.message) || (0, vue.isVNode)(props.message) ? { default: (0, _vue_shared.isFunction)(props.message) ? props.message : () => props.message } : null);
	vnode.appContext = appContext;
	(0, vue.render)(vnode, container);
	getAppendToElement(props).appendChild(container.firstElementChild);
	return vnode.component;
};
const genContainer = () => {
	return document.createElement("div");
};
const showMessage = (options, appContext) => {
	const container = genContainer();
	options.onVanish = () => {
		(0, vue.render)(null, container);
		messageInstance.delete(vm);
	};
	options.onAction = (action) => {
		const currentMsg = messageInstance.get(vm);
		let resolve;
		if (options.showInput) resolve = {
			value: vm.inputValue,
			action
		};
		else resolve = action;
		if (options.callback) options.callback(resolve, instance.proxy);
		else if (action === "cancel" || action === "close") if (options.distinguishCancelAndClose && action !== "cancel") currentMsg.reject("close");
		else currentMsg.reject("cancel");
		else currentMsg.resolve(resolve);
	};
	const instance = initInstance(options, container, appContext);
	const vm = instance.proxy;
	for (const prop in options) if ((0, _vue_shared.hasOwn)(options, prop) && !(0, _vue_shared.hasOwn)(vm.$props, prop)) if (prop === "closeIcon" && (0, _vue_shared.isObject)(options[prop])) vm[prop] = (0, vue.markRaw)(options[prop]);
	else vm[prop] = options[prop];
	vm.visible = true;
	return vm;
};
function MessageBox(options, appContext = null) {
	if (!_vueuse_core.isClient) return Promise.reject();
	let callback;
	if ((0, _vue_shared.isString)(options) || (0, vue.isVNode)(options)) options = { message: options };
	else callback = options.callback;
	return new Promise((resolve, reject) => {
		const vm = showMessage(options, appContext ?? MessageBox._context);
		messageInstance.set(vm, {
			options,
			callback,
			resolve,
			reject
		});
	});
}
const MESSAGE_BOX_VARIANTS = [
	"alert",
	"confirm",
	"prompt"
];
const MESSAGE_BOX_DEFAULT_OPTS = {
	alert: {
		closeOnPressEscape: false,
		closeOnClickModal: false
	},
	confirm: { showCancelButton: true },
	prompt: {
		showCancelButton: true,
		showInput: true
	}
};
MESSAGE_BOX_VARIANTS.forEach((boxType) => {
	MessageBox[boxType] = messageBoxFactory(boxType);
});
function messageBoxFactory(boxType) {
	return (message, title, options, appContext) => {
		let titleOrOpts = "";
		if ((0, _vue_shared.isObject)(title)) {
			options = title;
			titleOrOpts = "";
		} else if (require_types.isUndefined(title)) titleOrOpts = "";
		else titleOrOpts = title;
		return MessageBox(Object.assign({
			title: titleOrOpts,
			message,
			type: "",
			...MESSAGE_BOX_DEFAULT_OPTS[boxType]
		}, options, { boxType }), appContext);
	};
}
MessageBox.close = () => {
	messageInstance.forEach((_, vm) => {
		vm.doClose();
	});
	messageInstance.clear();
};
MessageBox._context = null;

//#endregion
exports.default = MessageBox;
//# sourceMappingURL=messageBox.js.map