import moment from "moment";

export const createRange = (start, end) => {
    let dates = [];
    let currentDate = moment(start);

    while (currentDate <= moment(end)) {
        dates.push(new Date(currentDate.format('YYYY-MM-DD')));
        currentDate.add(1, 'days');
    }

    return dates;
};