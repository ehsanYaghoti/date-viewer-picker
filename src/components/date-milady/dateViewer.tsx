import React, { Component, Fragment, MouseEvent, useEffect, useState } from "react";

import calendar, {
    isDate,
    isSameDay,
    isSameMonth,
    getDateISO,
    getNextMonth,
    getPreviousMonth,
    WEEK_DAYS,
    CALENDAR_MONTHS,

  } from "@/helpers/calendar";

interface Props {
    date ?: Date,
    onDateChanged ?: (date : Date) => void
}

export const DateViewer = ({ date  , onDateChanged } : Props) => {

    const [dateState , setDateState] = useState({
        current : new Date(),
        month : 0,
        year : 0,
    })

    const [today , setToday] = useState(new Date())

    useEffect(() => {
        addDateToState(date)
    } , [])

    const addDateToState = (date : any) => {
        const isDateObj = isDate(date)

        const _date = isDateObj ? date : new Date()

        setDateState({
            current : isDateObj ? date : null,
            month : +_date.getMonth() +1,
            year : _date.getFullYear()
        })
    }

    const getCalendarDates = () => {
        
        const { current , month , year } = dateState;
        const calendarMonth =  month || +current?.getMonth() +1
        const calendarYear = year || current.getFullYear()
        
        console.log(calendar(calendarMonth , calendarYear))
        return calendar(calendarMonth , calendarYear)
    }

    const renderMonthAndyear = () => {
        const { month, year } = dateState;
        

        // get month name from CALENDAR_MONTHS object
        const monthName = Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(month - 1, 11))]

        return (
            <div className="flex items-center px-6 py-3 w-full  justify-between "  >
                <button onClick={gotoPreviousMonth} className="hover:text-blue-500 focus:text-blue-800 text-blue-600 select-none  "  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <div className="flex items-center self-center gap-2 select-none text-center text-[#06c] font-semibold text-lg  " >
                    <span>{monthName}</span>
                    <span>{year}</span>
                </div>
                <button onClick={gotoNextMonth} className="hover:text-blue-500 focus:text-blue-800 text-blue-600 select-none"  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        )

    }

    const renderWeekDays = (day : any , index : number ) => {

        const daylabel = WEEK_DAYS[day as keyof typeof WEEK_DAYS].toUpperCase();

        return (
            <span  key={index} className="mx-1 px-2 text-base font-bold text-blue-500 text-center w-[69px] ">{daylabel}</span>
        )
    }

    const renderCalendarDate = (date : string[], index : number) => {

        const { current, month, year } = dateState;

        const _date = new Date(date.join("-"));

        // Check if calendar date is same day as today
        const isToday = isSameDay(_date, today);

        // Check if calendar date is same day as currently selected date
        const isCurrent = current && isSameDay(_date, current);

        // Check if calendar date is in the same month as the state month and year
        const inMonth = month && year && isSameMonth(_date, new Date([year, month, 1].join("-")));

        return (
            isCurrent ?
                <button key={Date.parse(`${_date}`)} onClick={(e) => gotoDate(e , _date)} className={`p-1 text-center !text-blue-600 border border-blue-500 rounded-md hover:bg-slate-100 font-semibold ${inMonth ?  ` text-slate-800 ${isToday && 'border rounded-md border-blue-700 text-blue-800 bg-blue-50'}` : 'text-slate-200'} `} >
                    {date?.[2]}
                </button> 
            :
                <button key={Date.parse(`${_date}`)} onClick={(e) => gotoDate(e , _date)} className={`p-1 text-center hover:bg-slate-100 hover:text-slate-500 rounded-md font-semibold ${inMonth ?  ` text-slate-800 ${isToday && 'border !border-blue-700 rounded-md text-blue-800 bg-blue-50  '}` : 'text-slate-200'} `} >
                    {date?.[2]}
                </button> 
        )
    };

    const gotoDate = (evt : MouseEvent , date : Date) : void => {
        evt && evt.preventDefault();
        const { current } = dateState;

        if (!(current && isSameDay(date, current))) {
            addDateToState(date);
            onDateChanged(date);
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
        <>
        <span className="text-slate-600" >
            {/* {dateState?.current?.toDateString()} */}
        </span>

        {/* Calendar Container */}
        <div className="flex flex-col w-[500px] border-2 border-solid border-blue-600 rounded-md text-slate-700 font-sans" >
            
            {/* calender header month and year and arrow buttons */}
            { renderMonthAndyear() }

            {/* Calendar Grid */}
            <div className="flex flex-col gap-2" >
                
                {/* days of the week */}
                <div className="flex-wrap grid grid-cols-7   w-full  border-y-2 border-blue-600 divide-x-2 divide-blue-400  " >
                    {
                        Object.keys(WEEK_DAYS).map(renderWeekDays)
                    }
                </div>
                
                {/* days of the month */}
                <div className="w-full grid grid-cols-7  ">
                    {
                        getCalendarDates().map(renderCalendarDate)
                    }
                </div>
            </div>
        </div>
        </>
    )
}