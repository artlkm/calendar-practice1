// const returningDisableDatesTest = require('./returningDisableDates');
import returningDisableDatesTest from './returningDisableDates';

// @ts-ignore
const disabledDates = [
  // specific date
  { date: '2023-08-19' },
  // { date: '2023-08-18' },
  { date: '2023-08-20' },

  // a time period with a start and end
  { from: '2023-08-07', till: '2023-08-10' },
  { from: '2023-08-12', till: '2023-08-14' },

  // if only from or till is specified,
  // all dates before / after this date should be disabled
  { till: '2023-08-04' },
  // { till: '2023-08-06' },
  { from: '2023-08-25' },
  // { from: '2023-08-10' },
  // { from: '2023-09-05' },
];

describe('Disable Dates', () => {
  test('Returnign 1 Specific Date', () => {
    expect(
      returningDisableDatesTest(
        [{ date: '2023-08-19' }],
        new Date('2023-08-15')
      )
    ).toBe(true);
    // expect(returningDisableDates()).toBe(true);
    // expect(2).toBe(2);
  });

  // test('Returnign Disabled Dates Function', () => {
  //   returningDisableDatesTest(disabledDates, new Date('2023-08-19'));
  //   // expect(returningDisableDates()).toBe(true);
  //   expect(2).toBe(2);
  // });
});
