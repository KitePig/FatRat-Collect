const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../utils/dom/aria.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_useProps = require('./useProps.js');
const require_useOption = require('./useOption.js');
const require_defaults = require('./defaults.js');
const require_token = require('./token.js');
let vue = require("vue");

//#region ../../packages/components/select-v2/src/option-item.vue?vue&type=script&lang.ts
var option_item_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	props: require_defaults.optionV2Props,
	emits: require_defaults.optionV2Emits,
	setup(props, { emit }) {
		const select = (0, vue.inject)(require_token.selectV2InjectionKey);
		const ns = require_index.useNamespace("select");
		const { hoverItem, selectOptionClick } = require_useOption.useOption(props, { emit });
		const { getLabel } = require_useProps.useProps(select.props);
		const contentId = select.contentId;
		const handleMousedown = (event) => {
			let target = event.target;
			const currentTarget = event.currentTarget;
			while (target && target !== currentTarget) {
				if (require_aria.isFocusable(target)) return;
				target = target.parentElement;
			}
			event.preventDefault();
		};
		return {
			ns,
			contentId,
			hoverItem,
			handleMousedown,
			selectOptionClick,
			getLabel
		};
	}
});

//#endregion
exports.default = option_item_vue_vue_type_script_lang_default;
//# sourceMappingURL=option-item.vue_vue_type_script_lang.js.map