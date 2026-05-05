import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { computed, defineComponent, h, renderSlot } from "vue";

//#region ../../packages/components/space/src/item.ts
const spaceItemProps = buildProps({ prefixCls: { type: String } });
const SpaceItem = defineComponent({
	name: "ElSpaceItem",
	props: spaceItemProps,
	setup(props, { slots }) {
		const ns = useNamespace("space");
		const classes = computed(() => `${props.prefixCls || ns.b()}__item`);
		return () => h("div", { class: classes.value }, renderSlot(slots, "default"));
	}
});

//#endregion
export { SpaceItem as default, spaceItemProps };
//# sourceMappingURL=item.mjs.map