import { FieldPath } from "../../utils/typescript.js";
import "../../utils/index.js";
import _default from "../../locale/lang/en.js";
import { Language } from "../../locale/index.js";
import { InjectionKey, Ref } from "vue";
import { MaybeRef } from "@vueuse/core";

//#region ../../packages/hooks/use-locale/index.d.ts
type LocaleKeys = Exclude<FieldPath<typeof _default>, 'name' | 'el'> | (string & NonNullable<unknown>);
type TranslatorOption = Record<string, string | number>;
type Translator = (path: LocaleKeys, option?: TranslatorOption) => string;
type LocaleContext = {
  locale: Ref<Language>;
  lang: Ref<string>;
  t: Translator;
};
declare const buildTranslator: (locale: MaybeRef<Language>) => Translator;
declare const translate: (path: LocaleKeys, option: undefined | TranslatorOption, locale: Language) => string;
declare const buildLocaleContext: (locale: MaybeRef<Language>) => LocaleContext;
declare const localeContextKey: InjectionKey<Ref<Language | undefined>>;
declare const useLocale: (localeOverrides?: Ref<Language | undefined>) => LocaleContext;
//#endregion
export { LocaleContext, LocaleKeys, Translator, TranslatorOption, buildLocaleContext, buildTranslator, localeContextKey, translate, useLocale };