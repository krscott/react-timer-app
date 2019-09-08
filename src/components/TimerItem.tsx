import React, { useState, SyntheticEvent } from 'react'
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
    return (
        <div className="TimerItem">
            <span>{timer.name} </span>
            <span>{timeUntilDate(timer.date)}</span>
        </div>
    )
}
