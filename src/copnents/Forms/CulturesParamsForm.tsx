import React, {useState} from 'react';
import style from "./formsStyle.module.css"

const CulturesParamsForm = () => {
    const [isOpen,setIsOpen] = useState<boolean>(false)
    return (
        <form>
            <header>
                Добавить культуру <input type={"checkbox"} checked={isOpen} onClick={()=>setIsOpen(!isOpen)}/>
                <button onClick={(e)=>e.preventDefault()}>+</button>
            </header>
            <div className={`${style.cultureParamsFieldContainer} ${isOpen?style.containerOpen:""}`}>
              <span className={style.cultureParamsFieldItem}> название - <input type={"text"}/></span>
                <span className={style.cultureParamsFieldItem}> площадь - <span className={style.sgere}>
                    <input type={"number"}/>
                </span></span>
              <span className={style.cultureParamsFieldItem}> Цвет - <input type={"color"}/></span>
            </div>
        </form>
    );
};


export default CulturesParamsForm;