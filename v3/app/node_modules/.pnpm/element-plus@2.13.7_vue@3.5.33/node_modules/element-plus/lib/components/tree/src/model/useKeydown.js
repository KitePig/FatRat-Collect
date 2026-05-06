Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../../constants/aria.js');
const require_event = require('../../../../utils/dom/event.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/tree/src/model/useKeydown.ts
function useKeydown({ el$ }, store) {
	const ns = require_index.useNamespace("tree");
	(0, vue.onMounted)(() => {
		initTabIndex();
	});
	(0, vue.onUpdated)(() => {
		el$.value?.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
			checkbox.setAttribute("tabindex", "-1");
		});
	});
	function canNodeFocus(treeItems, nextIndex) {
		const currentNode = store.value.getNode(treeItems[nextIndex].dataset.key);
		return currentNode.canFocus && currentNode.visible && (currentNode.parent?.expanded || currentNode.parent?.level === 0);
	}
	const handleKeydown = (ev) => {
		const currentItem = ev.target;
		if (!currentItem.className.includes(ns.b("node"))) return;
		const code = require_event.getEventCode(ev);
		const treeItems = Array.from(el$.value.querySelectorAll(`.${ns.is("focusable")}[role=treeitem]`));
		const currentIndex = treeItems.indexOf(currentItem);
		let nextIndex;
		if ([require_aria.EVENT_CODE.up, require_aria.EVENT_CODE.down].includes(code)) {
			ev.preventDefault();
			if (code === require_aria.EVENT_CODE.up) {
				nextIndex = currentIndex === -1 ? 0 : currentIndex !== 0 ? currentIndex - 1 : treeItems.length - 1;
				const startIndex = nextIndex;
				while (true) {
					if (canNodeFocus(treeItems, nextIndex)) break;
					nextIndex--;
					if (nextIndex === startIndex) {
						nextIndex = -1;
						break;
					}
					if (nextIndex < 0) nextIndex = treeItems.length - 1;
				}
			} else {
				nextIndex = currentIndex === -1 ? 0 : currentIndex < treeItems.length - 1 ? currentIndex + 1 : 0;
				const startIndex = nextIndex;
				while (true) {
					if (canNodeFocus(treeItems, nextIndex)) break;
					nextIndex++;
					if (nextIndex === startIndex) {
						nextIndex = -1;
						break;
					}
					if (nextIndex >= treeItems.length) nextIndex = 0;
				}
			}
			nextIndex !== -1 && treeItems[nextIndex].focus();
		}
		if ([require_aria.EVENT_CODE.left, require_aria.EVENT_CODE.right].includes(code)) {
			ev.preventDefault();
			currentItem.click();
		}
		const hasInput = currentItem.querySelector("[type=\"checkbox\"]");
		if ([
			require_aria.EVENT_CODE.enter,
			require_aria.EVENT_CODE.numpadEnter,
			require_aria.EVENT_CODE.space
		].includes(code) && hasInput) {
			ev.preventDefault();
			hasInput.click();
		}
	};
	(0, _vueuse_core.useEventListener)(el$, "keydown", handleKeydown);
	const initTabIndex = () => {
		if (!el$.value) return;
		const treeItems = Array.from(el$.value.querySelectorAll(`.${ns.is("focusable")}[role=treeitem]`));
		Array.from(el$.value.querySelectorAll("input[type=checkbox]")).forEach((checkbox) => {
			checkbox.setAttribute("tabindex", "-1");
		});
		const checkedItem = el$.value.querySelectorAll(`.${ns.is("checked")}[role=treeitem]`);
		if (checkedItem.length) {
			checkedItem[0].setAttribute("tabindex", "0");
			return;
		}
		treeItems[0]?.setAttribute("tabindex", "0");
	};
}

//#endregion
exports.useKeydown = useKeydown;
//# sourceMappingURL=useKeydown.js.map