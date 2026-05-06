Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_style = require('../../../utils/dom/style.js');
const require_use_global_config = require('../../config-provider/src/hooks/use-global-config.js');
let vue = require("vue");

//#region ../../packages/components/loading/src/loading.ts
function createLoadingComponent(options, appContext) {
	let afterLeaveTimer;
	const afterLeaveFlag = (0, vue.ref)(false);
	const data = (0, vue.reactive)({
		...options,
		originalPosition: "",
		originalOverflow: "",
		visible: false
	});
	function setText(text) {
		data.text = text;
	}
	function destroySelf() {
		const target = data.parent;
		const ns = vm.ns;
		if (!target.vLoadingAddClassList) {
			let loadingNumber = target.getAttribute("loading-number");
			loadingNumber = Number.parseInt(loadingNumber) - 1;
			if (!loadingNumber) {
				require_style.removeClass(target, ns.bm("parent", "relative"));
				target.removeAttribute("loading-number");
			} else target.setAttribute("loading-number", loadingNumber.toString());
			require_style.removeClass(target, ns.bm("parent", "hidden"));
		}
		removeElLoadingChild();
		loadingInstance.unmount();
	}
	function removeElLoadingChild() {
		vm.$el?.parentNode?.removeChild(vm.$el);
	}
	function close() {
		if (options.beforeClose && !options.beforeClose()) return;
		afterLeaveFlag.value = true;
		clearTimeout(afterLeaveTimer);
		afterLeaveTimer = setTimeout(handleAfterLeave, 400);
		data.visible = false;
		options.closed?.();
	}
	function handleAfterLeave() {
		if (!afterLeaveFlag.value) return;
		const target = data.parent;
		afterLeaveFlag.value = false;
		target.vLoadingAddClassList = void 0;
		destroySelf();
	}
	const loadingInstance = (0, vue.createApp)((0, vue.defineComponent)({
		name: "ElLoading",
		setup(_, { expose }) {
			const { ns, zIndex } = require_use_global_config.useGlobalComponentSettings("loading");
			expose({
				ns,
				zIndex
			});
			return () => {
				const svg = data.spinner || data.svg;
				const spinner = (0, vue.h)("svg", {
					class: "circular",
					viewBox: data.svgViewBox ? data.svgViewBox : "0 0 50 50",
					...svg ? { innerHTML: svg } : {}
				}, [(0, vue.h)("circle", {
					class: "path",
					cx: "25",
					cy: "25",
					r: "20",
					fill: "none"
				})]);
				const spinnerText = data.text ? (0, vue.h)("p", { class: ns.b("text") }, [data.text]) : void 0;
				return (0, vue.h)(vue.Transition, {
					name: ns.b("fade"),
					onAfterLeave: handleAfterLeave
				}, { default: (0, vue.withCtx)(() => [(0, vue.withDirectives)((0, vue.createVNode)("div", {
					style: { backgroundColor: data.background || "" },
					class: [
						ns.b("mask"),
						data.customClass,
						ns.is("fullscreen", data.fullscreen)
					]
				}, [(0, vue.h)("div", { class: ns.b("spinner") }, [spinner, spinnerText])]), [[vue.vShow, data.visible]])]) });
			};
		}
	}));
	Object.assign(loadingInstance._context, appContext ?? {});
	const vm = loadingInstance.mount(document.createElement("div"));
	return {
		...(0, vue.toRefs)(data),
		setText,
		removeElLoadingChild,
		close,
		handleAfterLeave,
		vm,
		get $el() {
			return vm.$el;
		}
	};
}

//#endregion
exports.createLoadingComponent = createLoadingComponent;
//# sourceMappingURL=loading.js.map