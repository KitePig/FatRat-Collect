Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_mention = require('./src/mention.js');
const require_mention$1 = require('./src/mention2.js');

//#region ../../packages/components/mention/index.ts
const ElMention = require_install.withInstall(require_mention$1.default);

//#endregion
exports.ElMention = ElMention;
exports.default = ElMention;
exports.mentionDefaultProps = require_mention.mentionDefaultProps;
exports.mentionEmits = require_mention.mentionEmits;
exports.mentionProps = require_mention.mentionProps;
//# sourceMappingURL=index.js.map