import { useEffect, useState } from 'react';
import moment from 'moment';

export default function useCalendarMonth(startMonth, calendarLength) {
  const [loading, setLoading] = useState(true)
  const [calendar, setCalendar] = useState([]);
  const [lastDayOfCalendar, setLastDayOfCalendar] = useState(null);
  
  useEffect(() => {
    setLoading(true)
    const today = moment();
    // console.log(startMonth)

    for (let month = 0; month <= calendarLength; month++) {
      const thisMonth = new Date(startMonth.getFullYear(), startMonth.getMonth() + month);
      const yyyy = thisMonth.getFullYear();
      const mm = thisMonth.getMonth();
      const thisMonthLength = new Date(yyyy, mm + 1, 0).getDate();

      for (let dd = 1; dd <= thisMonthLength; dd++) {
        let isToday = false;
        let isLastDayOfCalendar = false;
        let isFirstDayOfMonth = false;
        thisMonth.setDate(dd);

        // Check if current date is today.
        if (moment(thisMonth).isSame(today, 'day')) {
          isToday = true;
        }

        // Check if current date is the last day of this calendar.
        if (month === calendarLength && dd === thisMonthLength) {
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

        setCalendar(prevState => {
          return [
            ...prevState,
            {
              yyyy: yyyy,
              mm: mm,
              dd: dd,
              isToday: isToday,
              isFirstDayOfMonth: isFirstDayOfMonth,
              isLastDayOfCalendar: isLastDayOfCalendar
            }
          ]
        })
      }
    }
    setLoading(false)
  }, [startMonth])

  return { calendar, loading, lastDayOfCalendar }
}
