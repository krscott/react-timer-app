import { parseDateString, isValidDate, splitLabelDate } from './timerdate'

test('parseDateString()', () => {
    const time = (s: string) => new Date(s).getTime()

    const ref = new Date('2019-09-01 7:00 pm')

    // Bad formatting returns invalid date
    expect(parseDateString('', ref).getTime()).toBeNaN()

    // ISO dates
    expect(parseDateString('2019-09-01 5:00 pm', ref).getTime()).toBe(
        time('2019-09-01 5:00 pm')
    )
    expect(parseDateString('2019-09-01 3:00 am UTC+3', ref).getTime()).toBe(
        time('2019-09-01 3:00 am UTC+3')
    )

    // Custom date format
    expect(parseDateString('9/12 8pm', ref).getTime()).toBe(
        time('2019-09-12 8:00 pm')
    )
    expect(parseDateString('9/12', ref).getTime()).toBe(
        time('2019-09-12 00:00')
    )
    expect(parseDateString('9:30pm', ref).getTime()).toBe(
        time('2019-09-01 9:30 pm')
    )
    expect(parseDateString('10:05:56 PM', ref).getTime()).toBe(
        time('2019-09-01 10:05:56 pm')
    )
    expect(parseDateString('12PM', ref).getTime()).toBe(
        time('2019-09-01 12:00 pm')
    )
    expect(parseDateString('23:03', ref).getTime()).toBe(
        time('2019-09-01 11:03 pm')
    )
    expect(parseDateString('1/31/2020 12am', ref).getTime()).toBe(
        time('2020-01-31 12:00 am')
    )
    expect(parseDateString('2/29/2020 6:53:04 pm', ref).getTime()).toBe(
        time('2020-02-29 6:53:04 pm')
    )

    // Relative date format

    expect(parseDateString('20s', ref).getTime()).toBe(
        time('2019-09-01 7:00:20 pm')
    )
    expect(parseDateString('20m', ref).getTime()).toBe(
        time('2019-09-01 7:20 pm')
    )
    expect(parseDateString('1h', ref).getTime()).toBe(
        time('2019-09-01 8:00 pm')
    )
    expect(parseDateString('1d', ref).getTime()).toBe(
        time('2019-09-02 7:00 pm')
    )
    expect(parseDateString('1w', ref).getTime()).toBe(
        time('2019-09-08 7:00 pm')
    )
    expect(parseDateString('1y', ref).getTime()).toBe(
        time('2020-09-01 7:00 pm')
    )
    expect(parseDateString('1y2w 3d 4h5m 6s', ref).getTime()).toBe(
        time('2020-09-18 11:05:06 pm')
    )
})

test('isValidDate()', () => {
    expect(isValidDate(new Date(''))).toBe(false)
    expect(isValidDate(new Date('not a date'))).toBe(false)
    expect(isValidDate(new Date('2019-09-01 7:00 pm'))).toBe(true)
})

test('splitLabelDate()', () => {
    const ref = new Date('2019-09-01 7:00 pm')

    // Normal use cases
    expect(splitLabelDate('My Label 12pm', ref)[0]).toBe('My Label')
    expect(splitLabelDate('My Label 12pm', ref)[1].getTime()).toBe(
        parseDateString('12pm', ref).getTime()
    )
    expect(splitLabelDate('Do Something 5m', ref)[0]).toBe('Do Something')
    expect(splitLabelDate('Do Something 5m', ref)[1].getTime()).toBe(
        parseDateString('5m', ref).getTime()
    )

    // Edge cases: Only valid time is at end of string
    expect(splitLabelDate('5w at 12pm or in 5m do it 10m  ', ref)[0]).toBe(
        '5w at 12pm or in 5m do it'
    )
    expect(
        splitLabelDate('5w at 12pm or in 5m do it 10m  ', ref)[1].getTime()
    ).toBe(parseDateString('10m', ref).getTime())

    expect(splitLabelDate('5m blerg', ref)[0]).toBe('5m blerg')
    expect(splitLabelDate('5m blerg', ref)[1].getTime()).toBeNaN()

    // No label
    expect(splitLabelDate('12pm', ref)[0]).toBe('')
    expect(splitLabelDate('12pm', ref)[1].getTime()).toBe(
        parseDateString('12pm', ref).getTime()
    )

    // No date
    expect(splitLabelDate('No valid date string', ref)[0]).toBe(
        'No valid date string'
    )
    expect(splitLabelDate('No valid date string', ref)[1].getTime()).toBeNaN()
})
