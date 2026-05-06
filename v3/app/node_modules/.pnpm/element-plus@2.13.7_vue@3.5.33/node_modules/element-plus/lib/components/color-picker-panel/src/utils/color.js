Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let _ctrl_tinycolor = require("@ctrl/tinycolor");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/color-picker-panel/src/utils/color.ts
var Color = class {
	constructor(options = {}) {
		this._hue = 0;
		this._saturation = 100;
		this._value = 100;
		this._alpha = 100;
		this._tiny = new _ctrl_tinycolor.TinyColor();
		this._isValid = false;
		this.enableAlpha = false;
		this.format = "";
		this.value = "";
		for (const option in options) if ((0, _vue_shared.hasOwn)(options, option)) this[option] = options[option];
		if (options.value) this.fromString(options.value);
		else this.doOnChange();
	}
	set(prop, value) {
		if (arguments.length === 1 && typeof prop === "object") {
			for (const p in prop) if ((0, _vue_shared.hasOwn)(prop, p)) this.set(p, prop[p]);
			return;
		}
		this[`_${prop}`] = value;
		this._isValid = true;
		this.doOnChange();
	}
	get(prop) {
		if ([
			"hue",
			"saturation",
			"value",
			"alpha"
		].includes(prop)) return Math.round(this[`_${prop}`]);
		return this[`_${prop}`];
	}
	toRgb() {
		return this._isValid ? this._tiny.toRgb() : {
			r: 255,
			g: 255,
			b: 255,
			a: 0
		};
	}
	fromString(value) {
		const color = new _ctrl_tinycolor.TinyColor(value);
		this._isValid = color.isValid;
		if (color.isValid) {
			const { h, s, v, a } = color.toHsv();
			this._hue = h;
			this._saturation = s * 100;
			this._value = v * 100;
			this._alpha = a * 100;
		} else {
			this._hue = 0;
			this._saturation = 100;
			this._value = 100;
			this._alpha = 100;
		}
		this.doOnChange();
	}
	clear() {
		this._isValid = false;
		this.value = "";
		this._hue = 0;
		this._saturation = 100;
		this._value = 100;
		this._alpha = 100;
	}
	compare(color) {
		const compareColor = new _ctrl_tinycolor.TinyColor({
			h: color._hue,
			s: color._saturation / 100,
			v: color._value / 100,
			a: color._alpha / 100
		});
		return this._tiny.equals(compareColor);
	}
	doOnChange() {
		const { _hue, _saturation, _value, _alpha, format, enableAlpha } = this;
		let _format = format || (enableAlpha ? "rgb" : "hex");
		if (format === "hex" && enableAlpha) _format = "hex8";
		this._tiny = new _ctrl_tinycolor.TinyColor({
			h: _hue,
			s: _saturation / 100,
			v: _value / 100,
			a: _alpha / 100
		});
		this.value = this._isValid ? this._tiny.toString(_format) : "";
	}
};

//#endregion
exports.default = Color;
//# sourceMappingURL=color.js.map