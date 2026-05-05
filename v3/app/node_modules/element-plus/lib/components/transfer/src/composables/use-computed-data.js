Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_use_props_alias = require('./use-props-alias.js');
let vue = require("vue");

//#region ../../packages/components/transfer/src/composables/use-computed-data.ts
const useComputedData = (props) => {
	const propsAlias = require_use_props_alias.usePropsAlias(props);
	const dataObj = (0, vue.computed)(() => props.data.reduce((o, cur) => (o[cur[propsAlias.value.key]] = cur, o), {}));
	return {
		sourceData: (0, vue.computed)(() => props.data.filter((item) => !props.modelValue.includes(item[propsAlias.value.key]))),
		targetData: (0, vue.computed)(() => {
			if (props.targetOrder === "original") return props.data.filter((item) => props.modelValue.includes(item[propsAlias.value.key]));
			else return props.modelValue.reduce((arr, cur) => {
				const val = dataObj.value[cur];
				if (val) arr.push(val);
				return arr;
			}, []);
		})
	};
};

//#endregion
exports.useComputedData = useComputedData;
//# sourceMappingURL=use-computed-data.js.map