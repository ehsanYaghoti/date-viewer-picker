import { getDateISO } from "@/helpers/calendar"
import { useEffect, useState } from "react"
import { 
    FormGroup,
    Label, 
    Input,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from "reactstrap"

import 'bootstrap/dist/css/bootstrap.min.css';

import { DateViewer } from "./dateViewer";

interface Props {
    label ?: string,
    value ?: string,
    onDateChange ?: (dateIso : string) => void
}

export default function DatePicker({label , value , onDateChange} : Props){

    const [dateState , setDateState] = useState<string>()
    const [calendarOpen , setCalendarOpen] = useState<boolean>(false)
    
    const toggleCalendar = () => setCalendarOpen(!calendarOpen)
    
    const handleChange = (e : React.ChangeEvent) => e.preventDefault();
    
    const handleDateChange = (date : Date) => {
        const newDate = date ? getDateISO(date) : null

        // check if newDate const is not same as default value set new Date value
        dateState !== newDate && setDateState(newDate)

        onDateChange(newDate)
    }

    useEffect(() => {
        const newDate = new Date()

        setDateState(getDateISO(newDate))
    } , [])

    const closeCalendar = () => {
        setCalendarOpen(false)
    }

    
    return (
        <div className="!relative w-[500px] " >
            <FormGroup className="!flex 1justify-between !relative w-full h-full !border !border-blue-600 rounded-md " >
                <Label className=" m-0 font-normal whitespace-nowrap flex items-center justify-center text-base px-4 tracking-wide uppercase !text-blue-500  border-r border-blue-600  bg-blue-200" >
                    {label || 'Pick your date'}
                </Label>
                <Input 
                    className=" font-bold text-lg  !border-none  rounded-r-md rounded-l-none text-center bg-transparent  tracking-normal  flex items-center placeholder:text-slate-700 placeholder:font-semibold  w-full h-full  "
                    type="text"
                    value={dateState ? dateState.split("-").join(" / ") : '' }
                    readOnly={true}
                    onChange={handleChange}
                    placeholder="YYYY / MM / DD"
                />
            </FormGroup>
            <Dropdown isOpen={calendarOpen} toggle={toggleCalendar}  className="!absolute !top-0 !left-0 w-full h-full" >
                <DropdownToggle color="#333" className=" relative  w-full h-full text-slate-800  bg-transparent border-none  "   />
                <DropdownMenu className=" left-0  mt-10 w-full !h-[75vh] !border-none " >
                    { calendarOpen && (
                        <div className="self-center text-center flex items-center flex-col " >
                            <DateViewer 
                                date={dateState && new Date(dateState)}
                                onDateChanged={handleDateChange}
                            />
                            <Button onClick={closeCalendar} className="  self-center !right-1/2 !text-blue-700  bg-transparent   border-2 !border-blue-800 mt-6 font-bold  font-sans hover:!text-white hover:!bg-[#06c]  hover:!border hover:!border-white  " >Close</Button>
                        </div>
                    )}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}