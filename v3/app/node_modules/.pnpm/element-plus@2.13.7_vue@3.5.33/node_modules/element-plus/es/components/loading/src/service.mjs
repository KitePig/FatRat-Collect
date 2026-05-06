import { isClient } from "../../../utils/browser.mjs";
import { isString } from "../../../utils/types.mjs";
import { addClass, getStyle, removeClass } from "../../../utils/dom/style.mjs";
import { createLoadingComponent } from "./loading.mjs";
import { nextTick } from "vue";

//#region ../../packages/components/loading/src/service.ts
let fullscreenInstance = void 0;
const Loading = function(options = {}, context) {
	if (!isClient) return void 0;
	const resolved = resolveOptions(options);
	if (resolved.fullscreen && fullscreenInstance) return fullscreenInstance;
	const instance = createLoadingComponent({
		...resolved,
		closed: () => {
			resolved.closed?.();
			if (resolved.fullscreen) fullscreenInstance = void 0;
		}
	}, context ?? Loading._context);
	addStyle(resolved, resolved.parent, instance);
	addClassList(resolved, resolved.parent, instance);
	resolved.parent.vLoadingAddClassList = () => addClassList(resolved, resolved.parent, instance);
	/**
	* add loading-number to parent.
	* because if a fullscreen loading is triggered when somewhere
	* a v-loading.body was triggered before and it's parent is
	* document.body which with a margin , the fullscreen loading's
	* destroySelf function will remove 'el-loading-parent--relative',
	* and then the position of v-loading.body will be error.
	*/
	let loadingNumber = resolved.parent.getAttribute("loading-number");
	if (!loadingNumber) loadingNumber = "1";
	else loadingNumber = `${Number.parseInt(loadingNumber) + 1}`;
	resolved.parent.setAttribute("loading-number", loadingNumber);
	resolved.parent.appendChild(instance.$el);
	nextTick(() => instance.visible.value = resolved.visible);
	if (resolved.fullscreen) fullscreenInstance = instance;
	return instance;
};
const resolveOptions = (options) => {
	let target;
	if (isString(options.target)) target = document.querySelector(options.target) ?? document.body;
	else target = options.target || document.body;
	return {
		parent: target === document.body || options.body ? document.body : target,
		background: options.background || "",
		svg: options.svg || "",
		svgViewBox: options.svgViewBox || "",
		spinner: options.spinner || false,
		text: options.text || "",
		fullscreen: target === document.body && (options.fullscreen ?? true),
		lock: options.lock ?? false,
		customClass: options.customClass || "",
		visible: options.visible ?? true,
		beforeClose: options.beforeClose,
		closed: options.closed,
		target
	};
};
const addStyle = async (options, parent, instance) => {
	const { nextZIndex } = instance.vm.zIndex || instance.vm._.exposed.zIndex;
	const maskStyle = {};
	if (options.fullscreen) {
		instance.originalPosition.value = getStyle(document.body, "position");
		instance.originalOverflow.value = getStyle(document.body, "overflow");
		maskStyle.zIndex = nextZIndex();
	} else if (options.parent === document.body) {
		instance.originalPosition.value = getStyle(document.body, "position");
		/**
		* await dom render when visible is true in init,
		* because some component's height maybe 0.
		* e.g. el-table.
		*/
		await nextTick();
		for (const property of ["top", "left"]) {
			const scroll = property === "top" ? "scrollTop" : "scrollLeft";
			maskStyle[property] = `${options.target.getBoundingClientRect()[property] + document.body[scroll] + document.documentElement[scroll] - Number.parseInt(getStyle(document.body, `margin-${property}`), 10)}px`;
		}
		for (const property of ["height", "width"]) maskStyle[property] = `${options.target.getBoundingClientRect()[property]}px`;
	} else instance.originalPosition.value = getStyle(parent, "position");
	for (const [key, value] of Object.entries(maskStyle)) instance.$el.style[key] = value;
};
const addClassList = (options, parent, instance) => {
	const ns = instance.vm.ns || instance.vm._.exposed.ns;
	if (![
		"absolute",
		"fixed",
		"sticky"
	].includes(instance.originalPosition.value)) addClass(parent, ns.bm("parent", "relative"));
	else removeClass(parent, ns.bm("parent", "relative"));
	if (options.fullscreen && options.lock) addClass(parent, ns.bm("parent", "hidden"));
	else removeClass(parent, ns.bm("parent", "hidden"));
};
Loading._context = null;

//#endregion
export { Loading as default };
//# sourceMappingURL=service.mjs.map