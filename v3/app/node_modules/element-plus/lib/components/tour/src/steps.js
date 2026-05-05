Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_vnode = require('../../../utils/vue/vnode.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/tour/src/steps.ts
var steps_default = (0, vue.defineComponent)({
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
				if (!(0, _vue_shared.isArray)(children)) return;
				children.forEach((item) => {
					if ((item?.type || {})?.name === "ElTourStep") {
						result.push(item);
						total += 1;
					}
				});
			}
			if (children.length) filterSteps(require_vnode.flattedChildren(children[0]?.children));
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
exports.default = steps_default;
//# sourceMappingURL=steps.js.map