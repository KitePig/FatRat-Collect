import { NOOP } from "../functions.mjs";
import { hasOwn, isArray } from "@vue/shared";
import { fromPairs, isPlainObject } from "lodash-unified";

//#region ../../packages/utils/vue/install.ts
const withPropsDefaultsSetter = (target) => {
	const _p = target.props;
	const props = isArray(_p) ? fromPairs(_p.map((key) => [key, {}])) : _p;
	target.setPropsDefaults = (defaults) => {
		if (!props) return;
		for (const [key, value] of Object.entries(defaults)) {
			const prop = props[key];
			if (!hasOwn(props, key)) continue;
			if (isPlainObject(prop)) {
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
	component.install = NOOP;
	withPropsDefaultsSetter(component);
	return component;
};

//#endregion
export { withInstall, withInstallDirective, withInstallFunction, withNoopInstall, withPropsDefaultsSetter };
//# sourceMappingURL=install.mjs.map