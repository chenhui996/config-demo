import React from 'react';
import SelectComponent from './SelectComponent';
import TableTitle from './tableTitle/TableTitle';
import NormalString from './normalString/NormalString';
import TagStringIcon from './tagStringIcon/TagStringIcon';
import TagString from './tagString/TagString';
import LabelSearchMapSelect from './labelSearchMapSelect/LabelSearchMapSelect';
import LabelTreeSelect from './labelTreeSelect/LabelTreeSelect';
import LabelNumberRange from './labelNumberRange/LabelNumberRange';
import NormalTag from './normalTag/NormalTag';
import TagStringAngle from './tagStringAngle/TagStringAngle';
import SwitchIcon from './switchIcon/SwitchIcon';
import ResidualMaturity from './residualMaturity/ResidualMaturity';
import BondSearch from './bondSearch/BondSearch';
import NormalButton from './normalButton/NormalButton';
import NormalCheckbox from './normalCheckbox/NormalCheckbox';
import LabelGroupFilter from './labelGroupFilter/LabelGroupFilter';
import LabelFilter from './labelFilter/LabelFilter';
import LabelFilterInputRange from './labelFilterInputRange/LabelFilterInputRange';

const components: [string, React.ComponentType<any>][] = [
  ['TableTitle', TableTitle],
  ['NormalString', NormalString],
  ['TagStringIcon', TagStringIcon],
  ['TagString', TagString],
  ['LabelSearchMapSelect', LabelSearchMapSelect],
  ['LabelTreeSelect', LabelTreeSelect],
  ['LabelNumberRange', LabelNumberRange],
  ['NormalTag', NormalTag],
  ['TagStringAngle', TagStringAngle],
  ['SwitchIcon', SwitchIcon],
  ['ResidualMaturity', ResidualMaturity],
  ['BondSearch', BondSearch],
  ['NormalButton', NormalButton],
  ['NormalCheckbox', NormalCheckbox],
  ['LabelGroupFilter', LabelGroupFilter],
  ['LabelFilter', LabelFilter],
  ['LabelFilterInputRange', LabelFilterInputRange]
];

const ComponentMap = new Map(components);

export default ComponentMap;

export {SelectComponent, TableTitle};
