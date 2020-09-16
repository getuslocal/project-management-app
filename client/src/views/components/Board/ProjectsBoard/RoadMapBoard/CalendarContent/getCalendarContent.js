import moment from 'moment';

export default function getCalendarContent(startMonth, calendarLength = 1) {
  let calendar = []

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
      thisMonth.setDate(dd);

      // Check if current date is today.
      if (moment(thisMonth).isSame(moment(), 'day')) {
        isToday = true;
      }

      // Check if current date is the last day of this calendar.
      if (month === calendarLength - 1 && dd === thisMonthLength) {
        isLastDayOfCalendar = true;
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
          isFirstDayOfMonth: isFirstDayOfMonth,
          isLastDayOfCalendar: isLastDayOfCalendar
        }
      ]
    }

    calendar = [
      ...calendar,
      content
    ]
  }

  return calendar;
}
