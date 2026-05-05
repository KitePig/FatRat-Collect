Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
let vue = require("vue");

//#region ../../packages/components/space/src/item.ts
const spaceItemProps = require_runtime$1.buildProps({ prefixCls: { type: String } });
const SpaceItem = (0, vue.defineComponent)({
	name: "ElSpaceItem",
	props: spaceItemProps,
	setup(props, { slots }) {
		const ns = require_index.useNamespace("space");
		const classes = (0, vue.computed)(() => `${props.prefixCls || ns.b()}__item`);
		return () => (0, vue.h)("div", { class: classes.value }, (0, vue.renderSlot)(slots, "default"));
	}
});

//#endregion
exports.default = SpaceItem;
exports.spaceItemProps = spaceItemProps;
//# sourceMappingURL=item.js.map