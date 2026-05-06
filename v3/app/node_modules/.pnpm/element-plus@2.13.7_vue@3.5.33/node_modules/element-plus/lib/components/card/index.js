Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_card = require('./src/card.js');
const require_card$1 = require('./src/card2.js');

//#region ../../packages/components/card/index.ts
const ElCard = require_install.withInstall(require_card$1.default);

//#endregion
exports.ElCard = ElCard;
exports.default = ElCard;
exports.cardContextKey = require_card.cardContextKey;
exports.cardProps = require_card.cardProps;
//# sourceMappingURL=index.js.map