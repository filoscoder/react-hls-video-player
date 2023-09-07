import { HTMLProps } from "react";
import { createElement } from "react";

export type TagName = keyof HTMLElementTagNameMap;
export interface DynamicTagProps<T extends HTMLElement["tagName"] = "div">
  extends HTMLProps<T> {
  tagName?: T;
}

export const DynamicTag = <T extends TagName>(props: DynamicTagProps<T>) => {
  const { tagName = "div", children, ...properties } = props;

  return createElement(tagName, properties, children);
};
