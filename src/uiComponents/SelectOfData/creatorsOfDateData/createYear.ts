import {createDate} from "./createDate";
import {createMonth} from "./createMonth";

interface createYearParametrs{
    year?:number,
    locale?:string,
    monthNumber?:number
}

const MONTH_COUNT = 12;

export const createYear = (params?:createYearParametrs) => {
    const locale = params?.locale??"default";

    const tuday = createDate();
    const year = params?.year??tuday.Year;
    const monthNumber = params?.monthNumber??tuday.monthNumber;

    const month = createMonth({date:new Date(year,monthNumber),locale:locale})

    const getMonthDays = (monthIndeex:number)=>{
        return createMonth({date:new Date(year,monthIndeex),locale}).createMonthDays();
    }

    const getYearMonthes = ()=>{
        const monthes = [];
        for(let i = 0; i < MONTH_COUNT; i++){
           monthes[i] = getMonthDays(i+1)
        }
        return monthes
    }
    return {
        getYearMonthes,
        month,
        year,
    }

}