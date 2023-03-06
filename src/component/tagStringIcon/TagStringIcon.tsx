import React from 'react';
import {Tooltip, Icon} from 'frc-ui-pro';
import computeMap, {frcFormulaSelect} from '../../compute';
import {NormalTableComponentProps} from '../../type';
import {deleteInvalid} from '../../utils';
import './style.less';

const TagStringIcon: React.FC<NormalTableComponentProps> = (props) => {
  const {record, config} = props;

  const text = frcFormulaSelect<object, string | number>(record, config, computeMap, 'text'); // 文本
  const tagArr = frcFormulaSelect<object, {text: string; color: string}[]>(record, config, computeMap, 'tag') || []; // tag
  const iconType = frcFormulaSelect<object, Array<string | number | null>>(record, config, computeMap, 'icon'); // icon

  const {textAlign, color} = config.styles || {};

  const textStyle = deleteInvalid({
    // width: fitWidth(width) || null,
    textAlign: textAlign || null,
    color: color || null
  });

  return (
    <span className='frc-table-bid-box'>
      {tagArr &&
        tagArr.map((item: {text: string; color: string}) => {
          return (
            <span
              className='tag-container'
              style={{
                borderColor: item.color,
                color: item.color
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  transform: `scale(${item.text === 'YTM' ? 0.35 : 0.8}, 0.8)`
                }}
              >
                {item.text}
              </span>
            </span>
          );
        })}
      <span style={textStyle}>{text}</span>

      <span style={{width: 14, display: 'inline-block'}}>
        {iconType ? (
          <Tooltip title={iconType === 'need-to-ask' ? '需请示' : '必须请示'} hasArrow={false}>
            <Icon type={iconType} style={{color: '#097c6d'}} />
          </Tooltip>
        ) : (
          ''
        )}
      </span>
    </span>
  );
}; // bid field component

export default TagStringIcon;
