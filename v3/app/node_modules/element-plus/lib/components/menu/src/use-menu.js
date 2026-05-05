Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/components/menu/src/use-menu.ts
function useMenu(instance, currentIndex) {
	const indexPath = (0, vue.computed)(() => {
		let parent = instance.parent;
		const path = [currentIndex.value];
		while (parent.type.name !== "ElMenu") {
			if (parent.props.index) path.unshift(parent.props.index);
			parent = parent.parent;
		}
		return path;
	});
	return {
		parentMenu: (0, vue.computed)(() => {
			let parent = instance.parent;
			while (parent && !["ElMenu", "ElSubMenu"].includes(parent.type.name)) parent = parent.parent;
			return parent;
		}),
		indexPath
	};
}

//#endregion
exports.default = useMenu;
//# sourceMappingURL=use-menu.js.map