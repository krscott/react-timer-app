import React, { useState, SyntheticEvent } from 'react'
import { parseDateString, splitLabelDate } from '../utils/timerdate'
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
    const [ formInput, setFormInput ] = useState('')

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault()

        const [ name, date ] = splitLabelDate(formInput)

        onAddTimerItem({
            id: Math.random(),
            name,
            date,
        })

        setFormInput('')

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
                className="AddTimerFormInput"
                placeholder="Go to bed 10pm"
                value={formInput}
                onChange={(e) => {
                    setFormInput(e.target.value)
                    const [ name, date ] = splitLabelDate(e.target.value)
                    onPreviewTimerItem({
                        id: 0,
                        name,
                        date,
                    })
                }}
            />
            <input className="AddTimerFormSubmit" type="submit" value="✓" />
        </form>
    )
}
