//#region ../../packages/utils/rand.ts
/**
* @deprecated Use `useId` `useIdInjection` instead
* Generate random number in range [0, 1000]
* Maybe replace with [uuid](https://www.npmjs.com/package/uuid)
*/
const generateId = () => Math.floor(Math.random() * 1e4);
/**
* @deprecated
* Generating a random int in range (0, max - 1)
* @param max {number}
*/
const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

//#endregion
export { generateId, getRandomInt };
//# sourceMappingURL=rand.mjs.map