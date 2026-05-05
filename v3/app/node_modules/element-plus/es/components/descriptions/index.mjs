import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { descriptionProps } from "./src/description.mjs";
import description_default from "./src/description2.mjs";
import DescriptionItem, { descriptionItemProps } from "./src/description-item.mjs";

//#region ../../packages/components/descriptions/index.ts
const ElDescriptions = withInstall(description_default, { DescriptionsItem: DescriptionItem });
const ElDescriptionsItem = withNoopInstall(DescriptionItem);

//#endregion
export { ElDescriptions, ElDescriptions as default, ElDescriptionsItem, descriptionItemProps, descriptionProps };
//# sourceMappingURL=index.mjs.map