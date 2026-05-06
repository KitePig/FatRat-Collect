Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_error = require('../../utils/error.js');
const require_style = require('../../utils/dom/style.js');
const require_scroll = require('../../utils/dom/scroll.js');
const require_index = require('../use-namespace/index.js');
let vue = require("vue");

//#region ../../packages/hooks/use-lockscreen/index.ts
/**
* Hook that monitoring the ref value to lock or unlock the screen.
* When the trigger became true, it assumes modal is now opened and vice versa.
* @param trigger {Ref<boolean>}
*/
const useLockscreen = (trigger, options = {}) => {
	if (!(0, vue.isRef)(trigger)) require_error.throwError("[useLockscreen]", "You need to pass a ref param to this function");
	const ns = options.ns || require_index.useNamespace("popup");
	const hiddenCls = (0, vue.computed)(() => ns.bm("parent", "hidden"));
	let scrollBarWidth = 0;
	let withoutHiddenClass = false;
	let bodyWidth = "0";
	let cleaned = false;
	const cleanup = () => {
		if (cleaned) return;
		cleaned = true;
		setTimeout(() => {
			if (typeof document === "undefined") return;
			if (withoutHiddenClass && document) {
				document.body.style.width = bodyWidth;
				require_style.removeClass(document.body, hiddenCls.value);
			}
		}, 200);
	};
	(0, vue.watch)(trigger, (val) => {
		if (!val) {
			cleanup();
			return;
		}
		cleaned = false;
		withoutHiddenClass = !require_style.hasClass(document.body, hiddenCls.value);
		if (withoutHiddenClass) {
			bodyWidth = document.body.style.width;
			require_style.addClass(document.body, hiddenCls.value);
		}
		scrollBarWidth = require_scroll.getScrollBarWidth(ns.namespace.value);
		const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
		const bodyOverflowY = require_style.getStyle(document.body, "overflowY");
		if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) document.body.style.width = `calc(100% - ${scrollBarWidth}px)`;
	});
	(0, vue.onScopeDispose)(() => cleanup());
};

//#endregion
exports.useLockscreen = useLockscreen;
//# sourceMappingURL=index.js.map