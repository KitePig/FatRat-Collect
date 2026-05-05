import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { CardConfigContext, CardProps, CardPropsPublic, cardContextKey, cardProps } from "./src/card.js";
import { _default } from "./src/card.vue.js";
import { CardInstance } from "./src/instance.js";

//#region ../../packages/components/card/index.d.ts
declare const ElCard: SFCWithInstall<typeof _default>;
//#endregion
export { CardConfigContext, type CardInstance, CardProps, CardPropsPublic, ElCard, ElCard as default, cardContextKey, cardProps };