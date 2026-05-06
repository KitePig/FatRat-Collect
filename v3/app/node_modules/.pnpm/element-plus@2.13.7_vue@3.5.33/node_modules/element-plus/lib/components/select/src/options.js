Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_token = require('./token.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/select/src/options.ts
var options_default = (0, vue.defineComponent)({
	name: "ElOptions",
	setup(_, { slots }) {
		const select = (0, vue.inject)(require_token.selectKey);
		let cachedValueList = [];
		return () => {
			const children = slots.default?.();
			const valueList = [];
			function filterOptions(children) {
				if (!(0, _vue_shared.isArray)(children)) return;
				children.forEach((item) => {
					const name = (item?.type || {})?.name;
					if (name === "ElOptionGroup") filterOptions(!(0, _vue_shared.isString)(item.children) && !(0, _vue_shared.isArray)(item.children) && (0, _vue_shared.isFunction)(item.children?.default) ? item.children?.default() : item.children);
					else if (name === "ElOption") valueList.push(item.props?.value);
					else if ((0, _vue_shared.isArray)(item.children)) filterOptions(item.children);
				});
			}
			if (children.length) filterOptions(children[0]?.children);
			if (!(0, lodash_unified.isEqual)(valueList, cachedValueList)) {
				cachedValueList = valueList;
				if (select) select.states.optionValues = valueList;
			}
			return children;
		};
	}
});

//#endregion
exports.default = options_default;
//# sourceMappingURL=options.js.map