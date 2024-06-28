import { Meta , StoryObj } from '@storybook/react';

import DatePickerJalaaly from './datePickerJalaaly';


const meta  : Meta<typeof DatePickerJalaaly> = {
    title : 'Components/Date/Shamsi/DatePickerJalaaly',
    component : DatePickerJalaaly,
    parameters : {
        backgrounds : {
            default : 'light'
        }
    },
    tags : ['autodocs']
}

type Story = StoryObj<typeof DatePickerJalaaly>

export default meta;

export const Template : Story = {
    args  : {
        
    }
}