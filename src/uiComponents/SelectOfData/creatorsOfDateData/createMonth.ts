import {createDate} from "./createDate";

interface creteMonthParamsType {
    date:Date;
    locale?:string
}
export const getDayCountOfMonth = (monthIndex:number,// count of days in month
                            yearNumber:number=new Date().getFullYear())=>{
    return new Date(yearNumber,monthIndex+1,0).getDate();//   "0"  in paramert Date() reterned to us ?count deys in  month
}

// 
export const createMonth = (params?:creteMonthParamsType)=>{
    const date = params?.date?? new Date;
    const locale =params?.locale??"default";

    const currentDate = createDate({date, locale});
    const {monthName,Year,monthNumber,monthIndex} =currentDate;

    const getDay = (dayNumber:number=1)=>{
        return createDate({date:new Date(Year,monthIndex,dayNumber),locale})
    }
    const createMonthDays =()=>{
        const days = [];
        for(let i=0;i<getDayCountOfMonth(monthIndex,Year);i++){
            days[i] = getDay(i+1);
        }
        return days;
    };

    return {
        getDay,
        createMonthDays,
        monthName,
        monthNumber,
        monthIndex,
        Year,
    }
};
