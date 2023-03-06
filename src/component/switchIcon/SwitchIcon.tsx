import React, {useState} from 'react';
import {Icon} from 'frc-ui-pro';
import computeMap, {frcFormulaSelect} from '../../compute';
import {NormalTableComponentProps} from '../../type';
import './style.less';

const SwitchIcon: React.FC<NormalTableComponentProps> = (props) => {
  const {record, config} = props;

  const [iconStatus, setIconStatus] = useState<boolean | null>(
    frcFormulaSelect<object, boolean>(record, config, computeMap, 'icon')
  );

  // const iconStatus = frcIconFormulaSelect(record, config, computeMap); // icon

  const {beforeType, afterType} = config?.iconStyles as {beforeType: string; afterType: string};

  return (
    <span>
      {beforeType && afterType && iconStatus ? (
        <Icon
          type={beforeType}
          style={{color: 'rgb(255,144,13)', cursor: 'pointer'}}
          onClick={(e) => {
            e.stopPropagation();
            setIconStatus(!iconStatus);
          }}
        />
      ) : (
        <Icon
          type={afterType}
          style={{color: '#3b9078', cursor: 'pointer'}}
          onClick={(e) => {
            e.stopPropagation();
            setIconStatus(!iconStatus);
          }}
        />
      )}
    </span>
  ); // 纯渲染
}; // normal number field component

export default SwitchIcon;
