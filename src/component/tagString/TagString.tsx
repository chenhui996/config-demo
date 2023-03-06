import React from 'react';
import computeMap, {frcFormulaSelect} from '../../compute';
import './style.less';

const TagString: React.FC<any> = (props) => {
  const {record, config} = props;

  const text = frcFormulaSelect<object, string | number>(record, config, computeMap, 'text'); // 文本
  const tag = frcFormulaSelect<object, string | number>(record, config, computeMap, 'tag'); // tag

  const isValid = tag && (text ?? false);

  return (
    <span className='frc-table-liq-box'>
      {isValid ? (
        <span>
          <span className='frc-liq-level'>{tag}</span>
          <span style={{textDecoration: 'underline', cursor: 'pointer'}}>{text}</span>
        </span>
      ) : (
        <span style={{marginLeft: 20}}>--</span>
      )}
    </span>
  );
};

export default TagString;
