import { SFCInstallWithContext, SFCWithInstall } from "./typescript.js";
import { Directive } from "vue";

//#region ../../packages/utils/vue/install.d.ts
declare const withPropsDefaultsSetter: (target: any) => void;
declare const withInstall: <T, E extends Record<string, any>>(main: T, extra?: E) => SFCWithInstall<T> & E;
declare const withInstallFunction: <T>(fn: T, name: string) => SFCInstallWithContext<T>;
declare const withInstallDirective: <T extends Directive>(directive: T, name: string) => SFCWithInstall<T>;
declare const withNoopInstall: <T>(component: T) => SFCWithInstall<T>;
//#endregion
export { withInstall, withInstallDirective, withInstallFunction, withNoopInstall, withPropsDefaultsSetter };