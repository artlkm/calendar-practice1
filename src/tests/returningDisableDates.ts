// import dayjs from 'dayjs';

const dayjs = require('dayjs');

interface DisabledDates {
  date?: string;
  from?: string;
  till?: string;
}

export default function returningDisableDates(
  disabledDates: DisabledDates[],
  sourceDate: Date
) {
  for (const date of disabledDates) {
    const dateFrom = new Date(dayjs(date?.from).format('YYYY-MM-DD')).valueOf();
    const dateTill = new Date(dayjs(date?.till).format('YYYY-MM-DD')).valueOf();
    const dateSource = new Date(
      dayjs(sourceDate).format('YYYY-MM-DD')
    ).valueOf();

    if (date?.date) {
      if (
        dayjs(date.date).format('YYYY-MM-DD') ===
        dayjs(sourceDate).format('YYYY-MM-DD')
      )
        return true;
    } else if (date?.from && date?.till) {
      if (dateFrom <= dateSource && dateTill >= dateSource) return true;
    } else if (date?.from && !date?.till) {
      if (dateFrom <= dateSource) return true;
    } else if (date?.till && !date?.from) {
      if (dateTill >= dateSource) return true;
    }
  }
  return false;
}

// module.exports = returningDisableDates;
