import React from 'react'
import { timeUntilDate } from '../utils/timerdate'
import './TimerItem.css'

export interface TimerProps {
    id: number
    name: string
    date: Date
}

interface TimerItemProps {
    timer: TimerProps
}

export const TimerItem: React.FC<TimerItemProps> = ({ timer }) => {
    // Title text appears when user hovers mouse over element
    const dateTitle = `${timer.date.toDateString()} ${timer.date.toTimeString()}`

    return (
        <div className="TimerItem" title={dateTitle}>
            <span>{timer.name}</span>
            <span> ⏰ </span>
            <span>{timeUntilDate(timer.date)}</span>
        </div>
    )
}
