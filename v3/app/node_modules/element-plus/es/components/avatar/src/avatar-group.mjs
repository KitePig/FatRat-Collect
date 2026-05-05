import { flattedChildren } from "../../../utils/vue/vnode.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElTooltip } from "../../tooltip/index.mjs";
import { avatarGroupContextKey } from "./constants.mjs";
import avatar_default from "./avatar2.mjs";
import { avatarGroupProps } from "./avatar-group-props.mjs";
import { cloneVNode, createTextVNode, createVNode, defineComponent, isVNode, provide, reactive, toRef } from "vue";

//#region ../../packages/components/avatar/src/avatar-group.tsx
var avatar_group_default = /* @__PURE__ */ defineComponent({
	name: "ElAvatarGroup",
	props: avatarGroupProps,
	setup(props, { slots }) {
		const ns = useNamespace("avatar-group");
		provide(avatarGroupContextKey, reactive({
			size: toRef(props, "size"),
			shape: toRef(props, "shape")
		}));
		return () => {
			const avatars = flattedChildren(slots.default?.() ?? []);
			let visibleAvatars = avatars;
			if (props.collapseAvatars && avatars.length > props.maxCollapseAvatars) {
				visibleAvatars = avatars.slice(0, props.maxCollapseAvatars);
				const hiddenAvatars = avatars.slice(props.maxCollapseAvatars);
				visibleAvatars.push(createVNode(ElTooltip, {
					"popperClass": props.popperClass,
					"popperStyle": props.popperStyle,
					"placement": props.placement,
					"effect": props.effect,
					"disabled": !props.collapseAvatarsTooltip
				}, {
					default: () => createVNode(avatar_default, {
						"size": props.size,
						"shape": props.shape,
						"class": props.collapseClass,
						"style": props.collapseStyle
					}, { default: () => [createTextVNode("+ "), hiddenAvatars.length] }),
					content: () => createVNode("div", { "class": ns.e("collapse-avatars") }, [hiddenAvatars.map((node, idx) => isVNode(node) ? cloneVNode(node, { key: node.key ?? idx }) : node)])
				}));
			}
			return createVNode("div", { "class": ns.b() }, [visibleAvatars]);
		};
	}
});

//#endregion
export { avatar_group_default as default };
//# sourceMappingURL=avatar-group.mjs.map