import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { DescriptionInstance, DescriptionProps, DescriptionPropsPublic, descriptionProps } from "./src/description.js";
import { _default } from "./src/description.vue.js";
import { DescriptionItem, DescriptionItemProps, DescriptionItemPropsPublic, DescriptionItemVNode, descriptionItemProps } from "./src/description-item.js";

//#region ../../packages/components/descriptions/index.d.ts
declare const ElDescriptions: SFCWithInstall<typeof _default> & {
  DescriptionsItem: typeof DescriptionItem;
};
declare const ElDescriptionsItem: SFCWithInstall<typeof DescriptionItem>;
//#endregion
export { DescriptionInstance, DescriptionItemProps, DescriptionItemPropsPublic, DescriptionItemVNode, DescriptionProps, DescriptionPropsPublic, ElDescriptions, ElDescriptions as default, ElDescriptionsItem, descriptionItemProps, descriptionProps };