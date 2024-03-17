import moment from "moment"

export const getExpiryDate = (hours: number) => {
    const currentDate = moment();
    const expiryTime = currentDate.add(hours, 'hours');
    return expiryTime.toDate();
}