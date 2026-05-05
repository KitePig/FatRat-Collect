import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import table_vue_vue_type_script_lang_default from "./table.vue_vue_type_script_lang.mjs";
import { createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, normalizeClass, normalizeStyle, openBlock, renderSlot, resolveComponent, resolveDirective, toDisplayString, vShow, withCtx, withDirectives } from "vue";

//#region ../../packages/components/table/src/table.vue
const _hoisted_1 = ["data-prefix"];
const _hoisted_2 = {
	ref: "hiddenColumns",
	class: "hidden-columns"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_hColgroup = resolveComponent("hColgroup");
	const _component_table_header = resolveComponent("table-header");
	const _component_table_body = resolveComponent("table-body");
	const _component_table_footer = resolveComponent("table-footer");
	const _component_el_scrollbar = resolveComponent("el-scrollbar");
	const _directive_mousewheel = resolveDirective("mousewheel");
	return openBlock(), createElementBlock("div", {
		ref: "tableWrapper",
		class: normalizeClass([
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
		style: normalizeStyle(_ctx.style),
		"data-prefix": _ctx.ns.namespace.value,
		onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.handleMouseLeave && _ctx.handleMouseLeave(...args))
	}, [createElementVNode("div", {
		ref: "tableInnerWrapper",
		class: normalizeClass(_ctx.ns.e("inner-wrapper"))
	}, [
		createElementVNode("div", _hoisted_2, [renderSlot(_ctx.$slots, "default")], 512),
		_ctx.showHeader && _ctx.tableLayout === "fixed" ? withDirectives((openBlock(), createElementBlock("div", {
			key: 0,
			ref: "headerWrapper",
			class: normalizeClass(_ctx.ns.e("header-wrapper"))
		}, [createElementVNode("table", {
			ref: "tableHeader",
			class: normalizeClass(_ctx.ns.e("header")),
			style: normalizeStyle(_ctx.tableBodyStyles),
			border: "0",
			cellpadding: "0",
			cellspacing: "0"
		}, [createVNode(_component_hColgroup, {
			columns: _ctx.store.states.columns.value,
			"table-layout": _ctx.tableLayout
		}, null, 8, ["columns", "table-layout"]), createVNode(_component_table_header, {
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
		])], 6)], 2)), [[_directive_mousewheel, _ctx.handleHeaderFooterMousewheel]]) : createCommentVNode("v-if", true),
		createElementVNode("div", {
			ref: "bodyWrapper",
			class: normalizeClass(_ctx.ns.e("body-wrapper"))
		}, [createVNode(_component_el_scrollbar, {
			ref: "scrollBarRef",
			"view-style": _ctx.scrollbarViewStyle,
			"wrap-style": _ctx.scrollbarStyle,
			always: _ctx.scrollbarAlwaysOn,
			tabindex: _ctx.scrollbarTabindex,
			native: _ctx.nativeScrollbar,
			onScroll: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("scroll", $event))
		}, {
			default: withCtx(() => [
				createElementVNode("table", {
					ref: "tableBody",
					class: normalizeClass(_ctx.ns.e("body")),
					cellspacing: "0",
					cellpadding: "0",
					border: "0",
					style: normalizeStyle({
						width: _ctx.bodyWidth,
						tableLayout: _ctx.tableLayout
					})
				}, [
					createVNode(_component_hColgroup, {
						columns: _ctx.store.states.columns.value,
						"table-layout": _ctx.tableLayout
					}, null, 8, ["columns", "table-layout"]),
					_ctx.showHeader && _ctx.tableLayout === "auto" ? (openBlock(), createBlock(_component_table_header, {
						key: 0,
						ref: "tableHeaderRef",
						class: normalizeClass(_ctx.ns.e("body-header")),
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
					])) : createCommentVNode("v-if", true),
					createVNode(_component_table_body, {
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
					_ctx.showSummary && _ctx.tableLayout === "auto" ? (openBlock(), createBlock(_component_table_footer, {
						key: 1,
						class: normalizeClass(_ctx.ns.e("body-footer")),
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
					])) : createCommentVNode("v-if", true)
				], 6),
				_ctx.isEmpty ? (openBlock(), createElementBlock("div", {
					key: 0,
					ref: "emptyBlock",
					style: normalizeStyle(_ctx.emptyBlockStyle),
					class: normalizeClass(_ctx.ns.e("empty-block"))
				}, [createElementVNode("span", { class: normalizeClass(_ctx.ns.e("empty-text")) }, [renderSlot(_ctx.$slots, "empty", {}, () => [createTextVNode(toDisplayString(_ctx.computedEmptyText), 1)])], 2)], 6)) : createCommentVNode("v-if", true),
				_ctx.$slots.append ? (openBlock(), createElementBlock("div", {
					key: 1,
					ref: "appendWrapper",
					class: normalizeClass(_ctx.ns.e("append-wrapper"))
				}, [renderSlot(_ctx.$slots, "append")], 2)) : createCommentVNode("v-if", true)
			]),
			_: 3
		}, 8, [
			"view-style",
			"wrap-style",
			"always",
			"tabindex",
			"native"
		])], 2),
		_ctx.showSummary && _ctx.tableLayout === "fixed" ? withDirectives((openBlock(), createElementBlock("div", {
			key: 1,
			ref: "footerWrapper",
			class: normalizeClass(_ctx.ns.e("footer-wrapper"))
		}, [createElementVNode("table", {
			class: normalizeClass(_ctx.ns.e("footer")),
			cellspacing: "0",
			cellpadding: "0",
			border: "0",
			style: normalizeStyle(_ctx.tableBodyStyles)
		}, [createVNode(_component_hColgroup, {
			columns: _ctx.store.states.columns.value,
			"table-layout": _ctx.tableLayout
		}, null, 8, ["columns", "table-layout"]), createVNode(_component_table_footer, {
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
		])], 6)], 2)), [[vShow, !_ctx.isEmpty], [_directive_mousewheel, _ctx.handleHeaderFooterMousewheel]]) : createCommentVNode("v-if", true),
		_ctx.border || _ctx.isGroup ? (openBlock(), createElementBlock("div", {
			key: 2,
			class: normalizeClass(_ctx.ns.e("border-left-patch"))
		}, null, 2)) : createCommentVNode("v-if", true)
	], 2), withDirectives(createElementVNode("div", {
		ref: "resizeProxy",
		class: normalizeClass(_ctx.ns.e("column-resize-proxy"))
	}, null, 2), [[vShow, _ctx.resizeProxyVisible]])], 46, _hoisted_1);
}
var table_default = /* @__PURE__ */ _plugin_vue_export_helper_default(table_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { table_default as default };
//# sourceMappingURL=table.mjs.map