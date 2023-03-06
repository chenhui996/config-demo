import React from 'react';
import {SelectComponentProps} from '../type';

/**
 * 选择 UI 组件
 */
const SelectComponent: React.FC<SelectComponentProps> = (props) => {
  const {displayType, ComponentMap, defaultText} = props;
  const Component = ComponentMap.get(displayType); // search component
  if (Component) {
    return <Component {...props} />; // render component
  }

  return <span>{defaultText || ''}</span>;
};

export default SelectComponent;
