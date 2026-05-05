import * as vue from "vue";
import { ShallowRef } from "vue";

//#region ../../packages/components/input-tag/src/composables/use-drag-tag.d.ts
type DropType = 'before' | 'after';
interface UseDragTagOptions {
  wrapperRef: ShallowRef<HTMLElement | undefined>;
  handleDragged: (draggingIndex: number, dropIndex: number, type: DropType) => void;
  afterDragged?: () => void;
}
declare function useDragTag({
  wrapperRef,
  handleDragged,
  afterDragged
}: UseDragTagOptions): {
  dropIndicatorRef: ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  showDropIndicator: vue.Ref<boolean, boolean>;
  handleDragStart: (event: DragEvent, index: number) => void;
  handleDragOver: (event: DragEvent, index: number) => void;
  handleDragEnd: (event: DragEvent) => void;
};
//#endregion
export { useDragTag };