

interface CreateDateparams {
 locale?:string//"usa","uk","gb"....
 date:Date
}

type autputType = {
    monthName:string
    monthShort:string
    monthIndex:number
    monthNumber:number
    timeStamp:number
    WeekNumberInMonts:number
    dayShort:string
    YearShort:string
    locale:string|undefined
    date:Date
    DayNumber:number
    day:string
    dayNumberInWeek:number
    Year:number

}


const getWeekNumber = (date:Date)=>{
    const firstDateOfYear = new Date(date.getFullYear(),0,1);
    const lastDayOfYear = (date.getTime() - firstDateOfYear.getTime())/864000000
    return (lastDayOfYear + firstDateOfYear.getDay()+1)/7;
}

export const createDate = (params?:CreateDateparams):autputType=>{
    const locale= params?params.locale:"default";
    const date = params?params.date : new Date();
    //______basis Data ______________________________________________
    const monthName  = date.toLocaleDateString(locale,{month:"long"});
    const monthShort = date.toLocaleDateString(locale,{month:"short"})
    const DayNumber  = date.getDate();
    const day = date.toLocaleDateString(locale,{weekday:"long"});
    const dayShort = date.toLocaleDateString(locale,{weekday:"short"});
    const dayNumberInWeek = date.getDay()+1;
    const monthNumber = date.getMonth()+1;
    const monthIndex = date.getMonth();
    const Year= date.getFullYear();
    const YearShort = date.toLocaleDateString(locale,{year:"2-digit"});
    const WeekNumberInMonts  = Math.ceil(getWeekNumber(date));
    const timeStamp = date.getTime();



     return {
        monthName,
        monthShort,
        monthIndex,
        monthNumber,
        timeStamp,
        WeekNumberInMonts,
        dayShort,
        YearShort,
        locale,
        date,
        DayNumber,
        day,
        dayNumberInWeek,
        Year,
     }
}
