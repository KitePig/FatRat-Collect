Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require__plugin_vue_export_helper = require('../../../_virtual/_plugin-vue_export-helper.js');
const require_table_vue_vue_type_script_lang = require('./table.vue_vue_type_script_lang.js');
let vue = require("vue");

//#region ../../packages/components/table/src/table.vue
const _hoisted_1 = ["data-prefix"];
const _hoisted_2 = {
	ref: "hiddenColumns",
	class: "hidden-columns"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_hColgroup = (0, vue.resolveComponent)("hColgroup");
	const _component_table_header = (0, vue.resolveComponent)("table-header");
	const _component_table_body = (0, vue.resolveComponent)("table-body");
	const _component_table_footer = (0, vue.resolveComponent)("table-footer");
	const _component_el_scrollbar = (0, vue.resolveComponent)("el-scrollbar");
	const _directive_mousewheel = (0, vue.resolveDirective)("mousewheel");
	return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
		ref: "tableWrapper",
		class: (0, vue.normalizeClass)([
			{
				[_ctx.ns.m("fit")]: _ctx.fit,
				[_ctx.ns.m("striped")]: _ctx.stripe,
				[_ctx.ns.m("border")]: _ctx.border || _ctx.isGroup,
				[_ctx.ns.m("hidden")]: _ctx.isHidden,
				[_ctx.ns.m("group")]: _ctx.isGroup,
				[_ctx.ns.m("fluid-height")]: _ctx.maxHeight,
				[_ctx.ns.m("scrollable-x")]: _ctx.layout.scrollX.value,
				[_ctx.ns.m("scrollable-y")]: _ctx.layout.scrollY.value,
				[_ctx.ns.m("enable-row-hover")]: !_ctx.store.states.isComplex.value,
				[_ctx.ns.m("enable-row-transition")]: (_ctx.store.states.data.value || []).length !== 0 && (_ctx.store.states.data.value || []).length < 100,
				"has-footer": _ctx.showSummary
			},
			_ctx.ns.m(_ctx.tableSize),
			_ctx.className,
			_ctx.ns.b(),
			_ctx.ns.m(`layout-${_ctx.tableLayout}`)
		]),
		style: (0, vue.normalizeStyle)(_ctx.style),
		"data-prefix": _ctx.ns.namespace.value,
		onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.handleMouseLeave && _ctx.handleMouseLeave(...args))
	}, [(0, vue.createElementVNode)("div", {
		ref: "tableInnerWrapper",
		class: (0, vue.normalizeClass)(_ctx.ns.e("inner-wrapper"))
	}, [
		(0, vue.createElementVNode)("div", _hoisted_2, [(0, vue.renderSlot)(_ctx.$slots, "default")], 512),
		_ctx.showHeader && _ctx.tableLayout === "fixed" ? (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
			key: 0,
			ref: "headerWrapper",
			class: (0, vue.normalizeClass)(_ctx.ns.e("header-wrapper"))
		}, [(0, vue.createElementVNode)("table", {
			ref: "tableHeader",
			class: (0, vue.normalizeClass)(_ctx.ns.e("header")),
			style: (0, vue.normalizeStyle)(_ctx.tableBodyStyles),
			border: "0",
			cellpadding: "0",
			cellspacing: "0"
		}, [(0, vue.createVNode)(_component_hColgroup, {
			columns: _ctx.store.states.columns.value,
			"table-layout": _ctx.tableLayout
		}, null, 8, ["columns", "table-layout"]), (0, vue.createVNode)(_component_table_header, {
			ref: "tableHeaderRef",
			border: _ctx.border,
			"default-sort": _ctx.defaultSort,
			store: _ctx.store,
			"append-filter-panel-to": _ctx.appendFilterPanelTo,
			"allow-drag-last-column": _ctx.allowDragLastColumn,
			onSetDragVisible: _ctx.setDragVisible
		}, null, 8, [
			"border",
			"default-sort",
			"store",
			"append-filter-panel-to",
			"allow-drag-last-column",
			"onSetDragVisible"
		])], 6)], 2)), [[_directive_mousewheel, _ctx.handleHeaderFooterMousewheel]]) : (0, vue.createCommentVNode)("v-if", true),
		(0, vue.createElementVNode)("div", {
			ref: "bodyWrapper",
			class: (0, vue.normalizeClass)(_ctx.ns.e("body-wrapper"))
		}, [(0, vue.createVNode)(_component_el_scrollbar, {
			ref: "scrollBarRef",
			"view-style": _ctx.scrollbarViewStyle,
			"wrap-style": _ctx.scrollbarStyle,
			always: _ctx.scrollbarAlwaysOn,
			tabindex: _ctx.scrollbarTabindex,
			native: _ctx.nativeScrollbar,
			onScroll: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("scroll", $event))
		}, {
			default: (0, vue.withCtx)(() => [
				(0, vue.createElementVNode)("table", {
					ref: "tableBody",
					class: (0, vue.normalizeClass)(_ctx.ns.e("body")),
					cellspacing: "0",
					cellpadding: "0",
					border: "0",
					style: (0, vue.normalizeStyle)({
						width: _ctx.bodyWidth,
						tableLayout: _ctx.tableLayout
					})
				}, [
					(0, vue.createVNode)(_component_hColgroup, {
						columns: _ctx.store.states.columns.value,
						"table-layout": _ctx.tableLayout
					}, null, 8, ["columns", "table-layout"]),
					_ctx.showHeader && _ctx.tableLayout === "auto" ? ((0, vue.openBlock)(), (0, vue.createBlock)(_component_table_header, {
						key: 0,
						ref: "tableHeaderRef",
						class: (0, vue.normalizeClass)(_ctx.ns.e("body-header")),
						border: _ctx.border,
						"default-sort": _ctx.defaultSort,
						store: _ctx.store,
						"append-filter-panel-to": _ctx.appendFilterPanelTo,
						onSetDragVisible: _ctx.setDragVisible
					}, null, 8, [
						"class",
						"border",
						"default-sort",
						"store",
						"append-filter-panel-to",
						"onSetDragVisible"
					])) : (0, vue.createCommentVNode)("v-if", true),
					(0, vue.createVNode)(_component_table_body, {
						context: _ctx.context,
						highlight: _ctx.highlightCurrentRow,
						"row-class-name": _ctx.rowClassName,
						"tooltip-effect": _ctx.computedTooltipEffect,
						"tooltip-options": _ctx.computedTooltipOptions,
						"row-style": _ctx.rowStyle,
						store: _ctx.store,
						stripe: _ctx.stripe
					}, null, 8, [
						"context",
						"highlight",
						"row-class-name",
						"tooltip-effect",
						"tooltip-options",
						"row-style",
						"store",
						"stripe"
					]),
					_ctx.showSummary && _ctx.tableLayout === "auto" ? ((0, vue.openBlock)(), (0, vue.createBlock)(_component_table_footer, {
						key: 1,
						class: (0, vue.normalizeClass)(_ctx.ns.e("body-footer")),
						border: _ctx.border,
						"default-sort": _ctx.defaultSort,
						store: _ctx.store,
						"sum-text": _ctx.computedSumText,
						"summary-method": _ctx.summaryMethod
					}, null, 8, [
						"class",
						"border",
						"default-sort",
						"store",
						"sum-text",
						"summary-method"
					])) : (0, vue.createCommentVNode)("v-if", true)
				], 6),
				_ctx.isEmpty ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					ref: "emptyBlock",
					style: (0, vue.normalizeStyle)(_ctx.emptyBlockStyle),
					class: (0, vue.normalizeClass)(_ctx.ns.e("empty-block"))
				}, [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)(_ctx.ns.e("empty-text")) }, [(0, vue.renderSlot)(_ctx.$slots, "empty", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(_ctx.computedEmptyText), 1)])], 2)], 6)) : (0, vue.createCommentVNode)("v-if", true),
				_ctx.$slots.append ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 1,
					ref: "appendWrapper",
					class: (0, vue.normalizeClass)(_ctx.ns.e("append-wrapper"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "append")], 2)) : (0, vue.createCommentVNode)("v-if", true)
			]),
			_: 3
		}, 8, [
			"view-style",
			"wrap-style",
			"always",
			"tabindex",
			"native"
		])], 2),
		_ctx.showSummary && _ctx.tableLayout === "fixed" ? (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
			key: 1,
			ref: "footerWrapper",
			class: (0, vue.normalizeClass)(_ctx.ns.e("footer-wrapper"))
		}, [(0, vue.createElementVNode)("table", {
			class: (0, vue.normalizeClass)(_ctx.ns.e("footer")),
			cellspacing: "0",
			cellpadding: "0",
			border: "0",
			style: (0, vue.normalizeStyle)(_ctx.tableBodyStyles)
		}, [(0, vue.createVNode)(_component_hColgroup, {
			columns: _ctx.store.states.columns.value,
			"table-layout": _ctx.tableLayout
		}, null, 8, ["columns", "table-layout"]), (0, vue.createVNode)(_component_table_footer, {
			border: _ctx.border,
			"default-sort": _ctx.defaultSort,
			store: _ctx.store,
			"sum-text": _ctx.computedSumText,
			"summary-method": _ctx.summaryMethod
		}, null, 8, [
			"border",
			"default-sort",
			"store",
			"sum-text",
			"summary-method"
		])], 6)], 2)), [[vue.vShow, !_ctx.isEmpty], [_directive_mousewheel, _ctx.handleHeaderFooterMousewheel]]) : (0, vue.createCommentVNode)("v-if", true),
		_ctx.border || _ctx.isGroup ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
			key: 2,
			class: (0, vue.normalizeClass)(_ctx.ns.e("border-left-patch"))
		}, null, 2)) : (0, vue.createCommentVNode)("v-if", true)
	], 2), (0, vue.withDirectives)((0, vue.createElementVNode)("div", {
		ref: "resizeProxy",
		class: (0, vue.normalizeClass)(_ctx.ns.e("column-resize-proxy"))
	}, null, 2), [[vue.vShow, _ctx.resizeProxyVisible]])], 46, _hoisted_1);
}
var table_default = /* @__PURE__ */ require__plugin_vue_export_helper.default(require_table_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

//#endregion
exports.default = table_default;
//# sourceMappingURL=table.js.map