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

} from "@/helpers/calenderJalily";

// import components
import ToolTipItem from './other/TooltipItem'; 


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
}

/** date viewer jalaaly */
export const DateViewerJalaali = ({ 
    date = arrayShamsiDate  , 
    onDateChanged = (arrayShamsiDate) => {console.log(arrayShamsiDate)},
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
    daysTextColor = 'black',
    daysFontSize = 15,
    disabledDaysTextColor = 'orange',
    disabledDaysBackgroundColor = 'pink',
    disabledDaysFontSize = 15,
} : Props) => {

    const [showConvertSection , setShowConvertSectoin] = useState<boolean>(false)
    const [dateStateMilady , setDateStateMilady] = useState({
        current : new Date().toDateString(),
        monthName : '',
        day : 0,
        dayName : ''
    })

    const [dateState , setDateState] = useState({
        current : arrayShamsiDate,
        month : 0,
        year : 0,
    })

    const [manyDateState , setManyDateState] = useState([{
        current : [],
        month : 0,
        year : 0,
    }])

    const [today , setToday] = useState<string[]>(arrayShamsiDate)

    useEffect(() => {        
        addDateToState(date)
        // addManyDateToState(date)
    } , [])

    const addDateToState = (date : any) => {
        setDateState({
            current : date ,
            month : +date[1],
            year : +date[0]
        })
    }

    const addManyDateToState = (date : any) => {
        setManyDateState(prevstate => {
            return [
                ...prevstate,
                {
                    current : date ,
                    month : +date[1],
                    year : +date[0]
                }
            ]

        } )
    }

    const resetManyDateState = (e : React.MouseEvent) => {
        e.preventDefault()

        setManyDateState([{
            current : [],
            month : 0,
            year : 0
        }])
    }

    const getCalendarDates = () => {
        
        const { current , month , year } = dateState;

        const calendarMonth =  month || +current?.[1]
        const calendarYear = year || +current?.[0]
        
        return calendar(calendarMonth , calendarYear)        
    }

    const renderMonthAndyear = () => {
        const { month, year } = dateState;
        
        // get month name from CALENDAR_MONTHS object
        // const monthName = Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(month - 1, 11))]
        const monthName = CALENDAR_MONTHS[month]


        return (
            <div className="flex items-center px-6 py-3 w-full  justify-between "  >
                <button onClick={gotoNextMonth} className="hover:text-blue-500 focus:text-blue-800 text-blue-600 select-none"  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
                <div className="flex items-center self-center gap-2 select-none text-center text-[#06c] font-semibold text-lg  " >
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
                <button onClick={gotoPreviousMonth} className="hover:text-blue-500 focus:text-blue-800 text-blue-600 select-none  "  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
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

    const ShowConvertToMilady = (e , date : string[]) => {
        setShowConvertSectoin(!showConvertSection)
        const date1 = converJTG(date[0] , date[1] , date[2])
        const _date = new Date(date1.join('/'))
        setDateStateMilady({
            current  : date1.join(' / ') , 
            monthName : _date.toLocaleString('default', { month: 'long' }),
            day : _date.getDate() ,
            dayName : _date.toLocaleString('default', { weekday : 'long' })
        })
    }

    const disableDaysBeforeToday = (date : string[]) => {

        const utcOfToday = Date.UTC(+today[0] , (+today[1] -1) , +today[2])
        const utcOfThisDate = Date.UTC(+date[0] , (+date[1] -1) , +date[2])

        console.log(utcOfThisDate < utcOfToday)

        if(utcOfThisDate < utcOfToday){
            return true 
        }

        return false;

    }

    const disableChosenDays = (date : string[] , dates = chosenDatesDisable) => {

        // const utcOfToday = Date.UTC(+today[0] , (+today[1] -1) , +today[2])
        // const utcOfThisDate = Date.UTC(+date[0] , (+date[1] -1) , +date[2])

        // console.log(utcOfThisDate < utcOfToday)

        if(dates.some(element => isSameDay(date , element))){
            return true 
        }

        return false;

    }

    const renderCalendarDate = (date : string[] , index : number) => {

        const { current, month, year } = dateState;

        // Check if calendar date is same day as today
        const isToday = isSameDay(date, today);

        // Check if calendar date is same day as currently selected date
        const isCurrent = current && isSameDay(date, current);

        // Check if calendar date is in the same month as the state month and year
        const inMonth = month && year && isSameMonth(date, [`${year}`, `${month}` , '1']);

        // Check if calendar date is in a free day
        const isFree = isFreeDay(date)
        let labelOfFreeday = undefined
        if(isFree){
            labelOfFreeday = getLabelOfFreeDay(date)
        }

        // check if calendar date is last day of the week
        const isLastDayOfweek = getDayShamsi(date) === 6

        let disableThisDay = false

        // disable days before today ?
        if(isDisableDaysBefore){
            disableThisDay = disableDaysBeforeToday(date)
        }

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
                        ShowConvertToMilady(e , date)
                    }} 
                    // onFocus={(e) => ShowConvertToMilady(e , date)}
                    disabled={(!isClickableDates) || disableThisDay} 
                    className={`text-center p-1 m-1 font-semibold  disabled:bg-${disabledDaysBackgroundColor}-400 disabled:text-['${disabledDaysTextColor}']-500 rounded-md hover:bg-slate-100 
                        ${ inMonth ?  "text-slate-800" : 'text-slate-200' } 
                        ${isCurrent && '!text-blue-600 border border-blue-400' }
                        ${(isFree || isLastDayOfweek)  && '!text-red-800  !border !border-red-500 ' }
                        ${isToday && 'border rounded-md border-blue-700 text-blue-800 bg-blue-50'}
                        
                    `} 
                >
                    {date?.[2]}
                    <style jsx>{`
                        button {
                        background-color: ${''};
                        }
                    `}</style>
                </button> 
                { isFree  && <ToolTipItem id={`${index}`} index={index} toolTipLabel={labelOfFreeday}   /> }
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

        if(! manyDateState.some(element => (isSameDay(date , current) && isSameDay(date , element.current)) )){
            addManyDateToState(date)
        }

    };

    const gotoPreviousMonth = () => {
    const { month, year } = dateState;
    const previousMonth = getPreviousMonth(month, year);
    setDateState({
        month: previousMonth.month,
        year: previousMonth.year,
        current: dateState.current,
    });
    };
    
    const gotoNextMonth = () => {
    const { month, year } = dateState;
    const nextMonth = getNextMonth(month, year);
    setDateState({
        month: nextMonth.month,
        year: nextMonth.year,
        current: dateState.current,
    });
    };


    return (
        <div className=" w-[500px] " >

        <div className=" w-full bg-slate-50 text-slate-800 px-4 border font-semibold border-blue-600 rounded-md  " >
            <span className="" >choosed single date : </span>
            {dateState?.current?.join('/') }
        </div>

        <div className=" w-full h-fit relative flex flex-col items-start gap-3 bg-slate-50 text-slate-800 font-semibold px-1 py-2 my-2 border border-blue-600 rounded-md  " >
            <button onClick={e => resetManyDateState(e)} className=" absolute top-2 right-2  bg-slate-50 text-slate-600 rounded-full " >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
             </button>
            <span className="w-fit" >choosed many dates :</span>
            <div className=" w-[500px] h-fit flex   flex-wrap " >
                {manyDateState.map(date => <span className="mx-2 my-1 w-fit" >{date?.current?.join('/')}</span> )}
            </div>
        </div> 



        {/* Calendar Container */}
        <div className="flex flex-col w-[500px] border-2 border-solid border-blue-600 rounded-md text-slate-700 font-sans" dir="rtl" >
            { isShowMonthAndYear && renderMonthAndyear() }
            
            <div className="flex flex-col gap-2" >
                
                <div dir="rtl" className={`grid grid-cols-7  w-full ${isShowMonthAndYear ? 'border-y-2' : 'border-b-2'}   border-blue-600  `} >
                    {        
                        Object.keys(WEEK_DAYS_Labels).map(renderWeekDays)
                    }
                </div>
                
                <div className="w-full grid grid-cols-7  ">
                    {
                        getCalendarDates().map(renderCalendarDate)
                    }
                </div>
            </div>
        </div>
         
        {
            showConvertSection &&
            <div className="bg-slate-200 w-[500px] whitespace-nowrap mt-3 h-fit px-4 py-2 border-2 border-solid border-blue-600 rounded-md flex flex-col items-center gap-2 font-semibold  text-slate-600 " >
                <span className="h-fit text-green-600 font-bold " >Georgian date : </span>
                {/* <span className="h-fit text-green-600 font-bold  " dir="rtl" >تاریخ میلادی :</span> */}

                <div className="flex items-center gap-2" >
                    <span>{dateStateMilady?.dayName}</span>
                    <span>{dateStateMilady?.day}</span>
                    <span>{dateStateMilady?.monthName}</span>
                </div>
                <span>
                    {dateStateMilady?.current}
                </span>
                
                
            </div>
        }

        </div >
    )
}