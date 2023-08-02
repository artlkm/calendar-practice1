import { Calendar } from './components/Calendar';
import { useState } from 'react';
import dayjs from 'dayjs';

function App() {
  const [dataString, setDateString] = useState<`${string}-${string}-${string}`>(`${dayjs().year()}-${dayjs().format('MM')}-${dayjs().format('DD')}`)
  // keep it here
  // console.log('dataString: ', dataString) //

  return (
    <Calendar value={dataString} onChange={setDateString} />
  )
}

export default App
