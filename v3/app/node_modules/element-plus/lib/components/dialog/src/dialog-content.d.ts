import { IconPropType } from "../../../utils/vue/icon.js";
import "../../../utils/index.js";
import "vue";

//#region ../../packages/components/dialog/src/dialog-content.d.ts
/**
 * @description dialog-content component props
 */
interface DialogContentProps {
  /**
   * @description whether to align the header and footer in center
   */
  center?: boolean;
  /**
   * @description whether to align the dialog both horizontally and vertically
   */
  alignCenter?: boolean;
  /**
   * @description custom close icon, default is Close
   */
  closeIcon?: IconPropType;
  /**
   * @description enable dragging feature for Dialog
   */
  draggable?: boolean;
  /**
   * @description draggable Dialog can overflow the viewport
   */
  overflow?: boolean;
  /**
   * @description whether the Dialog takes up full screen
   */
  fullscreen?: boolean;
  /**
   * @description custom class names for header wrapper
   */
  headerClass?: string;
  /**
   * @description custom class names for body wrapper
   */
  bodyClass?: string;
  /**
   * @description custom class names for footer wrapper
   */
  footerClass?: string;
  /**
   * @description whether to show a close button
   */
  showClose?: boolean;
  /**
   * @description title of Dialog. Can also be passed with a named slot (see the following table)
   */
  title?: string;
  /**
   * @description header's aria-level attribute
   */
  ariaLevel?: string;
}
//#endregion
export { DialogContentProps };