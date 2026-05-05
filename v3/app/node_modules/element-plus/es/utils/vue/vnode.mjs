import { isArray } from "../types.mjs";
import { camelize } from "../strings.mjs";
import { hasOwn } from "../objects.mjs";
import { debugWarn } from "../error.mjs";
import { Comment, Fragment, Text, createBlock, createCommentVNode, isVNode, openBlock } from "vue";

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
	return isVNode(node) && node.type === Fragment;
}
function isText(node) {
	return isVNode(node) && node.type === Text;
}
function isComment(node) {
	return isVNode(node) && node.type === Comment;
}
const TEMPLATE = "template";
function isTemplate(node) {
	return isVNode(node) && node.type === TEMPLATE;
}
function isValidElementNode(node) {
	return isVNode(node) && !isFragment(node) && !isComment(node);
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
	if (isArray(nodes)) return getChildren(nodes[0], maxDepth);
	else return getChildren(nodes, maxDepth);
};
function renderIf(condition, ...args) {
	return condition ? renderBlock(...args) : createCommentVNode("v-if", true);
}
function renderBlock(...args) {
	return openBlock(), createBlock(...args);
}
const getNormalizedProps = (node) => {
	if (!isVNode(node)) {
		debugWarn(SCOPE, "[getNormalizedProps] must be a VNode");
		return {};
	}
	const raw = node.props || {};
	const type = (isVNode(node.type) ? node.type.props : void 0) || {};
	const props = {};
	Object.keys(type).forEach((key) => {
		if (hasOwn(type[key], "default")) props[key] = type[key].default;
	});
	Object.keys(raw).forEach((key) => {
		props[camelize(key)] = raw[key];
	});
	return props;
};
const flattedChildren = (children) => {
	const vNodes = isArray(children) ? children : [children];
	const result = [];
	vNodes.forEach((child) => {
		if (isArray(child)) result.push(...flattedChildren(child));
		else if (isVNode(child) && child.component?.subTree) result.push(child, ...flattedChildren(child.component.subTree));
		else if (isVNode(child) && isArray(child.children)) result.push(...flattedChildren(child.children));
		else if (isVNode(child) && child.shapeFlag === 2) result.push(...flattedChildren(child.type()));
		else result.push(child);
	});
	return result;
};

//#endregion
export { PatchFlags, flattedChildren, getFirstValidNode, getNormalizedProps, isComment, isFragment, isTemplate, isText, isValidElementNode, renderBlock, renderIf };
//# sourceMappingURL=vnode.mjs.map