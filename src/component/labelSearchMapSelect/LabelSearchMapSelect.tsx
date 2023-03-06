import React, {useState, useEffect} from 'react';
import {pinyin} from 'pinyin-pro';
import {Button, Divider, Filter, InputSelect, TreeSelect, Checkbox} from 'frc-ui-pro';
import {FilterOutlined, SearchOutlined} from '@ant-design/icons';
import cn from 'classnames';
import './style.less';

const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
].map((o) => ({
  label: o,
  value: o
}));

const transformFileName = (tree: any[], fields: any = {}) => {
  const {id = 'id', title = 'title', value = 'value', children = 'children'} = fields;

  return (tree || []).map((t) => {
    const obj: any = {
      title: t[title],
      value: t[value] || t[id],
      key: t[value] || t[id]
    };
    if (t[children]?.length) {
      obj.children = transformFileName(t[children], fields);
    }
    return obj;
  });
};

const LabelSearchMapSelect: React.FC<any> = (props) => {
  const {record, onChange, config, messageCB, itemKey} = props;
  const {classNames, showLabel, label, fieldNames, initFetchData = {}} = config;

  const {cmd} = initFetchData;

  const [list, setList] = useState<any[]>([]);

  const [treeData, setTreeData] = useState<any[]>([]);
  const [selectOpts, setSelectOpts] = useState<any[]>([]);
  const [treeVal, setTreeVal] = useState<any[]>();

  useEffect(() => {
    // console.log('list', list);

    setTreeData(
      list?.map((i) => {
        return {
          title: i.title,
          key: i.value,
          value: i.value
        };
      })
    );

    setSelectOpts(
      list?.map((i) => {
        return {
          label: i.title,
          key: i.value,
          value: i.value
        };
      })
    );
  }, [list]);

  const [filterVal, setFilterVal] = useState<Array<string | number>>(['A']);
  const [inputVal, setInputVal] = useState<string>();

  const [treeOpen, setTreeOpen] = useState<boolean>();

  const [customTreeVal, setCustomTreeVal] = useState<any[]>([]);

  const fetchData = (params: {cmd: string; payload: object}) => {
    messageCB({...params}, (data) => {
      setList(transformFileName(data.payload || [], fieldNames));
    });
  };

  const handleFilterChange = (filters: Array<string | number>) => {
    const [one] = filters;
    setFilterVal(filters);
    fetchData({cmd, payload: {keyword: one}});
  };

  const handleTreeChange = (vals, itemlabel) => {
    setTreeVal(vals); // 接口用
    onChange && onChange(itemKey, vals.length ? vals : null);

    // 展示用
    if (customTreeVal.length < vals.length) {
      // console.log('add');
      setCustomTreeVal([...customTreeVal, {label: itemlabel[itemlabel.length - 1], value: vals[vals.length - 1]}]);
    } // add

    if (customTreeVal.length > vals.length) {
      // console.log('minus');
      const newArr = customTreeVal.filter((item) => vals.includes(item.value));
      setCustomTreeVal(newArr);
    } // minus
  };

  const handleCustomTreeChange = (checkedValue) => {
    // console.log('checkedValue', checkedValue);

    setTreeVal(checkedValue);
    onChange && onChange(itemKey, checkedValue.length ? checkedValue : null);

    const newArr = customTreeVal.filter((item) => checkedValue.includes(item.value));

    setCustomTreeVal(newArr);
  };

  const handleInputChagne = (e) => {
    const {
      nativeEvent: {data},
      target: {value}
    } = e;
    // console.log('handleInputChagne', data, value);

    const newValue = data?.match(/[A-Z]|[a-z]/g) ? value.toUpperCase() : value;
    setInputVal(newValue);

    if (newValue) {
      fetchData({cmd, payload: {keyword: pinyin(value, {toneType: 'none', pattern: 'first'}).replace(/\s*/g, '')}});
    } else {
      setSelectOpts([]);
    }
  };

  const handleSelect = (key: string) => {
    const targetItem = treeData.find((m) => m.value === key);

    setTreeVal((pre = []) => {
      if (pre.includes(key)) {
        return pre;
      }
      onChange && onChange(itemKey, [...pre, key].length ? [...pre, key] : null);
      return [...pre, key];
    });

    setCustomTreeVal((pre = []) => {
      const exist = pre.find((item) => item.value === key);

      if (exist) {
        return pre;
      }

      return [...pre, {label: targetItem.title, value: targetItem.value}];
    });

    setInputVal(targetItem?.title);
    setSelectOpts([]);
  };

  const handleDVChagne = (visible: boolean) => {
    setTreeOpen(visible);
  };

  const renderDom = (od) => {
    return (
      <>
        <div className='initial-wrapper'>
          <Filter showAll={false} value={filterVal} options={letters} onChange={handleFilterChange} />
        </div>
        <Divider />
        {/* <div style={{height: 200}}>{od}</div> */}
        {od}
      </>
    );
  };

  const renderTootalDom = () => {
    return (
      <div style={{maxHeight: 200, overflowY: 'scroll'}}>
        <Checkbox.Group
          options={customTreeVal}
          style={{marginLeft: 4}}
          value={customTreeVal.map((i) => i.value)}
          onChange={handleCustomTreeChange}
        />
      </div>
    );
  };

  const classes = cn('filter-item label-search-map-select', classNames, {});

  useEffect(() => {
    if (!record[itemKey]) {
      setTreeVal([]);
      setInputVal('');
      setCustomTreeVal([]);
      setFilterVal(['A']);
    }
  }, [record]);

  return (
    <>
      <div className={classes}>
        <div className='item-row'>
          {showLabel && <div className='item-label'>{label}</div>}
          <div className='item-filter-groups'>
            <InputSelect
              value={inputVal}
              options={selectOpts}
              onChange={handleInputChagne}
              onDropdownSelected={handleSelect}
              prefix={<SearchOutlined />}
              placeholder='请输入'
              dropdownStyle={{width: 300}}
              width={180}
              allowClear
            />
            <Button type='primary' style={{marginLeft: 4}} onClick={() => setTreeOpen(true)}>
              <FilterOutlined />
            </Button>
            <TreeSelect
              value={treeVal}
              treeData={treeData}
              open={treeOpen}
              showArrow={false}
              className='initial-tree-select'
              getPopupContainer={(target) => target.parentNode.parentNode.parentNode.parentNode}
              showSelected={!!treeVal?.length}
              wrapperStyle={{marginBottom: 4}}
              dropdownMatchSelectWidth={300}
              dropdownRender={renderDom}
              onChange={handleTreeChange}
              onDropdownVisibleChange={handleDVChagne}
              notFoundContent={<div style={{textAlign: 'center'}}>暂无数据</div>}
              placement='bottomRight'
              selectedDropdownRender={renderTootalDom}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LabelSearchMapSelect;
