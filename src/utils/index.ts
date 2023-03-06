import {omitBy, isNull, isUndefined, toPairs} from 'lodash';
import {Dictionary, FilterNullUndef} from '../type';

export const isNullOrUndefined = (value: any) => isNull(value) || isUndefined(value);

/**
 * 传入一个对象，删除对象里面值为 null 和 undefined 的属性
 */
const deleteInvalid = <T extends object>(obj: T): FilterNullUndef<T> =>
  omitBy(obj, (v) => isNullOrUndefined(v)) as FilterNullUndef<T>;

/**
 * 样式：适配宽度（width）¸
 */
const fitWidth = (width: string | number | undefined, decWidth: number = 10) => {
  if (!width && width !== 0) {
    return 100;
  }

  let result: string | number = width;

  const len: number = result.toString().length;

  if (typeof result === 'string' && result.substring(len - 2, len) === 'px') {
    result = `${Number(result.substring(0, len - 2)) - decWidth}px`;
  }

  if (typeof width === 'number') {
    result = width - decWidth;
  }

  return result;
};

/**
 * 计算：装填 Map
 */
export const initMap = (config: Dictionary<Function>, ComputeMap: Map<string, Function>) => {
  const arr = toPairs(config);
  arr.forEach(([k, v]) => {
    ComputeMap.set(k, v);
  });
};

export {deleteInvalid, fitWidth};
