import {isEqual} from 'lodash';
import {SingleStepProps, NormalReturn, TagStepProps, TagStepSpecifiedProps} from '../type';
import {deleteInvalid} from '../utils';

/**
 * 对象型：“单字段”取值
 */
const frcSingleField: SingleStepProps = (record, config, step, relayValue = null, valueFields = [], attribute = {}) => {
  const {extra: configExtra = false, defaultText = '--'} = config;
  const {extra: attrExtra = false} = attribute; // 优先级较高

  let result: NormalReturn = step !== 0 ? relayValue : record[valueFields[0]] || null;

  if (configExtra || attrExtra) {
    result = result || null;
  } // 精确显示，若出现 --，过滤成 null

  if (!configExtra && !attrExtra) {
    result = result || defaultText;
  } // 非精确显示，兜底显示（传参给到

  return result;
};

/**
 * 取值 -> “价格默认值” -> 条件：“交易量有效” 或 “交易描述有效”，但是 “价格无效”
 */
const frcPriceInvalid: SingleStepProps = (
  record,
  config,
  step,
  relayValue = null,
  valueFields = {},
  attribute = {}
) => {
  let result: NormalReturn = step !== 0 ? (relayValue as NormalReturn) : null;
  const {defaultText} = attribute;

  if (!valueFields || Object.keys(valueFields).length !== 3) {
    return result;
  } // check valueFields

  const {vol, dsc, px} = valueFields as {[key: string]: string | number};

  if ((record[vol] || record[dsc]) && !record[px] && record[px] !== 0) {
    result = defaultText as string;
  } // core part

  return result;
};

/**
 * tag 标签 -> N、F、YTM
 */
const frcTagQuoteArr: TagStepProps<{text: string; color: string}[]> = (
  record,
  config,
  step,
  relayValue = [],
  valueFields = {}
) => {
  let result: {text: string; color: string}[] = step !== 0 ? relayValue : [];

  if (!valueFields || Object.keys(valueFields).length !== 4) {
    return result;
  } // check valueFields

  const {px, type, residualMaturity, askExrcsFlg} = valueFields as {[key: string]: string | number};

  if (Object.prototype.toString.call(result) === '[object Array]') {
    if (record[px] && Number(record[type]) === 1) {
      // displayText = askDtPrc;
      result = [...result, {text: 'N', color: 'rgb(51,161,95)'}];
    } // 1

    if (record[px] && Number(record[type]) === 2) {
      // displayText = askClPrc;
      result = [...result, {text: 'F', color: '#f75424'}];
    } // 2

    if (
      typeof record[residualMaturity] === 'string' &&
      (record[residualMaturity] as string)?.indexOf('+') !== -1 &&
      record[askExrcsFlg] === 1 &&
      Number(record[type]) === 3
    ) {
      result = [...result, {text: 'YTM', color: '#865098'}];
    } // icon: YTM
  }

  return result;
};

/**
 * tag 标签 -> N、F、N.D
 */
const frcTagDealArr: TagStepProps<{text: string; color: string}[]> = (
  record,
  config,
  step,
  relayValue = [],
  valueFields = {}
) => {
  let result: {text: string; color: string}[] = step !== 0 ? relayValue : [];

  if (!valueFields || Object.keys(valueFields).length !== 3) {
    return result;
  } // check valueFields

  const {px, type, dealSts} = valueFields as {[key: string]: string | number};

  if (Object.prototype.toString.call(result) === '[object Array]' && record[px]) {
    if (Number(record[type]) === 1) {
      // displayText = askDtPrc;
      result = [...result, {text: 'N', color: 'rgb(51,161,95)'}];
    } // 1

    if (Number(record[type]) === 2) {
      // displayText = askClPrc;
      result = [...result, {text: 'F', color: '#f75424'}];
    } // 2

    if (Number(dealSts) === 2) {
      // displayText = bidClPrc;
      result = [...result, {text: 'N.D', color: 'rgb(123,128,130)'}];
    } // N.D
  }

  return result;
};

/**
 * icon 图标 -> * 或 **
 */
const frcStarIcon: SingleStepProps = (record, config, step, relayValue = [], valueFields = {}) => {
  let result: string | null = step !== 0 ? (relayValue as string | null) : null;

  if (!valueFields || Object.keys(valueFields).length !== 1) {
    return result;
  } // check valueFields

  const {dsc} = valueFields as {[key: string]: string | number};

  if (record[dsc]) {
    if ((record[dsc] as string).indexOf('(*)') !== -1) {
      result = 'need-to-ask';
    }

    if ((record[dsc] as string).indexOf('(**)') !== -1) {
      result = 'need-to-ask-2';
    }
  } // */**

  return result;
};

/**
 * 文本映射 -> 跨市场
 */
const frcCrsMarketMapping: SingleStepProps = (record, config, step, relayValue = [], valueFields = []) => {
  let result: string = step !== 0 ? (relayValue as string | null) : record[valueFields[0]] || null;

  if (result === 'Y') {
    result = '是';
  }

  if (result === 'N') {
    result = '否';
  }

  return result;
};

/**
 * tag 标签 -> 5经纪商
 */
const frcTagContributorNm: TagStepProps<{text: string; backgroundColor: string} | null> = (
  record,
  config,
  step,
  relayValue,
  valueFields = []
) => {
  const filedValue: string = step !== 0 ? relayValue : record[valueFields[0]] || null;
  let result: {text: string; backgroundColor: string} | null = null;

  if (filedValue === '国际货币') {
    result = {
      text: '国际',
      backgroundColor: '#bf4c4d'
    };
  }

  if (filedValue === '中诚保捷思') {
    result = {
      text: '中诚',
      backgroundColor: '#608229'
    };
  }

  if (filedValue === '平安利顺') {
    result = {
      text: '平安',
      backgroundColor: '#ff5f2c'
    };
  }

  if (filedValue === '天津信唐') {
    result = {
      text: '信唐',
      backgroundColor: '#865098'
    };
  }

  if (filedValue === '国利货币') {
    result = {
      text: '国利',
      backgroundColor: '#346687'
    };
  }

  return result;
};

/**
 * tag 标签 -> 成交标签
 */
const frcTradeMeth: TagStepProps<{text: string; color: string} | null> = (
  record,
  config,
  step,
  relayValue,
  valueFields = []
) => {
  const filedValue: string = step !== 0 ? relayValue : record[valueFields[0]] || null;
  let result: {text: string; color: string} | null = null;

  if (filedValue === '1') {
    result = {
      text: 'GVN',
      color: 'rgb(255,125,0)'
    };
  }

  if (filedValue === '2') {
    result = {
      text: 'TKN',
      color: 'rgb(0,154,255)'
    };
  }

  if (filedValue === '3') {
    result = {
      text: 'TRD',
      color: 'rgb(0,167,79)'
    };
  }

  return result;
};

/**
 * 取值 -> '/' 分割 -> 行权 / 到期
 */
const frcTextExrcsMaturityConcat: SingleStepProps = (
  record,
  config,
  step,
  relayValue,
  valueFields = {},
  attribute = {}
) => {
  let result: any = null;
  const {toFixed} = attribute;

  if (!valueFields || Object.keys(valueFields).length !== 2) {
    return result;
  } // check valueFields

  const {exrcs, maturity} = valueFields as {[key: string]: string};

  let exrcsValue = record[exrcs] || null;
  let maturityValue = record[maturity] || null;

  if (toFixed) {
    exrcsValue = exrcsValue?.toFixed(toFixed);
    maturityValue = maturityValue?.toFixed(toFixed);
  }

  // only maturity
  if (maturityValue && !exrcsValue) {
    result = maturityValue;
  }

  // only exrcs
  if (!maturityValue && exrcsValue) {
    result = exrcsValue;
  }

  // both
  if (maturityValue && exrcsValue) {
    result = `${exrcsValue}/${maturityValue}`;
  }

  return result;
};

/**
 * tag -> 提示框 -> 行权 / 到期
 */
const frcTagExrcsMaturityConcat: TagStepProps<Array<string | number | null> | null> = (
  record,
  config,
  step,
  relayValue,
  valueFields = {},
  attribute = {}
) => {
  let result: Array<string | number | null> | null = null;
  const {toFixed, showTitle} = attribute;

  if (!valueFields || Object.keys(valueFields).length !== 2) {
    return result;
  } // check valueFields

  const {exrcs, maturity} = valueFields as {[key: string]: string};

  let exrcsValue = record[exrcs] || null;
  let maturityValue = record[maturity] || null;
  let title: string | number | null = null;
  let text: string | number | null = null;

  if (toFixed) {
    exrcsValue = exrcsValue?.toFixed(toFixed);
    maturityValue = maturityValue?.toFixed(toFixed);
  }

  // only exrcs -> 只有 行权 存在，才可以展示角标
  if (exrcsValue) {
    text = exrcsValue;
    title = showTitle ? '行权' : null;

    // both
    if (maturityValue) {
      text = `${exrcsValue}/${maturityValue}`;
      title = showTitle ? '行权/到期' : null;
    }

    result = [title, text].filter((item) => item !== null);
  }

  return result;
};

/**
 * tag -> 提示框 -> 行权
 */
const frcTagExrcsFlg: TagStepSpecifiedProps<string | number | null, Array<string | number | null>> = (
  record,
  config,
  step,
  relayValue,
  valueFields = {},
  attribute = {}
) => {
  let result: Array<string | number | null> | null = null;
  const {showTitle} = attribute;

  if (!valueFields || Object.keys(valueFields).length !== 1) {
    return result;
  } // check valueFields

  const {exrcsFlg} = valueFields as {[key: string]: string};

  let title: string | number | null = null;
  let text: string | number | null = null;

  // only exrcs -> 只有 行权 存在，才可以展示角标
  if (exrcsFlg === '0') {
    text = relayValue || null;
    title = showTitle ? '行权' : null;

    result = [title, text].filter((item) => item !== null);
  }

  return result;
};

/**
 * 取值 -> vol or dsc
 */
const frcVolOrDsc: SingleStepProps = (record, config, step, relayValue, valueFields = {}) => {
  let result: string | null = null;

  if (!valueFields || Object.keys(valueFields).length !== 2) {
    return result;
  } // check valueFields

  const {vol, dsc} = valueFields as {[key: string]: string};

  if (record[vol]) {
    result = record[vol];
  } else if (record[dsc]) {
    result = record[dsc];
  } // text

  return result;
};

/**
 * 取值 -> 剩余期限 -> 节假日数字
 */
const frcHolidayNumber: SingleStepProps = (record, config, step, relayValue, valueFields = {}) => {
  let result: string | null = record[valueFields[0]] || null;

  if (!valueFields || valueFields.length !== 1) {
    return result;
  } // check valueFields

  if (result) {
    result = result.substring(1);
  }

  return result;
};

/**
 * 取值 -> 剩余期限 -> 节假日类型
 */
const frcHolidayType: SingleStepProps = (record, config, step, relayValue, valueFields = {}) => {
  let result: string | null = null;

  if (!valueFields || Object.keys(valueFields).length !== 2) {
    return result;
  } // check valueFields

  const {flg, type} = valueFields as {[key: string]: string};

  if (record[flg]) {
    result = record[type];
  } // text

  return result;
};

/**
 * 判断 -> SHOW ALL 按钮 -> 激活 SHOW ALL 状态
 */
const frcShowAllWork: SingleStepProps = (record, config, step, relayValue, valueFields = {}) => {
  let result: boolean = false;

  if (!valueFields || Object.keys(valueFields).length !== 1) {
    return result;
  } // check valueFields

  const {initObj} = valueFields as {[key: string]: object};

  const {work} = config;

  if (work) {
    result = Object.keys(deleteInvalid(record)).length === 1 && isEqual(deleteInvalid(record), initObj);
  } // text

  return result;
};

export {
  frcSingleField,
  frcPriceInvalid,
  frcTagQuoteArr,
  frcTagDealArr,
  frcStarIcon,
  frcCrsMarketMapping,
  frcTagContributorNm,
  frcTextExrcsMaturityConcat,
  frcTagExrcsMaturityConcat,
  frcTagExrcsFlg,
  frcVolOrDsc,
  frcHolidayNumber,
  frcHolidayType,
  frcTradeMeth,
  frcShowAllWork
};
