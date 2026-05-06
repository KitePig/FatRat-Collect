//#region ../../packages/utils/vue/props/util.d.ts
type Writable<T> = { -readonly [P in keyof T]: T[P] };
type WritableArray<T> = T extends readonly any[] ? Writable<T> : T;
type IfNever<T, Y = true, N = false> = [T] extends [never] ? Y : N;
type IfUnknown<T, Y, N> = [unknown] extends [T] ? Y : N;
type UnknownToNever<T> = IfUnknown<T, never, T>;
//#endregion
export { IfNever, IfUnknown, UnknownToNever, Writable, WritableArray };