export function formatDate(dateString) {
    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];

    const [year, month, day] = dateString.split('-');
    const formattedDate = `${parseInt(day)} ${months[parseInt(month) - 1]} ${parseInt(year)} года`;

    return formattedDate;
}

export function formatDateTime(dateTimeString) {
    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];

    const date = new Date(dateTimeString);
    date.setHours(date.getHours() + 3);

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

    const formattedDateTime = ` ${day} ${month} ${year} года в ${hours}:${minutes}`;

    return formattedDateTime;
}