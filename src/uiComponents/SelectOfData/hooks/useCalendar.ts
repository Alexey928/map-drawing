import {useMemo, useState} from "react";
import {createDate} from "../creatorsOfDateData/createDate";
import {createMonth, getDayCountOfMonth} from "../creatorsOfDateData/createMonth";

interface usecalendarParams{
    locale?:string
    selectedDate:Date
    firstWeekDay:number
}
const getYearsInterval = (year:number)=>{
    const startYear = Math.floor(year/10)*10;
    return [...Array(10)].map((_,index) =>  (startYear + index));
};

export const useCalendar = ({locale,selectedDate:date,firstWeekDay}:usecalendarParams)=>{
    const [mode,setMode] = useState<"day"|"month>"|"years">("day");// in progress
    const [selectedDate,setSelectedDate] = useState(createDate({date}));
    const [selectedMonth, setSelectedMonth] = useState(createMonth({date:new Date(selectedDate.Year,selectedDate.monthIndex)}));
    const [selectedYear, setSelectedYear] = useState(selectedDate.Year);
    const [selectedYearInterval, setselectedYearInterval] = useState(getYearsInterval(selectedYear))
    const monthNames = useMemo(()=>getMonthNames(locale),[]);
    const weekDayNames = useMemo(()=>getDayNamesInWeek(firstWeekDay,locale),[]);

    const days = useMemo(()=>selectedMonth.createMonthDays(),[selectedMonth,selectedYear])

    const calendarDays = useMemo(()=>{
        const monthNumberOfDay = getDayCountOfMonth(selectedMonth.monthIndex,selectedYear);

        const previusMonthDasys = createMonth({locale, date:new Date(selectedYear,selectedMonth.monthIndex-1)}
                                            ).createMonthDays();
        const nextMonthDasys = createMonth({locale, date:new Date(selectedYear,selectedMonth.monthIndex+1)}
                                            ).createMonthDays();
        const firstsDay = days[0];
        const lastDay = days[monthNumberOfDay-1];

        const shiftIndex = firstWeekDay-1;// don't use yet???????
        const numberOfPrevisDays = firstsDay.dayNumberInWeek - 1 - shiftIndex < 0
            ? 7 - (firstWeekDay - firstsDay.dayNumberInWeek)
            : firstsDay.dayNumberInWeek - 1 - shiftIndex;

        const numberOflastDays = 7 - lastDay.dayNumberInWeek + shiftIndex > 6
            ? 7 - lastDay.dayNumberInWeek-(7-shiftIndex)
            : 7- lastDay.dayNumberInWeek +shiftIndex;
        const totalCalendarDay =  days.length +numberOfPrevisDays+numberOflastDays;

        const result = []

        for (let i = 0; i < numberOfPrevisDays; i++){

            const inverted = numberOfPrevisDays-i;
            result[i] = previusMonthDasys[previusMonthDasys.length-inverted];

        }
        for (let i=numberOfPrevisDays; i<totalCalendarDay-numberOflastDays; i++){
            result[i] = days[i-numberOfPrevisDays];
        }
        for (let i=totalCalendarDay-numberOflastDays; i<totalCalendarDay; i++){
            result[i] = nextMonthDasys[i-totalCalendarDay+numberOflastDays];
        }
        return result
    },[
        selectedYear,
        selectedMonth.monthIndex,
        selectedMonth.Year
    ])
    const onClickArrow = ( derection:"right"|"left" )=>{
         const monthIndex = derection === "left" ? selectedMonth.monthIndex-1 : selectedMonth.monthIndex+1;
         if(monthIndex===-1){
             const year = selectedYear-1;
             setSelectedYear(year)
             if(!selectedYearInterval.includes(year)) setselectedYearInterval(getYearsInterval(year));
             return setSelectedMonth(createMonth({date:new Date(year,11),locale}))
         }
        if(monthIndex===12){
            const year = selectedYear+1;
            setSelectedYear(year)
            if(!selectedYearInterval.includes(year)) setselectedYearInterval(getYearsInterval(year));
            return setSelectedMonth(createMonth({date:new Date(year,0),locale}))
        }

        return setSelectedMonth(createMonth({date:new Date(selectedYear,monthIndex),locale}));
    }



    return {
        state:{
            calendarDays,
            selectedYearInterval,
            mode,
            days,
            selectedDate,
            selectedMonth,
            selectedYear,
            monthNames,
            weekDayNames,
        },
        methods:{
            setSelectedDate,
            onClickArrow,
        }
    }
}
// helper functions _____________________________________
const getMonthNames = (locale:string="default")=>{
    const montNames:{
        month:ReturnType<typeof createDate>["monthName"];
        monthShort:ReturnType<typeof createDate>["monthShort"];//interesting method for typing of Array
        monthIndex:ReturnType<typeof createDate>["monthIndex"];
    }[] = Array.from({length:12});

    const d = new Date();

    montNames.forEach((el,i)=>{
        const {monthName,monthIndex,monthShort,date } = createDate({
        locale,
        date:new Date(d.getFullYear(),d.getMonth()+i,d.getDate())
        });
        const ff = d.getMonth()
        montNames[monthIndex]={month:monthName,monthIndex,monthShort,};

    })
    return montNames;
}

const getDayNamesInWeek = ( firstWeekDay:number = 2, locale:string="default")=>{
    const weekDaysNames:{
        day:ReturnType<typeof createDate>["day"]
        dayShort: ReturnType<typeof createDate>["dayShort"]
    }[] = Array.from({length:7})

    const d = new Date();

    weekDaysNames.forEach((_,i)=>{
        const{day,dayNumberInWeek,dayShort}=createDate({locale,date:new Date(d.getFullYear(),d.getMonth(),d.getDate()+i)});
        weekDaysNames[dayNumberInWeek-1]={day,dayShort}
    });
    return [...weekDaysNames.slice(firstWeekDay-1),...weekDaysNames.slice(0,firstWeekDay-1)];
}
export const formativeDate = (date:Date,format:string):string=>{
    const d = createDate({date});
    return format.replace(/\bYYYY\b/,d.Year.toString())
                 .replace(/\bDD\b/,d.DayNumber.toString())
                 .replace(/\bMM\b/, d.monthNumber.toString())
}
export const isIqualDate = (date1:Date,date2:Date)=>{
    return  date1.getFullYear()===date2.getFullYear()&&
            date1.getMonth()===date2.getMonth()&&
            date1.getDate()===date2.getDate();
}
export const firstIsSmallerOfSecondDate = (date_1:Date, date_2:Date):boolean=>{
    let yearFlag = false;
    let monthFlag = false;
    if (date_1.getFullYear() < date_2.getFullYear()) {
        return true
    }
    else if (date_1.getFullYear() >= date_2.getFullYear()){
        yearFlag =!yearFlag
    }
    if(yearFlag){
        if( date_1.getFullYear() === date_2.getFullYear()){
            if(date_1.getMonth() < date_2.getMonth()){
                return true;
            }else if(date_1.getMonth() >= date_2.getMonth()){
                monthFlag = !monthFlag
            }
        }
    }
    if(monthFlag && yearFlag){
       if(date_1.getMonth() === date_2.getMonth() && date_1.getFullYear() === date_2.getFullYear()){
           return date_1.getDate() < date_2.getDate()
       }
        return false
    }
    return false
}