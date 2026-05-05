Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_menu_item = require('./menu-item.js');

//#region ../../packages/components/menu/src/utils/menu-bar.ts
var Menu = class {
	constructor(domNode, namespace) {
		this.domNode = domNode;
		this.init(namespace);
	}
	init(namespace) {
		const menuChildren = this.domNode.childNodes;
		Array.from(menuChildren).forEach((child) => {
			if (child.nodeType === 1) new require_menu_item.default(child, namespace);
		});
	}
};

//#endregion
exports.default = Menu;
//# sourceMappingURL=menu-bar.js.map