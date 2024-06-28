import { Meta , StoryObj } from '@storybook/react';

import DatePicker from './datePicker';


const meta  : Meta<typeof DatePicker> = {
    title : 'Components/Date/Milady/DatePicker',
    component : DatePicker,
    parameters : {
        backgrounds : {
            default : 'light'
        }
    },
    // decorators : [
    //     (story) => {

    //         return <div className='w-full flex items-center' >
    //             {story()}
    //         </div>
    //     }
    // ]
    tags : ['autodocs']
}

type Story = StoryObj<typeof DatePicker>

export default meta;

export const Template : Story = {
    args  : {
        
    }
}