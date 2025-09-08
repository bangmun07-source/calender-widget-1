
import React from 'react';

interface CalendarProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  panelStyle: React.CSSProperties;
}

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const Calendar: React.FC<CalendarProps> = ({ currentDate, setCurrentDate, panelStyle }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 text-center"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
      days.push(
        <div key={day} className={`p-2 text-center rounded-full flex items-center justify-center w-10 h-10 mx-auto ${isToday ? 'bg-red-500/50' : ''}`}>
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div
      style={panelStyle}
      className="p-4 sm:p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/20 w-full max-w-md transition-colors duration-300"
    >
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-white/20 transition-colors">
          <ChevronLeft />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold">
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </h2>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-white/20 transition-colors">
          <ChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-sm sm:text-base">
        {daysOfWeek.map(day => (
          <div key={day} className="p-2 text-center font-semibold opacity-70">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};
