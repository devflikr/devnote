import moment from "moment";

function formatDateOrTime(date: Date) {
    const today = moment().startOf('day');
    const inputDate = moment(date);

    if (inputDate.isSame(today, 'day')) {
        return inputDate.format('h:mm A');
    } else {
        return inputDate.format('MMM D, YYYY');
    }
}

export default formatDateOrTime;