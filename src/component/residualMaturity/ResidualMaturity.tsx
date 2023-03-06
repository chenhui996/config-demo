import React, {useState, useContext} from 'react';
import {Tooltip, DatePicker} from 'frc-ui-pro';
import moment from 'moment';
import computeMap, {frcFormulaSelect} from '../../compute';
import './style.less';

const ResidualMaturity: React.FC<any> = (props) => {
  const {record, config, messageCB} = props;

  const [holidayData, setHolidayData] = useState<any[]>([]);

  const text = frcFormulaSelect<object, string>(record, config, computeMap, 'text');
  const number = frcFormulaSelect<object, string | number>(record, config, computeMap, 'number');
  const type = frcFormulaSelect<object, string>(record, config, computeMap, 'type');
  const date = frcFormulaSelect<object, string>(record, config, computeMap, 'date');

  const [tipVisible, setTipVisible] = useState<boolean>(false);

  const restCustomDateRender = (current: moment.Moment) => {
    const dateArr = holidayData?.map((item) => item.title);

    if (dateArr.indexOf(current.format('YYYY-MM-DD')) !== -1) {
      const index = dateArr.indexOf(current.format('YYYY-MM-DD'));
      return (
        <div className='ant-picker-cell-inner'>
          <span style={{fontWeight: 500}}>{holidayData[index].value}</span>
        </div>
      );
    }

    return <div className='ant-picker-cell-inner'>{current.date()}</div>;
  };

  const ToolTipTitle = () => {
    return (
      <DatePicker
        open={tipVisible}
        value={moment(date)}
        dateRender={restCustomDateRender}
        renderExtraFooter={() => (
          <span style={{lineHeight: '23px'}}>
            关于国务院未发布放假通知的年份，我司将按经验维护后2年的节假日，2年以外的仅考虑周末双休，仅供参考
          </span>
        )}
      />
    );
  };

  return (
    <span className='frc-table-residual-maturity-box'>
      <span>{text}</span>
      <div className='holiday-container'>
        {number && (
          <Tooltip
            visible={tipVisible}
            hasArrow={false}
            title={<ToolTipTitle />}
            overlayClassName='residual-maturity-tip-box'
          >
            <span>
              <div
                className='holiday-box'
                onMouseEnter={() => {
                  setTipVisible(true);
                  messageCB({cmd: 'holiday', payload: {keyword: date}}, (data) => {
                    if (data?.payload.length > 0) {
                      setHolidayData(data.payload);
                    }
                  });
                }}
                onMouseLeave={() => setTipVisible(false)}
              >
                <span
                  className='holiday-text'
                  style={{
                    borderColor: type === 'SSE' ? 'rgb(227,91,16)' : '#f9c152',
                    color: type === 'SSE' ? 'rgb(227,91,16)' : '#f9c152'
                  }}
                >
                  休
                </span>
                <span
                  className='holiday-number'
                  style={{
                    borderColor: type === 'SSE' ? 'rgb(221,99,25)' : '#f9c152',
                    backgroundColor: type === 'SSE' ? 'rgb(221,99,25)' : '#f9c152'
                  }}
                >
                  {number}
                </span>
              </div>
            </span>
          </Tooltip>
        )}
      </div>
    </span>
  );
};

export default ResidualMaturity;
