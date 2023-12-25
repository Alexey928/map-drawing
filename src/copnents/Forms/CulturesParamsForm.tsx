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
const realPlantVarieties = {
    "1": "Агрессор",
    "2": "Вымпел",
    "3": "Никита",
    "4": "Альфа",
    "5": "Бета",
    "6": "Гамма",
    "7": "Дельта",
    "8": "Эпсилон",
    "9": "Зета",
    "10": "Иота",
    "11": "Каппа",
    "12": "Лямбда",
    "13": "Мю",
    "14": "Ню",
    "15": "Кси",
    "16": "Омикрон",
    "17": "Пи",
    "18": "Ро",
    "19": "Сигма",
    "20": "Тау",
    "21": "Чета",
    "22": "Йота",
    "23": "Микро",
    "24": "Титан",
    "25": "Орион",
    "26": "Дельфин",
    "27": "Аквилон",
    "28": "Тритон",
    "29": "Центавр",
    "30": "Аполлон",
    // Добавьте еще реальных названий, если необходимо
};

console.log(realPlantVarieties);


const CulturesParamsForm = () => {
    const [isOpen,setIsOpen] = useState<boolean>(false)
    return (
        <form>
            <header>
                Добавить культуру <input type={"checkbox"} checked={isOpen} onClick={()=>setIsOpen(!isOpen)}/>
                {isOpen&&<button style={{marginLeft:125,backgroundColor:"#00041f",color:"#3aff02"}} onClick={(e)=>{e.preventDefault();setIsOpen(!isOpen)}}>+</button>}
            </header>
            <div className={`${style.cultureParamsFieldContainer} ${isOpen?style.containerOpen:""}`}>
              <span className={style.cultureParamsFieldItem}> Название - <RegularEditableSpan onChange={()=>{}} hash={culturesDictionary} lang={"ru"}   type={"text"} /></span>
                <span className={style.cultureParamsFieldItem}> Площадь - <span className={style.sgere}>
                    <input type={"number"}/>
                </span></span>

              <span className={style.cultureParamsFieldItem}> Сорт- <RegularEditableSpan onChange={()=>{}} hash={realPlantVarieties} lang={"ru"} type={"text"} /></span>
              <span className={style.cultureParamsFieldItem}> Цвет - <input type={"color"}/></span>

            </div>
            <div style={{width:"100%", backgroundColor:"#4556e0",marginTop:10}}>Подсолнух (Агрессор) S = 100 Га  <div style={{width:20,height:20,backgroundColor:"red",display:"inline-block"}}></div></div>
            <div style={{width:"100%", backgroundColor:"#4556e0",marginTop:10}}>Кукуруза (Вымпел) S = 50 Га  <div style={{width:20,height:20,backgroundColor:"yellow",display:"inline-block"}}></div></div>
        </form>
    );
};


export default CulturesParamsForm;