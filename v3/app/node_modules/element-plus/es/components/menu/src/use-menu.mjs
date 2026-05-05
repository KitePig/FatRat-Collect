import { computed } from "vue";

//#region ../../packages/components/menu/src/use-menu.ts
function useMenu(instance, currentIndex) {
	const indexPath = computed(() => {
		let parent = instance.parent;
		const path = [currentIndex.value];
		while (parent.type.name !== "ElMenu") {
			if (parent.props.index) path.unshift(parent.props.index);
			parent = parent.parent;
		}
		return path;
	});
	return {
		parentMenu: computed(() => {
			let parent = instance.parent;
			while (parent && !["ElMenu", "ElSubMenu"].includes(parent.type.name)) parent = parent.parent;
			return parent;
		}),
		indexPath
	};
}

//#endregion
export { useMenu as default };
//# sourceMappingURL=use-menu.mjs.map