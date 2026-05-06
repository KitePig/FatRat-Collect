Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_vnode = require('../../utils/vue/vnode.js');
let vue = require("vue");

//#region ../../packages/hooks/use-ordered-children/index.ts
const getOrderedChildren = (vm, childComponentName, children) => {
	return require_vnode.flattedChildren(vm.subTree).filter((n) => (0, vue.isVNode)(n) && n.type?.name === childComponentName && !!n.component).map((n) => n.component.uid).map((uid) => children[uid]).filter((p) => !!p);
};
const useOrderedChildren = (vm, childComponentName) => {
	const children = (0, vue.shallowRef)({});
	const orderedChildren = (0, vue.shallowRef)([]);
	const nodesMap = /* @__PURE__ */ new WeakMap();
	const addChild = (child) => {
		children.value[child.uid] = child;
		(0, vue.triggerRef)(children);
		(0, vue.onMounted)(() => {
			const childNode = child.getVnode().el;
			const parentNode = childNode.parentNode;
			if (!nodesMap.has(parentNode)) {
				nodesMap.set(parentNode, []);
				const originalFn = parentNode.insertBefore.bind(parentNode);
				parentNode.insertBefore = (node, anchor) => {
					if (nodesMap.get(parentNode).some((el) => node === el || anchor === el)) (0, vue.triggerRef)(children);
					return originalFn(node, anchor);
				};
			}
			nodesMap.get(parentNode).push(childNode);
		});
	};
	const removeChild = (child) => {
		delete children.value[child.uid];
		(0, vue.triggerRef)(children);
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
		ChildrenSorter: (0, vue.defineComponent)({ setup(_, { slots }) {
			return () => {
				sortChildren();
				return slots.default ? (0, vue.h)(IsolatedRenderer, { render: slots.default }) : null;
			};
		} })
	};
};

//#endregion
exports.useOrderedChildren = useOrderedChildren;
//# sourceMappingURL=index.js.map