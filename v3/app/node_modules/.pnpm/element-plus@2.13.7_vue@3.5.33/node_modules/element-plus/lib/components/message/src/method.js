Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_error = require('../../../utils/error.js');
const require_config_provider = require('../../config-provider/src/config-provider.js');
const require_message = require('./message.js');
const require_instance = require('./instance.js');
const require_message$1 = require('./message2.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/components/message/src/method.ts
let seed = 1;
const normalizeAppendTo = (normalized) => {
	if (!normalized.appendTo) normalized.appendTo = document.body;
	else if ((0, _vue_shared.isString)(normalized.appendTo)) {
		let appendTo = document.querySelector(normalized.appendTo);
		if (!require_types.isElement(appendTo)) {
			require_error.debugWarn("ElMessage", "the appendTo option is not an HTMLElement. Falling back to document.body.");
			appendTo = document.body;
		}
		normalized.appendTo = appendTo;
	}
};
const normalizePlacement = (normalized) => {
	if (!normalized.placement && (0, _vue_shared.isString)(require_config_provider.messageConfig.placement) && require_config_provider.messageConfig.placement) normalized.placement = require_config_provider.messageConfig.placement;
	if (!normalized.placement) normalized.placement = require_message.MESSAGE_DEFAULT_PLACEMENT;
	if (!require_message.messagePlacement.includes(normalized.placement)) {
		require_error.debugWarn("ElMessage", `Invalid placement: ${normalized.placement}. Falling back to '${require_message.MESSAGE_DEFAULT_PLACEMENT}'.`);
		normalized.placement = require_message.MESSAGE_DEFAULT_PLACEMENT;
	}
};
const normalizeOptions = (params) => {
	const options = !params || (0, _vue_shared.isString)(params) || (0, vue.isVNode)(params) || (0, _vue_shared.isFunction)(params) ? { message: params } : params;
	const normalized = {
		...require_message.messageDefaults,
		...options
	};
	normalizeAppendTo(normalized);
	normalizePlacement(normalized);
	if (require_types.isBoolean(require_config_provider.messageConfig.grouping) && !normalized.grouping) normalized.grouping = require_config_provider.messageConfig.grouping;
	if (require_types.isNumber(require_config_provider.messageConfig.duration) && normalized.duration === 3e3) normalized.duration = require_config_provider.messageConfig.duration;
	if (require_types.isNumber(require_config_provider.messageConfig.offset) && normalized.offset === 16) normalized.offset = require_config_provider.messageConfig.offset;
	if (require_types.isBoolean(require_config_provider.messageConfig.showClose) && !normalized.showClose) normalized.showClose = require_config_provider.messageConfig.showClose;
	if (require_types.isBoolean(require_config_provider.messageConfig.plain) && !normalized.plain) normalized.plain = require_config_provider.messageConfig.plain;
	return normalized;
};
const closeMessage = (instance) => {
	const instances = require_instance.placementInstances[instance.props.placement || require_message.MESSAGE_DEFAULT_PLACEMENT];
	const idx = instances.indexOf(instance);
	if (idx === -1) return;
	instances.splice(idx, 1);
	const { handler } = instance;
	handler.close();
};
const createMessage = ({ appendTo, ...options }, context) => {
	const id = `message_${seed++}`;
	const userOnClose = options.onClose;
	const container = document.createElement("div");
	const props = {
		...options,
		id,
		onClose: () => {
			userOnClose?.();
			closeMessage(instance);
		},
		onDestroy: () => {
			(0, vue.render)(null, container);
		}
	};
	const vnode = (0, vue.createVNode)(require_message$1.default, props, (0, _vue_shared.isFunction)(props.message) || (0, vue.isVNode)(props.message) ? { default: (0, _vue_shared.isFunction)(props.message) ? props.message : () => props.message } : null);
	vnode.appContext = context || message._context;
	(0, vue.render)(vnode, container);
	appendTo.appendChild(container.firstElementChild);
	const vm = vnode.component;
	const instance = {
		id,
		vnode,
		vm,
		handler: { close: () => {
			vm.exposed.close();
		} },
		props: vnode.component.props
	};
	return instance;
};
const message = (options = {}, context) => {
	if (!_vueuse_core.isClient) return { close: () => void 0 };
	const normalized = normalizeOptions(options);
	const instances = require_instance.getOrCreatePlacementInstances(normalized.placement || require_message.MESSAGE_DEFAULT_PLACEMENT);
	if (normalized.grouping && instances.length) {
		const instance = instances.find(({ vnode: vm }) => vm.props?.message === normalized.message);
		if (instance) {
			instance.props.repeatNum += 1;
			instance.props.type = normalized.type;
			return instance.handler;
		}
	}
	if (require_types.isNumber(require_config_provider.messageConfig.max) && instances.length >= require_config_provider.messageConfig.max) return { close: () => void 0 };
	const instance = createMessage(normalized, context);
	instances.push(instance);
	return instance.handler;
};
require_message.messageTypes.forEach((type) => {
	message[type] = (options = {}, appContext) => {
		return message({
			...normalizeOptions(options),
			type
		}, appContext);
	};
});
function closeAll(type) {
	for (const placement in require_instance.placementInstances) if ((0, _vue_shared.hasOwn)(require_instance.placementInstances, placement)) {
		const instances = [...require_instance.placementInstances[placement]];
		for (const instance of instances) if (!type || type === instance.props.type) instance.handler.close();
	}
}
function closeAllByPlacement(placement) {
	if (!require_instance.placementInstances[placement]) return;
	[...require_instance.placementInstances[placement]].forEach((instance) => instance.handler.close());
}
message.closeAll = closeAll;
message.closeAllByPlacement = closeAllByPlacement;
message._context = null;

//#endregion
exports.closeAll = closeAll;
exports.closeAllByPlacement = closeAllByPlacement;
exports.default = message;
//# sourceMappingURL=method.js.map