import Moment from "moment/moment";

export const formatDate = (date) => {
    const today = Moment().startOf('day');
    const yesterday = Moment().subtract(1, 'days').startOf('day');
    const inputDate = Moment(date);

    if (today.isSame(inputDate, 'day')) {
        return 'Today, ' + inputDate.format('HH:mm');;
    } else if (yesterday.isSame(inputDate, 'day')) {
        return 'Yesterday, ' + inputDate.format('HH:mm');
    } else {
        return inputDate.format('DD.MM.YYYY, HH:mm');
    }
}
