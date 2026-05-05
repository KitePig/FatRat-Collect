import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import container_default from "./src/container.mjs";
import aside_default from "./src/aside.mjs";
import footer_default from "./src/footer.mjs";
import header_default from "./src/header.mjs";
import main_default from "./src/main.mjs";

//#region ../../packages/components/container/index.ts
const ElContainer = withInstall(container_default, {
	Aside: aside_default,
	Footer: footer_default,
	Header: header_default,
	Main: main_default
});
const ElAside = withNoopInstall(aside_default);
const ElFooter = withNoopInstall(footer_default);
const ElHeader = withNoopInstall(header_default);
const ElMain = withNoopInstall(main_default);

//#endregion
export { ElAside, ElContainer, ElContainer as default, ElFooter, ElHeader, ElMain };
//# sourceMappingURL=index.mjs.map