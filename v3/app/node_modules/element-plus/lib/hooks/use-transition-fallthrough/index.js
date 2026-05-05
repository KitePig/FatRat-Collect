Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/hooks/use-transition-fallthrough/index.ts
/* istanbul ignore file */
const AFTER_APPEAR = "after-appear";
const AFTER_ENTER = "after-enter";
const AFTER_LEAVE = "after-leave";
const APPEAR = "appear";
const APPEAR_CANCELLED = "appear-cancelled";
const BEFORE_ENTER = "before-enter";
const BEFORE_LEAVE = "before-leave";
const ENTER = "enter";
const ENTER_CANCELLED = "enter-cancelled";
const LEAVE = "leave";
const LEAVE_CANCELLED = "leave-cancelled";
const useTransitionFallthroughEmits = [
	AFTER_APPEAR,
	AFTER_ENTER,
	AFTER_LEAVE,
	APPEAR,
	APPEAR_CANCELLED,
	BEFORE_ENTER,
	BEFORE_LEAVE,
	ENTER,
	ENTER_CANCELLED,
	LEAVE,
	LEAVE_CANCELLED
];
/**
* NOTE:
* This is only a delegator for delegating transition callbacks.
* Use this at your need.
*/
/**
* Simple usage
*
* In your setups:
*
* setup() {
*   const fallthroughMethods = useTransitionFallthrough()
*   return fallthrough
* }
*
* In your template:
*
* <template>
*  <transition name="whatever" v-bind="fallthrough">
*    <slot />
*  </transition>
* </template>
*
*/
const useTransitionFallthrough = () => {
	const { emit } = (0, vue.getCurrentInstance)();
	return {
		onAfterAppear: () => {
			emit(AFTER_APPEAR);
		},
		onAfterEnter: () => {
			emit(AFTER_ENTER);
		},
		onAfterLeave: () => {
			emit(AFTER_LEAVE);
		},
		onAppearCancelled: () => {
			emit(APPEAR_CANCELLED);
		},
		onBeforeEnter: () => {
			emit(BEFORE_ENTER);
		},
		onBeforeLeave: () => {
			emit(BEFORE_LEAVE);
		},
		onEnter: () => {
			emit(ENTER);
		},
		onEnterCancelled: () => {
			emit(ENTER_CANCELLED);
		},
		onLeave: () => {
			emit(LEAVE);
		},
		onLeaveCancelled: () => {
			emit(LEAVE_CANCELLED);
		}
	};
};

//#endregion
exports.useTransitionFallthrough = useTransitionFallthrough;
exports.useTransitionFallthroughEmits = useTransitionFallthroughEmits;
//# sourceMappingURL=index.js.map