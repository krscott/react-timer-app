import { parseDateString } from './timerdate'

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
})
