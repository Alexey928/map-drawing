import React, {useState} from 'react';
import style from "./formsStyle.module.css"
import {RegularEditableSpan} from "../../uiComponents/RgularEditinebalSpan/RegularEditableSpan";

const culturesDictionary  = {
    "1":"Кукуруза",
    "2":"Ячмень яровой",
    "3":"Ячмень озимый",
    "4":"Подсолнух",
    "5":"Люцерна",
    "6":"Рапс",
}
const plantVariety = {
    "1":"Агрессор",
    "2":"Вымпел",
    "3":"Факел",
    "4":"Какаду",
    "5":"Дюпон",
    "6":"Фигаро",
    "7":"Фиолет",
    "8":"Файна",
    "9":"Фурор",
    "10":"Фарт",
    "11":"Флоу",
    "12":"Фрискис",
    "13":"Форос",
    "14":"Фундук",
    "15":"Фантан",
}

const CulturesParamsForm = () => {
    const [isOpen,setIsOpen] = useState<boolean>(false)
    return (
        <form>
            <header>
                Добавить культуру <input type={"checkbox"} checked={isOpen} onClick={()=>setIsOpen(!isOpen)}/>
                {isOpen&&<button style={{marginLeft:115,backgroundColor:"#00041f",color:"#3aff02"}} onClick={(e)=>{e.preventDefault();setIsOpen(!isOpen)}}>+</button>}
            </header>
            <div className={`${style.cultureParamsFieldContainer} ${isOpen?style.containerOpen:""}`}>
              <span className={style.cultureParamsFieldItem}> Название - <RegularEditableSpan hash={culturesDictionary} lang={"ru"} title={" "} mutable={false} type={"text"} /></span>
                <span className={style.cultureParamsFieldItem}> Площадь - <span className={style.sgere}>
                    <input type={"number"}/>
                </span></span>

              <span className={style.cultureParamsFieldItem}> Сорт- <RegularEditableSpan hash={plantVariety} lang={"ru"} title={" "} mutable={false} type={"text"} /></span>
              <span className={style.cultureParamsFieldItem}> Цвет - <input type={"color"}/></span>

            </div>
            <div style={{width:"100%", backgroundColor:"#4556e0",marginTop:10}}>Подсолнух (Агрессор) S = 100 Га  <div style={{width:20,height:20,backgroundColor:"red",display:"inline-block"}}></div></div>
            <div style={{width:"100%", backgroundColor:"#4556e0",marginTop:10}}>Кукуруза (Вымпел) S = 50 Га  <div style={{width:20,height:20,backgroundColor:"yellow",display:"inline-block"}}></div></div>
        </form>
    );
};


export default CulturesParamsForm;