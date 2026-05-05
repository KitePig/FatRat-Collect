import { isNumber, isString } from "../../../utils/types.mjs";
import { addUnit } from "../../../utils/dom/style.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { avatarEmits, avatarProps } from "./avatar.mjs";
import { avatarGroupContextKey } from "./constants.mjs";
import { computed, createBlock, createElementBlock, defineComponent, inject, normalizeClass, normalizeStyle, openBlock, ref, renderSlot, resolveDynamicComponent, unref, watch, withCtx } from "vue";

//#region ../../packages/components/avatar/src/avatar.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"src",
	"alt",
	"srcset"
];
var avatar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElAvatar",
	__name: "avatar",
	props: avatarProps,
	emits: avatarEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const avatarGroupContext = inject(avatarGroupContextKey, void 0);
		const ns = useNamespace("avatar");
		const hasLoadError = ref(false);
		const size = computed(() => props.size ?? avatarGroupContext?.size);
		const shape = computed(() => props.shape ?? avatarGroupContext?.shape ?? "circle");
		const avatarClass = computed(() => {
			const { icon } = props;
			const classList = [ns.b()];
			if (isString(size.value)) classList.push(ns.m(size.value));
			if (icon) classList.push(ns.m("icon"));
			if (shape.value) classList.push(ns.m(shape.value));
			return classList;
		});
		const sizeStyle = computed(() => {
			return isNumber(size.value) ? ns.cssVarBlock({ size: addUnit(size.value) }) : void 0;
		});
		const fitStyle = computed(() => ({ objectFit: props.fit }));
		watch(() => [props.src, props.srcSet], () => hasLoadError.value = false);
		function handleError(e) {
			hasLoadError.value = true;
			emit("error", e);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", {
				class: normalizeClass(avatarClass.value),
				style: normalizeStyle(sizeStyle.value)
			}, [(__props.src || __props.srcSet) && !hasLoadError.value ? (openBlock(), createElementBlock("img", {
				key: 0,
				src: __props.src,
				alt: __props.alt,
				srcset: __props.srcSet,
				style: normalizeStyle(fitStyle.value),
				onError: handleError
			}, null, 44, _hoisted_1)) : __props.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
				default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.icon)))]),
				_: 1
			})) : renderSlot(_ctx.$slots, "default", { key: 2 })], 6);
		};
	}
});

//#endregion
export { avatar_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=avatar.vue_vue_type_script_setup_true_lang.mjs.map