import * as vue from "vue";

//#region ../../packages/components/input-tag/src/composables/use-hovering.d.ts
declare function useHovering(): {
  hovering: vue.Ref<boolean, boolean>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
};
//#endregion
export { useHovering };