import { LoadingOptions } from "./types.js";
import { LoadingInstance } from "./loading.js";
import { AppContext } from "vue";

//#region ../../packages/components/loading/src/service.d.ts
declare const Loading: {
  (options?: LoadingOptions, context?: AppContext | null): LoadingInstance;
  _context: AppContext | null;
};
//#endregion
export { Loading };