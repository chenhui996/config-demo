import React from 'react';
import {Tooltip} from 'frc-ui-pro';
import computeMap, {frcFormulaSelect} from '../../compute';
import {NormalTableComponentProps} from '../../type';
import {deleteInvalid} from '../../utils';
import './style.less';

const NormalString: React.FC<NormalTableComponentProps> = (props) => {
  const {record, config} = props;

  const text = frcFormulaSelect<object, string | number | boolean>(record, config, computeMap, 'text'); // 文本

  const {textAlign, color} = config.styles || {};

  const textStyle = deleteInvalid({
    // width: '100%',
    textAlign: textAlign || null,
    color: color || null
  });

  const toolTipStyle = deleteInvalid({
    width: '100%',
    height: 23,
    textAlign: textAlign || null
  });

  return (
    <span className='frc-table-string-box'>
      {config.ellipsis ? (
        <Tooltip style={toolTipStyle} overText title={text} hasArrow={false}>
          <span style={textStyle}>{text}</span>
        </Tooltip>
      ) : (
        <span style={{...textStyle, display: 'inline-block'}}>{text}</span>
      )}
    </span>
  ); // 纯渲染
}; // normal number field component

export default NormalString;
