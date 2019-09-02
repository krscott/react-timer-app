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
    console.log('==============')
    console.log(input)

    // If input is valid ISO date, parse directly
    const isoDate = new Date(input)
    if (!isNaN(isoDate.getTime())) {
        return isoDate
    }

    // Check for common date format (e.g. '9/2/2019 6:54:02 pm')
    const absDateMatch = input.match(
        /^\s*(?:(\d{1,2})[/-](\d{1,2})(?:[/-](\d{4}))?\s+)?(\d{1,2})(?::(\d{2})(?::(\d{2}))?)?\s*(?:([ap])m?)?\s*$/i
    )

    if (absDateMatch) {
        console.log(absDateMatch)

        const [
            ,
            monthStr,
            dayStr,
            yearStr,
            hourStr,
            minStr,
            secStr,
            ampm,
        ] = absDateMatch

        const [ month, day, year, hour, min, sec ] = [
            monthStr,
            dayStr,
            yearStr,
            hourStr,
            minStr,
            secStr,
        ].map((s) => parseInt(s))

        console.log({
            monthStr,
            dayStr,
            yearStr,
            hourStr,
            minStr,
            secStr,
            ampm,
        })
        console.log({ month, day, year, hour, min, sec, ampm })

        if (day !== undefined || hour != undefined) {
            const out = new Date(reference.getTime())

            if (!isNaN(year)) {
                out.setFullYear(year)
            }
            if (!isNaN(month)) {
                out.setMonth(month - 1)
            }
            if (!isNaN(day)) {
                out.setDate(day)
            }
            if (!isNaN(hour)) {
                if (ampm === 'a' || ampm === 'A') {
                    out.setHours(hour === 12 ? 0 : hour)
                } else if (ampm === 'p' || ampm === 'P') {
                    out.setHours(hour === 12 ? 12 : hour + 12)
                } else {
                    out.setHours(hour)
                }
            }
            if (!isNaN(min)) {
                out.setMinutes(min)
            }
            if (!isNaN(sec)) {
                out.setSeconds(sec)
            }

            console.log(out.toUTCString())

            if (!isNaN(out.getTime())) {
                return out
            }
        }
    }

    // Check for relative date format (e.g. '1y 5w 2d 3h 45m 20s')
    const relDateMatch = input.match(
        /^\s*(?:(-?\d+)y\s*)?(?:(-?\d+)w\s*)?(?:(-?\d+)d\s*)?(?:(-?\d+)h\s*)?(?:(-?\d+)m\s*)?(?:(-?\d+)s\s*)?$/i
    )

    if (relDateMatch) {
        console.log(relDateMatch)

        const [
            ,
            yearsStr,
            weeksStr,
            daysStr,
            hoursStr,
            minsStr,
            secsStr,
        ] = relDateMatch

        const [ years, weeks, days, hours, mins, secs ] = [
            yearsStr,
            weeksStr,
            daysStr,
            hoursStr,
            minsStr,
            secsStr,
        ].map((s) => parseInt(s))

        console.log({ years, weeks, days, hours, mins, secs })

        if ([ years, weeks, days, hours, mins, secs ].some((x) => !isNaN(x))) {
            const out = new Date(reference.getTime())

            if (!isNaN(years)) {
                out.setFullYear(out.getFullYear() + years)
            }
            if (!isNaN(weeks)) {
                out.setDate(out.getDate() + weeks * 7)
            }
            if (!isNaN(days)) {
                out.setDate(out.getDate() + days)
            }
            if (!isNaN(hours)) {
                out.setHours(out.getHours() + hours)
            }
            if (!isNaN(mins)) {
                out.setMinutes(out.getMinutes() + mins)
            }
            if (!isNaN(secs)) {
                out.setSeconds(out.getSeconds() + secs)
            }

            console.log(out.toUTCString())

            if (!isNaN(out.getTime())) {
                return out
            }
        }
    }

    // Return invalid date
    return new Date('')
}
