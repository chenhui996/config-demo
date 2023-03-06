import React, { useEffect, useState, useRef } from 'react';
import { Filter as FRCFilter } from 'frc-ui-pro';
import cn from 'classnames';
import { FRCFilterProps } from 'frc-ui-pro/dist/src/components/Filter';
import './style.less';

const LabelGroupFilter: React.FC<any> = (props) => {
  const { record, itemKey, config, onChange } = props;
  const { multiple, label, showLabel, classNames, autoSelectAll, options, showAllGroups, showAllItems } = config;
  const { values, groups } = options;

  const isFirst = useRef<boolean>(true);
  const [groupValue, setGroupValue] = useState<(string | number)[]>(['ALL']);
  const [itemValue, setItemValue] = useState<(string | number)[]>([]);

  const classes = cn('filter-item label-group-filter', classNames, {});

  const onGroupChange = (value: (string | number)[]) => {
    // console.log('value, allValue', value);
    isFirst.current = false;
    if (value.length === 0 || value[value.length - 1] === 'ALL') {
      setGroupValue(['ALL']);
      setItemValue([]);
    } else {
      setGroupValue(value);

      let keys: any[] = [];

      value.forEach((item: any) => {
        const productGroup = groups.find((group) => group.value === item);

        if (productGroup) {
          keys = [...keys, ...productGroup.values];
        }
      });

      setItemValue(keys);
    }
  };

  const onItemChange = (value: (string | number)[]) => {
    // console.log('value, allValue', value);
    isFirst.current = false;
    setItemValue(value);

    if (value.length === 0) {
      setGroupValue(['ALL']);
    } else {
      const groupKeys: any = [];

      groups.forEach((item) => {
        const isClear = item.values.every((val) => value.includes(val));

        if (isClear) {
          groupKeys.push(item.value);
        }
      });

      setGroupValue(groupKeys);
    }
  };

  const groupConfig: FRCFilterProps = {
    options: groups,
    autoSelectAll,
    showAll: showAllGroups,
    multiple,
    onChange: onGroupChange,
    value: groupValue
  };

  const itemConfig: FRCFilterProps = {
    options: values,
    showAll: showAllItems,
    multiple,
    onChange: onItemChange,
    value: itemValue
  };

  useEffect(() => {
    onChange && !isFirst.current && onChange(itemKey, itemValue.length > 0 ? itemValue : null);
  }, [itemValue]);

  useEffect(() => {
    if (!record[itemKey]) {
      setGroupValue(['ALL']);
      if (itemValue.length > 0) {
        setItemValue([]);
      }
      // setItemValue([]);
    }
  }, [record]);

  return (
    <>
      <div className={classes}>
        <div className='item-row'>
          {showLabel && <div className='item-label'>{label}</div>}
          <div className='item-filter-groups'>
            <div className='filter-groups'>
              <FRCFilter {...groupConfig} />
            </div>
            <div className='filter-items'>
              <FRCFilter {...itemConfig} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LabelGroupFilter;
