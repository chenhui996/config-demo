import React from 'react';
import {Button} from 'frc-ui-pro';
import cn from 'classnames';
import computeMap, {frcFormulaSelect} from '../../compute';
import {deleteInvalid} from '../../utils';
import './style.less';

const NormalButton: React.FC<any> = (props) => {
  const {record, config, onChange, value, itemKey} = props;

  const {workType, label, showLabel, type, work, classNames} = config;

  const isWork = work ? frcFormulaSelect<object, boolean>(record, config, computeMap, 'work') : false; // 文本

  const classes = cn('', classNames, {});

  const buttonConfig = deleteInvalid({
    className: classes || null,
    type: type || null,
    workType: workType || null,
    work: isWork,
    onClick: () => onChange(itemKey, value)
  });

  return <Button {...buttonConfig}>{showLabel ? label || 'button' : ''}</Button>; // 纯渲染
};

export default NormalButton;
