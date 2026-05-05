import { EVENT_CODE } from "../../../../constants/aria.mjs";
import { getEventCode } from "../../../../utils/dom/event.mjs";
import { getClientXY } from "../../../../utils/dom/position.mjs";
import { addUnit } from "../../../../utils/dom/style.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { draggable } from "../utils/draggable.mjs";
import { computed, getCurrentInstance, onMounted, ref, shallowRef, watch } from "vue";

//#region ../../packages/components/color-picker-panel/src/composables/use-slider.ts
const useSlider = (props, { key, minValue, maxValue }) => {
	const instance = getCurrentInstance();
	const thumb = shallowRef();
	const bar = shallowRef();
	const currentValue = computed(() => props.color.get(key));
	function handleClick(event) {
		if (props.disabled) return;
		if (event.target !== thumb.value) handleDrag(event);
		thumb.value?.focus();
	}
	function handleDrag(event) {
		if (!bar.value || !thumb.value || props.disabled) return;
		const rect = instance.vnode.el.getBoundingClientRect();
		const { clientX, clientY } = getClientXY(event);
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
		const code = getEventCode(event);
		const step = shiftKey ? 10 : 1;
		const reverse = key === "hue" ? -1 : 1;
		let isPreventDefault = true;
		switch (code) {
			case EVENT_CODE.left:
			case EVENT_CODE.down:
				incrementPosition(-step * reverse);
				break;
			case EVENT_CODE.right:
			case EVENT_CODE.up:
				incrementPosition(step * reverse);
				break;
			case EVENT_CODE.home:
				props.color.set(key, key === "hue" ? maxValue : minValue);
				break;
			case EVENT_CODE.end:
				props.color.set(key, key === "hue" ? minValue : maxValue);
				break;
			case EVENT_CODE.pageDown:
				incrementPosition(-4 * reverse);
				break;
			case EVENT_CODE.pageUp:
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
	const instance = getCurrentInstance();
	const ns = useNamespace(namespace);
	const thumbLeft = ref(0);
	const thumbTop = ref(0);
	const background = ref();
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
	onMounted(() => {
		if (!bar.value || !thumb.value) return;
		const dragConfig = {
			drag: (event) => {
				handleDrag(event);
			},
			end: (event) => {
				handleDrag(event);
			}
		};
		draggable(bar.value, dragConfig);
		draggable(thumb.value, dragConfig);
		update();
	});
	watch(currentValue, () => update());
	watch(() => props.color.value, () => update());
	const rootKls = computed(() => [
		ns.b(),
		ns.is("vertical", props.vertical),
		ns.is("disabled", props.disabled)
	]);
	const barKls = computed(() => ns.e("bar"));
	const thumbKls = computed(() => ns.e("thumb"));
	return {
		rootKls,
		barKls,
		barStyle: computed(() => ({ background: background.value })),
		thumbKls,
		thumbStyle: computed(() => ({
			left: addUnit(thumbLeft.value),
			top: addUnit(thumbTop.value)
		})),
		thumbLeft,
		thumbTop,
		update
	};
};

//#endregion
export { useSlider, useSliderDOM };
//# sourceMappingURL=use-slider.mjs.map