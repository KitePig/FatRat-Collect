Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_use_global_config = require('./hooks/use-global-config.js');
const require_config_provider_props = require('./config-provider-props.js');
let vue = require("vue");

//#region ../../packages/components/config-provider/src/config-provider.ts
const messageConfig = { placement: "top" };
const ConfigProvider = (0, vue.defineComponent)({
	name: "ElConfigProvider",
	props: require_config_provider_props.configProviderProps,
	setup(props, { slots }) {
		const config = require_use_global_config.provideGlobalConfig(props);
		(0, vue.watch)(() => props.message, (val) => {
			Object.assign(messageConfig, config?.value?.message ?? {}, val ?? {});
		}, {
			immediate: true,
			deep: true
		});
		return () => (0, vue.renderSlot)(slots, "default", { config: config?.value });
	}
});

//#endregion
exports.default = ConfigProvider;
exports.messageConfig = messageConfig;
//# sourceMappingURL=config-provider.js.map