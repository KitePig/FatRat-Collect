import { computed } from "vue";

//#region ../../packages/components/transfer/src/composables/use-props-alias.ts
const usePropsAlias = (props) => {
	const initProps = {
		label: "label",
		key: "key",
		disabled: "disabled"
	};
	return computed(() => ({
		...initProps,
		...props.props
	}));
};

//#endregion
export { usePropsAlias };
//# sourceMappingURL=use-props-alias.mjs.map