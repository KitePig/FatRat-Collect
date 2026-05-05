const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../constants/event.js');
const require_event$1 = require('../../../utils/dom/event.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_constants = require('../../form/src/constants.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_rate = require('./rate.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

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
var rate_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElRate",
	__name: "rate",
	props: require_rate.rateProps,
	emits: require_rate.rateEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		function getValueFromMap(value, map) {
			const isExcludedObject = (val) => (0, _vue_shared.isObject)(val);
			const matchedValue = map[Object.keys(map).map((key) => +key).filter((key) => {
				const val = map[key];
				return (isExcludedObject(val) ? val.excluded : false) ? value < key : value <= key;
			}).sort((a, b) => a - b)[0]];
			return isExcludedObject(matchedValue) && matchedValue.value || matchedValue;
		}
		const props = __props;
		const emit = __emit;
		const formItemContext = (0, vue.inject)(require_constants.formItemContextKey, void 0);
		const rateSize = require_use_form_common_props.useFormSize();
		const ns = require_index.useNamespace("rate");
		const { inputId, isLabeledByFormItem } = require_use_form_item.useFormItemInputId(props, { formItemContext });
		const currentValue = (0, vue.ref)((0, lodash_unified.clamp)(props.modelValue, 0, props.max));
		const hoverIndex = (0, vue.ref)(-1);
		const pointerAtLeftHalf = (0, vue.ref)(true);
		const iconRefs = (0, vue.ref)([]);
		const iconClientWidths = (0, vue.computed)(() => iconRefs.value.map((icon) => icon.$el.clientWidth));
		const rateClasses = (0, vue.computed)(() => [ns.b(), ns.m(rateSize.value)]);
		const rateDisabled = require_use_form_common_props.useFormDisabled();
		const rateStyles = (0, vue.computed)(() => {
			return ns.cssVarBlock({
				"void-color": props.voidColor,
				"disabled-void-color": props.disabledVoidColor,
				"fill-color": activeColor.value
			});
		});
		const text = (0, vue.computed)(() => {
			let result = "";
			if (props.showScore) result = props.scoreTemplate.replace(/\{\s*value\s*\}/, rateDisabled.value ? `${props.modelValue}` : `${currentValue.value}`);
			else if (props.showText) result = props.texts[Math.ceil(currentValue.value) - 1];
			return result;
		});
		const valueDecimal = (0, vue.computed)(() => props.modelValue * 100 - Math.floor(props.modelValue) * 100);
		const colorMap = (0, vue.computed)(() => (0, _vue_shared.isArray)(props.colors) ? {
			[props.lowThreshold]: props.colors[0],
			[props.highThreshold]: {
				value: props.colors[1],
				excluded: true
			},
			[props.max]: props.colors[2]
		} : props.colors);
		const activeColor = (0, vue.computed)(() => {
			const color = getValueFromMap(currentValue.value, colorMap.value);
			return (0, _vue_shared.isObject)(color) ? "" : color;
		});
		const decimalStyle = (0, vue.computed)(() => {
			let width = "";
			if (rateDisabled.value) width = `${valueDecimal.value}%`;
			else if (props.allowHalf) width = "50%";
			return {
				color: activeColor.value,
				width
			};
		});
		const componentMap = (0, vue.computed)(() => {
			let icons = (0, _vue_shared.isArray)(props.icons) ? [...props.icons] : { ...props.icons };
			icons = (0, vue.markRaw)(icons);
			return (0, _vue_shared.isArray)(icons) ? {
				[props.lowThreshold]: icons[0],
				[props.highThreshold]: {
					value: icons[1],
					excluded: true
				},
				[props.max]: icons[2]
			} : icons;
		});
		const decimalIconComponent = (0, vue.computed)(() => getValueFromMap(props.modelValue, componentMap.value));
		const voidComponent = (0, vue.computed)(() => rateDisabled.value ? (0, _vue_shared.isString)(props.disabledVoidIcon) ? props.disabledVoidIcon : (0, vue.markRaw)(props.disabledVoidIcon) : (0, _vue_shared.isString)(props.voidIcon) ? props.voidIcon : (0, vue.markRaw)(props.voidIcon));
		const activeComponent = (0, vue.computed)(() => getValueFromMap(currentValue.value, componentMap.value));
		function showDecimalIcon(item) {
			const showWhenDisabled = rateDisabled.value && valueDecimal.value > 0 && item - 1 < props.modelValue && item > props.modelValue;
			const showWhenAllowHalf = props.allowHalf && pointerAtLeftHalf.value && item - .5 <= currentValue.value && item > currentValue.value;
			return showWhenDisabled || showWhenAllowHalf;
		}
		function emitValue(value) {
			if (props.clearable && value === props.modelValue) value = 0;
			emit(require_event.UPDATE_MODEL_EVENT, value);
			if (props.modelValue !== value) emit(require_event.CHANGE_EVENT, value);
		}
		function selectValue(value) {
			if (rateDisabled.value) return;
			if (props.allowHalf && pointerAtLeftHalf.value) emitValue(currentValue.value);
			else emitValue(value);
		}
		function handleKey(e) {
			if (rateDisabled.value) return;
			const code = require_event$1.getEventCode(e);
			const step = props.allowHalf ? .5 : 1;
			let _currentValue = currentValue.value;
			switch (code) {
				case require_aria.EVENT_CODE.up:
				case require_aria.EVENT_CODE.right:
					_currentValue += step;
					break;
				case require_aria.EVENT_CODE.left:
				case require_aria.EVENT_CODE.down:
					_currentValue -= step;
					break;
			}
			_currentValue = (0, lodash_unified.clamp)(_currentValue, 0, props.max);
			if (_currentValue === currentValue.value) return;
			e.stopPropagation();
			e.preventDefault();
			emit(require_event.UPDATE_MODEL_EVENT, _currentValue);
			emit(require_event.CHANGE_EVENT, _currentValue);
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
			currentValue.value = (0, lodash_unified.clamp)(props.modelValue, 0, props.max);
			hoverIndex.value = -1;
		}
		(0, vue.watch)(() => props.modelValue, (val) => {
			currentValue.value = (0, lodash_unified.clamp)(val, 0, props.max);
			pointerAtLeftHalf.value = props.modelValue !== Math.floor(props.modelValue);
		});
		if (!props.modelValue) emit(require_event.UPDATE_MODEL_EVENT, 0);
		__expose({
			setCurrentValue,
			resetCurrentValue
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				id: (0, vue.unref)(inputId),
				class: (0, vue.normalizeClass)([rateClasses.value, (0, vue.unref)(ns).is("disabled", (0, vue.unref)(rateDisabled))]),
				role: "slider",
				"aria-label": !(0, vue.unref)(isLabeledByFormItem) ? __props.ariaLabel || "rating" : void 0,
				"aria-labelledby": (0, vue.unref)(isLabeledByFormItem) ? (0, vue.unref)(formItemContext)?.labelId : void 0,
				"aria-valuenow": currentValue.value,
				"aria-valuetext": text.value || void 0,
				"aria-valuemin": "0",
				"aria-valuemax": __props.max,
				style: (0, vue.normalizeStyle)(rateStyles.value),
				tabindex: (0, vue.unref)(rateDisabled) ? void 0 : 0,
				"aria-disabled": (0, vue.unref)(rateDisabled),
				onKeydown: handleKey
			}, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.max, (item, key) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
					key,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("item")),
					onMousemove: ($event) => setCurrentValue(item, $event),
					onMouseleave: resetCurrentValue,
					onClick: ($event) => selectValue(item)
				}, [(0, vue.createVNode)((0, vue.unref)(require_index$1.ElIcon), {
					ref_for: true,
					ref_key: "iconRefs",
					ref: iconRefs,
					class: (0, vue.normalizeClass)([
						(0, vue.unref)(ns).e("icon"),
						{ hover: hoverIndex.value === item },
						(0, vue.unref)(ns).is("active", item <= currentValue.value),
						(0, vue.unref)(ns).is("focus-visible", item === Math.ceil(currentValue.value || 1))
					])
				}, {
					default: (0, vue.withCtx)(() => [
						(0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(activeComponent.value), null, null, 512)), [[vue.vShow, !showDecimalIcon(item) && item <= currentValue.value]]),
						(0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(voidComponent.value), null, null, 512)), [[vue.vShow, !showDecimalIcon(item) && item > currentValue.value]]),
						(0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(voidComponent.value), { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).em("decimal", "box")]) }, null, 8, ["class"])), [[vue.vShow, showDecimalIcon(item)]]),
						(0, vue.withDirectives)((0, vue.createVNode)((0, vue.unref)(require_index$1.ElIcon), {
							style: (0, vue.normalizeStyle)(decimalStyle.value),
							class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("icon"), (0, vue.unref)(ns).e("decimal")])
						}, {
							default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(decimalIconComponent.value)))]),
							_: 1
						}, 8, ["style", "class"]), [[vue.vShow, showDecimalIcon(item)]])
					]),
					_: 2
				}, 1032, ["class"])], 42, _hoisted_2);
			}), 128)), __props.showText || __props.showScore ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
				key: 0,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("text")),
				style: (0, vue.normalizeStyle)({ color: __props.textColor })
			}, (0, vue.toDisplayString)(text.value), 7)) : (0, vue.createCommentVNode)("v-if", true)], 46, _hoisted_1);
		};
	}
});

//#endregion
exports.default = rate_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=rate.vue_vue_type_script_setup_true_lang.js.map