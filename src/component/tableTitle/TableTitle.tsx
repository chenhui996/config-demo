import React from 'react';
import {deleteInvalid} from '../../utils';

/**
 * 表格头部组件
 */
const TableTitle: React.FC<any> = (props) => {
  const {config, defaultText} = props;
  if (config.titleProps) {
    const titleStyle = {
      textAlign: config.titleProps.textAlign ? config.titleProps.textAlign : null
    };
    return <div style={deleteInvalid(titleStyle)}>{defaultText}</div>;
  }

  return <span>{defaultText}</span>;
};

export default TableTitle;
