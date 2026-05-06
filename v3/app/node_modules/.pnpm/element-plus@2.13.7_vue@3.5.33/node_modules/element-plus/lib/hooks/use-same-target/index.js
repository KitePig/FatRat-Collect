Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/hooks/use-same-target/index.ts
const useSameTarget = (handleClick) => {
	if (!handleClick) return {
		onClick: _vue_shared.NOOP,
		onMousedown: _vue_shared.NOOP,
		onMouseup: _vue_shared.NOOP
	};
	let mousedownTarget = false;
	let mouseupTarget = false;
	const onClick = (e) => {
		if (mousedownTarget && mouseupTarget) handleClick(e);
		mousedownTarget = mouseupTarget = false;
	};
	const onMousedown = (e) => {
		mousedownTarget = e.target === e.currentTarget;
	};
	const onMouseup = (e) => {
		mouseupTarget = e.target === e.currentTarget;
	};
	return {
		onClick,
		onMousedown,
		onMouseup
	};
};

//#endregion
exports.useSameTarget = useSameTarget;
//# sourceMappingURL=index.js.map