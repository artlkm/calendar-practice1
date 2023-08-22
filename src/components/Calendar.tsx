import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import cn from '../utils/cn';

interface arrayOfDate {
  currentMonth: boolean;
  date: Date
  today?: boolean;
}

interface DisabledDates {
  date?: string,
  from?: string,
  till?: string,
}

interface Props {
  onChange: (value: string) => void;
  disabledDates?: DisabledDates[];
  value?: string;
}

const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
]

function returningDisableDates(disabledDates: DisabledDates[], sourceDate: Date) {
  // REINIS IMPLEMENTATION

  // for (const date of disabledDates) {
  //   const dateFrom = new Date(dayjs(date?.from).format('YYYY-MM-DD')).valueOf()
  //   const dateTill = new Date(dayjs(date?.till).format('YYYY-MM-DD')).valueOf()
  //   const dateSource = new Date(dayjs(sourceDate).format('YYYY-MM-DD')).valueOf()

  //   if (date?.date) {
  //     if (dayjs(date.date).format('YYYY-MM-DD') === dayjs(sourceDate).format('YYYY-MM-DD'))
  //       return true
  //   } else if (date?.from && date?.till) {
  //     if (dateFrom <= dateSource && dateTill >= dateSource)
  //       return true
  //   } else if (date?.from && !date?.till) {
  //     if (dateFrom <= dateSource)
  //       return true
  //   } else if (date?.till && !date?.from) {
  //     if (dateTill >= dateSource)
  //       return true
  //   }
  // }
  // return false


  let isOneDate = false
  let isDateFromTill = false
  let isFrom = false
  let isTill = false

  const datesFromTillArray: [key: string][] = []
  let indexFromTill = 0

  disabledDates.forEach(({ from, till }) => {
    if (from && till)
      datesFromTillArray.push({ from, till })
  })



  disabledDates.map(date => {
    const dateFrom = new Date(dayjs(date?.from).format('YYYY-MM-DD')).valueOf()
    const dateTill = new Date(dayjs(date?.till).format('YYYY-MM-DD')).valueOf()
    const dateSource = new Date(dayjs(sourceDate).format('YYYY-MM-DD')).valueOf()

    const dateFromArray = new Date(dayjs(datesFromTillArray[indexFromTill]?.from).format('YYYY-MM-DD')).valueOf()
    const dateTillArray = new Date(dayjs(datesFromTillArray[indexFromTill]?.till).format('YYYY-MM-DD')).valueOf()

    if (date?.date) {
      dayjs(date.date).format('YYYY-MM-DD') === dayjs(sourceDate).format('YYYY-MM-DD') ? isOneDate = true : false
    } else if (datesFromTillArray.length > 0 && date?.from && date?.till) {
      if (dateFromArray <= dateSource && dateTillArray >= dateSource) {
        isDateFromTill = true
      } else {
        isDateFromTill = false
        indexFromTill += 1
      }
    } else if (date?.from && !date?.till) {
      if (dateFrom <= dateSource)
        isFrom = true
      else
        isFrom = false
    } else if (date?.till && !date?.from) {
      if (dateTill >= dateSource)
        isTill = true
      else
        isTill = false
    }
  })

  return isOneDate || isDateFromTill || isFrom || isTill
}

export function Calendar({ onChange, disabledDates }: Props): JSX.Element {
  const [month, setMonth] = useState(dayjs().month())
  const [year, setYear] = useState(dayjs().year()) // 2023
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    onChange(`${dayjs()
      .format(`${dayjs(selectedDate).get('year')}-${(dayjs(selectedDate).get('month')) <= 9 ? '0' : ''}${dayjs(selectedDate).get('month')}-${dayjs(selectedDate).get('day')}`)}`)
  }, [selectedDate])

  function onPrevMonth() {
    if (month === 0) {
      setYear(prev => prev - 1)
      setMonth(11)
    } else {
      setMonth(prev => prev - 1)
    }
  }

  function onNextMonth() {
    if (month === 11) {
      setMonth(0)
      setYear(prev => prev + 1)
    } else {
      setMonth(prev => prev + 1)
    }
  }

  // Calculating Calendar UI
  const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
  const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const arrayOfDate: arrayOfDate[] = [];

  // create prefix date, they'll be hidden
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayOfDate.push({ currentMonth: false, date: firstDateOfMonth.day(i).toDate() });
  }

  // generate current date
  // set cur month to true
  // displays today date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      date: firstDateOfMonth.date(i).toDate(),
      currentMonth: true,
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  // remaining days of the prev month and next
  // there is bug with it
  const remaining = 42 - arrayOfDate.length;

  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDate.push({ date: firstDateOfMonth.date(i).toDate(), currentMonth: false });
  }

  return (
    <div className='flex w-1/2 mx-auto  h-screen justify-center items-center  flex-col'>
      <div className='flex w-96 justify-between items-center space-x-8 border-b pb-3'>
        <button
          onClick={onPrevMonth}
          className='h-10 w-10 grid place-content-center rounded-full hover:bg-blue-500 hover:text-white transition-all cursor-pointer'>
          &lt;
        </button>
        <h3>{year} {months[month]}</h3>
        <button
          onClick={onNextMonth}
          className='h-10 w-10 grid place-content-center rounded-full hover:bg-blue-500 hover:text-white transition-all cursor-pointer'>
          &gt;
        </button>
      </div>
      <div className='w-96 h-96 '>
        {/* DAYS OF WEEK */}
        <div className='grid grid-cols-7'>
          {days.map((day, i) => {
            return (
              <h1 key={i} className='h-14 grid place-content-center text-sm'>{day}</h1>
            )
          })}
        </div>
        {/* CALENDAR DAYS */}
        <div className='w-full grid grid-cols-7'>
          {arrayOfDate.map(({ date, currentMonth, today }, i) => {
            const dayjsObj = dayjs(date);
            const disabledDate = returningDisableDates(disabledDates!, date)

            return (
              <div key={i} className='h-14 border-t grid place-content-center text-sm '>
                <h1
                  className={cn(
                    selectedDate?.valueOf() === date.valueOf() ? 'bg-blue-800 text-white' : '', // NOTE: .valueOf() converts Date to mls number
                    currentMonth ? 'text-gray-950' : 'opacity-20', // opacity-20 is disabled date
                    today ? 'bg-blue-500 text-white' : '',
                    'h-10 w-10 grid place-content-center rounded-full hover:bg-blue-800 hover:text-white transition-all cursor-pointer',
                    disabledDate ? 'opacity-20' : '',
                  )}
                  onClick={() => setSelectedDate(date)}
                >
                  {dayjsObj.date()}
                </h1>
              </div>
            )
          })}
        </div>
        <div>
          <button onClick={() => setMonth(dayjs().month())} type='button'>Back to present Month</button>
        </div>
      </div>
    </div >
  )
}
