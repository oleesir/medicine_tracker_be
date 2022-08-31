export const convertTime = (newTime: string) => {

    if (newTime === undefined) {
         return null;
    }
    const [time, modifier] = newTime.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
        hours = "00";
    }
    if (modifier === "PM") {
        hours = (parseInt(hours, 10) + 12).toString();
    }

    return `${hours}:${minutes}`;
}