'use client'

import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'

import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger,} from "@/components/ui"

interface Props {
    label: string
    readonly?: boolean
}

function LabelDatePicker({ label }: Props) {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <div className='max-w-64 flex items-center gap-3'>
            <span className='text-sm font-medium leading-none text-[#6d6d6d]'>{label}</span>
            {/* Shadcn UI - Calendar */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"} className={cn("w-[200px] justify-start text-left font-normal", !date && "text-muted-foreground")} >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {date ? format(date, "PPP") : <span>날짜를 선택하세요</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export { LabelDatePicker }