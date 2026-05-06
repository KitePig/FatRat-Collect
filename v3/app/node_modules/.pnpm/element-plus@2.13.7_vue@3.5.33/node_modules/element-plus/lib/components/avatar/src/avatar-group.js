const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_vnode = require('../../../utils/vue/vnode.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../tooltip/index.js');
const require_constants = require('./constants.js');
const require_avatar = require('./avatar2.js');
const require_avatar_group_props = require('./avatar-group-props.js');
let vue = require("vue");

//#region ../../packages/components/avatar/src/avatar-group.tsx
var avatar_group_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElAvatarGroup",
	props: require_avatar_group_props.avatarGroupProps,
	setup(props, { slots }) {
		const ns = require_index.useNamespace("avatar-group");
		(0, vue.provide)(require_constants.avatarGroupContextKey, (0, vue.reactive)({
			size: (0, vue.toRef)(props, "size"),
			shape: (0, vue.toRef)(props, "shape")
		}));
		return () => {
			const avatars = require_vnode.flattedChildren(slots.default?.() ?? []);
			let visibleAvatars = avatars;
			if (props.collapseAvatars && avatars.length > props.maxCollapseAvatars) {
				visibleAvatars = avatars.slice(0, props.maxCollapseAvatars);
				const hiddenAvatars = avatars.slice(props.maxCollapseAvatars);
				visibleAvatars.push((0, vue.createVNode)(require_index$1.ElTooltip, {
					"popperClass": props.popperClass,
					"popperStyle": props.popperStyle,
					"placement": props.placement,
					"effect": props.effect,
					"disabled": !props.collapseAvatarsTooltip
				}, {
					default: () => (0, vue.createVNode)(require_avatar.default, {
						"size": props.size,
						"shape": props.shape,
						"class": props.collapseClass,
						"style": props.collapseStyle
					}, { default: () => [(0, vue.createTextVNode)("+ "), hiddenAvatars.length] }),
					content: () => (0, vue.createVNode)("div", { "class": ns.e("collapse-avatars") }, [hiddenAvatars.map((node, idx) => (0, vue.isVNode)(node) ? (0, vue.cloneVNode)(node, { key: node.key ?? idx }) : node)])
				}));
			}
			return (0, vue.createVNode)("div", { "class": ns.b() }, [visibleAvatars]);
		};
	}
});

//#endregion
exports.default = avatar_group_default;
//# sourceMappingURL=avatar-group.js.map