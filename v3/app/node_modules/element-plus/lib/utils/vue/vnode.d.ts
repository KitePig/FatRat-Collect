import * as vue from "vue";
import { VNode, VNodeChild, VNodeNormalizedChildren, createBlock } from "vue";

//#region ../../packages/utils/vue/vnode.d.ts
declare enum PatchFlags {
  TEXT = 1,
  CLASS = 2,
  STYLE = 4,
  PROPS = 8,
  FULL_PROPS = 16,
  HYDRATE_EVENTS = 32,
  STABLE_FRAGMENT = 64,
  KEYED_FRAGMENT = 128,
  UNKEYED_FRAGMENT = 256,
  NEED_PATCH = 512,
  DYNAMIC_SLOTS = 1024,
  HOISTED = -1,
  BAIL = -2
}
type VNodeChildAtom = Exclude<VNodeChild, Array<any>>;
type RawSlots = Exclude<VNodeNormalizedChildren, Array<any> | null | string>;
declare function isFragment(node: VNode): boolean;
declare function isFragment(node: unknown): node is VNode;
declare function isText(node: VNode): boolean;
declare function isText(node: unknown): node is VNode;
declare function isComment(node: VNode): boolean;
declare function isComment(node: unknown): node is VNode;
declare function isTemplate(node: VNode): boolean;
declare function isTemplate(node: unknown): node is VNode;
/**
 * determine if the element is a valid element type rather than fragments and comment e.g. <template> v-if
 * @param node {VNode} node to be tested
 */
declare function isValidElementNode(node: VNode): boolean;
declare function isValidElementNode(node: unknown): node is VNode;
declare const getFirstValidNode: (nodes: VNodeNormalizedChildren, maxDepth?: number) => string | number | boolean | void | VNode<vue.RendererNode, vue.RendererElement, {
  [key: string]: any;
}> | vue.VNodeArrayChildren | {
  [name: string]: unknown;
  $stable?: boolean;
} | null | undefined;
declare function renderIf(condition: boolean, ...args: Parameters<typeof createBlock>): VNode<vue.RendererNode, vue.RendererElement, {
  [key: string]: any;
}>;
declare function renderBlock(...args: Parameters<typeof createBlock>): VNode<vue.RendererNode, vue.RendererElement, {
  [key: string]: any;
}>;
declare const getNormalizedProps: (node: VNode) => Record<string, any>;
type FlattenVNodes = Array<VNodeChildAtom | RawSlots>;
declare const flattedChildren: (children: FlattenVNodes | VNode | VNodeNormalizedChildren) => FlattenVNodes;
//#endregion
export { FlattenVNodes, PatchFlags, RawSlots, VNodeChildAtom, flattedChildren, getFirstValidNode, getNormalizedProps, isComment, isFragment, isTemplate, isText, isValidElementNode, renderBlock, renderIf };