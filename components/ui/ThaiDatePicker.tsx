'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format, addYears, subYears } from 'date-fns';
import { th } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ThaiDatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
  yearRange?: number; // Number of years before and after current year
  showBuddhistYear?: boolean;
}

export function ThaiDatePicker({
  value,
  onChange,
  disabled = false,
  yearRange = 100,
  showBuddhistYear = true,
}: ThaiDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());

  const thaiMonths = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ];

  const startYear = subYears(new Date(), yearRange);
  const endYear = addYears(new Date(), 1);

  const formatThaiDate = (date: Date) => {
    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = showBuddhistYear
      ? date.getFullYear() + 543
      : date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const years = Array.from(
    { length: endYear.getFullYear() - startYear.getFullYear() + 1 },
    (_, i) => startYear.getFullYear() + i
  );

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
    setIsOpen(false);
  };

  const handleMonthChange = (increment: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
  };

  const handleYearChange = (year: number) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? formatThaiDate(value) : 'เลือกวันที่'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <div className="flex justify-between items-center mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleMonthChange(-1)}
            >
              ←
            </Button>
            <select
              value={currentMonth.getMonth()}
              onChange={(e) => {
                const newDate = new Date(currentMonth);
                newDate.setMonth(parseInt(e.target.value));
                setCurrentMonth(newDate);
              }}
              className="mx-1 p-1 rounded"
            >
              {thaiMonths.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={currentMonth.getFullYear()}
              onChange={(e) => handleYearChange(parseInt(e.target.value))}
              className="mx-1 p-1 rounded"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {showBuddhistYear ? year + 543 : year}
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleMonthChange(1)}
            >
              →
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map((day) => (
              <div key={day} className="text-center text-sm py-1">
                {day}
              </div>
            ))}
            {Array.from({ length: 42 }, (_, i) => {
              const date = new Date(currentMonth);
              date.setDate(1);
              date.setDate(i - date.getDay());

              const isCurrentMonth =
                date.getMonth() === currentMonth.getMonth();
              const isSelected =
                selectedDate?.toDateString() === date.toDateString();

              return (
                <Button
                  key={i}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'text-center',
                    !isCurrentMonth && 'text-muted-foreground',
                    isSelected && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => handleSelect(date)}
                  disabled={!isCurrentMonth}
                >
                  {date.getDate()}
                </Button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
