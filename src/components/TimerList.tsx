import React, { useState } from 'react'
import { TimerItem, TimerProps } from './TimerItem'
import { AddTimerForm } from './AddTimerForm'
import './TimerList.css'

const TimerList: React.FC = () => {
    const [ preview, setPreview ] = useState<TimerProps>()
    const [ timers, setTimers ] = useState<TimerProps[]>([])

    const addTimer = (newTimer: TimerProps) => {
        console.log(newTimer)
        setTimers([ ...timers, newTimer ])
    }

    const previewTimer = (previewTimer: TimerProps) => {
        console.log(previewTimer.date)
        setPreview(previewTimer)
    }

    const previewTimerItem = (timer: TimerProps | undefined) => {
        if (!timer || !timer.date || isNaN(timer.date.getTime())) {
            return <div>...</div>
        }

        if (timer.date <= new Date()) {
            return <div>Past time</div>
        }

        return <TimerItem key={0} timer={timer} />
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
