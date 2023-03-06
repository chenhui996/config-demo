import React, {useState, ReactElement} from 'react';
import {Tooltip} from 'frc-ui-pro';
import computeMap, {frcFormulaSelect} from '../../compute';
import {NormalTableComponentProps} from '../../type';
import {deleteInvalid} from '../../utils';
import './style.less';

const TagStringAngle: React.FC<NormalTableComponentProps> = (props) => {
  const {record, config} = props;

  const text = frcFormulaSelect<object, string | number>(record, config, computeMap, 'text'); // 文本
  const tagArr = frcFormulaSelect<object, {text: string; color: string}[]>(record, config, computeMap, 'tag') || []; // tag
  const angle = frcFormulaSelect<object, Array<string | number | null>>(record, config, computeMap, 'angle'); // angle

  const [isOverText, setIsOverText] = useState<boolean>(false);

  const {textAlign, color} = config.styles || {};

  const overTextChange = (isOver: boolean) => {
    setIsOverText(isOver);
  }; // ToolTip 包裹的 text 内容超出时触发

  const ToolTipTitle = (): ReactElement => {
    if (
      angle &&
      Object.prototype.toString.call(angle) === '[object Array]' &&
      (angle as Array<string | number>).length > 0
    ) {
      if (isOverText) {
        return (
          <>
            {(angle as Array<string | number>).map((item, index) => {
              return (
                <div
                  style={{
                    wordBreak: 'break-all',
                    marginTop: index !== 0 ? '-4px' : 0
                  }}
                >
                  {item}
                </div>
              );
            })}
          </>
        );
      }

      return <div style={{wordBreak: 'break-all'}}>{angle[0]}</div>;
    }

    return <div style={{wordBreak: 'break-all'}}>{angle || text}</div>;
  }; // 自定义 tooltip text -> for now: array | string (业务决定)

  const textStyle = deleteInvalid({
    // width: 'calc(100% - 8px)',
    textAlign: textAlign || null,
    color: color || null,
    marginRight: 8
  }) as React.CSSProperties;

  const toolTipStyle = deleteInvalid({
    width: '100%',
    height: 23,
    textAlign: textAlign || null
  }) as React.CSSProperties;

  return (
    <span className='frc-table-angle-box'>
      <Tooltip
        style={toolTipStyle}
        overText
        title={<ToolTipTitle />}
        hasArrow={false}
        forceDisplay={Boolean(angle)}
        onOverTextChange={overTextChange}
      >
        {tagArr &&
          tagArr.map((item: {text: string; color: string}) => {
            return (
              <span
                className='tag-container'
                style={{
                  borderColor: item.color,
                  color: item.color,
                  width: item.text === 'N.D' ? 32 : 16
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
        {angle && (
          <span className='frc-table-angle-contaner'>
            <div className='frc-table-angle' />
          </span>
        )}
      </Tooltip>
    </span>
  ); // 纯渲染
};

export default TagStringAngle;
