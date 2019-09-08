import React, { useState } from 'react'
import { TimerItem, TimerProps } from './TimerItem'
import { AddTimerForm } from './AddTimerForm'
import './TimerList.css'
import { isValidDate, splitLabelDate } from '../utils/timerdate'

const TimerList: React.FC = () => {
    const [ preview, setPreview ] = useState('')
    const [ timers, setTimers ] = useState<TimerProps[]>([])

    const addTimer = (newTimer: TimerProps) => {
        setTimers([ newTimer, ...timers ])
    }

    const previewTimer = (previewTimer: string) => {
        setPreview(previewTimer)
    }

    const previewTimerItem = (timerString: string) => {
        const [ name, date ] = splitLabelDate(timerString)

        if (!isValidDate(date)) {
            return <div>...</div>
        }

        if (date <= new Date()) {
            return <div>Past time</div>
        }

        // Add ~100ms to prevent update glitches
        date.setMilliseconds(date.getMilliseconds() + 100)

        const previewTimer = { id: 0, name, date }

        return <TimerItem key={0} timer={previewTimer} />
    }

    return (
        <div className="TimerList">
            <AddTimerForm
                onAddTimerItem={addTimer}
                onPreviewTimerItem={previewTimer}
            />
            <div className="TimerPreview">{previewTimerItem(preview)}</div>
            {timers.map((timer) => <TimerItem key={timer.id} timer={timer} />)}
        </div>
    )
}

export default TimerList
