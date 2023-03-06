import React, {useEffect, useState} from 'react';
import {Filter, Icon, Tooltip} from 'frc-ui-pro';
import cn from 'classnames';
import {FRCFilterProps} from 'frc-ui-pro/dist/src/components/Filter';
import './style.less';

const LabelFilter: React.FC<any> = (props) => {
  const {record, itemKey, config, onChange} = props;
  const {multiple, label, showLabel, classNames, autoSelectAll, options = {}, showAllItems, afterIcon = {}} = config;
  const {values} = options;
  const {iconType, tooltipText} = afterIcon;

  const [itemValue, setItemValue] = useState<(string | number)[]>(['ALL']);

  const classes = cn('filter-item label-filter', classNames, {});

  const onItemChange = (value: (string | number)[]) => {
    // console.log('value, allValue', value);
    setItemValue(value);

    const val = multiple ? value : value.join('');
    onChange && onChange(itemKey, value.length ? val : null);
  };

  const addAfterIconConfig = (value) => {
    const oldValue = value;

    const IconDom = () => {
      return <Icon type={iconType} />;
    };

    oldValue.push({
      label: tooltipText ? <Tooltip title={tooltipText}>{IconDom()}</Tooltip> : IconDom(),
      value: 'icon',
      disabled: true
    });

    return oldValue;
  };

  const itemConfig: FRCFilterProps = {
    options: iconType ? addAfterIconConfig(values) : values,
    showAll: showAllItems,
    autoSelectAll,
    multiple,
    onChange: onItemChange,
    value: itemValue
  };

  useEffect(() => {
    if (!record[itemKey]) {
      setItemValue(['ALL']);
    }
  }, [record]);

  return (
    <>
      <div className={classes}>
        <div className='item-row'>
          {showLabel && <div className='item-label'>{label}</div>}
          <div className='filter-items'>
            <Filter {...itemConfig} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LabelFilter;
