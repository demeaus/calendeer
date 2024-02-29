/**
 * 
 * @param Date string
 * @returns Object of formatted date and time strings
 */
export function formatDate(date) {
    const formattedDate = new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
    }).format(new Date(date))

    const formattedTime = new Intl.DateTimeFormat("en", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date))

    return { date: formattedDate, time: formattedTime }
}