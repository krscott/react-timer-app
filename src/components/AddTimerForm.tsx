import React, { useState, SyntheticEvent } from 'react'
import { parseDateString } from '../utils/timerdate'
import { TimerProps } from './TimerItem'
import './AddTimerForm.css'

interface AddTimerFormProps {
    onAddTimerItem: (props: TimerProps) => void
    onPreviewTimerItem: (props: TimerProps) => void
}

export const AddTimerForm: React.FC<AddTimerFormProps> = ({
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
