import { Meta , StoryObj   } from '@storybook/react';
import { fn } from '@storybook/test';
import { DateViewerJalaali } from './dateViewerJalaaly';
import { arrayShamsiDate, arrayShamsiDatewithMIndex } from '@/helpers/calenderJalaaly';
import { useState } from 'react';


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
        // onDateChanged : {control : '' },
        daysTextColor : { description : 'should be in tailwind className format like text-slate-500'},
        notInMonthDaysTextColor : { description : 'should be in tailwind className format like text-slate-200'},
        chosenDatesDisable : { 
            control : 'object' ,
            description : " changing this arg should be raw mode in control tab addones panel",
        },
        // date : { control : '' }
        
        
    },
    tags : ['autodocs'],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onDateChanged : fn() },
}

type Story = StoryObj<typeof DateViewerJalaali>

export default meta;

export const Primary : Story = {
    args  : {
        date : arrayShamsiDate,
        onDateChanged : function( date ) { 
            console.log('onDateChangeFromstoryFile' , date) 
        }
    }
}

// export const SetFUnctionality  = (args) => {

//     const [changeDate , onDateChange] = useState()

//     return <DateViewerJalaali {...args}  />
// }

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