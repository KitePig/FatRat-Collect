import { withInstall } from "../../utils/vue/install.mjs";
import { configProviderContextKey } from "./src/constants.mjs";
import { provideGlobalConfig, useGlobalComponentSettings, useGlobalConfig } from "./src/hooks/use-global-config.mjs";
import { configProviderProps } from "./src/config-provider-props.mjs";
import ConfigProvider, { messageConfig } from "./src/config-provider.mjs";

//#region ../../packages/components/config-provider/index.ts
const ElConfigProvider = withInstall(ConfigProvider);

//#endregion
export { ElConfigProvider, ElConfigProvider as default, configProviderContextKey, configProviderProps, messageConfig, provideGlobalConfig, useGlobalComponentSettings, useGlobalConfig };
//# sourceMappingURL=index.mjs.map