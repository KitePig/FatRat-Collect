import { removeClass } from "../../../utils/dom/style.mjs";
import { useGlobalComponentSettings } from "../../config-provider/src/hooks/use-global-config.mjs";
import { Transition, createApp, createVNode, defineComponent, h, reactive, ref, toRefs, vShow, withCtx, withDirectives } from "vue";

//#region ../../packages/components/loading/src/loading.ts
function createLoadingComponent(options, appContext) {
	let afterLeaveTimer;
	const afterLeaveFlag = ref(false);
	const data = reactive({
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
				removeClass(target, ns.bm("parent", "relative"));
				target.removeAttribute("loading-number");
			} else target.setAttribute("loading-number", loadingNumber.toString());
			removeClass(target, ns.bm("parent", "hidden"));
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
	const loadingInstance = createApp(defineComponent({
		name: "ElLoading",
		setup(_, { expose }) {
			const { ns, zIndex } = useGlobalComponentSettings("loading");
			expose({
				ns,
				zIndex
			});
			return () => {
				const svg = data.spinner || data.svg;
				const spinner = h("svg", {
					class: "circular",
					viewBox: data.svgViewBox ? data.svgViewBox : "0 0 50 50",
					...svg ? { innerHTML: svg } : {}
				}, [h("circle", {
					class: "path",
					cx: "25",
					cy: "25",
					r: "20",
					fill: "none"
				})]);
				const spinnerText = data.text ? h("p", { class: ns.b("text") }, [data.text]) : void 0;
				return h(Transition, {
					name: ns.b("fade"),
					onAfterLeave: handleAfterLeave
				}, { default: withCtx(() => [withDirectives(createVNode("div", {
					style: { backgroundColor: data.background || "" },
					class: [
						ns.b("mask"),
						data.customClass,
						ns.is("fullscreen", data.fullscreen)
					]
				}, [h("div", { class: ns.b("spinner") }, [spinner, spinnerText])]), [[vShow, data.visible]])]) });
			};
		}
	}));
	Object.assign(loadingInstance._context, appContext ?? {});
	const vm = loadingInstance.mount(document.createElement("div"));
	return {
		...toRefs(data),
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
export { createLoadingComponent };
//# sourceMappingURL=loading.mjs.map