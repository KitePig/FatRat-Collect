Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/date-picker-panel/src/composables/use-shortcut.ts
const useShortcut = (lang) => {
	const { emit } = (0, vue.getCurrentInstance)();
	const attrs = (0, vue.useAttrs)();
	const slots = (0, vue.useSlots)();
	const handleShortcutClick = (shortcut) => {
		const shortcutValues = (0, _vue_shared.isFunction)(shortcut.value) ? shortcut.value() : shortcut.value;
		if (shortcutValues) {
			emit("pick", [(0, dayjs.default)(shortcutValues[0]).locale(lang.value), (0, dayjs.default)(shortcutValues[1]).locale(lang.value)]);
			return;
		}
		if (shortcut.onClick) shortcut.onClick({
			attrs,
			slots,
			emit
		});
	};
	return handleShortcutClick;
};

//#endregion
exports.useShortcut = useShortcut;
//# sourceMappingURL=use-shortcut.js.map