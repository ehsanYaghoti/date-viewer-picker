import { Meta , StoryObj } from '@storybook/react';

import { DateViewerJalaali } from './dateViewerJalaaly';
import { arrayShamsiDate, arrayShamsiDatewithMIndex } from '@/helpers/calenderJalaaly';


const meta  : Meta<typeof DateViewerJalaali> = {
    title : 'Components/Date/Shamsi/DateViewerJalaali',
    component : DateViewerJalaali,
    parameters : {
        backgrounds : {
            default : 'light'
        }
    },
    decorators : [
        (story) => {

            return <div className=' self-center w-96' >
                {story()}
            </div>
        }
    ],
    argTypes : {
        isShowMonthAndYear : {control : 'boolean' },
        onDateChanged : {control : 'text'},
        daysTextColor : { description : 'should be in tailwind className format like text-slate-500'},
        notInMonthDaysTextColor : { description : 'should be in tailwind className format like text-slate-200'},
        chosenDatesDisable : { 
            control : 'object' ,
            description : " changing this arg should be raw mode in control tab addones panel",
        }
    },
    tags : ['autodocs']
}

type Story = StoryObj<typeof DateViewerJalaali>

export default meta;

export const Primary : Story = {
    args  : {
        date : arrayShamsiDate,
    }
}

export const ShowMonthAndYear : Story = {
    args  : {
        isShowMonthAndYear : false
    }
}

export const IsClickableDays : Story = {
    args  : {
        isClickableDates : false
    }
}

export const WeekDaysLables : Story = {
    args  : {
        weekDaysLabels2 : true
    }
}

export const DisableDaysBefore : Story = {
    args  : {
        isDisableDaysBefore : true
    }
}

export const ChosenDatesDisable : Story = {
    args  : {
        chosenDatesDisable : [['1403', '4' , '6'] , ['1403', '4' , '7']] 
    }
}

export const Styles : Story = {
    args  : {
        weekDayTextColor : 'blue' ,
        weekDayFontSize : 12 ,
        monthTextColor : 'blue' ,
        monthFontSize : 18 ,
        yearTextColor : 'blue' ,
        yearFontSize : 18 ,
        daysTextColor : 'text-blue-500' ,
        daysFontSize : 18 ,
        disabledDaysTextColor : 'white' ,
        disabledDaysFontSize : 18 ,
        disabledDaysBackgroundColor : '#A9A9A9',
        notInMonthDaysTextColor : 'text-slate-200'
    }
}