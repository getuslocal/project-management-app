import { useEffect, useState } from 'react';
import moment from 'moment';

export default function useCalendarMonth(startMonth, calendarLength = 0, isPrevMonth) {
  const [loading, setLoading] = useState(true)
  const [calendar, setCalendar] = useState([]);
  const [lastDayOfCalendar, setLastDayOfCalendar] = useState(null);

  useEffect(() => {
    setLoading(true)
    const today = moment();

    if (isPrevMonth) {
      calendarLength = 1
    }

    for (let month = 0; month < calendarLength; month++) {
      const thisMonth = new Date(startMonth.getFullYear(), startMonth.getMonth() + month);
      const yyyy = thisMonth.getFullYear();
      const mm = thisMonth.getMonth();
      const thisMonthLength = new Date(yyyy, mm + 1, 0).getDate();
      let content = [];

      for (let dd = 1; dd <= thisMonthLength; dd++) {
        let isToday = false;
        let isLastDayOfCalendar = false;
        let isFirstDayOfMonth = false;
        let isWeekEnd = false;
        const thisDate = new Date(yyyy, mm, dd);
        thisMonth.setDate(dd);
        
        if(thisDate.getDay() === 6 || thisDate.getDay() === 0){
          // console.log(thisDate)
          isWeekEnd = true;
        }

        // Check if current date is today.
        if (moment(thisMonth).isSame(today, 'day')) {
          isToday = true;
        }

        // Check if current date is the last day of this calendar.
        if (month === calendarLength - 1 && dd === thisMonthLength && !isPrevMonth) {
          isLastDayOfCalendar = true;
          setLastDayOfCalendar({
            yyyy: yyyy,
            mm: mm,
            dd: dd,
          })
        } 

        // Check if current date is a first day of the month.
        if (dd === 1) {
          isFirstDayOfMonth = true;
        }

        content = [
          ...content,
          {
            yyyy: yyyy,
            mm: mm,
            dd: dd,
            isToday: isToday,
            isWeekEnd: isWeekEnd,
            isFirstDayOfMonth: isFirstDayOfMonth,
            isLastDayOfCalendar: isLastDayOfCalendar
          }
        ]
      }
      // 
      if (isPrevMonth) {
        setCalendar(prevState => {
          return [
            content,
            ...prevState
          ]
        })
      } else {
        setCalendar(prevState => {
          return [
            ...prevState,
            content
          ]
        })
      }
    }
    setLoading(false)
  }, [startMonth])

  return { calendar, loading, lastDayOfCalendar }
}
