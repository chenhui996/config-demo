import React, {useEffect, useState, useRef} from 'react';
import {Filter, Input, DatePicker, Button, Tooltip, Icon} from 'frc-ui-pro';
import cn from 'classnames';
import moment from 'moment';
import {FRCFilterProps} from 'frc-ui-pro/dist/src/components/Filter';
import './style.less';

const LabelFilterInputRange: React.FC<any> = (props) => {
  const {record, itemKey, config, onChange} = props;
  const {multiple, label, showLabel, classNames, autoSelectAll, options, showAllItems, multipleKey} = config;
  const {values} = options;

  const filterKey = multipleKey ? multipleKey.filterKey : itemKey;
  const inputKey = multipleKey ? multipleKey.inputKey : itemKey;

  const [itemValue, setItemValue] = useState<(string | number)[]>(['ALL']);

  const [type, setType] = useState<boolean>(true);
  const [leftInputVal, setLeftInputVal] = useState<string | null>(null);
  const [rightInputVal, setRightInputVal] = useState<string | null>(null);

  const [leftDatePickerVal, setLeftDatePickerVal] = useState<any>(null);
  const [rightDatePickerVal, setRightDatePickerVal] = useState<any>(null);

  const onLeftInputChange = (e: any) => {
    const {
      nativeEvent: {data},
      target: {value}
    } = e;

    const newValue = value.match(/(^[0-9]+)(\.?[0-9]*)(d|y?)/g)?.join('');

    // console.log('handleInputChagne', data, value, newValue);

    if (!data || newValue) {
      setLeftInputVal(newValue);
    }
  };

  const onRightInputChange = (e: any) => {
    const {
      nativeEvent: {data},
      target: {value}
    } = e;

    const newValue = value.match(/(^[0-9]+)(\.?[0-9]*)(d|y?)/g)?.join('');

    // console.log('handleInputChagne', data, value, newValue);

    if (!data || newValue) {
      setRightInputVal(newValue);
    }
  };

  const onLeftDatePickerChange = (value: any) => {
    if (value) {
      setLeftDatePickerVal(value);
    } else {
      setLeftDatePickerVal(null);
    }
  };

  const onRightDatePickerChange = (value: any) => {
    console.log('onLeftDatePickerChange', moment(value).format('YYYY-MM-DD'));
    if (value) {
      setRightDatePickerVal(value);
    } else {
      setRightDatePickerVal(null);
    }
  };

  const classes = cn('filter-item label-filter', classNames, {});

  const onItemChange = (value: (string | number)[]) => {
    // console.log('value, allValue', value);
    setItemValue(value);
    onChange && onChange(filterKey, value.length > 0 ? (multiple ? value : value.join('')) : null);

    setLeftInputVal(null);
    setRightInputVal(null);
    setLeftDatePickerVal(null);
    setRightDatePickerVal(null);
  };

  const onInputRangeEnter = () => {
    const leftValue = type ? leftInputVal : leftDatePickerVal ? moment(leftDatePickerVal).format('YYYY-MM-DD') : null;
    const rightValue = type
      ? rightInputVal
      : rightDatePickerVal
      ? moment(rightDatePickerVal).format('YYYY-MM-DD')
      : null;

    console.log(leftValue, rightValue);

    onChange && onChange(inputKey, (leftValue ?? null) || (rightValue ?? null) ? [leftValue, rightValue] : null);

    setItemValue([]);
  };

  const itemConfig: FRCFilterProps = {
    options: values,
    showAll: showAllItems,
    autoSelectAll,
    multiple,
    onChange: onItemChange,
    value: itemValue
  };

  useEffect(() => {
    if (!record[filterKey] && !record[inputKey]) {
      setItemValue(['ALL']);
      setLeftInputVal(null);
      setRightInputVal(null);
      setLeftDatePickerVal(null);
      setRightDatePickerVal(null);
    }
  }, [record]);

  // todo:
  // 1.细分：初始数据用接口传递 -> 100%
  // 2.发行人 -> 0%
  // 3.担保人 -> 0%
  // 4.行业 -> 100%
  // 5.地区 -> 100%
  // 6.年份 -> 100%
  // 7.特殊 -> 100%

  return (
    <>
      <div className={classes}>
        <div className='item-row'>
          {showLabel && <div className='item-label'>{label}</div>}
          <div className='filter-container'>
            <div className='filter-items'>
              <Filter {...itemConfig} />
            </div>
            <div className='filter-input-date'>
              <div style={{display: 'flex', marginBottom: 4}}>
                {type ? (
                  <Input
                    style={{width: 80}}
                    placeholder=''
                    onChange={onLeftInputChange}
                    value={leftInputVal || undefined}
                    onPressEnter={onInputRangeEnter}
                  />
                ) : (
                  <DatePicker
                    prefixIcon={null}
                    style={{width: 80}}
                    placeholder=''
                    renderExtraFooter={() => (
                      <div style={{lineHeight: '18px'}}>
                        关于国务院未发布放假通知的年份，我司将按经验维护后2年的节假日2年以外的仅考虑周未双休，仅供参考
                      </div>
                    )}
                    value={leftDatePickerVal || undefined}
                    onChange={onLeftDatePickerChange}
                  />
                )}
                <Button type='primary' style={{margin: '0 4px', width: 35}} onClick={() => setType((pre) => !pre)}>
                  {type ? <Tooltip title='D=天 Y=年 例: 10D--365D 1.5Y--5Y'>D/Y</Tooltip> : <Icon type='calendar' />}
                </Button>
                {type ? (
                  <Input
                    style={{width: 80}}
                    placeholder=''
                    onChange={onRightInputChange}
                    value={rightInputVal || undefined}
                    onPressEnter={onInputRangeEnter}
                  />
                ) : (
                  <DatePicker
                    prefixIcon={null}
                    style={{width: 80}}
                    placeholder=''
                    renderExtraFooter={() => (
                      <div style={{lineHeight: '18px'}}>
                        关于国务院未发布放假通知的年份，我司将按经验维护后2年的节假日2年以外的仅考虑周未双休，仅供参考
                      </div>
                    )}
                    value={rightDatePickerVal || undefined}
                    onChange={onRightDatePickerChange}
                  />
                )}
                <Button type='primary' style={{marginLeft: 4}} onClick={onInputRangeEnter}>
                  筛选
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LabelFilterInputRange;
