import { MentionOption } from "./types.js";

//#region ../../packages/components/mention/src/helper.d.ts
declare const filterOption: <T extends MentionOption = MentionOption>(pattern: string, option: T & MentionOption) => boolean;
//#endregion
export { filterOption };