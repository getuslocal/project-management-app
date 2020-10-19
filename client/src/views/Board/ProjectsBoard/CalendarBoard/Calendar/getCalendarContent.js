import moment from 'moment';

export function getCalendarContent(startDate, isAppend = false) {
  // const startDate = moment();
  // const currentMonth = new Date(startDate.year(), startDate.month(), 1);
  let calendar = [];
  let yyyy = startDate.year();
  let mm = startDate.month();
  let dd = startDate.date();
  let firstDayOfNextWeek = isAppend ? dd : 1;

  for (let weekNum = 0; weekNum < 20; weekNum++) {
    let week = []
    for (let dayNum = 0; dayNum < 7; dayNum++) {
      const date = moment(new Date(yyyy, mm, firstDayOfNextWeek)).weekday(dayNum);
      const formattedDate = date.toObject();

      if (dayNum === 6) {
        // day = day.clone().add(1, 'd');
        firstDayOfNextWeek = date.date() + 1;
        // console.log('current month: ' + mm)
        // console.log(formattedDate)
        // console.log('firstDayOfNextWeek : ' + firstDayOfNextWeek)
        // console.log('---------------')

        if (formattedDate.months === mm + 1) {
          mm = formattedDate.months
        }

        if (formattedDate.months === 0 && mm === 11) {
          mm = 0
          yyyy++
        }
      }

      week = [
        ...week,
        {
          yyyy: formattedDate.years,
          mm: formattedDate.months,
          dd: formattedDate.date,
        }
      ]
    }

    calendar = [
      ...calendar,
      week
    ]
  }

  return calendar;
}

export function getCalendarOfMonth(month) {
  const yyyy = month.year()
  const mm = month.month()
  let calendar = [];
  let firstDayOfNextWeek = 1;

  for (let weekNum = 0; weekNum < 5; weekNum++) {
    let week = []
    for (let dayNum = 0; dayNum < 7; dayNum++) {
      const date = moment(new Date(yyyy, mm, firstDayOfNextWeek)).weekday(dayNum);
      const formattedDate = date.toObject();

      if (dayNum === 6) {
        firstDayOfNextWeek = date.date() + 1;
      }

      week = [
        ...week,
        {
          yyyy: formattedDate.years,
          mm: formattedDate.months,
          dd: formattedDate.date,
        }
      ]
    }

    // If last element of the month loop is another month,
    // not add it to calendar because it already exists.
    if(week[6].mm !== mm) continue;

    calendar = [
      ...calendar,
      week
    ]
  }

  console.log(calendar)

  return calendar;
}
