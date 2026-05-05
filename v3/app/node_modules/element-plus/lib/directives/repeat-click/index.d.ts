import { ObjectDirective } from "vue";

//#region ../../packages/directives/repeat-click/index.d.ts
declare const REPEAT_INTERVAL = 100;
declare const REPEAT_DELAY = 600;
declare const SCOPE = "_RepeatClick";
interface RepeatClickEl extends HTMLElement {
  [SCOPE]: null | {
    start?: (evt: MouseEvent) => void;
    clear?: () => void;
  };
}
interface RepeatClickOptions {
  interval?: number;
  delay?: number;
  handler: (...args: unknown[]) => unknown;
}
declare const vRepeatClick: ObjectDirective<RepeatClickEl, RepeatClickOptions | RepeatClickOptions['handler']>;
//#endregion
export { REPEAT_DELAY, REPEAT_INTERVAL, RepeatClickOptions, vRepeatClick };