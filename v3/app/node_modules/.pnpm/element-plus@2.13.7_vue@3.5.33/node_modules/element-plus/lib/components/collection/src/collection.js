Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_collection = require('./collection2.js');
const require_collection_item = require('./collection-item.js');
let vue = require("vue");

//#region ../../packages/components/collection/src/collection.ts
const COLLECTION_ITEM_SIGN = `data-el-collection-item`;
const createCollectionWithScope = (name) => {
	const COLLECTION_NAME = `El${name}Collection`;
	const COLLECTION_ITEM_NAME = `${COLLECTION_NAME}Item`;
	const COLLECTION_INJECTION_KEY = Symbol(COLLECTION_NAME);
	const COLLECTION_ITEM_INJECTION_KEY = Symbol(COLLECTION_ITEM_NAME);
	return {
		COLLECTION_INJECTION_KEY,
		COLLECTION_ITEM_INJECTION_KEY,
		ElCollection: Object.assign({}, require_collection.default, {
			name: COLLECTION_NAME,
			setup() {
				const collectionRef = (0, vue.ref)();
				const itemMap = /* @__PURE__ */ new Map();
				const getItems = (() => {
					const collectionEl = (0, vue.unref)(collectionRef);
					if (!collectionEl) return [];
					const orderedNodes = Array.from(collectionEl.querySelectorAll(`[${COLLECTION_ITEM_SIGN}]`));
					return [...itemMap.values()].sort((a, b) => orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref));
				});
				(0, vue.provide)(COLLECTION_INJECTION_KEY, {
					itemMap,
					getItems,
					collectionRef
				});
			}
		}),
		ElCollectionItem: Object.assign({}, require_collection_item.default, {
			name: COLLECTION_ITEM_NAME,
			setup(_, { attrs }) {
				const collectionItemRef = (0, vue.ref)();
				const collectionInjection = (0, vue.inject)(COLLECTION_INJECTION_KEY, void 0);
				(0, vue.provide)(COLLECTION_ITEM_INJECTION_KEY, { collectionItemRef });
				(0, vue.onMounted)(() => {
					const collectionItemEl = (0, vue.unref)(collectionItemRef);
					if (collectionItemEl) collectionInjection.itemMap.set(collectionItemEl, {
						ref: collectionItemEl,
						...attrs
					});
				});
				(0, vue.onBeforeUnmount)(() => {
					const collectionItemEl = (0, vue.unref)(collectionItemRef);
					collectionInjection.itemMap.delete(collectionItemEl);
				});
			}
		})
	};
};

//#endregion
exports.COLLECTION_ITEM_SIGN = COLLECTION_ITEM_SIGN;
exports.createCollectionWithScope = createCollectionWithScope;
//# sourceMappingURL=collection.js.map