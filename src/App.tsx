import React, { useState, SyntheticEvent } from 'react'
import './App.css'

const defaultDate = () => {
    const date = new Date()
    date.setMinutes(date.getMinutes() + 30)
    return date
}

const defaultDateString = () => {
    const date = defaultDate()
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    return `${year}-${month}-${day}`
}

const defaultTimeString = () => {
    const date = defaultDate()
    const h = ('0' + date.getHours()).slice(-2)
    const m = ('0' + 5 * Math.round(date.getMinutes() / 5)).slice(-2)
    const s = '00'

    return `${h}:${m}:${s}`
}

const timeUntilDate = (date: Date) => {
    const diffSeconds = (date.getTime() - new Date().getTime()) / 1000

    const days = Math.floor(diffSeconds / (60 * 60 * 24))
    const hours = Math.floor((diffSeconds % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((diffSeconds % (60 * 60)) / 60)
    const seconds = Math.floor(diffSeconds % 60)

    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m ${seconds}s`
    }
    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`
    }
    if (minutes > 0) {
        return `${minutes}m ${seconds}s`
    }
    if (seconds > 0) {
        return `${seconds}s`
    }

    return `Done!`
}

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
}

const AddTimerForm: React.FC<AddTimerFormProps> = ({ onAddTimerItem }) => {
    const [ name, setName ] = useState('')
    const [ day, setDay ] = useState(defaultDateString())
    const [ time, setTime ] = useState(defaultTimeString())

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault()

        onAddTimerItem({
            id: Math.random(),
            name: name ? name : 'Timer',
            date: new Date(`${day} ${time}`),
        })

        return false
    }

    return (
        <form className="AddTimerForm" onSubmit={onSubmit}>
            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="date"
                value={day}
                onChange={(e) => setDay(e.target.value)}
            />
            <input
                type="time"
                step="1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            <input type="submit" value="✓" />
        </form>
    )
}

const TimerList: React.FC = () => {
    const [ timers, setTimers ] = useState<TimerProps[]>([])

    const addTimer = (newTimer: TimerProps) => {
        console.log(newTimer)
        setTimers([ ...timers, newTimer ])
    }

    return (
        <div className="TimerList">
            <AddTimerForm onAddTimerItem={addTimer} />
            {timers.map((timer) => <TimerItem key={timer.id} timer={timer} />)}
        </div>
    )
}

const App: React.FC = () => {
    return (
        <main className="App">
            <TimerList />
        </main>
    )
}

export default App
