import { withInstall } from "../../utils/vue/install.mjs";
import { cardContextKey, cardProps } from "./src/card.mjs";
import card_default from "./src/card2.mjs";

//#region ../../packages/components/card/index.ts
const ElCard = withInstall(card_default);

//#endregion
export { ElCard, ElCard as default, cardContextKey, cardProps };
//# sourceMappingURL=index.mjs.map