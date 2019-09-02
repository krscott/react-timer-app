import React, { useState, SyntheticEvent } from 'react'
import {
    timeUntilDate,
    defaultDateString,
    defaultTimeString,
    parseDateString,
} from '../utils/timerdate'
import './TimerList.css'

interface TimerProps {
    id: number
    name: string
    date: Date
}

interface TimerItemProps {
    timer: TimerProps
}

const TimerItem: React.FC<TimerItemProps> = ({ timer }) => {
    return (
        <div className="TimerItem">
            <span>{timer.name} </span>
            <span>{timeUntilDate(timer.date)}</span>
        </div>
    )
}

interface AddTimerFormProps {
    onAddTimerItem: (props: TimerProps) => void
    onPreviewTimerItem: (props: TimerProps) => void
}

const AddTimerForm: React.FC<AddTimerFormProps> = ({
    onAddTimerItem,
    onPreviewTimerItem,
}) => {
    const [ nameInput, setNameInput ] = useState('')
    const [ timeInput, setTimeInput ] = useState('')
    // const [ day, setDay ] = useState(defaultDateString())
    // const [ time, setTime ] = useState(defaultTimeString())

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault()

        onAddTimerItem({
            id: Math.random(),
            name: nameInput ? nameInput : 'Timer',
            date: parseDateString(timeInput),
        })

        setNameInput('')
        setTimeInput('')

        onPreviewTimerItem({
            id: 0,
            name: '',
            date: parseDateString(''),
        })

        return false
    }

    return (
        <form className="AddTimerForm" onSubmit={onSubmit}>
            <input
                className="AddTimerFormName"
                placeholder="Name"
                value={nameInput}
                onChange={(e) => {
                    setNameInput(e.target.value)
                    onPreviewTimerItem({
                        id: 0,
                        name: e.target.value,
                        date: parseDateString(timeInput),
                    })
                }}
            />
            <input
                className="AddTimerFormTime"
                placeholder="9/1 12pm"
                value={timeInput}
                onChange={(e) => {
                    setTimeInput(e.target.value)
                    onPreviewTimerItem({
                        id: 0,
                        name: nameInput,
                        date: parseDateString(e.target.value),
                    })
                }}
            />
            <input className="AddTimerFormSubmit" type="submit" value="✓" />
        </form>
    )
}

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
