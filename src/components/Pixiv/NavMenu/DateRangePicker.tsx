'use client'

import * as React from 'react'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useDispatch } from 'react-redux'
import { setSearchParams } from '@/store/reducers/pixiv'

const DateRangePicker = React.memo(({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 0),
  })
  const dispatch = useDispatch()

  const handleDateChange = React.useCallback(
    (newDate: DateRange | undefined) => {
      setDate(newDate)
      if (newDate?.from && newDate?.to) {
        const before = format(newDate.from, 'yyyy-MM-dd')
        const after = format(newDate.to, 'yyyy-MM-dd')
        if (before !== after) {
          dispatch(setSearchParams({ start_date: before, end_date: after }))
        }
      }
    },
    [dispatch]
  )

  return (
    <div className={cn('grid', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-auto justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              'bg-transparent border-none'
            )}
          >
            <CalendarIcon />
            <span>Date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-0'
          align='start'
        >
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
})

DateRangePicker.displayName = 'DateRangePicker'

export default DateRangePicker
