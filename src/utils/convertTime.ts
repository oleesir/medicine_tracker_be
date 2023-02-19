export const convertTime = (newTime: string) => {

    if (newTime === undefined) {
         return null;
    }

    const modifier = newTime.slice(-2)
    const time = newTime.slice(0,5)


    let [hours, minutes] = time.split(":");

    if (hours === "12") {
        hours = "00";
    }
    if (modifier  === "PM") {
        hours = (parseInt(hours, 10) + 12).toString();
    }

    return `${hours}:${minutes}`;
}