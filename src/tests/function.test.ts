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
// @ts-ignore
const datesOfAugustForTesting = [
  '2023-07-29T21:00:00.000Z',
  '2023-07-30T21:00:00.000Z',
  '2023-07-31T21:00:00.000Z',
  '2023-08-01T21:00:00.000Z',
  '2023-08-02T21:00:00.000Z',
  '2023-08-03T21:00:00.000Z',
  '2023-08-04T21:00:00.000Z',
  '2023-08-05T21:00:00.000Z',
  '2023-08-06T21:00:00.000Z',
  '2023-08-07T21:00:00.000Z',
  '2023-08-08T21:00:00.000Z',
  '2023-08-09T21:00:00.000Z',
  '2023-08-10T21:00:00.000Z',
  '2023-08-11T21:00:00.000Z',
  '2023-08-12T21:00:00.000Z',
  '2023-08-13T21:00:00.000Z',
  '2023-08-14T21:00:00.000Z',
  '2023-08-15T21:00:00.000Z',
  '2023-08-16T21:00:00.000Z',
  '2023-08-17T21:00:00.000Z',
  '2023-08-18T21:00:00.000Z',
  '2023-08-19T21:00:00.000Z',
  '2023-08-20T21:00:00.000Z',
  '2023-08-21T21:00:00.000Z',
  '2023-08-22T21:00:00.000Z',
  '2023-08-23T21:00:00.000Z',
  '2023-08-24T21:00:00.000Z',
  '2023-08-25T21:00:00.000Z',
  '2023-08-26T21:00:00.000Z',
  '2023-08-27T21:00:00.000Z',
  '2023-08-28T21:00:00.000Z',
  '2023-08-29T21:00:00.000Z',
  '2023-08-30T21:00:00.000Z',
  '2023-08-31T21:00:00.000Z',
  '2023-09-01T21:00:00.000Z',
  '2023-09-02T21:00:00.000Z',
  '2023-09-03T21:00:00.000Z',
  '2023-09-04T21:00:00.000Z',
  '2023-09-05T21:00:00.000Z',
  '2023-09-06T21:00:00.000Z',
  '2023-09-07T21:00:00.000Z',
  '2023-09-08T21:00:00.000Z',
];

describe('Disable Dates Speciifc Dates', () => {
  test('Returning 1 Truthy Specific Date', () => {
    expect(
      returningDisableDatesTest(
        [{ date: '2023-08-15' }],
        new Date('2023-08-15')
      )
    ).toBeTruthy();
  });

  test('Returning 1 Falsy Specific Date', () => {
    expect(
      returningDisableDatesTest(
        [{ date: '2023-08-15' }],
        new Date('2023-08-14')
      )
    ).toBeFalsy();
  });

  test('Returning 2 Truthy Specific Dates', () => {
    for (const date of ['2023-08-19', '2023-08-20']) {
      expect(
        returningDisableDatesTest(
          [{ date: '2023-08-19' }, { date: '2023-08-20' }],
          new Date(date)
        )
      ).toBeTruthy();
    }
  });

  test('Returning 2 Falsy Specific Dates', () => {
    for (const date of ['2023-08-19', '2023-08-20']) {
      expect(
        returningDisableDatesTest(
          [{ date: '2023-08-21' }, { date: '2023-08-22' }],
          new Date(date)
        )
      ).toBeFalsy();
    }
  });
});

describe('Disable Dates Time Period "From / Till" ', () => {
  test('Returning "From / Till" of One From Date', () => {
    expect(
      returningDisableDatesTest(
        [{ from: '2023-08-07', till: '2023-08-10' }],
        new Date('2023-08-07')
      )
    ).toBeTruthy();
  });

  test('Returning "From / Till" of One Till Date', () => {
    expect(
      returningDisableDatesTest(
        [{ from: '2023-08-07', till: '2023-08-10' }],
        new Date('2023-08-10')
      )
    ).toBeTruthy();
  });

  test('Returning "From / Till" after From date', () => {
    expect(
      returningDisableDatesTest(
        [{ from: '2023-08-07', till: '2023-08-10' }],
        new Date('2023-08-08')
      )
    ).toBeTruthy();
  });

  test('Returning "From / Till" after Till date', () => {
    expect(
      returningDisableDatesTest(
        [{ from: '2023-08-07', till: '2023-08-10' }],
        new Date('2023-08-11')
      )
    ).toBeFalsy();
  });
});

// if only from or till is specified,
// all dates before / after this date should be disabled
describe('Disable Dates "Till" ', () => {
  test('Returning Truthy "Till"', () => {
    expect(
      returningDisableDatesTest(
        [{ till: '2023-08-10' }],
        new Date('2023-08-10')
      )
    ).toBeTruthy();
  });

  test('Returning Falsy "Till"', () => {
    expect(
      returningDisableDatesTest(
        [{ till: '2023-08-10' }],
        new Date('2023-08-11')
      )
    ).toBeFalsy();
  });
});

describe('Disable Dates "From" ', () => {
  test('Returning Truthy "From"', () => {
    expect(
      returningDisableDatesTest(
        [{ from: '2023-08-10' }],
        new Date('2023-08-10')
      )
    ).toBeTruthy();
  });

  test('Returning Falsy "From"', () => {
    expect(
      returningDisableDatesTest(
        [{ from: '2023-08-10' }],
        new Date('2023-08-09')
      )
    ).toBeFalsy();
  });
});
