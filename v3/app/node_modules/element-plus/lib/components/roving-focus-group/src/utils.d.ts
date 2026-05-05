import { HTMLAttributes } from "vue";

//#region ../../packages/components/roving-focus-group/src/utils.d.ts
type Orientation = HTMLAttributes['aria-orientation'];
type Direction = 'ltr' | 'rtl';
type FocusIntent = 'first' | 'last' | 'prev' | 'next';
declare const getFocusIntent: (event: KeyboardEvent, orientation?: Orientation, dir?: Direction) => FocusIntent | undefined;
declare const reorderArray: <T>(array: T[], atIdx: number) => T[];
declare const focusFirst: (elements: HTMLElement[]) => void;
//#endregion
export { focusFirst, getFocusIntent, reorderArray };