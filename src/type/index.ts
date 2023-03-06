import React from 'react';
import {FRCFilterProps} from 'frc-ui-pro/dist/src/components/Filter';
// import {IProps as NumberRangeProps} from '../component/labelNumberRange/LabelNumberRange';

// ----------- utility types -----------------
interface Dictionary<T> {
  [key: string]: T;
}

type KeyOfMap<M> = M extends Map<infer K, unknown> ? K : never;

type ValueOfMap<M> = M extends Map<unknown, infer V> ? V : never;

type FilterNullUndef<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

// ----------------------------------------------

// 常规 return
type NormalReturn = string | number | boolean | null | undefined | '--';

type ArrayR = Array<string | number | boolean | object>;

// 数组 return
type ArrayReturn = string[] | number[] | boolean[] | object[];

// 公式字典 formula map
type ComputeMapProps = Map<string, Function>;

// type AttributeType = Dictionary<NormalReturn | object | string[]>;

type RecordProps = Dictionary<NormalReturn | ArrayR>;

interface AttributeProps {
  defaultText?: string | number;
  ensureToFixed?: number;
  extra?: boolean;
  toFixed?: number;
  divisor?: number;
  showTitle?: boolean;
}

type UIComponentProps = FRCFilterProps | any;

// schema config calculate props
interface SchemaCalculateStepsProps {
  /** 回调函数 */
  callback: string;
  /** 涉及字段 */
  valueFields?: string[] | Dictionary<string | object>;
  /** 函数属性 */
  attribute?: AttributeProps;
}

// schema config props（持续扩展
interface SchemaConfigProps {
  /** 涉及字段 */
  valueFields: string;
  /** 是否精准显示 */
  extra?: boolean;
  /** 默认展示文本 */
  defaultText?: NormalReturn;
  /** CSS 样式 */
  styles?: React.CSSProperties;
  /** Icon 样式属性 */
  iconStyles?: {
    /** switch before icon type */
    beforeType?: string;
    /** switch after icon type */
    afterType?: string;
  };
  /** Tag Css 样式 */
  tagStyles?: React.CSSProperties;
  /** table 组件头部样式 */
  titleProps?: React.CSSProperties;
  /** 超出提示 */
  ellipsis?: boolean;
  /** 小数点格式化 */
  toFixed?: number;
  /** 日期格式化 */
  dateFormat?: string;
  /** 文本计算步骤 */
  calculate?: {
    [key: string]: Array<SchemaCalculateStepsProps>;
  };
  /** 按钮激活 */
  work?: boolean;
}

// 对象型：单字段取值
interface SingleStepProps {
  (
    /** 数据源对象 */
    record: object,
    /** 参数 */
    config: SchemaConfigProps,
    /** 当前计算步骤 */
    index?: number,
    /** 中继数值 */
    relayValue?: NormalReturn | ArrayReturn,
    /** 涉及字段 */
    valueFields?: string[] | Dictionary<string | object>,
    /** 涉及字段 */
    attribute?: AttributeProps
  ): /** 返回 filed text */
  NormalReturn | ArrayReturn;
}

// 标签公式
interface TagStepProps<T> {
  (
    /** 数据源对象 */
    record: object,
    /** 参数 */
    config: SchemaConfigProps,
    /** 当前计算步骤 */
    index?: number,
    /** 中继数值 */
    relayValue?: T,
    /** 涉及字段 */
    valueFields?: string[] | Dictionary<string>,
    /** 涉及字段 */
    attribute?: AttributeProps
  ): /** 返回 filed text */
  NormalReturn | ArrayReturn | T;
}

// 标签公式(指定 -> 中继类型，返回类型)
interface TagStepSpecifiedProps<T, R> {
  (
    /** 数据源对象 */
    record: object,
    /** 参数 */
    config: SchemaConfigProps,
    /** 当前计算步骤 */
    index?: number,
    /** 中继数值 */
    relayValue?: T,
    /** 涉及字段 */
    valueFields?: string[] | Dictionary<string>,
    /** 涉及字段 */
    attribute?: AttributeProps
  ): /** 返回 filed text */
  NormalReturn | ArrayReturn | R;
}

// Table 组件 props
interface NormalTableComponentProps {
  /** 数据源对象 */
  record: Dictionary<NormalReturn | ArrayR>;
  /** 参数 */
  config: SchemaConfigProps;
}

// 组件选择器 props
interface SelectComponentProps {
  record?: RecordProps;
  config: SchemaConfigProps;
  displayType: string;
  ComponentMap: Map<string, Function>;
  defaultText?: NormalReturn;
}

interface XEnum {
  values: {
    value: string;
    name: string;
  }[];
  groups?: any[];
}
interface FilterItem {
  [key: string]: any;
  displayType?: string;
  config?: UIComponentProps;
  label?: string;
  showLabel?: boolean;
  sort?: number | string;
  ['x-enum']?: XEnum;
}

export {
  SingleStepProps,
  NormalReturn,
  ComputeMapProps,
  NormalTableComponentProps,
  SchemaConfigProps,
  Dictionary,
  SchemaCalculateStepsProps,
  ArrayReturn,
  TagStepProps,
  FilterItem,
  XEnum,
  ValueOfMap,
  KeyOfMap,
  SelectComponentProps,
  RecordProps,
  ArrayR,
  FilterNullUndef,
  TagStepSpecifiedProps
};
