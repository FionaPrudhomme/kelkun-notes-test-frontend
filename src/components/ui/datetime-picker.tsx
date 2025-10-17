import 'dayjs/locale/fr'

import {fr} from 'date-fns/locale'
import dayjs from 'dayjs'
import {Calendar as CalendarIcon, Clock} from 'lucide-react'
import React, {useEffect, useState} from 'react'
import {Matcher} from 'react-day-picker'

import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {cn} from '@/lib/utils'

dayjs.locale('fr')

interface DateTimePickerProps {
    value: Date | undefined
    onChange: (date: Date | undefined) => void
    hourCycle?: 12 | 24
    calendarDisabled?: Matcher | Matcher[] | undefined
}

export const DateTimePicker = ({
                                   value,
                                   onChange,
                                   hourCycle = 24,
                                   calendarDisabled
                               }: DateTimePickerProps) => {
    const [tempDate, setTempDate] = useState<Date | undefined>(value)
    const [hour, setHour] = useState<string>('00')
    const [minute, setMinute] = useState<string>('00')

    // Sync tempDate, hour, minute on prop change
    useEffect(() => {
        setTempDate(value)
        if (value) {
            const d = dayjs(value)
            setHour(d.format('HH'))
            setMinute(d.format('mm'))
        } else {
            setHour('00')
            setMinute('00')
        }
    }, [value])

    // Base options
    const baseHourOptions = Array.from({length: hourCycle}, (_, i) =>
        i.toString().padStart(2, '0')
    )
    const baseMinuteOptions = Array.from({length: 4}, (_, i) =>
        (i * 15).toString().padStart(2, '0')
    )

    // Compute disabled days: everything before today
    const todayStart = dayjs().startOf('day').toDate()
    const disabledDays: Matcher[] = [
        {before: todayStart},
        // include any passed disabled matchers
        ...(Array.isArray(calendarDisabled)
            ? calendarDisabled
            : calendarDisabled
                ? [calendarDisabled]
                : [])
    ]

    // Compute dynamic hourOptions based on selected date
    const now = new Date()
    const isSameDayAsToday =
        tempDate && dayjs(tempDate).isSame(now, 'day')

    const hourOptions = isSameDayAsToday
        ? baseHourOptions.filter(h => parseInt(h, 10) >= now.getHours())
        : baseHourOptions

    // Compute dynamic minuteOptions
    let minuteOptions = baseMinuteOptions
    if (
        isSameDayAsToday &&
        parseInt(hour, 10) === now.getHours()
    ) {
        // round current minute up to next quarter
        const minQuarter = Math.ceil(now.getMinutes() / 15) * 15
        minuteOptions = baseMinuteOptions.filter(m => parseInt(m, 10) >= minQuarter)
        // if none left, bump hour selection (handled by hourOptions)
    }

    const handleSelectDate = (selected: Date | undefined) => {
        if (!selected) return
        const updated = dayjs(selected)
            .hour(parseInt(hour, 10))
            .minute(parseInt(minute, 10))
            .toDate()
        if (updated < new Date()) {
            // Prevent selecting past datetime
            return
        }
        setTempDate(updated)
        onChange(updated)
    }

    const handleTimeChange = (type: 'hour' | 'minute', val: string) => {
        const base = dayjs(tempDate ?? new Date())
        const updated = base.set(type, parseInt(val, 10))
        const newDate = updated.toDate()

        // Prevent past datetime
        if (newDate < new Date()) {
            return
        }

        // Update state
        if (type === 'hour') setHour(val)
        else setMinute(val)
        setTempDate(newDate)
        onChange(newDate)
    }

    return (
        <Popover modal={true}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        'w-full text-left font-normal rounded-lg',
                        !value && 'text-muted-foreground'
                    )}
                >
                    {value
                        ? dayjs(value).format('DD MMM YYYY HH:mm')
                        : <span>Sélectionner une date</span>}
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4 space-y-2 w-auto">
                <Calendar
                    mode={'single'}
                    selected={tempDate}
                    onSelect={handleSelectDate}
                    initialFocus
                    disabled={disabledDays}
                    locale={fr}
                />
                <div className="flex gap-2 items-center">
                    <Clock className="h-4 w-4 text-muted-foreground"/>
                    <Select value={hour} onValueChange={v => handleTimeChange('hour', v)}>
                        <SelectTrigger className="w-20">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            {hourOptions.map(h => (
                                <SelectItem key={h} value={h}>{h}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    :
                    <Select value={minute} onValueChange={v => handleTimeChange('minute', v)}>
                        <SelectTrigger className="w-20">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            {minuteOptions.map(m => (
                                <SelectItem key={m} value={m}>{m}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </PopoverContent>
        </Popover>
    )
}
