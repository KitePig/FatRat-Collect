import "../../../utils/index.js";
import { ButtonProps } from "./button.js";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/button/src/button-group.d.ts
interface ButtonGroupProps {
  /**
   * @description control the size of buttons in this button-group
   */
  size?: ButtonProps['size'];
  /**
   * @description control the type of buttons in this button-group
   */
  type?: ButtonProps['type'];
  /**
   * @description display direction
   */
  direction?: 'horizontal' | 'vertical';
}
//#endregion
export { ButtonGroupProps };