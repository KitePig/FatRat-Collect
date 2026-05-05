Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_container = require('./src/container.js');
const require_aside = require('./src/aside.js');
const require_footer = require('./src/footer.js');
const require_header = require('./src/header.js');
const require_main = require('./src/main.js');

//#region ../../packages/components/container/index.ts
const ElContainer = require_install.withInstall(require_container.default, {
	Aside: require_aside.default,
	Footer: require_footer.default,
	Header: require_header.default,
	Main: require_main.default
});
const ElAside = require_install.withNoopInstall(require_aside.default);
const ElFooter = require_install.withNoopInstall(require_footer.default);
const ElHeader = require_install.withNoopInstall(require_header.default);
const ElMain = require_install.withNoopInstall(require_main.default);

//#endregion
exports.ElAside = ElAside;
exports.ElContainer = ElContainer;
exports.default = ElContainer;
exports.ElFooter = ElFooter;
exports.ElHeader = ElHeader;
exports.ElMain = ElMain;
//# sourceMappingURL=index.js.map