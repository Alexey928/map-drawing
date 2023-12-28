import React, { useEffect, useState, useRef } from 'react';
import style from "./select.module.css"

export interface Option {
    id:string
    colorName:string
    hex:string

}
interface SelectProps {

    name: string;
    options: Option[];
    onSelect?: (selectedValue: string) => void;
}
export interface sellectColbacSetingsType {
    fieldOfHash:string,
    fiedOfFormikcData:string,
    chooseFromRemaining:boolean
}

export const sellectColbac = (
                                  hash:{[key:string]:{[key:string]:string|number|null}},
                                  value:string,
                                  setings:{
                                      fieldOfHash:string,
                                      fiedOfFormikcData:string,
                                      chooseFromRemaining:boolean,
                                  },
                                 ):[string[],string,boolean] => {
    if(hash){
        const id:string[] = [];
        for(let el in hash){
            const hashElem = hash[el];
            const v = hashElem[setings.fieldOfHash];
            if(v){
                const flag = String(v).toLowerCase().startsWith(value.toLowerCase());
                if(flag) id.push(el);
            }
        }
        return [id,setings.fiedOfFormikcData,setings.chooseFromRemaining];
    }
    return [[],setings.fiedOfFormikcData,setings.chooseFromRemaining];
}

const SelectComponent: React.FC<SelectProps> = ({ options, onSelect, name ,}) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [active, setActive] = useState(false);
    const selectRef = useRef<HTMLDivElement | null>(null);// Ссылка на DOM-элемент селекта
    const handleSelectChange = (event: React.MouseEvent<HTMLLIElement>) => {
        console.log(event.currentTarget.innerText);
        setSelectedOption(event.currentTarget.innerText);
        setActive(!active);
        onSelect && onSelect(event.currentTarget.innerText)
    };
    console.log(selectedOption)
    useEffect(() => {
        // Добавляем обработчик события клика на документ
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                //но есть одна проблема обработчиков на событие будет столько, сколько селектов отрендорим
                setActive(false); // Закрываем тело селекта, если клик был за его пределами
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={selectRef} className={style.select}>
            <header onClick={() => setActive(!active)} className={style.selectHeader}>
                <span className={style.currentSelect}>{name}</span>
                <div className={style.selectIcon} style={{ transform: !active ? "rotate(90deg)" : "rotate(270deg)" }}>
                    {"➤"}
                </div>
            </header>
            <ul className={active ? style.selectBodyActive : style.selectBody}>
                {options.map((option, i) => (
                    <li
                        key={i}
                        onClick={handleSelectChange}
                        className={selectedOption === option.colorName ? style.selectItemActive : style.selectItem}>
                        {`${option.colorName}`}<div style={{width:20,height:20,backgroundColor:option.hex??"red",display:"inline-block"}}></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default SelectComponent;
