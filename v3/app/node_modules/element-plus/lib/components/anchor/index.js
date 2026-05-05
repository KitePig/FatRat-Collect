Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_anchor = require('./src/anchor.js');
const require_anchor$1 = require('./src/anchor2.js');
const require_anchor_link = require('./src/anchor-link2.js');

//#region ../../packages/components/anchor/index.ts
const ElAnchor = require_install.withInstall(require_anchor$1.default, { AnchorLink: require_anchor_link.default });
const ElAnchorLink = require_install.withNoopInstall(require_anchor_link.default);

//#endregion
exports.ElAnchor = ElAnchor;
exports.default = ElAnchor;
exports.ElAnchorLink = ElAnchorLink;
exports.anchorEmits = require_anchor.anchorEmits;
exports.anchorProps = require_anchor.anchorProps;
//# sourceMappingURL=index.js.map