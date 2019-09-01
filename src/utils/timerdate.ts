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
