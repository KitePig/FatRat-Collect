import { withInstall } from "../../utils/vue/install.mjs";
import { LEFT_CHECK_CHANGE_EVENT, RIGHT_CHECK_CHANGE_EVENT, transferCheckedChangeFn, transferEmits, transferProps } from "./src/transfer.mjs";
import transfer_default from "./src/transfer2.mjs";

//#region ../../packages/components/transfer/index.ts
const ElTransfer = withInstall(transfer_default);

//#endregion
export { ElTransfer, ElTransfer as default, LEFT_CHECK_CHANGE_EVENT, RIGHT_CHECK_CHANGE_EVENT, transferCheckedChangeFn, transferEmits, transferProps };
//# sourceMappingURL=index.mjs.map