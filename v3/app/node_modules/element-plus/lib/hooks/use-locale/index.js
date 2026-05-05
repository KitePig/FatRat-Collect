Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_en = require('../../locale/lang/en.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/hooks/use-locale/index.ts
const buildTranslator = (locale) => (path, option) => translate(path, option, (0, vue.unref)(locale));
const translate = (path, option, locale) => (0, lodash_unified.get)(locale, path, path).replace(/\{(\w+)\}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`);
const buildLocaleContext = (locale) => {
	return {
		lang: (0, vue.computed)(() => (0, vue.unref)(locale).name),
		locale: (0, vue.isRef)(locale) ? locale : (0, vue.ref)(locale),
		t: buildTranslator(locale)
	};
};
const localeContextKey = Symbol("localeContextKey");
const useLocale = (localeOverrides) => {
	const locale = localeOverrides || (0, vue.inject)(localeContextKey, (0, vue.ref)());
	return buildLocaleContext((0, vue.computed)(() => locale.value || require_en.default));
};

//#endregion
exports.buildLocaleContext = buildLocaleContext;
exports.buildTranslator = buildTranslator;
exports.localeContextKey = localeContextKey;
exports.translate = translate;
exports.useLocale = useLocale;
//# sourceMappingURL=index.js.map