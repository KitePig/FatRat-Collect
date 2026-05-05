import { isNumber } from "../../../utils/types.mjs";

//#region ../../packages/components/countdown/src/utils.ts
const timeUnits = [
	["Y", 1e3 * 60 * 60 * 24 * 365],
	["M", 1e3 * 60 * 60 * 24 * 30],
	["D", 1e3 * 60 * 60 * 24],
	["H", 1e3 * 60 * 60],
	["m", 1e3 * 60],
	["s", 1e3],
	["S", 1]
];
const getTime = (value) => {
	return isNumber(value) ? new Date(value).getTime() : value.valueOf();
};
const formatTime = (timestamp, format) => {
	let timeLeft = timestamp;
	return timeUnits.reduce((current, [name, unit]) => {
		const replaceRegex = new RegExp(`${name}+(?![^\\[\\]]*\\])`, "g");
		if (replaceRegex.test(current)) {
			const value = Math.floor(timeLeft / unit);
			timeLeft -= value * unit;
			return current.replace(replaceRegex, (match) => String(value).padStart(match.length, "0"));
		}
		return current;
	}, format).replace(/\[([^\]]*)]/g, "$1");
};

//#endregion
export { formatTime, getTime };
//# sourceMappingURL=utils.mjs.map