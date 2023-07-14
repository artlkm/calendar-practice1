import React, { useState } from 'react';
interface SelectedDate {
  index: number | null;
  day: number | null;
}
const YourComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    index: null,
    day: null,
  });
  const handleClick = (index: number, day: number) => {
    setSelectedDate({ index, day });
  };
  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};