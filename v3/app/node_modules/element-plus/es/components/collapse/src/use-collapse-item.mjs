import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useIdInjection } from "../../../hooks/use-id/index.mjs";
import { collapseContextKey } from "./constants.mjs";
import { computed, inject, ref, unref } from "vue";

//#region ../../packages/components/collapse/src/use-collapse-item.ts
const useCollapseItem = (props) => {
	const collapse = inject(collapseContextKey);
	const { namespace } = useNamespace("collapse");
	const focusing = ref(false);
	const isClick = ref(false);
	const idInjection = useIdInjection();
	const id = computed(() => idInjection.current++);
	const name = computed(() => {
		return props.name ?? `${namespace.value}-id-${idInjection.prefix}-${unref(id)}`;
	});
	const isActive = computed(() => collapse?.activeNames.value.includes(unref(name)));
	const handleFocus = () => {
		setTimeout(() => {
			if (!isClick.value) focusing.value = true;
			else isClick.value = false;
		}, 50);
	};
	const handleHeaderClick = (e) => {
		if (props.disabled) return;
		if (e.target?.closest("input, textarea, select")) return;
		collapse?.handleItemClick(unref(name));
		focusing.value = false;
		isClick.value = true;
	};
	const handleEnterClick = (e) => {
		if (e.target?.closest("input, textarea, select")) return;
		e.preventDefault();
		collapse?.handleItemClick(unref(name));
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
	const ns = useNamespace("collapse");
	const rootKls = computed(() => [
		ns.b("item"),
		ns.is("active", unref(isActive)),
		ns.is("disabled", props.disabled)
	]);
	const headKls = computed(() => [
		ns.be("item", "header"),
		ns.is("active", unref(isActive)),
		{ focusing: unref(focusing) && !props.disabled }
	]);
	const arrowKls = computed(() => [ns.be("item", "arrow"), ns.is("active", unref(isActive))]);
	return {
		itemTitleKls: computed(() => [ns.be("item", "title")]),
		arrowKls,
		headKls,
		rootKls,
		itemWrapperKls: computed(() => ns.be("item", "wrap")),
		itemContentKls: computed(() => ns.be("item", "content")),
		scopedContentId: computed(() => ns.b(`content-${unref(id)}`)),
		scopedHeadId: computed(() => ns.b(`head-${unref(id)}`))
	};
};

//#endregion
export { useCollapseItem, useCollapseItemDOM };
//# sourceMappingURL=use-collapse-item.mjs.map