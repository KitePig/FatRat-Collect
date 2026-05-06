//#region ../../packages/utils/dom/event.d.ts
declare const composeEventHandlers: <E>(theirsHandler?: (event: E) => boolean | void, oursHandler?: (event: E) => void, {
  checkForDefaultPrevented
}?: {
  checkForDefaultPrevented?: boolean | undefined;
}) => (event: E) => void;
type WhenMouseHandler = (e: PointerEvent) => any;
declare const whenMouse: (handler: WhenMouseHandler) => WhenMouseHandler;
declare const getEventCode: (event: KeyboardEvent) => string;
declare const getEventKey: (event: KeyboardEvent) => string;
//#endregion
export { composeEventHandlers, getEventCode, getEventKey, whenMouse };