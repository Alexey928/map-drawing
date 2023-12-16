import React from 'react';
import {isIqualDate, useCalendar} from "./hooks/useCalendar";
import style from "./calendar.module.css"


type CalendarPropsType = {

    firstWeekDay:number
    locale?:string
    selectedDate:Date
    selectDate:(date:Date)=>void
}

const Calendar:React.FC<CalendarPropsType> = ({
    locale,
    selectDate,
    selectedDate,
    firstWeekDay,
                                              }) => {

const {state,methods}= useCalendar({selectedDate:selectedDate,firstWeekDay:firstWeekDay});
const {selectedMonth,calendarDays,mode,selectedYear,selectedDate:date,weekDayNames} = state;


    return (
        <div className={style.calendar}>
            <div className={style.calendar_header}>
                <span onClick={()=>methods.onClickArrow("left")} className={style.arrow_left}>{"<"}</span>
                {selectedMonth.monthName+" "}{selectedYear}
                <span onClick={()=>methods.onClickArrow("right")} className={style.arrowRight}>{">"}</span>
            </div>
            <div className={style.calendar_wraper}>
                {weekDayNames.map((days)=><div className={style.monthNames}>{days.dayShort}</div>)}
                {calendarDays.map((el,i)=>{
                    const isAdditionalDay = el.monthIndex == state.selectedMonth.monthIndex;
                    const isDayIqual = isIqualDate(el.date,date.date)

                    return(<div
                            key={i}
                            style={
                                isAdditionalDay?{backgroundColor:"#3bfc07",color:isDayIqual?"#020041":"white"}:
                                                {color:isDayIqual?"blue":"white"}
                               }
                                onClick={()=>{
                                    selectDate(el.date);
                                    methods.setSelectedDate(el)

                                }}
                                className={style.calendar_item}>{el.DayNumber}
                            </div>)
                })}
            </div>

        </div>
    );
};

export default Calendar;