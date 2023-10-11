import moment from 'moment';

export const handleTimer = (time) => {
    const duration = moment.duration(time, 'second');
    const hours = duration.hours();
    const minutes = duration.minutes();
    return `${hours} giờ ${minutes} phút`;
};
