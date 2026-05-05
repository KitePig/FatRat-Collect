import { ConfigProviderProps } from "./config-provider-props.js";
import { InjectionKey, Ref } from "vue";

//#region ../../packages/components/config-provider/src/constants.d.ts
type ConfigProviderContext = Partial<ConfigProviderProps>;
declare const configProviderContextKey: InjectionKey<Ref<ConfigProviderContext>>;
//#endregion
export { ConfigProviderContext, configProviderContextKey };