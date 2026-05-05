import { AllowedComponentProps, AppContext, ComponentOptionsBase, EmitsOptions, ObjectPlugin, SetupContext, VNodeProps } from "vue";

//#region ../../packages/utils/vue/typescript.d.ts
type ExtractEventNames<T> = T extends (new (...args: any[]) => any) ? T extends ComponentOptionsBase<any, any, any, any, any, any, any, any> ? T['emits'] extends (string[] & ThisType<void>) | (infer Emits & ThisType<any>) | undefined ? keyof Emits extends string ? `on${Capitalize<keyof Emits>}` : Emits extends readonly string[] ? `on${Capitalize<Emits[number]>}` : never : never : never : never;
type SFCWithInstall<T> = T & ObjectPlugin & SFCWithPropsDefaultsSetter<T>;
type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
};
type SFCWithPropsDefaultsSetter<T> = T extends (new (...args: any) => any) ? {
  setPropsDefaults: (defaults: Partial<Omit<InstanceType<T>['$props'], ExtractEventNames<T> | keyof VNodeProps | keyof AllowedComponentProps>>) => void;
} : unknown;
type EmitFn<E extends EmitsOptions> = SetupContext<E>['emit'];
//#endregion
export { EmitFn, SFCInstallWithContext, SFCWithInstall, SFCWithPropsDefaultsSetter };