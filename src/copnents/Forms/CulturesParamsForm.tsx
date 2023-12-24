import React, {useState} from 'react';
import style from "./formsStyle.module.css"

const CulturesParamsForm = () => {
    const [isOpen,setIsOpen] = useState<boolean>(false)
    return (
        <form>
            <header>
                Добавить культуру <input type={"checkbox"} checked={isOpen} onClick={()=>setIsOpen(!isOpen)}/>
                {isOpen&&<button style={{marginLeft:115,backgroundColor:"#00041f",color:"#3aff02"}} onClick={(e)=>{e.preventDefault();setIsOpen(!isOpen)}}>+</button>}
            </header>
            <div className={`${style.cultureParamsFieldContainer} ${isOpen?style.containerOpen:""}`}>
              <span className={style.cultureParamsFieldItem}> Название - <input type={"text"}/></span>
                <span className={style.cultureParamsFieldItem}> Площадь - <span className={style.sgere}>
                    <input type={"number"}/>
                </span></span>

              <span className={style.cultureParamsFieldItem}> Сорт- <input type={"text"}/></span>
              <span className={style.cultureParamsFieldItem}> Цвет - <input type={"color"}/></span>

            </div>
            <div style={{width:"100%", backgroundColor:"#4556e0",marginTop:10}}>Подсолнух (Агрессор) S = 100 Га  <div style={{width:20,height:20,backgroundColor:"red",display:"inline-block"}}></div></div>
            <div style={{width:"100%", backgroundColor:"#4556e0",marginTop:10}}>Кукуруза (Вымпел) S = 50 Га  <div style={{width:20,height:20,backgroundColor:"yellow",display:"inline-block"}}></div></div>
        </form>
    );
};


export default CulturesParamsForm;