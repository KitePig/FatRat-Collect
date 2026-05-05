import { camelize, capitalize as capitalize$1, hyphenate } from "@vue/shared";

//#region ../../packages/utils/strings.ts
const kebabCase = hyphenate;
/**
* fork from {@link https://github.com/sindresorhus/escape-string-regexp}
*/
const escapeStringRegexp = (string = "") => string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
const capitalize = (str) => capitalize$1(str);

//#endregion
export { camelize, capitalize, escapeStringRegexp, hyphenate, kebabCase };
//# sourceMappingURL=strings.mjs.map