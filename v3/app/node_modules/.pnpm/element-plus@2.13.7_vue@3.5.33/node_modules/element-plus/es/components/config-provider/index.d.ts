import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { ConfigProviderProps, ConfigProviderPropsPublic, ExperimentalFeatures, configProviderProps } from "./src/config-provider-props.js";
import { ConfigProvider, ConfigProviderInstance, messageConfig } from "./src/config-provider.js";
import { ConfigProviderContext, configProviderContextKey } from "./src/constants.js";
import { provideGlobalConfig, useGlobalComponentSettings, useGlobalConfig } from "./src/hooks/use-global-config.js";

//#region ../../packages/components/config-provider/index.d.ts
declare const ElConfigProvider: SFCWithInstall<typeof ConfigProvider>;
//#endregion
export { ConfigProviderContext, ConfigProviderInstance, ConfigProviderProps, ConfigProviderPropsPublic, ElConfigProvider, ElConfigProvider as default, ExperimentalFeatures, configProviderContextKey, configProviderProps, messageConfig, provideGlobalConfig, useGlobalComponentSettings, useGlobalConfig };