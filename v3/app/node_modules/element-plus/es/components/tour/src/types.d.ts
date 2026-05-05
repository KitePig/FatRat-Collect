import { ButtonProps } from "../../button/src/button.js";
import "../../button/index.js";
import { CSSProperties, VNode } from "vue";

//#region ../../packages/components/tour/src/types.d.ts
type TourMask = boolean | {
  style?: CSSProperties;
  color?: string;
};
interface TourGap {
  offset?: number | [number, number];
  radius?: number;
}
type TourBtnProps = {
  children?: VNode | string;
  onClick?: () => void;
} & Partial<ButtonProps> & Record<string, any>;
//#endregion
export { TourBtnProps, TourGap, TourMask };