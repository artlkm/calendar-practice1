import { Calendar } from './components/Calendar';
import { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

// TEMPORARY NOTE
{/* <Calendar
  value={value}
  onChange={onChange}
  disabledDates={[
    // specific date
    { date: '2023-08-04' }, 

    // a time period with a start and end
    { from: '2023-08-07', till: '2023-08-08' },

    // if only from or till is specified,
    // all dates before / after this date should be disabled
    { till: '2023-07-31' },
    { from: '2023-09-01' },
  ]}
/> */}

function App() {
  const [dataString, setDateString] = useState<`${string}-${string}-${string}`>(`${dayjs().year()}-${dayjs().format('MM')}-${dayjs().format('DD')}`)
  // keep it here
  // console.log('dataString: ', dataString) //

  return (
    <Calendar
      value={dataString}
      onChange={setDateString}
      disabledDates={[{ date: '2023-08-19' },]}
    />
  )
}

export default App



