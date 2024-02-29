export function formatDate(date) {
    const formattedDate = new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
    }).format(date)

    const formattedTime = new Intl.DateTimeFormat("en", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(date)

    return { date: formattedDate, time: formattedTime }
}