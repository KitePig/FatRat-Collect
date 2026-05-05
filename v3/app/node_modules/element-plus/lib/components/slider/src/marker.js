Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/slider/src/marker.ts
const sliderMarkerProps = require_runtime$1.buildProps({ mark: {
	type: require_runtime$1.definePropType([String, Object]),
	default: void 0
} });
var marker_default = (0, vue.defineComponent)({
	name: "ElSliderMarker",
	props: sliderMarkerProps,
	setup(props) {
		const ns = require_index.useNamespace("slider");
		const label = (0, vue.computed)(() => {
			return (0, _vue_shared.isString)(props.mark) ? props.mark : props.mark.label;
		});
		const style = (0, vue.computed)(() => (0, _vue_shared.isString)(props.mark) ? void 0 : props.mark.style);
		return () => (0, vue.h)("div", {
			class: ns.e("marks-text"),
			style: style.value
		}, label.value);
	}
});

//#endregion
exports.default = marker_default;
exports.sliderMarkerProps = sliderMarkerProps;
//# sourceMappingURL=marker.js.map