import { Calendar } from './components/Calendar';
import { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)


function App() {
  const [dataString, setDateString] = useState<`${string}-${string}-${string}`>(`${dayjs().year()}-${dayjs().format('MM')}-${dayjs().format('DD')}`)
  // keep it here
  // console.log('dataString: ', dataString) //

  return (
    <Calendar
      value={dataString}
      onChange={setDateString}
      disabledDates={
        [
          // specific date
          // { date: '2023-08-19' },
          // { date: '2023-08-18' },
          // { date: '2023-08-20' },

          // a time period with a start and end
          { from: '2023-08-07', till: '2023-08-10' },
          { from: '2023-08-12', till: '2023-08-14' },

          // if only from or till is specified,
          // all dates before / after this date should be disabled
          // { till: '2023-08-04' },
          // { till: '2023-08-06' },
          // { from: '2023-08-25' },
          // { from: '2023-08-10' },
          // { from: '2023-09-05' },
        ]
      }
    />
  )
}

export default App



