import { hasOwn } from "@vue/shared";
import { get, set } from "lodash-unified";

//#region ../../packages/utils/objects.ts
const keysOf = (arr) => Object.keys(arr);
const entriesOf = (arr) => Object.entries(arr);
const getProp = (obj, path, defaultValue) => {
	return {
		get value() {
			return get(obj, path, defaultValue);
		},
		set value(val) {
			set(obj, path, val);
		}
	};
};

//#endregion
export { entriesOf, getProp, hasOwn, keysOf };
//# sourceMappingURL=objects.mjs.map