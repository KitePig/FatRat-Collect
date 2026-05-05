Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_util = require('./util.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/components/table/src/table-layout.ts
var TableLayout = class {
	constructor(options) {
		this.observers = [];
		this.table = null;
		this.store = null;
		this.columns = [];
		this.fit = true;
		this.showHeader = true;
		this.height = (0, vue.ref)(null);
		this.scrollX = (0, vue.ref)(false);
		this.scrollY = (0, vue.ref)(false);
		this.bodyWidth = (0, vue.ref)(null);
		this.fixedWidth = (0, vue.ref)(null);
		this.rightFixedWidth = (0, vue.ref)(null);
		this.gutterWidth = 0;
		for (const name in options) if ((0, _vue_shared.hasOwn)(options, name)) if ((0, vue.isRef)(this[name])) this[name].value = options[name];
		else this[name] = options[name];
		if (!this.table) throw new Error("Table is required for Table Layout");
		if (!this.store) throw new Error("Store is required for Table Layout");
	}
	updateScrollY() {
		const height = this.height.value;
		/**
		* When the height is not initialized, it is null.
		* After the table is initialized, when the height is not configured, the height is 0.
		*/
		if ((0, lodash_unified.isNull)(height)) return false;
		const scrollBarRef = this.table.refs.scrollBarRef;
		if (this.table.vnode.el && scrollBarRef?.wrapRef) {
			let scrollY = true;
			const prevScrollY = this.scrollY.value;
			scrollY = scrollBarRef.wrapRef.scrollHeight > scrollBarRef.wrapRef.clientHeight;
			this.scrollY.value = scrollY;
			return prevScrollY !== scrollY;
		}
		return false;
	}
	setHeight(value, prop = "height") {
		if (!_vueuse_core.isClient) return;
		const el = this.table.vnode.el;
		value = require_util.parseHeight(value);
		this.height.value = Number(value);
		if (!el && (value || value === 0)) {
			(0, vue.nextTick)(() => this.setHeight(value, prop));
			return;
		}
		if (el && require_types.isNumber(value)) {
			el.style[prop] = `${value}px`;
			this.updateElsHeight();
		} else if (el && (0, _vue_shared.isString)(value)) {
			el.style[prop] = value;
			this.updateElsHeight();
		}
	}
	setMaxHeight(value) {
		this.setHeight(value, "max-height");
	}
	getFlattenColumns() {
		const flattenColumns = [];
		this.table.store.states.columns.value.forEach((column) => {
			if (column.isColumnGroup) flattenColumns.push.apply(flattenColumns, column.columns);
			else flattenColumns.push(column);
		});
		return flattenColumns;
	}
	updateElsHeight() {
		this.updateScrollY();
		this.notifyObservers("scrollable");
	}
	headerDisplayNone(elm) {
		if (!elm) return true;
		let headerChild = elm;
		while (headerChild.tagName !== "DIV") {
			if (getComputedStyle(headerChild).display === "none") return true;
			headerChild = headerChild.parentElement;
		}
		return false;
	}
	updateColumnsWidth() {
		if (!_vueuse_core.isClient) return;
		const fit = this.fit;
		const bodyWidth = this.table.vnode.el?.clientWidth;
		let bodyMinWidth = 0;
		const flattenColumns = this.getFlattenColumns();
		const flexColumns = flattenColumns.filter((column) => !require_types.isNumber(column.width));
		flattenColumns.forEach((column) => {
			if (require_types.isNumber(column.width) && column.realWidth) column.realWidth = null;
		});
		if (flexColumns.length > 0 && fit) {
			flattenColumns.forEach((column) => {
				bodyMinWidth += Number(column.width || column.minWidth || 80);
			});
			if (bodyMinWidth <= bodyWidth) {
				this.scrollX.value = false;
				const totalFlexWidth = bodyWidth - bodyMinWidth;
				if (flexColumns.length === 1) flexColumns[0].realWidth = Number(flexColumns[0].minWidth || 80) + totalFlexWidth;
				else {
					const flexWidthPerPixel = totalFlexWidth / flexColumns.reduce((prev, column) => prev + Number(column.minWidth || 80), 0);
					let noneFirstWidth = 0;
					flexColumns.forEach((column, index) => {
						if (index === 0) return;
						const flexWidth = Math.floor(Number(column.minWidth || 80) * flexWidthPerPixel);
						noneFirstWidth += flexWidth;
						column.realWidth = Number(column.minWidth || 80) + flexWidth;
					});
					flexColumns[0].realWidth = Number(flexColumns[0].minWidth || 80) + totalFlexWidth - noneFirstWidth;
				}
			} else {
				this.scrollX.value = true;
				flexColumns.forEach((column) => {
					column.realWidth = Number(column.minWidth);
				});
			}
			this.bodyWidth.value = Math.max(bodyMinWidth, bodyWidth);
			this.table.state.resizeState.value.width = this.bodyWidth.value;
		} else {
			flattenColumns.forEach((column) => {
				if (!column.width && !column.minWidth) column.realWidth = 80;
				else column.realWidth = Number(column.width || column.minWidth);
				bodyMinWidth += column.realWidth;
			});
			this.scrollX.value = bodyMinWidth > bodyWidth;
			this.bodyWidth.value = bodyMinWidth;
		}
		const fixedColumns = this.store.states.fixedColumns.value;
		if (fixedColumns.length > 0) {
			let fixedWidth = 0;
			fixedColumns.forEach((column) => {
				fixedWidth += Number(column.realWidth || column.width);
			});
			this.fixedWidth.value = fixedWidth;
		}
		const rightFixedColumns = this.store.states.rightFixedColumns.value;
		if (rightFixedColumns.length > 0) {
			let rightFixedWidth = 0;
			rightFixedColumns.forEach((column) => {
				rightFixedWidth += Number(column.realWidth || column.width);
			});
			this.rightFixedWidth.value = rightFixedWidth;
		}
		this.notifyObservers("columns");
	}
	addObserver(observer) {
		this.observers.push(observer);
	}
	removeObserver(observer) {
		const index = this.observers.indexOf(observer);
		if (index !== -1) this.observers.splice(index, 1);
	}
	notifyObservers(event) {
		this.observers.forEach((observer) => {
			switch (event) {
				case "columns":
					observer.state?.onColumnsChange(this);
					break;
				case "scrollable":
					observer.state?.onScrollableChange(this);
					break;
				default: throw new Error(`Table Layout don't have event ${event}.`);
			}
		});
	}
};

//#endregion
exports.default = TableLayout;
//# sourceMappingURL=table-layout.js.map