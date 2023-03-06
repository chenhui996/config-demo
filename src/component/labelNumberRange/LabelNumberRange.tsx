import React, {useEffect, useState} from 'react';
import {InputNumber, Button} from 'frc-ui-pro';
import {castArray} from 'lodash';
import cn from 'classnames';
import './style.less';

type MTuple<T> = T | [T, T];
type ValueType = string | number | null;
type ValueChanged = MTuple<ValueType>;

export enum CompareOpreator {
  Greater = 'greater',
  Less = 'less',
  GreaterOrEqual = 'greaterOrEqual',
  LessOrEqual = 'lessOrEqual'
}

const transformType = new Map<CompareOpreator, string>([
  [CompareOpreator.Greater, '>'],
  [CompareOpreator.Less, '<'],
  [CompareOpreator.GreaterOrEqual, '≥'],
  [CompareOpreator.LessOrEqual, '≤']
]);

const LabelNumberRange: React.FC<any> = (props) => {
  const {record, itemKey, config, onChange, onEnter} = props;

  const {classNames, showLabel, label, placeholder, type = 'range'} = config;

  const [minValue, setMinValue] = useState<ValueType>();
  const [maxValue, setMaxValue] = useState<ValueType>();
  const [singleValue, setSingleValue] = useState<ValueType>();

  const triggerChange = (value: ValueChanged) => {
    onChange && onChange(itemKey, value);
  };

  const handleRangeChange = (min: ValueType | undefined, max: ValueType | undefined, func: () => void) => {
    triggerChange([min ?? null, max ?? null]);
    func();
  };

  const handleSingleChange = (value: ValueType | undefined, func: () => void) => {
    triggerChange(value ?? null);
    func();
  };

  const classes = cn('filter-item label-number-range', classNames, {
    [`number-input-${type}`]: type
  });

  const renderDom = () => {
    const p = castArray(placeholder); // 强制转换成数组
    if (!type || type === 'range') {
      return (
        <>
          <InputNumber
            controls={false}
            keyboard
            value={minValue}
            onChange={(val) => handleRangeChange(val, maxValue, () => setMinValue(val))}
            onPressEnter={onEnter}
            placeholder={p[0] || ''}
          />
          <span style={{color: 'rgb(9, 124, 109)', margin: '0 2px'}}>-</span>
          <InputNumber
            controls={false}
            keyboard
            value={maxValue}
            onChange={(val) => handleRangeChange(minValue, val, () => setMaxValue(val))}
            onPressEnter={onEnter}
            placeholder={p[1] || ''}
          />
        </>
      );
    }
    const operator = transformType.get(type) || '>';
    return (
      <>
        <Button type='primary' style={{marginRight: 4, width: 24}}>
          <span style={{fontSize: 15}}>{operator}</span>
        </Button>
        <InputNumber
          controls={false}
          keyboard
          value={singleValue}
          onChange={(val) => handleSingleChange(val, () => setSingleValue(val))}
          onPressEnter={onEnter}
          placeholder={p[0] || ''}
        />
      </>
    );
  };

  useEffect(() => {
    if (!record[itemKey]) {
      setMinValue(null);
      setMaxValue(null);
      setSingleValue(null);
    }
  }, [record]);

  return (
    <>
      <div className={classes}>
        <div className='item-row'>
          {showLabel && <div className='item-label'>{label}</div>}
          <div className='item-number-range'>{renderDom()}</div>
        </div>
      </div>
    </>
  );
};

export default LabelNumberRange;
