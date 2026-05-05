import "./upload.js";

//#region ../../packages/components/upload/src/ajax.d.ts
declare class UploadAjaxError extends Error {
  name: string;
  status: number;
  method: string;
  url: string;
  constructor(message: string, status: number, method: string, url: string);
}
//#endregion
export { UploadAjaxError };