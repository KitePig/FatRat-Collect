import { throwError } from "../../../utils/error.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { formContextKey, formItemContextKey } from "./constants.mjs";
import { useResizeObserver } from "@vueuse/core";
import { Fragment, computed, createVNode, defineComponent, inject, nextTick, onBeforeUnmount, onMounted, onUpdated, ref, watch } from "vue";

//#region ../../packages/components/form/src/form-label-wrap.tsx
const COMPONENT_NAME = "ElLabelWrap";
var form_label_wrap_default = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	props: {
		isAutoWidth: Boolean,
		updateAll: Boolean
	},
	setup(props, { slots }) {
		const formContext = inject(formContextKey, void 0);
		const formItemContext = inject(formItemContextKey);
		if (!formItemContext) throwError(COMPONENT_NAME, "usage: <el-form-item><label-wrap /></el-form-item>");
		const ns = useNamespace("form");
		const el = ref();
		const computedWidth = ref(0);
		const getLabelWidth = () => {
			if (el.value?.firstElementChild) {
				const width = window.getComputedStyle(el.value.firstElementChild).width;
				return Math.ceil(Number.parseFloat(width));
			} else return 0;
		};
		const updateLabelWidth = (action = "update") => {
			nextTick(() => {
				if (slots.default && props.isAutoWidth) {
					if (action === "update") computedWidth.value = getLabelWidth();
					else if (action === "remove") formContext?.deregisterLabelWidth(computedWidth.value);
				}
			});
		};
		const updateLabelWidthFn = () => updateLabelWidth("update");
		onMounted(() => {
			updateLabelWidthFn();
		});
		onBeforeUnmount(() => {
			updateLabelWidth("remove");
		});
		onUpdated(() => updateLabelWidthFn());
		watch(computedWidth, (val, oldVal) => {
			if (props.updateAll) formContext?.registerLabelWidth(val, oldVal);
		});
		useResizeObserver(computed(() => el.value?.firstElementChild ?? null), updateLabelWidthFn);
		return () => {
			if (!slots) return null;
			const { isAutoWidth } = props;
			if (isAutoWidth) {
				const autoLabelWidth = formContext?.autoLabelWidth;
				const hasLabel = formItemContext?.hasLabel;
				const style = {};
				if (hasLabel && autoLabelWidth && autoLabelWidth !== "auto") {
					const marginWidth = Math.max(0, Number.parseInt(autoLabelWidth, 10) - computedWidth.value);
					const marginPosition = (formItemContext.labelPosition || formContext.labelPosition) === "left" ? "marginRight" : "marginLeft";
					if (marginWidth) style[marginPosition] = `${marginWidth}px`;
				}
				return createVNode("div", {
					"ref": el,
					"class": [ns.be("item", "label-wrap")],
					"style": style
				}, [slots.default?.()]);
			} else return createVNode(Fragment, { "ref": el }, [slots.default?.()]);
		};
	}
});

//#endregion
export { form_label_wrap_default as default };
//# sourceMappingURL=form-label-wrap.mjs.map