import { isArray } from "../../../utils/types.mjs";
import { flattedChildren } from "../../../utils/vue/vnode.mjs";
import { defineComponent } from "vue";

//#region ../../packages/components/tour/src/steps.ts
var steps_default = defineComponent({
	name: "ElTourSteps",
	props: { current: {
		type: Number,
		default: 0
	} },
	emits: ["update-total"],
	setup(props, { slots, emit }) {
		let cacheTotal = 0;
		return () => {
			const children = slots.default?.();
			const result = [];
			let total = 0;
			function filterSteps(children) {
				if (!isArray(children)) return;
				children.forEach((item) => {
					if ((item?.type || {})?.name === "ElTourStep") {
						result.push(item);
						total += 1;
					}
				});
			}
			if (children.length) filterSteps(flattedChildren(children[0]?.children));
			if (cacheTotal !== total) {
				cacheTotal = total;
				emit("update-total", total);
			}
			if (result.length) return result[props.current];
			return null;
		};
	}
});

//#endregion
export { steps_default as default };
//# sourceMappingURL=steps.mjs.map