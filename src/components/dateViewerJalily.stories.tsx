import { Meta , StoryObj } from '@storybook/react';

import { DateViewerJalaali } from './dateViewerJalily';
import { arrayShamsiDate, arrayShamsiDatewithMIndex } from '@/helpers/calenderJalily';


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
        // chosenDatesDisable : { 
        //     control : 'multi-select' ,
        //     options : [['1403' , '4' , '6'] ,['1403' , '4' , '4'] ,['1403' , '4' , '7'] ,['1403' , '4' , '8']] , 
        //     description : 'add dates to be disabled' 
        // },
        chosenDatesDisable : { 
            control : 'object' ,
            description : "this should be raw mode in control tab addones panel",
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
    }
}

// export const chosenDatesDisable2 : Story = (args) => {

//         return   />
//         chosenDatesDisable : [['1403', '4' , '7'] , ['1403', '4' , '6']] 
//         // isDisableDaysBefore : true
// }