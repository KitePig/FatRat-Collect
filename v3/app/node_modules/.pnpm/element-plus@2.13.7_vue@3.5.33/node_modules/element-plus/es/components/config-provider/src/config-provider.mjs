import { provideGlobalConfig } from "./hooks/use-global-config.mjs";
import { configProviderProps } from "./config-provider-props.mjs";
import { defineComponent, renderSlot, watch } from "vue";

//#region ../../packages/components/config-provider/src/config-provider.ts
const messageConfig = { placement: "top" };
const ConfigProvider = defineComponent({
	name: "ElConfigProvider",
	props: configProviderProps,
	setup(props, { slots }) {
		const config = provideGlobalConfig(props);
		watch(() => props.message, (val) => {
			Object.assign(messageConfig, config?.value?.message ?? {}, val ?? {});
		}, {
			immediate: true,
			deep: true
		});
		return () => renderSlot(slots, "default", { config: config?.value });
	}
});

//#endregion
export { ConfigProvider as default, messageConfig };
//# sourceMappingURL=config-provider.mjs.map