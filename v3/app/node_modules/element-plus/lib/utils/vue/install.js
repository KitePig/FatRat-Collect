Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let _vue_shared = require("@vue/shared");
let lodash_unified = require("lodash-unified");

//#region ../../packages/utils/vue/install.ts
const withPropsDefaultsSetter = (target) => {
	const _p = target.props;
	const props = (0, _vue_shared.isArray)(_p) ? (0, lodash_unified.fromPairs)(_p.map((key) => [key, {}])) : _p;
	target.setPropsDefaults = (defaults) => {
		if (!props) return;
		for (const [key, value] of Object.entries(defaults)) {
			const prop = props[key];
			if (!(0, _vue_shared.hasOwn)(props, key)) continue;
			if ((0, lodash_unified.isPlainObject)(prop)) {
				props[key] = {
					...prop,
					default: value
				};
				continue;
			}
			props[key] = {
				type: prop,
				default: value
			};
		}
		target.props = props;
	};
};
const withInstall = (main, extra) => {
	main.install = (app) => {
		for (const comp of [main, ...Object.values(extra ?? {})]) app.component(comp.name, comp);
	};
	if (extra) for (const [key, comp] of Object.entries(extra)) main[key] = comp;
	withPropsDefaultsSetter(main);
	return main;
};
const withInstallFunction = (fn, name) => {
	fn.install = (app) => {
		fn._context = app._context;
		app.config.globalProperties[name] = fn;
	};
	return fn;
};
const withInstallDirective = (directive, name) => {
	directive.install = (app) => {
		app.directive(name, directive);
	};
	return directive;
};
const withNoopInstall = (component) => {
	component.install = _vue_shared.NOOP;
	withPropsDefaultsSetter(component);
	return component;
};

//#endregion
exports.withInstall = withInstall;
exports.withInstallDirective = withInstallDirective;
exports.withInstallFunction = withInstallFunction;
exports.withNoopInstall = withNoopInstall;
exports.withPropsDefaultsSetter = withPropsDefaultsSetter;
//# sourceMappingURL=install.js.map