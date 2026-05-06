import { flattedChildren } from "../../utils/vue/vnode.mjs";
import { defineComponent, h, isVNode, onMounted, shallowRef, triggerRef } from "vue";

//#region ../../packages/hooks/use-ordered-children/index.ts
const getOrderedChildren = (vm, childComponentName, children) => {
	return flattedChildren(vm.subTree).filter((n) => isVNode(n) && n.type?.name === childComponentName && !!n.component).map((n) => n.component.uid).map((uid) => children[uid]).filter((p) => !!p);
};
const useOrderedChildren = (vm, childComponentName) => {
	const children = shallowRef({});
	const orderedChildren = shallowRef([]);
	const nodesMap = /* @__PURE__ */ new WeakMap();
	const addChild = (child) => {
		children.value[child.uid] = child;
		triggerRef(children);
		onMounted(() => {
			const childNode = child.getVnode().el;
			const parentNode = childNode.parentNode;
			if (!nodesMap.has(parentNode)) {
				nodesMap.set(parentNode, []);
				const originalFn = parentNode.insertBefore.bind(parentNode);
				parentNode.insertBefore = (node, anchor) => {
					if (nodesMap.get(parentNode).some((el) => node === el || anchor === el)) triggerRef(children);
					return originalFn(node, anchor);
				};
			}
			nodesMap.get(parentNode).push(childNode);
		});
	};
	const removeChild = (child) => {
		delete children.value[child.uid];
		triggerRef(children);
		const childNode = child.getVnode().el;
		const parentNode = childNode.parentNode;
		const childNodes = nodesMap.get(parentNode);
		const index = childNodes.indexOf(childNode);
		childNodes.splice(index, 1);
	};
	const sortChildren = () => {
		orderedChildren.value = getOrderedChildren(vm, childComponentName, children.value);
	};
	const IsolatedRenderer = (props) => {
		return props.render();
	};
	return {
		children: orderedChildren,
		addChild,
		removeChild,
		ChildrenSorter: defineComponent({ setup(_, { slots }) {
			return () => {
				sortChildren();
				return slots.default ? h(IsolatedRenderer, { render: slots.default }) : null;
			};
		} })
	};
};

//#endregion
export { useOrderedChildren };
//# sourceMappingURL=index.mjs.map