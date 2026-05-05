Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_service = require('./src/service.js');
const require_directive = require('./src/directive.js');

//#region ../../packages/components/loading/index.ts
const ElLoading = {
	install(app) {
		require_service.default._context = app._context;
		require_directive.default._context = app._context;
		app.directive("loading", require_directive.default);
		app.config.globalProperties.$loading = require_service.default;
	},
	directive: require_directive.default,
	service: require_service.default
};

//#endregion
exports.ElLoading = ElLoading;
exports.default = ElLoading;
exports.ElLoadingDirective = require_directive.default;
exports.vLoading = require_directive.default;
exports.ElLoadingService = require_service.default;
//# sourceMappingURL=index.js.map