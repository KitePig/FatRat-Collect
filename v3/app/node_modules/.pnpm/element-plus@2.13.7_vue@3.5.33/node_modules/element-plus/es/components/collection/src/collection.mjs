import collection_default from "./collection2.mjs";
import collection_item_default from "./collection-item.mjs";
import { inject, onBeforeUnmount, onMounted, provide, ref, unref } from "vue";

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
		ElCollection: Object.assign({}, collection_default, {
			name: COLLECTION_NAME,
			setup() {
				const collectionRef = ref();
				const itemMap = /* @__PURE__ */ new Map();
				const getItems = (() => {
					const collectionEl = unref(collectionRef);
					if (!collectionEl) return [];
					const orderedNodes = Array.from(collectionEl.querySelectorAll(`[${COLLECTION_ITEM_SIGN}]`));
					return [...itemMap.values()].sort((a, b) => orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref));
				});
				provide(COLLECTION_INJECTION_KEY, {
					itemMap,
					getItems,
					collectionRef
				});
			}
		}),
		ElCollectionItem: Object.assign({}, collection_item_default, {
			name: COLLECTION_ITEM_NAME,
			setup(_, { attrs }) {
				const collectionItemRef = ref();
				const collectionInjection = inject(COLLECTION_INJECTION_KEY, void 0);
				provide(COLLECTION_ITEM_INJECTION_KEY, { collectionItemRef });
				onMounted(() => {
					const collectionItemEl = unref(collectionItemRef);
					if (collectionItemEl) collectionInjection.itemMap.set(collectionItemEl, {
						ref: collectionItemEl,
						...attrs
					});
				});
				onBeforeUnmount(() => {
					const collectionItemEl = unref(collectionItemRef);
					collectionInjection.itemMap.delete(collectionItemEl);
				});
			}
		})
	};
};

//#endregion
export { COLLECTION_ITEM_SIGN, createCollectionWithScope };
//# sourceMappingURL=collection.mjs.map