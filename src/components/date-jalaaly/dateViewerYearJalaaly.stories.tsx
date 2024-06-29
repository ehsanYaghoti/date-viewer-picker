import { Meta , StoryObj   } from '@storybook/react';
import { fn } from '@storybook/test';
import { DateViewerYearJalaali } from './dateViewerYearJalaaly';
import { arrayShamsiDate, arrayShamsiDatewithMIndex } from '@/helpers/calenderJalaaly';
import { useState } from 'react';


const meta  : Meta<typeof DateViewerYearJalaali> = {
    title : 'Components/Date/Shamsi/DateViewer Year Jalaali',
    component : DateViewerYearJalaali,
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

type Story = StoryObj<typeof DateViewerYearJalaali>

export default meta;

export const Primary : Story = {
    args  : {
        date : arrayShamsiDate,
        onDateChanged : function( date ) { 
            console.log('onDateChangeFromstoryFile' , date) 
        }
    }
}
