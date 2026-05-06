Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/teleport/src/teleport.ts
const teleportProps = require_runtime.buildProps({
	to: {
		type: require_runtime.definePropType([String, Object]),
		required: true
	},
	disabled: Boolean
});

//#endregion
exports.teleportProps = teleportProps;
//# sourceMappingURL=teleport.js.map