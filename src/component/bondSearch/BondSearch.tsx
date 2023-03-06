import React, {useState, useMemo, useContext, useEffect} from 'react';
import {Select, Icon} from 'frc-ui-pro';
import cn from 'classnames';
// import {deleteInvalid} from '../../utils';
// import {AppContext} from '../../../../app';

const BondSearch: React.FC<any> = (props) => {
  const {config, onChange, record, itemKey, messageCB} = props;

  const {classNames, dropdownClassName} = config;

  // const {messageCB}: any = useContext(AppContext);

  const [bondSelectValue, setBondSelectValue] = useState<string | null>(null);
  const [bondSearchArr, setBondSearchArr] = useState<any[]>([]);

  const onBondSearchCB = useMemo(() => {
    return (data: any) => {
      setBondSearchArr(data.payload);
    };
  }, []);

  const onBondSearchHandle = useMemo(() => {
    return (value: any) => {
      // console.log('search', value);
      if (value !== '') {
        const searchModal = {
          cmd: 'search_bond',
          payload: {
            keyword: value
          } // 根据用户输入，发起 “获取搜索结果” 请求
        };

        messageCB(searchModal, onBondSearchCB);
      }
    };
  }, []);

  const onBondChangeHandle = useMemo(() => {
    return (value: any) => {
      console.log('change', value);
      setBondSelectValue(value);
      onChange(itemKey, value);
    };
  }, []);

  const onBondInitHandle = useMemo(() => {
    return () => {
      messageCB({cmd: 'search_bond', payload: {keyword: ''}}, onBondSearchCB);
    };
  }, []);

  useEffect(() => {
    if (!record[itemKey]) {
      setBondSelectValue(null);
      onBondInitHandle();
    }
  }, [record]);

  const classes = cn('filter-item', classNames, {});

  const searchConfig = {
    className: classes,
    dropdownClassName,
    allowClear: true,
    showSearch: true,
    placeholder: '请输入...',
    showArrow: false,
    prefixIcon: <Icon type='search' style={{fontSize: 12}} />,
    value: bondSelectValue as any,
    onSearch: onBondSearchHandle,
    onChange: onBondChangeHandle,
    onClear: onBondInitHandle,
    notFoundContent: null,
    autoClearSearchValue: false,
    optionLabelProp: 'value',
    filterOption: false
  };

  return (
    <>
      <Select {...searchConfig}>
        {bondSearchArr?.length > 0 &&
          bondSearchArr.map((item: any) => {
            return (
              <Select.Option key={item.msgSeq} value={item.ssSecCode}>
                <div className='select-option-box'>
                  <span className='select-option-code'>{item.ssSecCode}</span>
                  <span className='select-option-name'>{item.secShrtNm}</span>
                  <span className='select-option-rating'>{item.bondLatestRatingNm}</span>
                  <span className='select-option-date'>{item.residualMaturity}</span>
                </div>
              </Select.Option>
            );
          })}
      </Select>
    </>
  );
};

export default BondSearch;
