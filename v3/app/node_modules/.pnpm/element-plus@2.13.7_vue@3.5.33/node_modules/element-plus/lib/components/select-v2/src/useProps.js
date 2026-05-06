Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/select-v2/src/useProps.ts
const defaultProps = {
	label: "label",
	value: "value",
	disabled: "disabled",
	options: "options"
};
function useProps(props) {
	const aliasProps = (0, vue.ref)({
		...defaultProps,
		...props.props
	});
	let cache = { ...props.props };
	(0, vue.watch)(() => props.props, (val) => {
		if (!(0, lodash_unified.isEqual)(val, cache)) {
			aliasProps.value = {
				...defaultProps,
				...val
			};
			cache = { ...val };
		}
	}, { deep: true });
	const getLabel = (option) => (0, lodash_unified.get)(option, aliasProps.value.label);
	const getValue = (option) => (0, lodash_unified.get)(option, aliasProps.value.value);
	const getDisabled = (option) => (0, lodash_unified.get)(option, aliasProps.value.disabled);
	const getOptions = (option) => (0, lodash_unified.get)(option, aliasProps.value.options);
	return {
		aliasProps,
		getLabel,
		getValue,
		getDisabled,
		getOptions
	};
}

//#endregion
exports.defaultProps = defaultProps;
exports.useProps = useProps;
//# sourceMappingURL=useProps.js.map