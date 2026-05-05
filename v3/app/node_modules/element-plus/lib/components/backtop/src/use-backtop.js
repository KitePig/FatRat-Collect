Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_error = require('../../../utils/error.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/backtop/src/use-backtop.ts
const useBackTop = (props, emit, componentName) => {
	const el = (0, vue.shallowRef)();
	const container = (0, vue.shallowRef)();
	const visible = (0, vue.ref)(false);
	const handleScroll = () => {
		if (el.value) visible.value = el.value.scrollTop >= props.visibilityHeight;
	};
	const handleClick = (event) => {
		el.value?.scrollTo({
			top: 0,
			behavior: "smooth"
		});
		emit("click", event);
	};
	(0, _vueuse_core.useEventListener)(container, "scroll", (0, _vueuse_core.useThrottleFn)(handleScroll, 300, true));
	(0, vue.onMounted)(() => {
		container.value = document;
		el.value = document.documentElement;
		if (props.target) {
			el.value = document.querySelector(props.target) ?? void 0;
			if (!el.value) require_error.throwError(componentName, `target does not exist: ${props.target}`);
			container.value = el.value;
		}
		handleScroll();
	});
	return {
		visible,
		handleClick
	};
};

//#endregion
exports.useBackTop = useBackTop;
//# sourceMappingURL=use-backtop.js.map