import { camelize, hyphenate } from "@vue/shared";

//#region ../../packages/utils/strings.d.ts
declare const kebabCase: (str: string) => string;
/**
 * fork from {@link https://github.com/sindresorhus/escape-string-regexp}
 */
declare const escapeStringRegexp: (string?: string) => string;
declare const capitalize: <T extends string>(str: T) => Capitalize<T>;
//#endregion
export { camelize, capitalize, escapeStringRegexp, hyphenate, kebabCase };