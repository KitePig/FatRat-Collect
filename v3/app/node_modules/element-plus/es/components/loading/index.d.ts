import { LoadingOptions, LoadingOptionsResolved, LoadingParentElement } from "./src/types.js";
import { LoadingInstance } from "./src/loading.js";
import { Loading } from "./src/service.js";
import { ElementLoading, LoadingBinding, vLoading } from "./src/directive.js";
import { App, AppContext, Directive } from "vue";

//#region ../../packages/components/loading/index.d.ts
declare const ElLoading: {
  install(app: App): void;
  directive: Directive<ElementLoading, LoadingBinding>;
  service: {
    (options?: LoadingOptions, context?: AppContext | null): LoadingInstance;
    _context: AppContext | null;
  };
};
//#endregion
export { ElLoading, ElLoading as default, vLoading as ElLoadingDirective, vLoading, Loading as ElLoadingService, type LoadingInstance, LoadingOptions, LoadingOptionsResolved, LoadingParentElement };