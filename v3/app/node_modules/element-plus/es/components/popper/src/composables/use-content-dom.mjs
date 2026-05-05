import { isNumber } from "../../../../utils/types.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { useZIndex } from "../../../../hooks/use-z-index/index.mjs";
import { computed, ref, unref } from "vue";

//#region ../../packages/components/popper/src/composables/use-content-dom.ts
const usePopperContentDOM = (props, { attributes, styles, role }) => {
	const { nextZIndex } = useZIndex();
	const ns = useNamespace("popper");
	const contentAttrs = computed(() => unref(attributes).popper);
	const contentZIndex = ref(isNumber(props.zIndex) ? props.zIndex : nextZIndex());
	const contentClass = computed(() => [
		ns.b(),
		ns.is("pure", props.pure),
		ns.is(props.effect),
		props.popperClass
	]);
	const contentStyle = computed(() => {
		return [
			{ zIndex: unref(contentZIndex) },
			unref(styles).popper,
			props.popperStyle || {}
		];
	});
	const ariaModal = computed(() => role.value === "dialog" ? "false" : void 0);
	const arrowStyle = computed(() => unref(styles).arrow || {});
	const updateZIndex = () => {
		contentZIndex.value = isNumber(props.zIndex) ? props.zIndex : nextZIndex();
	};
	return {
		ariaModal,
		arrowStyle,
		contentAttrs,
		contentClass,
		contentStyle,
		contentZIndex,
		updateZIndex
	};
};

//#endregion
export { usePopperContentDOM };
//# sourceMappingURL=use-content-dom.mjs.map