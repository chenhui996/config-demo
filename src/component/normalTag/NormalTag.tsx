import React from 'react';
import computeMap, {frcFormulaSelect} from '../../compute';
import {NormalTableComponentProps} from '../../type';
import {deleteInvalid} from '../../utils';
import './style.less';

type TagProps = {text: string; backgroundColor?: string; color?: string};

const NormalTag: React.FC<NormalTableComponentProps> = (props) => {
  const {record, config} = props;

  const tag = frcFormulaSelect<object, TagProps>(record, config, computeMap, 'tag'); // 文本

  const {tagStyles, styles} = config;

  const textStyle = deleteInvalid({
    backgroundColor: tag ? (tag as TagProps).backgroundColor : styles?.backgroundColor || null,
    textAlign: styles?.textAlign || null,
    color: tag ? (tag as TagProps).color : styles?.color || null
  }) as React.CSSProperties;

  return (
    <span className='frc-table-contributor-box'>
      {tag && (
        <div style={{...tagStyles, ...textStyle}}>
          <div style={{transform: 'scale(0.8, 0.8)'}}>{(tag as {text: string; backgroundColor: string}).text}</div>
        </div>
      )}
    </span>
  ); // 纯渲染
};

export default NormalTag;
