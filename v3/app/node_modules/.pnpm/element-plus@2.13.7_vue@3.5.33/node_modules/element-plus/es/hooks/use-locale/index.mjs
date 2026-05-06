import en_default from "../../locale/lang/en.mjs";
import { get } from "lodash-unified";
import { computed, inject, isRef, ref, unref } from "vue";

//#region ../../packages/hooks/use-locale/index.ts
const buildTranslator = (locale) => (path, option) => translate(path, option, unref(locale));
const translate = (path, option, locale) => get(locale, path, path).replace(/\{(\w+)\}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`);
const buildLocaleContext = (locale) => {
	return {
		lang: computed(() => unref(locale).name),
		locale: isRef(locale) ? locale : ref(locale),
		t: buildTranslator(locale)
	};
};
const localeContextKey = Symbol("localeContextKey");
const useLocale = (localeOverrides) => {
	const locale = localeOverrides || inject(localeContextKey, ref());
	return buildLocaleContext(computed(() => locale.value || en_default));
};

//#endregion
export { buildLocaleContext, buildTranslator, localeContextKey, translate, useLocale };
//# sourceMappingURL=index.mjs.map