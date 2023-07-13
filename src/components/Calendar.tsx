import dayjs from 'dayjs';
import { useState } from 'react';
import cn from '../utils/cn';
// import { FaApple } from 'react-icons/all'
import { FaAngleLeft } from "@react-icons/all-files/fa/FaBeer";


const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
]


export function Calendar(): JSX.Element {

  const [month, setMonth] = useState(dayjs().month())
  const [year, setYear] = useState(dayjs().year())

  console.log(dayjs().month().toLocaleString());


  function onPrevMonth() {
    setMonth(prev => prev - 1)
  }

  function onNextMonth() {
    setMonth(prev => prev + 1)
  }

  const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
  const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  console.log(
    dayjs()
      .year(year)
      .month(month - 1)
      .startOf('month')
  );

  const arrayOfDate = [];

  // create prefix date, they'll be hidden
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayOfDate.push({ currentMonth: false, date: firstDateOfMonth.day(i) });
  }

  // generate current date
  // set cur month to true
  // displays today date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      date: firstDateOfMonth.date(i),
      currentMonth: true,
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  // console.log('arrayOfDate.length: ', arrayOfDate.length);

  // remaining days of the prev month and next
  // there is bug with it
  const remaining = 42 - arrayOfDate.length;

  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDate.push({ date: firstDateOfMonth.date(i), currentMonth: false });
  }

  // console.log('arrayOfDate: ', arrayOfDate);

  // return arrayOfDate;

  return (
    <div className='flex w-1/2 mx-auto  h-screen justify-center items-center  flex-col'>
      <div className='flex w-96 justify-between items-center space-x-8 border-b pb-3'>
        <button onClick={onPrevMonth} className='h-10 w-10 grid place-content-center rounded-full hover:bg-blue-500 hover:text-white transition-all cursor-pointer'>&lt;</button>
        <h3>{months[month]}</h3>
        <button onClick={onNextMonth} className='h-10 w-10 grid place-content-center rounded-full hover:bg-blue-500 hover:text-white transition-all cursor-pointer'>&gt;</button>
      </div>
      <div className='w-96 h-96 '>
        <div className='grid grid-cols-7'>
          {days.map((day, i) => {
            return (
              <h1 key={i} className='h-14 grid place-content-center text-sm'>{day}</h1>
            )
          })}
        </div>
        <div className='w-full grid grid-cols-7'>
          {arrayOfDate.map(({ date, currentMonth, today }, i) => {
            return (
              <div key={i} className='h-14 border-t grid place-content-center text-sm '>
                <h1 className={cn(
                  currentMonth ? 'text-gray-950' : 'opacity-0',
                  today ? 'bg-blue-500 text-white' : '',
                  'h-10 w-10 grid place-content-center rounded-full hover:bg-blue-800 hover:text-white transition-all cursor-pointer')}>
                  {date.date()}
                </h1>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
