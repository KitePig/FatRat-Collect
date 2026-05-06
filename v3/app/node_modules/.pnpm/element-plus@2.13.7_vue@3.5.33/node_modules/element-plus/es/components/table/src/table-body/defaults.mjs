//#region ../../packages/components/table/src/table-body/defaults.ts
const defaultProps = {
	store: {
		required: true,
		type: Object
	},
	stripe: Boolean,
	tooltipEffect: String,
	tooltipOptions: { type: Object },
	context: {
		default: () => ({}),
		type: Object
	},
	rowClassName: [String, Function],
	rowStyle: [Object, Function],
	fixed: {
		type: String,
		default: ""
	},
	highlight: Boolean
};

//#endregion
export { defaultProps as default };
//# sourceMappingURL=defaults.mjs.map