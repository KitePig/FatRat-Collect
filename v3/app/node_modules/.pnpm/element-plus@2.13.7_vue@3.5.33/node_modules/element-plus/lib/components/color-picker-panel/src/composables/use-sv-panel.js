Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../../constants/aria.js');
const require_event = require('../../../../utils/dom/event.js');
const require_position = require('../../../../utils/dom/position.js');
const require_style = require('../../../../utils/dom/style.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_draggable = require('../utils/draggable.js');
let vue = require("vue");

//#region ../../packages/components/color-picker-panel/src/composables/use-sv-panel.ts
const useSvPanel = (props) => {
	const instance = (0, vue.getCurrentInstance)();
	const cursorRef = (0, vue.ref)();
	const cursorTop = (0, vue.ref)(0);
	const cursorLeft = (0, vue.ref)(0);
	const background = (0, vue.ref)("hsl(0, 100%, 50%)");
	const saturation = (0, vue.computed)(() => props.color.get("saturation"));
	const brightness = (0, vue.computed)(() => props.color.get("value"));
	const hue = (0, vue.computed)(() => props.color.get("hue"));
	function handleClick(event) {
		if (props.disabled) return;
		if (event.target !== cursorRef.value) handleDrag(event);
		cursorRef.value?.focus({ preventScroll: true });
	}
	function handleDrag(event) {
		if (props.disabled) return;
		const rect = instance.vnode.el.getBoundingClientRect();
		const { clientX, clientY } = require_position.getClientXY(event);
		let left = clientX - rect.left;
		let top = clientY - rect.top;
		left = Math.max(0, left);
		left = Math.min(left, rect.width);
		top = Math.max(0, top);
		top = Math.min(top, rect.height);
		cursorLeft.value = left;
		cursorTop.value = top;
		props.color.set({
			saturation: left / rect.width * 100,
			value: 100 - top / rect.height * 100
		});
	}
	function handleKeydown(event) {
		if (props.disabled) return;
		const { shiftKey } = event;
		const code = require_event.getEventCode(event);
		const step = shiftKey ? 10 : 1;
		let isPreventDefault = true;
		switch (code) {
			case require_aria.EVENT_CODE.left:
				incrementSaturation(-step);
				break;
			case require_aria.EVENT_CODE.right:
				incrementSaturation(step);
				break;
			case require_aria.EVENT_CODE.up:
				incrementBrightness(step);
				break;
			case require_aria.EVENT_CODE.down:
				incrementBrightness(-step);
				break;
			default:
				isPreventDefault = false;
				break;
		}
		isPreventDefault && event.preventDefault();
	}
	function incrementSaturation(step) {
		let next = saturation.value + step;
		next = next < 0 ? 0 : next > 100 ? 100 : next;
		props.color.set("saturation", next);
	}
	function incrementBrightness(step) {
		let next = brightness.value + step;
		next = next < 0 ? 0 : next > 100 ? 100 : next;
		props.color.set("value", next);
	}
	return {
		cursorRef,
		cursorTop,
		cursorLeft,
		background,
		saturation,
		brightness,
		hue,
		handleClick,
		handleDrag,
		handleKeydown
	};
};
const useSvPanelDOM = (props, { cursorTop, cursorLeft, background, handleDrag }) => {
	const instance = (0, vue.getCurrentInstance)();
	const ns = require_index.useNamespace("color-svpanel");
	function update() {
		const saturation = props.color.get("saturation");
		const brightness = props.color.get("value");
		const { clientWidth: width, clientHeight: height } = instance.vnode.el;
		cursorLeft.value = saturation * width / 100;
		cursorTop.value = (100 - brightness) * height / 100;
		background.value = `hsl(${props.color.get("hue")}, 100%, 50%)`;
	}
	(0, vue.onMounted)(() => {
		require_draggable.draggable(instance.vnode.el, {
			drag: (event) => {
				handleDrag(event);
			},
			end: (event) => {
				handleDrag(event);
			}
		});
		update();
	});
	(0, vue.watch)([
		() => props.color.get("hue"),
		() => props.color.get("value"),
		() => props.color.value
	], () => update());
	return {
		rootKls: (0, vue.computed)(() => ns.b()),
		cursorKls: (0, vue.computed)(() => ns.e("cursor")),
		rootStyle: (0, vue.computed)(() => ({ backgroundColor: background.value })),
		cursorStyle: (0, vue.computed)(() => ({
			top: require_style.addUnit(cursorTop.value),
			left: require_style.addUnit(cursorLeft.value)
		})),
		update
	};
};

//#endregion
exports.useSvPanel = useSvPanel;
exports.useSvPanelDOM = useSvPanelDOM;
//# sourceMappingURL=use-sv-panel.js.map