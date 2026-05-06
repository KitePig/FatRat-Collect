Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_tokens = require('./tokens.js');
let vue = require("vue");

//#region ../../packages/components/dropdown/src/useDropdown.ts
const useDropdown = () => {
	const elDropdown = (0, vue.inject)(require_tokens.DROPDOWN_INSTANCE_INJECTION_KEY, {});
	return {
		elDropdown,
		_elDropdownSize: (0, vue.computed)(() => elDropdown?.dropdownSize)
	};
};

//#endregion
exports.useDropdown = useDropdown;
//# sourceMappingURL=useDropdown.js.map