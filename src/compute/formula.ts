import moment from 'moment';
import { NormalReturn, SchemaConfigProps, SingleStepProps, SchemaCalculateStepsProps } from '../type';
// import ComputeMap from '../compute';

/**
 * 公式计算
 */
const frcFormulaSelect = <T extends object, R>(
  record: T,
  config: SchemaConfigProps,
  computeMap: Map<string, Function>,
  type: string
) => {
  let result: R | null = null;

  const { calculate } = config;

  calculate &&
    calculate[type] &&
    calculate[type].forEach((step: SchemaCalculateStepsProps, index: number) => {
      const { callback, valueFields, attribute } = step;

      const stepCallBack = computeMap.get(callback); // search map item
      result = stepCallBack ? stepCallBack!(record, config, index, result, valueFields, attribute) : result; // formula calculate
    });

  return result;
};

/**
 * 日期格式化
 */
const frcDateFormat: SingleStepProps = (record, config, step, relayValue = null, valueFields = []) => {
  const { dateFormat } = config;
  let result: NormalReturn = step !== 0 ? relayValue : record[valueFields[0]] || null;

  if (result) {
    result = moment(result as moment.MomentInput).format(dateFormat);
  }

  return result;
};

/**
 * 格式化：小数点
 */
const frcToFixed: SingleStepProps = (record, config, step, relayValue = null, valueFields = [], attribute = {}) => {
  const { toFixed: configToFixed } = config;
  const { toFixed: attrToFixed } = attribute;
  let result: NormalReturn = step !== 0 ? relayValue : record[valueFields[0]] || null;

  if (Number(result)) {
    result = Number(result).toFixed(attrToFixed || configToFixed);
  }

  return result;
};

/**
 * 格式化：除数
 */
const frcDivisor: SingleStepProps = (record, config, step, relayValue = null, valueFields = [], attribute = {}) => {
  const { divisor = 0 } = attribute;
  let result: NormalReturn = step !== 0 ? relayValue : record[valueFields[0]] || null;

  if (step === 0 && valueFields.length !== 1) {
    return result;
  }

  if (Number(result) && divisor) {
    result = Number(result) / divisor;
  }

  return result;
};

/**
 * 格式化：确保小数点位数
 */
const frcEnsureToFixed: SingleStepProps = (
  record,
  config,
  step,
  relayValue = null,
  valueFields = [],
  attribute = {}
) => {
  const { ensureToFixed } = attribute;
  let result: number | string | null = step !== 0 ? relayValue : record[valueFields[0]] || null;

  if (result || result === 0) {
    const index = result.toString().indexOf('.') + 1;
    const decimalLen = result.toString().length - index;

    if (ensureToFixed && (decimalLen < ensureToFixed || index === 0) && Number(result)) {
      result = Number(result).toFixed(ensureToFixed);
    }
  }

  return result;
};

export { frcFormulaSelect, frcDateFormat, frcToFixed, frcEnsureToFixed, frcDivisor };
