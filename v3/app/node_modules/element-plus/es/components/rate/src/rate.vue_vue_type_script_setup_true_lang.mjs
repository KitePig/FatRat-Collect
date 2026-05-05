import { EVENT_CODE } from "../../../constants/aria.mjs";
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { isArray, isObject, isString } from "../../../utils/types.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { formItemContextKey } from "../../form/src/constants.mjs";
import { useFormDisabled, useFormSize } from "../../form/src/hooks/use-form-common-props.mjs";
import { useFormItemInputId } from "../../form/src/hooks/use-form-item.mjs";
import { rateEmits, rateProps } from "./rate.mjs";
import { clamp } from "lodash-unified";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createVNode, defineComponent, inject, markRaw, normalizeClass, normalizeStyle, openBlock, ref, renderList, resolveDynamicComponent, toDisplayString, unref, vShow, watch, withCtx, withDirectives } from "vue";

//#region ../../packages/components/rate/src/rate.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"aria-label",
	"aria-labelledby",
	"aria-valuenow",
	"aria-valuetext",
	"aria-valuemax",
	"tabindex",
	"aria-disabled"
];
const _hoisted_2 = ["onMousemove", "onClick"];
var rate_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElRate",
	__name: "rate",
	props: rateProps,
	emits: rateEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		function getValueFromMap(value, map) {
			const isExcludedObject = (val) => isObject(val);
			const matchedValue = map[Object.keys(map).map((key) => +key).filter((key) => {
				const val = map[key];
				return (isExcludedObject(val) ? val.excluded : false) ? value < key : value <= key;
			}).sort((a, b) => a - b)[0]];
			return isExcludedObject(matchedValue) && matchedValue.value || matchedValue;
		}
		const props = __props;
		const emit = __emit;
		const formItemContext = inject(formItemContextKey, void 0);
		const rateSize = useFormSize();
		const ns = useNamespace("rate");
		const { inputId, isLabeledByFormItem } = useFormItemInputId(props, { formItemContext });
		const currentValue = ref(clamp(props.modelValue, 0, props.max));
		const hoverIndex = ref(-1);
		const pointerAtLeftHalf = ref(true);
		const iconRefs = ref([]);
		const iconClientWidths = computed(() => iconRefs.value.map((icon) => icon.$el.clientWidth));
		const rateClasses = computed(() => [ns.b(), ns.m(rateSize.value)]);
		const rateDisabled = useFormDisabled();
		const rateStyles = computed(() => {
			return ns.cssVarBlock({
				"void-color": props.voidColor,
				"disabled-void-color": props.disabledVoidColor,
				"fill-color": activeColor.value
			});
		});
		const text = computed(() => {
			let result = "";
			if (props.showScore) result = props.scoreTemplate.replace(/\{\s*value\s*\}/, rateDisabled.value ? `${props.modelValue}` : `${currentValue.value}`);
			else if (props.showText) result = props.texts[Math.ceil(currentValue.value) - 1];
			return result;
		});
		const valueDecimal = computed(() => props.modelValue * 100 - Math.floor(props.modelValue) * 100);
		const colorMap = computed(() => isArray(props.colors) ? {
			[props.lowThreshold]: props.colors[0],
			[props.highThreshold]: {
				value: props.colors[1],
				excluded: true
			},
			[props.max]: props.colors[2]
		} : props.colors);
		const activeColor = computed(() => {
			const color = getValueFromMap(currentValue.value, colorMap.value);
			return isObject(color) ? "" : color;
		});
		const decimalStyle = computed(() => {
			let width = "";
			if (rateDisabled.value) width = `${valueDecimal.value}%`;
			else if (props.allowHalf) width = "50%";
			return {
				color: activeColor.value,
				width
			};
		});
		const componentMap = computed(() => {
			let icons = isArray(props.icons) ? [...props.icons] : { ...props.icons };
			icons = markRaw(icons);
			return isArray(icons) ? {
				[props.lowThreshold]: icons[0],
				[props.highThreshold]: {
					value: icons[1],
					excluded: true
				},
				[props.max]: icons[2]
			} : icons;
		});
		const decimalIconComponent = computed(() => getValueFromMap(props.modelValue, componentMap.value));
		const voidComponent = computed(() => rateDisabled.value ? isString(props.disabledVoidIcon) ? props.disabledVoidIcon : markRaw(props.disabledVoidIcon) : isString(props.voidIcon) ? props.voidIcon : markRaw(props.voidIcon));
		const activeComponent = computed(() => getValueFromMap(currentValue.value, componentMap.value));
		function showDecimalIcon(item) {
			const showWhenDisabled = rateDisabled.value && valueDecimal.value > 0 && item - 1 < props.modelValue && item > props.modelValue;
			const showWhenAllowHalf = props.allowHalf && pointerAtLeftHalf.value && item - .5 <= currentValue.value && item > currentValue.value;
			return showWhenDisabled || showWhenAllowHalf;
		}
		function emitValue(value) {
			if (props.clearable && value === props.modelValue) value = 0;
			emit(UPDATE_MODEL_EVENT, value);
			if (props.modelValue !== value) emit(CHANGE_EVENT, value);
		}
		function selectValue(value) {
			if (rateDisabled.value) return;
			if (props.allowHalf && pointerAtLeftHalf.value) emitValue(currentValue.value);
			else emitValue(value);
		}
		function handleKey(e) {
			if (rateDisabled.value) return;
			const code = getEventCode(e);
			const step = props.allowHalf ? .5 : 1;
			let _currentValue = currentValue.value;
			switch (code) {
				case EVENT_CODE.up:
				case EVENT_CODE.right:
					_currentValue += step;
					break;
				case EVENT_CODE.left:
				case EVENT_CODE.down:
					_currentValue -= step;
					break;
			}
			_currentValue = clamp(_currentValue, 0, props.max);
			if (_currentValue === currentValue.value) return;
			e.stopPropagation();
			e.preventDefault();
			emit(UPDATE_MODEL_EVENT, _currentValue);
			emit(CHANGE_EVENT, _currentValue);
			return _currentValue;
		}
		function setCurrentValue(value, event) {
			if (rateDisabled.value) return;
			if (props.allowHalf && event) {
				pointerAtLeftHalf.value = event.offsetX * 2 <= iconClientWidths.value[value - 1];
				currentValue.value = pointerAtLeftHalf.value ? value - .5 : value;
			} else currentValue.value = value;
			hoverIndex.value = value;
		}
		function resetCurrentValue() {
			if (rateDisabled.value) return;
			if (props.allowHalf) pointerAtLeftHalf.value = props.modelValue !== Math.floor(props.modelValue);
			currentValue.value = clamp(props.modelValue, 0, props.max);
			hoverIndex.value = -1;
		}
		watch(() => props.modelValue, (val) => {
			currentValue.value = clamp(val, 0, props.max);
			pointerAtLeftHalf.value = props.modelValue !== Math.floor(props.modelValue);
		});
		if (!props.modelValue) emit(UPDATE_MODEL_EVENT, 0);
		__expose({
			setCurrentValue,
			resetCurrentValue
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				id: unref(inputId),
				class: normalizeClass([rateClasses.value, unref(ns).is("disabled", unref(rateDisabled))]),
				role: "slider",
				"aria-label": !unref(isLabeledByFormItem) ? __props.ariaLabel || "rating" : void 0,
				"aria-labelledby": unref(isLabeledByFormItem) ? unref(formItemContext)?.labelId : void 0,
				"aria-valuenow": currentValue.value,
				"aria-valuetext": text.value || void 0,
				"aria-valuemin": "0",
				"aria-valuemax": __props.max,
				style: normalizeStyle(rateStyles.value),
				tabindex: unref(rateDisabled) ? void 0 : 0,
				"aria-disabled": unref(rateDisabled),
				onKeydown: handleKey
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.max, (item, key) => {
				return openBlock(), createElementBlock("span", {
					key,
					class: normalizeClass(unref(ns).e("item")),
					onMousemove: ($event) => setCurrentValue(item, $event),
					onMouseleave: resetCurrentValue,
					onClick: ($event) => selectValue(item)
				}, [createVNode(unref(ElIcon), {
					ref_for: true,
					ref_key: "iconRefs",
					ref: iconRefs,
					class: normalizeClass([
						unref(ns).e("icon"),
						{ hover: hoverIndex.value === item },
						unref(ns).is("active", item <= currentValue.value),
						unref(ns).is("focus-visible", item === Math.ceil(currentValue.value || 1))
					])
				}, {
					default: withCtx(() => [
						withDirectives((openBlock(), createBlock(resolveDynamicComponent(activeComponent.value), null, null, 512)), [[vShow, !showDecimalIcon(item) && item <= currentValue.value]]),
						withDirectives((openBlock(), createBlock(resolveDynamicComponent(voidComponent.value), null, null, 512)), [[vShow, !showDecimalIcon(item) && item > currentValue.value]]),
						withDirectives((openBlock(), createBlock(resolveDynamicComponent(voidComponent.value), { class: normalizeClass([unref(ns).em("decimal", "box")]) }, null, 8, ["class"])), [[vShow, showDecimalIcon(item)]]),
						withDirectives(createVNode(unref(ElIcon), {
							style: normalizeStyle(decimalStyle.value),
							class: normalizeClass([unref(ns).e("icon"), unref(ns).e("decimal")])
						}, {
							default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(decimalIconComponent.value)))]),
							_: 1
						}, 8, ["style", "class"]), [[vShow, showDecimalIcon(item)]])
					]),
					_: 2
				}, 1032, ["class"])], 42, _hoisted_2);
			}), 128)), __props.showText || __props.showScore ? (openBlock(), createElementBlock("span", {
				key: 0,
				class: normalizeClass(unref(ns).e("text")),
				style: normalizeStyle({ color: __props.textColor })
			}, toDisplayString(text.value), 7)) : createCommentVNode("v-if", true)], 46, _hoisted_1);
		};
	}
});

//#endregion
export { rate_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=rate.vue_vue_type_script_setup_true_lang.mjs.map