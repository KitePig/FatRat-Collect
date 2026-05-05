import { isClient } from "../../../utils/browser.mjs";
import { isBoolean, isElement, isFunction, isNumber, isString } from "../../../utils/types.mjs";
import { hasOwn } from "../../../utils/objects.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { messageConfig } from "../../config-provider/src/config-provider.mjs";
import { MESSAGE_DEFAULT_PLACEMENT, messageDefaults, messagePlacement, messageTypes } from "./message.mjs";
import { getOrCreatePlacementInstances, placementInstances } from "./instance.mjs";
import message_default from "./message2.mjs";
import { createVNode, isVNode, render } from "vue";

//#region ../../packages/components/message/src/method.ts
let seed = 1;
const normalizeAppendTo = (normalized) => {
	if (!normalized.appendTo) normalized.appendTo = document.body;
	else if (isString(normalized.appendTo)) {
		let appendTo = document.querySelector(normalized.appendTo);
		if (!isElement(appendTo)) {
			debugWarn("ElMessage", "the appendTo option is not an HTMLElement. Falling back to document.body.");
			appendTo = document.body;
		}
		normalized.appendTo = appendTo;
	}
};
const normalizePlacement = (normalized) => {
	if (!normalized.placement && isString(messageConfig.placement) && messageConfig.placement) normalized.placement = messageConfig.placement;
	if (!normalized.placement) normalized.placement = MESSAGE_DEFAULT_PLACEMENT;
	if (!messagePlacement.includes(normalized.placement)) {
		debugWarn("ElMessage", `Invalid placement: ${normalized.placement}. Falling back to '${MESSAGE_DEFAULT_PLACEMENT}'.`);
		normalized.placement = MESSAGE_DEFAULT_PLACEMENT;
	}
};
const normalizeOptions = (params) => {
	const options = !params || isString(params) || isVNode(params) || isFunction(params) ? { message: params } : params;
	const normalized = {
		...messageDefaults,
		...options
	};
	normalizeAppendTo(normalized);
	normalizePlacement(normalized);
	if (isBoolean(messageConfig.grouping) && !normalized.grouping) normalized.grouping = messageConfig.grouping;
	if (isNumber(messageConfig.duration) && normalized.duration === 3e3) normalized.duration = messageConfig.duration;
	if (isNumber(messageConfig.offset) && normalized.offset === 16) normalized.offset = messageConfig.offset;
	if (isBoolean(messageConfig.showClose) && !normalized.showClose) normalized.showClose = messageConfig.showClose;
	if (isBoolean(messageConfig.plain) && !normalized.plain) normalized.plain = messageConfig.plain;
	return normalized;
};
const closeMessage = (instance) => {
	const instances = placementInstances[instance.props.placement || MESSAGE_DEFAULT_PLACEMENT];
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
			render(null, container);
		}
	};
	const vnode = createVNode(message_default, props, isFunction(props.message) || isVNode(props.message) ? { default: isFunction(props.message) ? props.message : () => props.message } : null);
	vnode.appContext = context || message._context;
	render(vnode, container);
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
	if (!isClient) return { close: () => void 0 };
	const normalized = normalizeOptions(options);
	const instances = getOrCreatePlacementInstances(normalized.placement || MESSAGE_DEFAULT_PLACEMENT);
	if (normalized.grouping && instances.length) {
		const instance = instances.find(({ vnode: vm }) => vm.props?.message === normalized.message);
		if (instance) {
			instance.props.repeatNum += 1;
			instance.props.type = normalized.type;
			return instance.handler;
		}
	}
	if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) return { close: () => void 0 };
	const instance = createMessage(normalized, context);
	instances.push(instance);
	return instance.handler;
};
messageTypes.forEach((type) => {
	message[type] = (options = {}, appContext) => {
		return message({
			...normalizeOptions(options),
			type
		}, appContext);
	};
});
function closeAll(type) {
	for (const placement in placementInstances) if (hasOwn(placementInstances, placement)) {
		const instances = [...placementInstances[placement]];
		for (const instance of instances) if (!type || type === instance.props.type) instance.handler.close();
	}
}
function closeAllByPlacement(placement) {
	if (!placementInstances[placement]) return;
	[...placementInstances[placement]].forEach((instance) => instance.handler.close());
}
message.closeAll = closeAll;
message.closeAllByPlacement = closeAllByPlacement;
message._context = null;

//#endregion
export { closeAll, closeAllByPlacement, message as default };
//# sourceMappingURL=method.mjs.map