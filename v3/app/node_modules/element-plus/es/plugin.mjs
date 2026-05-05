import { ElPopoverDirective } from "./components/popover/index.mjs";
import { ElInfiniteScroll } from "./components/infinite-scroll/index.mjs";
import { ElLoading } from "./components/loading/index.mjs";
import { ElMessage } from "./components/message/index.mjs";
import { ElMessageBox } from "./components/message-box/index.mjs";
import { ElNotification } from "./components/notification/index.mjs";

//#region ../../packages/element-plus/plugin.ts
var plugin_default = [
	ElInfiniteScroll,
	ElLoading,
	ElMessage,
	ElMessageBox,
	ElNotification,
	ElPopoverDirective
];

//#endregion
export { plugin_default as default };
//# sourceMappingURL=plugin.mjs.map