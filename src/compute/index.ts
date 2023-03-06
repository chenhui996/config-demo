import {
  frcSingleField,
  frcPriceInvalid,
  frcTagQuoteArr,
  frcTagDealArr,
  frcStarIcon,
  frcCrsMarketMapping,
  frcTagContributorNm,
  frcTextExrcsMaturityConcat,
  frcVolOrDsc,
  frcTagExrcsMaturityConcat,
  frcTagExrcsFlg,
  frcHolidayNumber,
  frcHolidayType,
  frcTradeMeth,
  frcShowAllWork
} from './business';
import {frcFormulaSelect, frcDateFormat, frcToFixed, frcEnsureToFixed, frcDivisor} from './formula';

const computes: [string, Function][] = [
  ['frcSingleField', frcSingleField],
  ['frcPriceInvalid', frcPriceInvalid],
  ['frcTagQuoteArr', frcTagQuoteArr],
  ['frcTagDealArr', frcTagDealArr],
  ['frcStarIcon', frcStarIcon],
  ['frcDateFormat', frcDateFormat],
  ['frcToFixed', frcToFixed],
  ['frcEnsureToFixed', frcEnsureToFixed],
  ['frcCrsMarketMapping', frcCrsMarketMapping],
  ['frcDivisor', frcDivisor],
  ['frcTagContributorNm', frcTagContributorNm],
  ['frcTextExrcsMaturityConcat', frcTextExrcsMaturityConcat],
  ['frcVolOrDsc', frcVolOrDsc],
  ['frcTagExrcsMaturityConcat', frcTagExrcsMaturityConcat],
  ['frcTagExrcsFlg', frcTagExrcsFlg],
  ['frcHolidayNumber', frcHolidayNumber],
  ['frcHolidayType', frcHolidayType],
  ['frcTradeMeth', frcTradeMeth],
  ['frcShowAllWork', frcShowAllWork]
];

const ComponentMap = new Map(computes);

export default ComponentMap;

export {frcFormulaSelect};
