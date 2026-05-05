import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { _default } from "./src/container.vue.js";
import { _default as _default$1 } from "./src/aside.vue.js";
import { _default as _default$2 } from "./src/footer.vue.js";
import { _default as _default$3 } from "./src/header.vue.js";
import { _default as _default$4 } from "./src/main.vue.js";

//#region ../../packages/components/container/index.d.ts
declare const ElContainer: SFCWithInstall<typeof _default> & {
  Aside: typeof _default$1;
  Footer: typeof _default$2;
  Header: typeof _default$3;
  Main: typeof _default$4;
};
declare const ElAside: SFCWithInstall<typeof _default$1>;
declare const ElFooter: SFCWithInstall<typeof _default$2>;
declare const ElHeader: SFCWithInstall<typeof _default$3>;
declare const ElMain: SFCWithInstall<typeof _default$4>;
type ContainerInstance = InstanceType<typeof _default> & unknown;
type AsideInstance = InstanceType<typeof _default$1> & unknown;
type FooterInstance = InstanceType<typeof _default$2> & unknown;
type HeaderInstance = InstanceType<typeof _default$3> & unknown;
type MainInstance = InstanceType<typeof _default$4> & unknown;
//#endregion
export { AsideInstance, ContainerInstance, ElAside, ElContainer, ElContainer as default, ElFooter, ElHeader, ElMain, FooterInstance, HeaderInstance, MainInstance };