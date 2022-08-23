export function displayDate(data) {
    const date = new Date(parseInt(data));
    const dateNow = new Date();

    const yearDif = dateNow.getFullYear() - date.getFullYear();

    if (yearDif === 0) {
        const dayDif = dateNow.getDate() - date.getDate();
        if (dayDif === 0) {
            const hourDif = dateNow.getHours() - date.getHours();
            if (hourDif === 0) {
                const minDif = dateNow.getMinutes() - date.getMinutes();

                if (minDif >= 0 && minDif < 5) return "1 хвилину тому";
                if (minDif >= 5 && minDif < 10) return "5 хвилин тому";
                if (minDif >= 10 && minDif < 30) {
                    return " 10 хвилин тому";
                }
                return " 30 хвилин тому";
            }
            return `${date.getHours()} : ${date.getMinutes()}`;
        }
        return ` ${date.getDate()} ${date.toLocaleString("default", {
            month: "long"
        })}`;
    }
    return ` ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}
