//#region ../../packages/components/backtop/src/backtop.ts
/**
* @deprecated Removed after 3.0.0, Use `BacktopProps` instead.
*/
const backtopProps = {
	visibilityHeight: {
		type: Number,
		default: 200
	},
	target: {
		type: String,
		default: ""
	},
	right: {
		type: Number,
		default: 40
	},
	bottom: {
		type: Number,
		default: 40
	}
};
const backtopEmits = { click: (evt) => evt instanceof MouseEvent };

//#endregion
export { backtopEmits, backtopProps };
//# sourceMappingURL=backtop.mjs.map