import { Calendar } from './components/Calendar';
import { useState } from 'react';

function App() {
  const [dataString, setDateString] = useState<string | undefined>('data')
  // keep it here
  console.log('dataString: ', dataString)

  return (
    <Calendar value={dataString} onChange={setDateString} />
  )
}

export default App
