export function formatDate(dateTimeString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC'
    };
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleString('ru-RU', options);

    return formattedDate;
}

export function formatRelativeTime(dateTimeString) {
    const date = Date.parse(dateTimeString);
    const currentDate = Date.now();
    const elapsed = currentDate - date;

    switch (true) {
        case elapsed < 1000:
            return "только что";
        case elapsed < 60 * 1000:
            const seconds = Math.floor(elapsed / 1000);
            return `${seconds} ${declension(seconds, ["секунду", "секунды", "секунд"])} назад`;
        case elapsed < 60 * 60 * 1000:
            const minutes = Math.floor(elapsed / (60 * 1000));
            return `${minutes} ${declension(minutes, ["минуту", "минуты", "минут"])} назад`;
        case elapsed < 24 * 60 * 60 * 1000:
            const hours = Math.floor(elapsed / (60 * 60 * 1000));
            return `${hours} ${declension(hours, ["час", "часа", "часов"])} назад`;
        default:
            const days = Math.floor(elapsed / (24 * 60 * 60 * 1000));
            return `${days} ${declension(days, ["день", "дня", "дней"])} назад`;
    }

}

function declension(count, forms) {
    const cases = [2, 0, 1, 1, 1, 2];
    const index = (count % 100 > 4 && count % 100 < 20) ?
        2 :
        cases[(count % 10 < 5) ? count % 10 : 5];

    return forms[index];
}