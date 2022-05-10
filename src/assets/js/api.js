export function getNowTime() {
    let time = new Date().getTime();
    let date = new Date(time);
    let HG = '-';
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let days = date.getDate();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (days >= 0 && days <= 9) {
        days = "0" + days;
    }

    let NowDate = year + HG + month + HG + days;
    return NowDate;
}

export function getLestWeekTime() {
    let time = new Date().getTime()-24*60*60*1000*30;
    let date = new Date(time);
    let HG = '-';
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let days = date.getDate();



    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (days >= 0 && days <= 9) {
        days = "0" + days;
    }

    let NowDate = year + HG + month + HG + days;
    return NowDate;
}


export function getNowTimeS() {
    let date = new Date();
    let HG = '-';
    let MH = ":";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let days = date.getDate();
    let Hours = date.getHours();
    let Minutes = date.getMinutes();
    let Seconds = date.getSeconds();


    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (days >= 0 && days <= 9) {
        days = "0" + days;
    }
    if (Hours >= 1 && Hours <= 9) {
        Hours = "0" + Hours;
    }
    if (Minutes >= 1 && Minutes <= 9) {
        Minutes = "0" + Minutes;
    }
    if (Seconds >= 1 && Seconds <= 9) {
        Seconds = "0" + Seconds;
    }

    return year + HG + month + HG + days + HG + Hours + MH + Minutes + MH + Seconds;
}



