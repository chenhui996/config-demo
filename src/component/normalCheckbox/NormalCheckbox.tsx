import React, {useState, useEffect} from 'react';
import {Checkbox} from 'frc-ui-pro';
import cn from 'classnames';
import {deleteInvalid} from '../../utils';
import './style.less';

const NormalCheckbox: React.FC<any> = (props) => {
  const {record, config, onChange, itemKey} = props;

  const {classNames, options, type} = config;

  const [checkboxGroupValue, setCheckboxGroupValue] = useState<string[] | number[] | boolean[]>(
    options?.values.filter((item) => item?.config?.checked).map((item) => item.value) || []
  );

  const onCheckboxChangeHandle = (values: any) => {
    // console.log('change', values);
    if (values.length > 0) {
      if (type && type === 'single') {
        setCheckboxGroupValue(values.filter((i) => i !== checkboxGroupValue).join(''));
        onChange(itemKey, values.filter((i) => i !== checkboxGroupValue).join('')); // 最终返回
      } else {
        setCheckboxGroupValue(values);
        onChange(itemKey, values); // 最终返回
      }
    } else {
      setCheckboxGroupValue([]);
      onChange(itemKey, null); // 最终返回
    }
  };

  const classes = cn('filter-item', classNames, {});

  const checkboxConfig = deleteInvalid({
    className: classes || null,
    options: options?.values.map((item) => {
      return {label: item.label, value: item.value};
    }),
    value: checkboxGroupValue,
    onChange: onCheckboxChangeHandle
  });

  useEffect(() => {
    if (record[itemKey] !== checkboxGroupValue) {
      setCheckboxGroupValue(record[itemKey]);
    }
  }, [record]);

  return <Checkbox.Group {...checkboxConfig} />; // 纯渲染
};

export default NormalCheckbox;
