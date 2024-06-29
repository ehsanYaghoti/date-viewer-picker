import React, { MouseEvent, useEffect, useState } from "react";

import calendar, {
    isDate,
    isSameDay,
    isSameMonth,
    getDateISO,
    getNextMonth,
    getPreviousMonth,
    WEEK_DAYS,
    CALENDAR_MONTHS,
    getDateShamsi,
    arrayShamsiDate,
    arrayShamsiDatewithMIndex,
    isFreeDay,
    getDayShamsi,
    getLabelOfFreeDay,
    WEEK_DAYS_Labels,
    WEEK_DAYS_Labels_Type_2,
    converJTG,
    showMonthsAndDaysOfYear,

} from "@/helpers/calenderJalaaly";

// import styles
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
    /** date array of strings ['YYYY' , 'MM' , 'DD'] */
    date ?: string[],
    /** array of dates */
    chosenDatesDisable ?: string[][],
    /** functionality for date */ 
    onDateChanged ?: (date : string[]) => void,
    /** (bool) show month and year ? */
    isShowMonthAndYear ?: boolean
    /** (bool) is dates clickabel ? */
    isClickableDates ?: boolean
    /** Week days labels */
    weekDaysLabels ?: string[]
    /** Week days labels type 2 ? */
    weekDaysLabels2 ?: boolean
    /** should disable days before today ? */
    isDisableDaysBefore ?: boolean
    /** is date pciker mode or date viewer mode ? */
    datePickerMode ?: boolean

    /** props about styles */
    /** style week days color text */
    weekDayTextColor ?: string
    /** style week days font size text */
    weekDayFontSize ?: number
    /** style month color text */
    monthTextColor ?: string
    /** style month font size text */
    monthFontSize ?: number
    /** style year color text */
    yearTextColor ?: string
    /** style year font size text */
    yearFontSize ?: number
    /** style days color text */
    daysTextColor ?: string
    /** style days font size text */
    daysFontSize ?: number
    /** style disabled Days color text */
    disabledDaysTextColor ?: string
    /** style disabled Days font size text */
    disabledDaysFontSize ?: number
    /** style disabled Days background color  */
    disabledDaysBackgroundColor ?: string
    /** style days not in month color text */
    notInMonthDaysTextColor ?: string
}

/** date viewer jalaaly */
export const DateViewerYearJalaali = ({ 
    date = arrayShamsiDate  , 
    onDateChanged = (arrayShamsiDate) => {console.log('onDatechange from component')},
    isShowMonthAndYear = true,
    isClickableDates = true,
    weekDaysLabels = WEEK_DAYS_Labels,
    weekDaysLabels2 = false,
    isDisableDaysBefore = false,
    chosenDatesDisable = [['1403' , '4' ,'7']],
    weekDayTextColor = 'blue',
    weekDayFontSize = 12 ,
    monthTextColor = 'blue',
    monthFontSize = 18 ,
    yearTextColor = 'blue',
    yearFontSize = 18 ,
    daysTextColor = 'text-slate-800',
    daysFontSize = 15,
    disabledDaysTextColor = 'white',
    disabledDaysBackgroundColor = '#A9A9A9',
    disabledDaysFontSize = 15,
    notInMonthDaysTextColor = 'text-slate-200',
    datePickerMode = false
} : Props) => {

    const [dateState , setDateState] = useState({
        current : arrayShamsiDate,
        month : 0,
        year : 0,
    })

    const [today , setToday] = useState<string[]>(arrayShamsiDate)

    useEffect(() => {        
        addDateToState(date)
    } , [])

    const addDateToState = (date : any) => {
        setDateState({
            current : date ,
            month : +date[1],
            year : +date[0]
        })
    }


    const getYearCalendarDates = () => {
        
        const { current , month , year } = dateState;

        const calendarYear = year || +current?.[0]

        return showMonthsAndDaysOfYear(calendarYear)  
    }

    const renderMonthAndyear = (index : number) => {
        const { month, year } = dateState;
        
        // get month name from CALENDAR_MONTHS object
        // const monthName = Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(month - 1, 11))]
        const monthName = CALENDAR_MONTHS[index +1]

        return (
               
                <div className="flex items-center justify-center w-full gap-2 select-none py-2 text-center text-[#06c] font-semibold text-lg  " >
                    <span id="month" >{monthName}</span>
                    <span id="year">{year}</span>
                    <style jsx>{`
                        span#month {
                            color: ${monthTextColor};
                            font-size : ${monthFontSize}px;
                        
                        }
                        span#year {
                            color: ${yearTextColor};
                            font-size : ${yearFontSize}px;
                        
                        }
                    `}</style>  
                </div>
                
        )

    }

    const renderWeekDays = (day : any , index : number ) => {

        let daylabel = weekDaysLabels2 ? WEEK_DAYS_Labels_Type_2[day] :  WEEK_DAYS_Labels[day]
        
        return (
            <span  key={index} id={`${index}`} className={`mx-1 px-2  py-2 text-xs font-semibold   text-center w-[50px] whitespace-nowrap `}>
                {daylabel}
                <style jsx>{`
                    span {
                        color: ${weekDayTextColor};
                        font-size : ${weekDayFontSize}px;
                    
                    }
                `}</style>    
            </span>
        )
    }

    const disableChosenDays = (date : string[] , dates = chosenDatesDisable) => {

        if(dates.some(element => isSameDay(date , element))){
            return true 
        }

        return false;

    }

    const renderCalendarDate = (date : string[] , index : number , yearArg : number , monthArg : number) => {

        const { current, month, year } = dateState;

        console.log(date)

        // Check if calendar date is same day as today
        const isToday = isSameDay(date, today);

        // Check if calendar date is same day as currently selected date
        const isCurrent = current && isSameDay(date, current);

        // Check if calendar date is in the same month as the state month and year
        // const inMonth = month && year && isSameMonth(date, [`${year}`, `${month}` , '1']);
        const inMonth = month && year && isSameMonth(date, [`${yearArg}`, `${monthArg}` , '1']);


        // Check if calendar date is in a free day
        const isFree = isFreeDay(date)
        let labelOfFreeday = undefined
        if(isFree){
            labelOfFreeday = getLabelOfFreeDay(date)
        }

        // check if calendar date is last day of the week
        const isLastDayOfweek = getDayShamsi(date) === 6

        let disableThisDay = false

        // disable by chosen dates
        if(chosenDatesDisable.length !== 0){
            disableThisDay = disableChosenDays(date)
        }
 
        
        return (
            <>
                <button 
                    id={`tooltip-${index}`} 
                    key={`btn-${index}`} 
                    onClick={(e) => { 
                        gotoDate(e , date)
                    }} 
                    disabled={(!isClickableDates) || disableThisDay} 
                    className={`text-center p-1 m-1 font-semibold  disabled:bg-${disabledDaysBackgroundColor}-400 disabled:text-[${disabledDaysTextColor}]-500 rounded-md hover:bg-slate-100 
                        ${(isFree || isLastDayOfweek)  && '!text-red-500 ' }
                        ${ inMonth ?  `${daysTextColor}` : `${notInMonthDaysTextColor}` } 
                        ${isCurrent && '!text-blue-600 border border-blue-400' }
                        ${isToday && 'border rounded-md border-blue-700 text-blue-800 bg-blue-50'}
                        
                    `} 
                >
                    {date?.[2]}
                    <style jsx>{`
              
                        button:disabled {
                            background-color: ${disabledDaysBackgroundColor};
                            color : ${disabledDaysTextColor};
                            font-size : ${disabledDaysFontSize}
                        }
                       
                    `}</style>
                </button> 
            </>
        )
    };

    const gotoDate = (evt : MouseEvent , date : string[]) : void => {
        evt && evt.preventDefault();
        const { current } = dateState;

        if (!(current && isSameDay(date, current))) {
            addDateToState(date);
            onDateChanged(date);
        }
    };

    return (
        <div className="w-[1200px]" >
        {/* chosen single date */}
        {(!datePickerMode) && <div className=" w-full bg-slate-50 text-slate-800 px-4 border font-semibold border-blue-600 rounded-md py-2  " >
            <span className="" >choosed single date : </span>
            {dateState?.current?.join('/') }
        </div>}
        {/* this year and year control */}
        <div className="w-full px-6 py-2 text-xl font-bold text-slate-500 border border-blue-500 rounded-md my-4  flex items-center justify-between" >
            <button onClick={(e)=> setDateState(prevState => {return {...prevState , year : dateState?.year - 1} })} className="hover:text-blue-500 focus:text-blue-800 text-blue-600 select-none  "  >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <span>{dateState.year}</span>
            <button onClick={(e)=> setDateState(prevState => {return {...prevState , year : dateState?.year + 1} })}className="hover:text-blue-500 focus:text-blue-800 text-blue-600 select-none"  >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
        {/* calendar of a year container */}
        <div className="grid grid-cols-3 gap-6 w-[1200px] border border-blue-500 rounded-lg p-2 mt-6  " dir="rtl" >
            {
                getYearCalendarDates().map((monthDates , indexMonth ) =>{ 

                    return <div className="flex flex-col w-fit border-2 border-solid border-blue-600 rounded-md text-slate-700 font-sans" dir="rtl" >
                        { isShowMonthAndYear && renderMonthAndyear(indexMonth) }
                        
                        <div className="flex flex-col gap-2" >
                            
                            <div dir="rtl" className={`grid grid-cols-7  w-full ${isShowMonthAndYear ? 'border-y-2' : 'border-b-2'}   border-blue-600  `} >
                                {        
                                    Object.keys(WEEK_DAYS_Labels).map(renderWeekDays)
                                }
                            </div>
                            
                            <div className="w-full grid grid-cols-7  "   >
                                {
                                    monthDates.map((singleDay , index) =>  renderCalendarDate(singleDay as string[] , index , dateState.year , indexMonth+1 ))
                                }
                            </div>
                        </div>
                    </div>
                
                })
            }
            
        </div>
        </div>
    )
}



