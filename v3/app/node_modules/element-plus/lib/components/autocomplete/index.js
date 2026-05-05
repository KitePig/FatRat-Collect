Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_autocomplete = require('./src/autocomplete.js');
const require_autocomplete$1 = require('./src/autocomplete2.js');

//#region ../../packages/components/autocomplete/index.ts
const ElAutocomplete = require_install.withInstall(require_autocomplete$1.default);

//#endregion
exports.ElAutocomplete = ElAutocomplete;
exports.default = ElAutocomplete;
exports.autocompleteEmits = require_autocomplete.autocompleteEmits;
exports.autocompleteProps = require_autocomplete.autocompleteProps;
//# sourceMappingURL=index.js.map