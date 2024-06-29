import { ShamsiFreedays } from '@/contracts/calendarJalaaly';
import jalaliToGregorian from './convertGTJ'

export const converJTG = jalaliToGregorian;

export const date = new Date().toLocaleDateString('fa-IR-u-nu-latn')

const dateObject = new Date()

const getParts = () => date.split('/');

// get index of day of the week of a shamsi date
// for example in shamsi 0 is saturday and 4 is wednesday and 6 is friday
export const getDayShamsi = (arrayShamsiDate : string[] , date : Date = dateObject ) : number  => {

  let _date = date

  let GDateString = converJTG(`${arrayShamsiDate[0]}` , `${arrayShamsiDate[1]}`, `${arrayShamsiDate[2]}`).join('-')
  _date = new Date(GDateString)  

  return  _date.getDay() === 6 ? 0 : _date.getDay() + 1;
}

// get day of the shamsi month
export const  getDateShamsi = () : number =>{
  return +(getParts()[2])
}

// get index month of shamsi year 
export const getMonthShamsi = () : number => +(getParts()[1]) -1

// get number of shamsi year
export const getYearShamsi = () : number => +(getParts()[0])

// get name of the month 
export const getMonthName = (date : Date = dateObject) : string => {
  return date.toLocaleDateString('fa-IR' , { month : 'long'})
}

// get name of the day in week
export const getDayName = (date : Date = dateObject) : string => {
  return date.toLocaleDateString('fa-IR' , { weekday : 'long'})
}

// (int) The current year
export const THIS_YEAR : number = getYearShamsi();

// (int) The current month starting from 1 - 12
export const THIS_MONTH : number = +(getMonthShamsi()) + 1;

// (int) The current day starting from 1 - (29 | 30 | 31)
export const THIS_Day : number = +(getDateShamsi());

export const arrayShamsiDate = [`${THIS_YEAR}` , `${THIS_MONTH}` , `${THIS_Day}` ]

export const arrayShamsiDatewithMIndex = [`${THIS_YEAR}` , `${THIS_MONTH -1}` , `${THIS_Day}` ]




// // Week days names and shortnames
// export const WEEK_DAYS   = {
//   Sunday : "شنبه",
//   Monday : "یکشنبه",
//   Tuesday: "دوشنبه",
//   Wednesday: "سه شنبه",
//   Thursday: "چهار شنبه",
//   Friday: "پنج شنبه",
//   Saturday: "جمعه"
// }


// Shansi calendar free days
export const defaultFreedays : ShamsiFreedays = [
  {
    current : ['1403' , '1' , '1'],
    label : 'عید نوروز'
  },
  {
    current : ['1403' , '1' , '2'],
    label : 'عید نوروز'
  },
  {
    current : ['1403' , '1' , '3'],
    label : 'عید نوروز'
  },
  {
    current : ['1403' , '1' , '4'],
    label : 'عید نوروز'
  },
  {
    current : ['1403' , '1' , '12'],
    label : 'روز جمهوری اسلامی'
  },
  {
    current : ['1403' , '1' , '13'],
    label : 'روز طبیعت'
  },
  {
    current : ['1403' , '1' , '22'],
    label : 'عید سعید فطر'
  },
  {
    current : ['1403' , '1' , '23'],
    label : 'عید سعید فطر'
  },
  {
    current : ['1403' , '4' , '5'],
    label : 'عید غدیر'
  },
  {
    current : ['1403' , '4' , '25'],
    label : 'تاسوعا'
  },
  {
    current : ['1403' , '4' , '26'],
    label : 'عاشورا'
  },
]

// Week days names and shortnames
export const WEEK_DAYS   = {
  0 : "شنبه",
  1 : "یکشنبه",
  2 : "دوشنبه",
  3 : "سه شنبه",
  4 : "چهار شنبه",
  5 : "پنج شنبه",
  6 : "جمعه"
}

// Week days names labels
export const WEEK_DAYS_Labels   = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهار شنبه",
  "پنج شنبه",
  "جمعه"
]

// Week days names labels
export const WEEK_DAYS_Labels_Type_2   = [
  "شنبه",
  "۱ شنبه",
  "۲ شنبه",
  "۳ شنبه",
  "۴ شنبه",
  "۵ شنبه",
  "جمعه"
]


// // Calendar months names and short names
export const CALENDAR_MONTHS = {
  1 : "فروردین",
  2 : "اردیبهشت",
  3 : "خرداد",
  4 : "تیر",
  5 : "مرداد",
  6 : "شهریور",
  7 : "مهر",
  8 : "آبان",
  9 : "آذر",
  10 : "دی",
  11: "بهمن",
  12: "اسفند"
}

// Weeks displayed on calendar (one week from previous month and one week for next month)
export const CALENDAR_WEEKS = 6;

// Pads a string value with leading zeroes(0) until length is reached
// For example: zeroPad(5, 2) => "05"
export const zeroPad = (value : number , length : number) => {
  return `${value}`.padStart(length, '0');
}


// show if the year is leap year advanced
export function isLeapYearShamsi(year : number) : boolean {
  if( 1343 <= year && year <= 1472 ){
    if(year % 33 === 1 || year % 33 === 5 || year % 33 === 9 || year % 33 === 13 || year % 33 === 17 || year % 33 === 22 || year % 33 === 26 || year % 33 === 30 ){
        return true
    }
  } else if(1244 <= year && year <=1342){
    if(year % 33 === 1 || year % 33 === 5 || year % 33 === 9 || year % 33 === 13 || year % 33 === 17 || year % 33 === 21 || year % 33 === 26 || year % 33 === 30 ){
        return true
    }
  }

  return false
}


// Number days of a month in a given year from 29 to 31
export const getMonthDays = (month : number = THIS_MONTH , year : number = THIS_YEAR) : number => {
  
  const monthWith31 = [1,2,3,4,5,6]

  let leapYearShamsi = false

  if(year % 4 === 3){
    leapYearShamsi = true
  } 

  if(month == 12){
    if(leapYearShamsi){
      return 30;
    } else {
      return 29;
    }
  } else if(monthWith31.includes(month)){
    return 31;
  }

  return 30;

}

// (int) First day of the month for a given year from 1 - 7
// 1 => Saturday(شنبه) ,  7 => friday(جمعه)
export const getMonthFirstDay = (month : number = THIS_MONTH  , year : number = THIS_YEAR) => {
  
  const mm =  month < 10 ? `0${month}` : month

  // convert shamsi to milady 
  let GDateString = converJTG(`${year}` , `${mm}`, '01').join('-')
  
  const dayIndex = new Date(GDateString).getDay() === 6 ? 0 : new Date(GDateString).getDay()+ 1 ;

  return dayIndex + 1
}


// (bool) Checks if a value is a date - this is just a simple check
export const isDate = (date : Date)  => {
  const isDate = Object.prototype.toString.call(date) === '[object Date]';
  
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return isDate && isValidDate;
}

/*
  Checks whether a Jalaali date is valid or not.
*/
export function isValidJalaaliDate(jy : number , jm : number, jd : number) {
  return  jy >= -61 && jy <= 3177 &&
          jm >= 1 && jm <= 12 &&
          jd >= 1 && jd <= getMonthDays(jm , jy)
}


// (bool) Checks if two date values are of the same month and year
export const isSameMonth = (date : string[]  , basedate : string[] = arrayShamsiDate) => {

  const basedateMonth = +(basedate[1]);
  
  const basedateYear = basedate[0];
  
  const dateMonth = +(date[1]);
  
  const dateYear = date[0];
  
  return (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear);

}

// (bool) Checks if two array of string values type ['YYYY' , 'MM' , 'DD'] without zero pad are the same day
export const isSameDay = (date : string[], basedate : string[] = arrayShamsiDate) => {

  const basedateYear = basedate[0];
  const basedateMonth = basedate[1];
  const basedateDate = basedate[2];
  
  const dateYear = date[0];
  const dateMonth = date[1];
  const dateDate = date[2];
  
  return (+basedateDate === +dateDate) && (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear);
}

// (bool) Checks if the given date arg is free day  (array of string values type ['YYYY' , 'MM' , 'DD'] without zero pad)
export const isFreeDay = (date : string[], basedate : ShamsiFreedays = defaultFreedays) => {
  
  const dateYear = date[0];
  const dateMonth = date[1];
  const dateDate = date[2];

  let isfree = basedate.some((element) => ((+element.current[1] === +dateMonth) && (+element.current[2] === +dateDate)) )

  return isfree
  
}

export const getLabelOfFreeDay = (date : string[], basedate : ShamsiFreedays = defaultFreedays) => {

    const dateMonth = date[1];
    const dateDate = date[2];

    const freeday =  basedate.find(element => ((+element.current[1] === +dateMonth) && (+element.current[2] === +dateDate)))

    return freeday.label
  

  return ''
}

// (string) Formats the given date as YYYY-MM-DD
// Months and Days are zero padded
export const getDateISO = (date : Date = new Date()) => {

  if (!isDate(date)){ 
    return null;
  }

  return [
    date.getFullYear(),
    zeroPad(+date.getMonth() + 1, 2),
    zeroPad(+date.getDate(), 2)
  ].join('-');

}

// ({month, year}) Gets the month and year before the given month and year
export const getPreviousMonth = (month : number, year : number) => {

  const prevMonth = (month > 1) ? month - 1 : 12;

  const prevMonthYear = (month > 1) ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };

}

// ({month, year}) Gets the month and year after the given month and year
export const getNextMonth = (month : number, year : number) => {

  const nextMonth = (month < 12) ? month + 1 : 1;
  
  const nextMonthYear = (month < 12) ? year : year + 1;
  
  return { month: nextMonth, year: nextMonthYear };
}

// Calendar builder for a month in the specified year
// export default
export default (month = THIS_MONTH, year = THIS_YEAR) => {
  
  // Get number of days in the month and the month's first day
  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);
  
  // Get number of days to be displayed from previous and next months
  // These ensure a total of 42 days (6 weeks) displayed on the calendar
  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth = (CALENDAR_WEEKS * 7) - (daysFromPrevMonth + monthDays);
  
  // Get the previous and next months and years
  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);
 
  // Get number of days in previous month
  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);
 
  // Builds last dates to be displayed from previous month
  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [ prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2) ];
  });

  // Builds dates to be displayed from current month
  const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return [year, zeroPad(month, 2), zeroPad(day, 2)];
  });

  // Builds first dates to be displayed from next month
  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
  });

  // Combines all dates from previous, current and next months
  return [ ...prevMonthDates, ...thisMonthDates, ...nextMonthDates ];

}


export const makecalendarDates = (month = THIS_MONTH, year = THIS_YEAR) => {
  
  // Get number of days in the month and the month's first day
  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);
  
  // Get number of days to be displayed from previous and next months
  // These ensure a total of 42 days (6 weeks) displayed on the calendar
  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth = (CALENDAR_WEEKS * 7) - (daysFromPrevMonth + monthDays);
  
  // Get the previous and next months and years
  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);
 
  // Get number of days in previous month
  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);
 
  // Builds last dates to be displayed from previous month
  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [ prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2) ];
  });

  // Builds dates to be displayed from current month
  const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return [year, zeroPad(month, 2), zeroPad(day, 2)];
  });

  // Builds first dates to be displayed from next month
  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
  });

  // Combines all dates from previous, current and next months
  return [ ...prevMonthDates, ...thisMonthDates, ...nextMonthDates ];

}


export const showMonthsAndDaysOfYear = (year : number ) => {

  const allMonthsdays = []

  for (let index = 1; index <= 12 ; index++) {
    allMonthsdays.push(getMonthDays(index , year))
  }

  // Builds dates and months to be displayed from current year
  const thisYearDates = allMonthsdays.map((oneMonthDays , monthIndex) => {

    
    

    // Builds dates to be displayed from current month
    // const thisMonthDates = [...new Array(oneMonthDays)].map((n, index) => {
      
    //   const day = index + 1;
    //   const month = monthIndex + 1;

    //   return [year, zeroPad(month, 2), zeroPad(day, 2)];
    // });

    // return thisMonthDates;
    return makecalendarDates(monthIndex+1 , year)
  })

  return thisYearDates;

}