Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_key = require('./constants/key.js');
const require_use_global_config = require('./components/config-provider/src/hooks/use-global-config.js');
const require_version = require('./version.js');

//#region ../../packages/element-plus/make-installer.ts
const makeInstaller = (components = []) => {
	const install = (app, options) => {
		if (app[require_key.INSTALLED_KEY]) return;
		app[require_key.INSTALLED_KEY] = true;
		components.forEach((c) => app.use(c));
		if (options) require_use_global_config.provideGlobalConfig(options, app, true);
	};
	return {
		version: require_version.version,
		install
	};
};

//#endregion
exports.makeInstaller = makeInstaller;
//# sourceMappingURL=make-installer.js.map