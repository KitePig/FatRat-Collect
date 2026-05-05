Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/components/input-tag/src/composables/use-hovering.ts
function useHovering() {
	const hovering = (0, vue.ref)(false);
	const handleMouseEnter = () => {
		hovering.value = true;
	};
	const handleMouseLeave = () => {
		hovering.value = false;
	};
	return {
		hovering,
		handleMouseEnter,
		handleMouseLeave
	};
}

//#endregion
exports.useHovering = useHovering;
//# sourceMappingURL=use-hovering.js.map