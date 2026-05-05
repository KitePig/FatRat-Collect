Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_error = require('../../../utils/error.js');
const require_notification = require('./notification.js');
const require_notification$1 = require('./notification2.js');
let vue = require("vue");
let _vueuse_core = require("@vueuse/core");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/notification/src/notify.ts
const notifications = {
	"top-left": [],
	"top-right": [],
	"bottom-left": [],
	"bottom-right": []
};
const GAP_SIZE = 16;
let seed = 1;
const notify = function(options = {}, context) {
	if (!_vueuse_core.isClient) return { close: () => void 0 };
	if ((0, _vue_shared.isString)(options) || (0, vue.isVNode)(options)) options = { message: options };
	const position = options.position || "top-right";
	let verticalOffset = options.offset || 0;
	notifications[position].forEach(({ vm }) => {
		verticalOffset += (vm.el?.offsetHeight || 0) + GAP_SIZE;
	});
	verticalOffset += GAP_SIZE;
	const id = `notification_${seed++}`;
	const userOnClose = options.onClose;
	const props = {
		...options,
		offset: verticalOffset,
		id,
		onClose: () => {
			close(id, position, userOnClose);
		}
	};
	let appendTo = document.body;
	if (require_types.isElement(options.appendTo)) appendTo = options.appendTo;
	else if ((0, _vue_shared.isString)(options.appendTo)) appendTo = document.querySelector(options.appendTo);
	if (!require_types.isElement(appendTo)) {
		require_error.debugWarn("ElNotification", "the appendTo option is not an HTMLElement. Falling back to document.body.");
		appendTo = document.body;
	}
	const container = document.createElement("div");
	const vm = (0, vue.createVNode)(require_notification$1.default, props, (0, _vue_shared.isFunction)(props.message) ? props.message : (0, vue.isVNode)(props.message) ? () => props.message : null);
	vm.appContext = require_types.isUndefined(context) ? notify._context : context;
	vm.props.onDestroy = () => {
		(0, vue.render)(null, container);
	};
	(0, vue.render)(vm, container);
	notifications[position].push({ vm });
	appendTo.appendChild(container.firstElementChild);
	return { close: () => {
		vm.component.exposed.visible.value = false;
	} };
};
require_notification.notificationTypes.forEach((type) => {
	notify[type] = (options = {}, appContext) => {
		if ((0, _vue_shared.isString)(options) || (0, vue.isVNode)(options)) options = { message: options };
		return notify({
			...options,
			type
		}, appContext);
	};
});
/**
* This function gets called when user click `x` button or press `esc` or the time reached its limitation.
* Emitted by transition@before-leave event so that we can fetch the current notification.offsetHeight, if this was called
* by @after-leave the DOM element will be removed from the page thus we can no longer fetch the offsetHeight.
* @param {String} id notification id to be closed
* @param {Position} position the positioning strategy
* @param {Function} userOnClose the callback called when close passed by user
*/
function close(id, position, userOnClose) {
	const orientedNotifications = notifications[position];
	const idx = orientedNotifications.findIndex(({ vm }) => vm.component?.props.id === id);
	if (idx === -1) return;
	const { vm } = orientedNotifications[idx];
	if (!vm) return;
	userOnClose?.(vm);
	const removedHeight = vm.el.offsetHeight;
	const verticalPos = position.split("-")[0];
	orientedNotifications.splice(idx, 1);
	const len = orientedNotifications.length;
	if (len < 1) return;
	for (let i = idx; i < len; i++) {
		const { el, component } = orientedNotifications[i].vm;
		const pos = Number.parseInt(el.style[verticalPos], 10) - removedHeight - GAP_SIZE;
		component.props.offset = pos;
	}
}
function closeAll() {
	for (const orientedNotifications of Object.values(notifications)) orientedNotifications.forEach(({ vm }) => {
		vm.component.exposed.visible.value = false;
	});
}
function updateOffsets(position = "top-right") {
	let verticalOffset = notifications[position][0]?.vm.component?.props?.offset || 0;
	for (const { vm } of notifications[position]) {
		vm.component.props.offset = verticalOffset;
		verticalOffset += (vm.el?.offsetHeight || 0) + GAP_SIZE;
	}
}
notify.closeAll = closeAll;
notify.updateOffsets = updateOffsets;
notify._context = null;

//#endregion
exports.close = close;
exports.closeAll = closeAll;
exports.default = notify;
exports.updateOffsets = updateOffsets;
//# sourceMappingURL=notify.js.map