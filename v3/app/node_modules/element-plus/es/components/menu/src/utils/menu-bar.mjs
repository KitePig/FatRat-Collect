import MenuItem from "./menu-item.mjs";

//#region ../../packages/components/menu/src/utils/menu-bar.ts
var Menu = class {
	constructor(domNode, namespace) {
		this.domNode = domNode;
		this.init(namespace);
	}
	init(namespace) {
		const menuChildren = this.domNode.childNodes;
		Array.from(menuChildren).forEach((child) => {
			if (child.nodeType === 1) new MenuItem(child, namespace);
		});
	}
};

//#endregion
export { Menu as default };
//# sourceMappingURL=menu-bar.mjs.map