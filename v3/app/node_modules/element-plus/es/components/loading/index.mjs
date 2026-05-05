import Loading from "./src/service.mjs";
import vLoading from "./src/directive.mjs";

//#region ../../packages/components/loading/index.ts
const ElLoading = {
	install(app) {
		Loading._context = app._context;
		vLoading._context = app._context;
		app.directive("loading", vLoading);
		app.config.globalProperties.$loading = Loading;
	},
	directive: vLoading,
	service: Loading
};

//#endregion
export { ElLoading, ElLoading as default, vLoading as ElLoadingDirective, vLoading, Loading as ElLoadingService };
//# sourceMappingURL=index.mjs.map