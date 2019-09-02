export const defaultDate = () => {
    const date = new Date()
    date.setMinutes(date.getMinutes() + 30)
    return date
}

export const defaultDateString = () => {
    const date = defaultDate()
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    return `${year}-${month}-${day}`
}

export const defaultTimeString = () => {
    const date = defaultDate()
    const h = ('0' + date.getHours()).slice(-2)
    const m = ('0' + 5 * Math.round(date.getMinutes() / 5)).slice(-2)
    const s = '00'

    return `${h}:${m}:${s}`
}

export const timeUntilDate = (date: Date) => {
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

export const parseDateString = (
    input: string,
    reference: Date = new Date()
) => {
    // If input is valid ISO date, parse directly
    const isoDate = new Date(input)
    if (!isNaN(isoDate.getTime())) {
        return isoDate
    }

    const absDateMatch = input.match(
        /(\d{1,2})[/-](\d{1,2})\s+(\d{1,2})\s*([ap])m?/
    )

    if (absDateMatch) {
        console.log(input)
        console.log(absDateMatch)

        const [ , monthStr, dayStr, hourStr, ampm ] = absDateMatch

        const month = parseInt(monthStr)
        const day = parseInt(dayStr)
        const hour = parseInt(hourStr)

        console.log({ month, day, hour, ampm })

        const out = new Date(reference.getTime())
        if (!isNaN(month)) {
            out.setMonth(month - 1)
        }
        if (!isNaN(day)) {
            out.setDate(day)
        }
        if (!isNaN(hour)) {
            if (ampm === 'a') {
                out.setHours(hour === 12 ? 0 : hour)
            } else if (ampm === 'p') {
                out.setHours(hour + 12)
            } else {
                out.setHours(hour)
            }
        }

        console.log(out.toUTCString())
        return out
    }

    // Return invalid date
    return new Date('')
}
