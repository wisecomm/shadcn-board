'use client'

import { useState } from 'react'

import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import styles from './LabelCalendar.module.scss'
import { CalendarIcon } from 'lucide-react'

interface Props {
    label: string
    handleDate: (date: Date) => void
    readonly?: boolean
}

function LabelCalendar({ label, handleDate }: Props) {
    const [date, setDate] = useState<Date>()

    return (
        <div className={styles.container}>
            <span className={styles.container__label}>{label}</span>
            {/* Shadcn UI - Calendar */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[200px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default LabelCalendar