import React, { useEffect, useMemo, useState } from 'react';
import { TreeSelect as FRCTreeSelect } from 'frc-ui-pro';
// import {FRCTreeSelectProps} from 'frc-ui-pro/dist/src/components/TreeSelect';
import cn from 'classnames';
import './style.less';

const transformFileName = (tree: any[], fields: any = {}) => {
  const { title = 'title', value = 'value', children = 'children' } = fields;

  return (tree || []).map((t) => {
    const obj: any = {
      title: t[title],
      value: t[value] || t.id,
      key: t[value] || t.id
    };
    if (t[children]?.length) {
      obj.children = transformFileName(t[children], fields);
    }
    return obj;
  });
};

const transformExtraButton = new Map<string, string>([
  ['invert', 'INVERT_BUTTON'],
  ['all', 'ALL_BUTTON']
]);

const LabelTreeSelect: React.FC<any> = (props) => {
  const { record, config, onChange, itemKey, messageCB } = props;
  const { classNames, showLabel, label, fieldNames, options = {}, initFetchData = {}, showExtraButton = [], ...others } = config;
  const { values: originalValues } = options;
  const { cmd, payload } = initFetchData;

  const [treeData, setTreeData] = useState<any[]>([]); // all data
  const [treeValue, setTreeValue] = useState<string[]>([]); // value

  const handleChange = (value: string[]) => {
    console.log('value', value);

    setTreeValue(value);
    onChange && onChange(itemKey, value.length > 0 ? value : null);
  };

  const extraButtons = showExtraButton.map((type) => {
    return transformExtraButton.get(type) || null;
  }).filter(item => item);

  const classes = cn('filter-item label-tree-select', classNames);

  useEffect(() => {
    if (initFetchData && cmd) {
      messageCB({ cmd, payload }, (data) => {
        if (data) {
          setTreeData(transformFileName(data.payload || [], fieldNames)); // classification enums
        }
      }); // 获取 classification config
    } else {
      setTreeData(transformFileName(originalValues || [], fieldNames)); // classification enums
    }
  }, [])

  useEffect(() => {
    if (!record[itemKey]) {
      setTreeValue([]);
    }
  }, [record]);

  return (
    <div className={classes}>
      <div className='item-row'>
        {showLabel && <div className='item-label'>{label}</div>}
        <div className='item-tree-select'>
          <FRCTreeSelect
            {...others}
            className="frc-label-tree-select"
            treeData={treeData}
            getPopupContainer={(target) => target.parentNode.parentNode}
            onChange={handleChange}
            showSelected={!!treeValue.length}
            value={treeValue}
            showExtraButton={extraButtons}
          />
        </div>
      </div>
    </div>
  );
};

export default LabelTreeSelect;
