import { isNumber } from "../../utils/types.mjs";
import { buildProps } from "../../utils/vue/props/runtime.mjs";
import { useTimeout } from "../use-timeout/index.mjs";
import { unref } from "vue";

//#region ../../packages/hooks/use-delayed-toggle/index.ts
/**
* @deprecated Removed after 3.0.0, Use `UseDelayedToggleProps` instead.
*/
const useDelayedToggleProps = buildProps({
	showAfter: {
		type: Number,
		default: 0
	},
	hideAfter: {
		type: Number,
		default: 200
	},
	autoClose: {
		type: Number,
		default: 0
	}
});
const useDelayedTogglePropsDefaults = {
	showAfter: 0,
	hideAfter: 200,
	autoClose: 0
};
const useDelayedToggle = ({ showAfter, hideAfter, autoClose, open, close }) => {
	const { registerTimeout } = useTimeout();
	const { registerTimeout: registerTimeoutForAutoClose, cancelTimeout: cancelTimeoutForAutoClose } = useTimeout();
	const onOpen = (event, delay = unref(showAfter)) => {
		registerTimeout(() => {
			open(event);
			const _autoClose = unref(autoClose);
			if (isNumber(_autoClose) && _autoClose > 0) registerTimeoutForAutoClose(() => {
				close(event);
			}, _autoClose);
		}, delay);
	};
	const onClose = (event, delay = unref(hideAfter)) => {
		cancelTimeoutForAutoClose();
		registerTimeout(() => {
			close(event);
		}, delay);
	};
	return {
		onOpen,
		onClose
	};
};

//#endregion
export { useDelayedToggle, useDelayedToggleProps, useDelayedTogglePropsDefaults };
//# sourceMappingURL=index.mjs.map