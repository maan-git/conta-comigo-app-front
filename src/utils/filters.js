import moment from 'moment';

export const formatDate = (dateStr) => moment(String(dateStr)).format('DD/MM/YY');

export const calcAge = (dateString) => moment().diff(moment(dateString, 'YYYYMMDD'), 'years');


export const isRiskGroup = (value) => {
  if (value === false) {
    return 'Não';
  }
  return 'Sim';
};

export default {
  formatDate,
  calcAge,
};
