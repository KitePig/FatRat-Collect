Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../../constants/aria.js');
const require_event = require('../../../../utils/dom/event.js');
const require_position = require('../../../../utils/dom/position.js');
const require_style = require('../../../../utils/dom/style.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_draggable = require('../utils/draggable.js');
let vue = require("vue");

//#region ../../packages/components/color-picker-panel/src/composables/use-slider.ts
const useSlider = (props, { key, minValue, maxValue }) => {
	const instance = (0, vue.getCurrentInstance)();
	const thumb = (0, vue.shallowRef)();
	const bar = (0, vue.shallowRef)();
	const currentValue = (0, vue.computed)(() => props.color.get(key));
	function handleClick(event) {
		if (props.disabled) return;
		if (event.target !== thumb.value) handleDrag(event);
		thumb.value?.focus();
	}
	function handleDrag(event) {
		if (!bar.value || !thumb.value || props.disabled) return;
		const rect = instance.vnode.el.getBoundingClientRect();
		const { clientX, clientY } = require_position.getClientXY(event);
		let value;
		if (!props.vertical) {
			let left = clientX - rect.left;
			left = Math.max(thumb.value.offsetWidth / 2, left);
			left = Math.min(left, rect.width - thumb.value.offsetWidth / 2);
			value = Math.round((left - thumb.value.offsetWidth / 2) / (rect.width - thumb.value.offsetWidth) * maxValue);
		} else {
			let top = clientY - rect.top;
			top = Math.max(thumb.value.offsetHeight / 2, top);
			top = Math.min(top, rect.height - thumb.value.offsetHeight / 2);
			value = Math.round((top - thumb.value.offsetHeight / 2) / (rect.height - thumb.value.offsetHeight) * maxValue);
		}
		props.color.set(key, value);
	}
	function handleKeydown(event) {
		if (props.disabled) return;
		const { shiftKey } = event;
		const code = require_event.getEventCode(event);
		const step = shiftKey ? 10 : 1;
		const reverse = key === "hue" ? -1 : 1;
		let isPreventDefault = true;
		switch (code) {
			case require_aria.EVENT_CODE.left:
			case require_aria.EVENT_CODE.down:
				incrementPosition(-step * reverse);
				break;
			case require_aria.EVENT_CODE.right:
			case require_aria.EVENT_CODE.up:
				incrementPosition(step * reverse);
				break;
			case require_aria.EVENT_CODE.home:
				props.color.set(key, key === "hue" ? maxValue : minValue);
				break;
			case require_aria.EVENT_CODE.end:
				props.color.set(key, key === "hue" ? minValue : maxValue);
				break;
			case require_aria.EVENT_CODE.pageDown:
				incrementPosition(-4 * reverse);
				break;
			case require_aria.EVENT_CODE.pageUp:
				incrementPosition(4 * reverse);
				break;
			default:
				isPreventDefault = false;
				break;
		}
		isPreventDefault && event.preventDefault();
	}
	function incrementPosition(step) {
		let next = currentValue.value + step;
		next = next < minValue ? minValue : next > maxValue ? maxValue : next;
		props.color.set(key, next);
	}
	return {
		thumb,
		bar,
		currentValue,
		handleDrag,
		handleClick,
		handleKeydown
	};
};
const useSliderDOM = (props, { namespace, maxValue, bar, thumb, currentValue, handleDrag, getBackground }) => {
	const instance = (0, vue.getCurrentInstance)();
	const ns = require_index.useNamespace(namespace);
	const thumbLeft = (0, vue.ref)(0);
	const thumbTop = (0, vue.ref)(0);
	const background = (0, vue.ref)();
	function getThumbLeft() {
		if (!thumb.value) return 0;
		if (props.vertical) return 0;
		const el = instance.vnode.el;
		const value = currentValue.value;
		if (!el) return 0;
		return Math.round(value * (el.offsetWidth - thumb.value.offsetWidth / 2) / maxValue);
	}
	function getThumbTop() {
		if (!thumb.value) return 0;
		const el = instance.vnode.el;
		if (!props.vertical) return 0;
		const value = currentValue.value;
		if (!el) return 0;
		return Math.round(value * (el.offsetHeight - thumb.value.offsetHeight / 2) / maxValue);
	}
	function update() {
		thumbLeft.value = getThumbLeft();
		thumbTop.value = getThumbTop();
		background.value = getBackground?.();
	}
	(0, vue.onMounted)(() => {
		if (!bar.value || !thumb.value) return;
		const dragConfig = {
			drag: (event) => {
				handleDrag(event);
			},
			end: (event) => {
				handleDrag(event);
			}
		};
		require_draggable.draggable(bar.value, dragConfig);
		require_draggable.draggable(thumb.value, dragConfig);
		update();
	});
	(0, vue.watch)(currentValue, () => update());
	(0, vue.watch)(() => props.color.value, () => update());
	const rootKls = (0, vue.computed)(() => [
		ns.b(),
		ns.is("vertical", props.vertical),
		ns.is("disabled", props.disabled)
	]);
	const barKls = (0, vue.computed)(() => ns.e("bar"));
	const thumbKls = (0, vue.computed)(() => ns.e("thumb"));
	return {
		rootKls,
		barKls,
		barStyle: (0, vue.computed)(() => ({ background: background.value })),
		thumbKls,
		thumbStyle: (0, vue.computed)(() => ({
			left: require_style.addUnit(thumbLeft.value),
			top: require_style.addUnit(thumbTop.value)
		})),
		thumbLeft,
		thumbTop,
		update
	};
};

//#endregion
exports.useSlider = useSlider;
exports.useSliderDOM = useSliderDOM;
//# sourceMappingURL=use-slider.js.map