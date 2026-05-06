Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_constants = require('./src/constants.js');
const require_tab_bar = require('./src/tab-bar.js');
const require_tab_nav = require('./src/tab-nav.js');
const require_tabs = require('./src/tabs.js');
const require_tab_pane = require('./src/tab-pane.js');
const require_tab_pane$1 = require('./src/tab-pane2.js');

//#region ../../packages/components/tabs/index.ts
const ElTabs = require_install.withInstall(require_tabs.default, { TabPane: require_tab_pane$1.default });
const ElTabPane = require_install.withNoopInstall(require_tab_pane$1.default);

//#endregion
exports.ElTabPane = ElTabPane;
exports.ElTabs = ElTabs;
exports.default = ElTabs;
exports.tabBarProps = require_tab_bar.tabBarProps;
exports.tabNavEmits = require_tab_nav.tabNavEmits;
exports.tabNavProps = require_tab_nav.tabNavProps;
exports.tabPaneProps = require_tab_pane.tabPaneProps;
exports.tabsEmits = require_tabs.tabsEmits;
exports.tabsProps = require_tabs.tabsProps;
exports.tabsRootContextKey = require_constants.tabsRootContextKey;
//# sourceMappingURL=index.js.map