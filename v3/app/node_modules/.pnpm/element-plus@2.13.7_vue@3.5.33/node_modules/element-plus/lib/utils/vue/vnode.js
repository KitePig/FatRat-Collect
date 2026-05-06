Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_error = require('../error.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/utils/vue/vnode.ts
const SCOPE = "utils/vue/vnode";
let PatchFlags = /* @__PURE__ */ function(PatchFlags) {
	PatchFlags[PatchFlags["TEXT"] = 1] = "TEXT";
	PatchFlags[PatchFlags["CLASS"] = 2] = "CLASS";
	PatchFlags[PatchFlags["STYLE"] = 4] = "STYLE";
	PatchFlags[PatchFlags["PROPS"] = 8] = "PROPS";
	PatchFlags[PatchFlags["FULL_PROPS"] = 16] = "FULL_PROPS";
	PatchFlags[PatchFlags["HYDRATE_EVENTS"] = 32] = "HYDRATE_EVENTS";
	PatchFlags[PatchFlags["STABLE_FRAGMENT"] = 64] = "STABLE_FRAGMENT";
	PatchFlags[PatchFlags["KEYED_FRAGMENT"] = 128] = "KEYED_FRAGMENT";
	PatchFlags[PatchFlags["UNKEYED_FRAGMENT"] = 256] = "UNKEYED_FRAGMENT";
	PatchFlags[PatchFlags["NEED_PATCH"] = 512] = "NEED_PATCH";
	PatchFlags[PatchFlags["DYNAMIC_SLOTS"] = 1024] = "DYNAMIC_SLOTS";
	PatchFlags[PatchFlags["HOISTED"] = -1] = "HOISTED";
	PatchFlags[PatchFlags["BAIL"] = -2] = "BAIL";
	return PatchFlags;
}({});
function isFragment(node) {
	return (0, vue.isVNode)(node) && node.type === vue.Fragment;
}
function isText(node) {
	return (0, vue.isVNode)(node) && node.type === vue.Text;
}
function isComment(node) {
	return (0, vue.isVNode)(node) && node.type === vue.Comment;
}
const TEMPLATE = "template";
function isTemplate(node) {
	return (0, vue.isVNode)(node) && node.type === TEMPLATE;
}
function isValidElementNode(node) {
	return (0, vue.isVNode)(node) && !isFragment(node) && !isComment(node);
}
/**
* get a valid child node (not fragment nor comment)
* @param node {VNode} node to be searched
* @param depth {number} depth to be searched
*/
function getChildren(node, depth) {
	if (isComment(node)) return;
	if (isFragment(node) || isTemplate(node)) return depth > 0 ? getFirstValidNode(node.children, depth - 1) : void 0;
	return node;
}
const getFirstValidNode = (nodes, maxDepth = 3) => {
	if ((0, _vue_shared.isArray)(nodes)) return getChildren(nodes[0], maxDepth);
	else return getChildren(nodes, maxDepth);
};
function renderIf(condition, ...args) {
	return condition ? renderBlock(...args) : (0, vue.createCommentVNode)("v-if", true);
}
function renderBlock(...args) {
	return (0, vue.openBlock)(), (0, vue.createBlock)(...args);
}
const getNormalizedProps = (node) => {
	if (!(0, vue.isVNode)(node)) {
		require_error.debugWarn(SCOPE, "[getNormalizedProps] must be a VNode");
		return {};
	}
	const raw = node.props || {};
	const type = ((0, vue.isVNode)(node.type) ? node.type.props : void 0) || {};
	const props = {};
	Object.keys(type).forEach((key) => {
		if ((0, _vue_shared.hasOwn)(type[key], "default")) props[key] = type[key].default;
	});
	Object.keys(raw).forEach((key) => {
		props[(0, _vue_shared.camelize)(key)] = raw[key];
	});
	return props;
};
const flattedChildren = (children) => {
	const vNodes = (0, _vue_shared.isArray)(children) ? children : [children];
	const result = [];
	vNodes.forEach((child) => {
		if ((0, _vue_shared.isArray)(child)) result.push(...flattedChildren(child));
		else if ((0, vue.isVNode)(child) && child.component?.subTree) result.push(child, ...flattedChildren(child.component.subTree));
		else if ((0, vue.isVNode)(child) && (0, _vue_shared.isArray)(child.children)) result.push(...flattedChildren(child.children));
		else if ((0, vue.isVNode)(child) && child.shapeFlag === 2) result.push(...flattedChildren(child.type()));
		else result.push(child);
	});
	return result;
};

//#endregion
exports.PatchFlags = PatchFlags;
exports.flattedChildren = flattedChildren;
exports.getFirstValidNode = getFirstValidNode;
exports.getNormalizedProps = getNormalizedProps;
exports.isComment = isComment;
exports.isFragment = isFragment;
exports.isTemplate = isTemplate;
exports.isText = isText;
exports.isValidElementNode = isValidElementNode;
exports.renderBlock = renderBlock;
exports.renderIf = renderIf;
//# sourceMappingURL=vnode.js.map