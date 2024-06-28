import { Meta , StoryObj } from '@storybook/react';

import { DateViewer } from './dateViewer';


const meta  : Meta<typeof DateViewer> = {
    title : 'Components/Date/Milady/DateViewer',
    component : DateViewer,
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
    ]
}

type Story = StoryObj<typeof DateViewer>

export default meta;

export const Template : Story = {
    args  : {
        date : new Date(),
        
    }
}
