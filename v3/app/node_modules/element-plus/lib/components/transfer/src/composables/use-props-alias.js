Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/components/transfer/src/composables/use-props-alias.ts
const usePropsAlias = (props) => {
	const initProps = {
		label: "label",
		key: "key",
		disabled: "disabled"
	};
	return (0, vue.computed)(() => ({
		...initProps,
		...props.props
	}));
};

//#endregion
exports.usePropsAlias = usePropsAlias;
//# sourceMappingURL=use-props-alias.js.map