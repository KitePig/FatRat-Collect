const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_progress = require('./progress.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/progress/src/progress.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-valuenow"];
const _hoisted_2 = { viewBox: "0 0 100 100" };
const _hoisted_3 = [
	"d",
	"stroke",
	"stroke-linecap",
	"stroke-width"
];
const _hoisted_4 = [
	"d",
	"stroke",
	"opacity",
	"stroke-linecap",
	"stroke-width"
];
const _hoisted_5 = { key: 0 };
var progress_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElProgress",
	__name: "progress",
	props: require_progress.progressProps,
	setup(__props) {
		const STATUS_COLOR_MAP = {
			success: "#13ce66",
			exception: "#ff4949",
			warning: "#e6a23c",
			default: "#20a0ff"
		};
		const props = __props;
		const ns = require_index.useNamespace("progress");
		const barStyle = (0, vue.computed)(() => {
			const barStyle = {
				width: `${props.percentage}%`,
				animationDuration: `${props.duration}s`
			};
			const color = getCurrentColor(props.percentage);
			if (color.includes("gradient")) barStyle.background = color;
			else barStyle.backgroundColor = color;
			return barStyle;
		});
		const relativeStrokeWidth = (0, vue.computed)(() => (props.strokeWidth / props.width * 100).toFixed(1));
		const radius = (0, vue.computed)(() => {
			if (["circle", "dashboard"].includes(props.type)) return Number.parseInt(`${50 - Number.parseFloat(relativeStrokeWidth.value) / 2}`, 10);
			return 0;
		});
		const trackPath = (0, vue.computed)(() => {
			const r = radius.value;
			const isDashboard = props.type === "dashboard";
			return `
          M 50 50
          m 0 ${isDashboard ? "" : "-"}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "-" : ""}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "" : "-"}${r * 2}
          `;
		});
		const perimeter = (0, vue.computed)(() => 2 * Math.PI * radius.value);
		const rate = (0, vue.computed)(() => props.type === "dashboard" ? .75 : 1);
		const strokeDashoffset = (0, vue.computed)(() => {
			return `${-1 * perimeter.value * (1 - rate.value) / 2}px`;
		});
		const trailPathStyle = (0, vue.computed)(() => ({
			strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
			strokeDashoffset: strokeDashoffset.value
		}));
		const circlePathStyle = (0, vue.computed)(() => ({
			strokeDasharray: `${perimeter.value * rate.value * (props.percentage / 100)}px, ${perimeter.value}px`,
			strokeDashoffset: strokeDashoffset.value,
			transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s"
		}));
		const stroke = (0, vue.computed)(() => {
			let ret;
			if (props.color) ret = getCurrentColor(props.percentage);
			else ret = STATUS_COLOR_MAP[props.status] || STATUS_COLOR_MAP.default;
			return ret;
		});
		const statusIcon = (0, vue.computed)(() => {
			if (props.status === "warning") return _element_plus_icons_vue.WarningFilled;
			if (props.type === "line") return props.status === "success" ? _element_plus_icons_vue.CircleCheck : _element_plus_icons_vue.CircleClose;
			else return props.status === "success" ? _element_plus_icons_vue.Check : _element_plus_icons_vue.Close;
		});
		const progressTextSize = (0, vue.computed)(() => {
			return props.type === "line" ? 12 + props.strokeWidth * .4 : props.width * .111111 + 2;
		});
		const content = (0, vue.computed)(() => props.format(props.percentage));
		function getColors(color) {
			const span = 100 / color.length;
			return color.map((seriesColor, index) => {
				if ((0, _vue_shared.isString)(seriesColor)) return {
					color: seriesColor,
					percentage: (index + 1) * span
				};
				return seriesColor;
			}).sort((a, b) => a.percentage - b.percentage);
		}
		const getCurrentColor = (percentage) => {
			const { color } = props;
			if ((0, _vue_shared.isFunction)(color)) return color(percentage);
			else if ((0, _vue_shared.isString)(color)) return color;
			else {
				const colors = getColors(color);
				for (const color of colors) if (color.percentage > percentage) return color.color;
				return colors[colors.length - 1]?.color;
			}
		};
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				class: (0, vue.normalizeClass)([
					(0, vue.unref)(ns).b(),
					(0, vue.unref)(ns).m(__props.type),
					(0, vue.unref)(ns).is(__props.status),
					{
						[(0, vue.unref)(ns).m("without-text")]: !__props.showText,
						[(0, vue.unref)(ns).m("text-inside")]: __props.textInside
					}
				]),
				role: "progressbar",
				"aria-valuenow": __props.percentage,
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [__props.type === "line" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b("bar"))
			}, [(0, vue.createElementVNode)("div", {
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("bar", "outer")),
				style: (0, vue.normalizeStyle)({ height: `${__props.strokeWidth}px` })
			}, [(0, vue.createElementVNode)("div", {
				class: (0, vue.normalizeClass)([
					(0, vue.unref)(ns).be("bar", "inner"),
					{ [(0, vue.unref)(ns).bem("bar", "inner", "indeterminate")]: __props.indeterminate },
					{ [(0, vue.unref)(ns).bem("bar", "inner", "striped")]: __props.striped },
					{ [(0, vue.unref)(ns).bem("bar", "inner", "striped-flow")]: __props.stripedFlow }
				]),
				style: (0, vue.normalizeStyle)(barStyle.value)
			}, [(__props.showText || _ctx.$slots.default) && __props.textInside ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("bar", "innerText"))
			}, [(0, vue.renderSlot)(_ctx.$slots, "default", { percentage: __props.percentage }, () => [(0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(content.value), 1)])], 2)) : (0, vue.createCommentVNode)("v-if", true)], 6)], 6)], 2)) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 1,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b("circle")),
				style: (0, vue.normalizeStyle)({
					height: `${__props.width}px`,
					width: `${__props.width}px`
				})
			}, [((0, vue.openBlock)(), (0, vue.createElementBlock)("svg", _hoisted_2, [(0, vue.createElementVNode)("path", {
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("circle", "track")),
				d: trackPath.value,
				stroke: `var(${(0, vue.unref)(ns).cssVarName("fill-color-light")}, #e5e9f2)`,
				"stroke-linecap": __props.strokeLinecap,
				"stroke-width": relativeStrokeWidth.value,
				fill: "none",
				style: (0, vue.normalizeStyle)(trailPathStyle.value)
			}, null, 14, _hoisted_3), (0, vue.createElementVNode)("path", {
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("circle", "path")),
				d: trackPath.value,
				stroke: stroke.value,
				fill: "none",
				opacity: __props.percentage ? 1 : 0,
				"stroke-linecap": __props.strokeLinecap,
				"stroke-width": relativeStrokeWidth.value,
				style: (0, vue.normalizeStyle)(circlePathStyle.value)
			}, null, 14, _hoisted_4)]))], 6)), (__props.showText || _ctx.$slots.default) && !__props.textInside ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 2,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("text")),
				style: (0, vue.normalizeStyle)({ fontSize: `${progressTextSize.value}px` })
			}, [(0, vue.renderSlot)(_ctx.$slots, "default", { percentage: __props.percentage }, () => [!__props.status ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", _hoisted_5, (0, vue.toDisplayString)(content.value), 1)) : ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), { key: 1 }, {
				default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(statusIcon.value)))]),
				_: 1
			}))])], 6)) : (0, vue.createCommentVNode)("v-if", true)], 10, _hoisted_1);
		};
	}
});

//#endregion
exports.default = progress_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=progress.vue_vue_type_script_setup_true_lang.js.map