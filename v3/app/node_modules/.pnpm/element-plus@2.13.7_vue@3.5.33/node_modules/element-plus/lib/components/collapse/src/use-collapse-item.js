Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-id/index.js');
const require_constants = require('./constants.js');
let vue = require("vue");

//#region ../../packages/components/collapse/src/use-collapse-item.ts
const useCollapseItem = (props) => {
	const collapse = (0, vue.inject)(require_constants.collapseContextKey);
	const { namespace } = require_index.useNamespace("collapse");
	const focusing = (0, vue.ref)(false);
	const isClick = (0, vue.ref)(false);
	const idInjection = require_index$1.useIdInjection();
	const id = (0, vue.computed)(() => idInjection.current++);
	const name = (0, vue.computed)(() => {
		return props.name ?? `${namespace.value}-id-${idInjection.prefix}-${(0, vue.unref)(id)}`;
	});
	const isActive = (0, vue.computed)(() => collapse?.activeNames.value.includes((0, vue.unref)(name)));
	const handleFocus = () => {
		setTimeout(() => {
			if (!isClick.value) focusing.value = true;
			else isClick.value = false;
		}, 50);
	};
	const handleHeaderClick = (e) => {
		if (props.disabled) return;
		if (e.target?.closest("input, textarea, select")) return;
		collapse?.handleItemClick((0, vue.unref)(name));
		focusing.value = false;
		isClick.value = true;
	};
	const handleEnterClick = (e) => {
		if (e.target?.closest("input, textarea, select")) return;
		e.preventDefault();
		collapse?.handleItemClick((0, vue.unref)(name));
	};
	return {
		focusing,
		id,
		isActive,
		handleFocus,
		handleHeaderClick,
		handleEnterClick
	};
};
const useCollapseItemDOM = (props, { focusing, isActive, id }) => {
	const ns = require_index.useNamespace("collapse");
	const rootKls = (0, vue.computed)(() => [
		ns.b("item"),
		ns.is("active", (0, vue.unref)(isActive)),
		ns.is("disabled", props.disabled)
	]);
	const headKls = (0, vue.computed)(() => [
		ns.be("item", "header"),
		ns.is("active", (0, vue.unref)(isActive)),
		{ focusing: (0, vue.unref)(focusing) && !props.disabled }
	]);
	const arrowKls = (0, vue.computed)(() => [ns.be("item", "arrow"), ns.is("active", (0, vue.unref)(isActive))]);
	return {
		itemTitleKls: (0, vue.computed)(() => [ns.be("item", "title")]),
		arrowKls,
		headKls,
		rootKls,
		itemWrapperKls: (0, vue.computed)(() => ns.be("item", "wrap")),
		itemContentKls: (0, vue.computed)(() => ns.be("item", "content")),
		scopedContentId: (0, vue.computed)(() => ns.b(`content-${(0, vue.unref)(id)}`)),
		scopedHeadId: (0, vue.computed)(() => ns.b(`head-${(0, vue.unref)(id)}`))
	};
};

//#endregion
exports.useCollapseItem = useCollapseItem;
exports.useCollapseItemDOM = useCollapseItemDOM;
//# sourceMappingURL=use-collapse-item.js.map