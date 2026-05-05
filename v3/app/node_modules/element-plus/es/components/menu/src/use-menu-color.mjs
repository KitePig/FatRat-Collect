import { computed } from "vue";
import { TinyColor } from "@ctrl/tinycolor";

//#region ../../packages/components/menu/src/use-menu-color.ts
function useMenuColor(props) {
	return computed(() => {
		const color = props.backgroundColor;
		return color ? new TinyColor(color).shade(20).toString() : "";
	});
}

//#endregion
export { useMenuColor as default };
//# sourceMappingURL=use-menu-color.mjs.map