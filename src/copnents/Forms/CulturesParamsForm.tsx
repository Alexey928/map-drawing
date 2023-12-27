import React, {useState} from 'react';
import style from "./formsStyle.module.css"
import {RegularEditableSpan} from "../../uiComponents/RgularEditinebalSpan/RegularEditableSpan";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import SelectComponent from "../../uiComponents/SelectComponent/Select";

const culturesDictionary  = {
    "1":"Кукуруза",
    "2":"Ячмень яровой",
    "3":"Ячмень озимый",
    "4":"Подсолнух",
    "5":"Люцерна",
    "6":"Рапс",

}
const plantVarieties = {
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
console.log(plantVarieties);

type CultureFieldPropsType ={
    cultureName:string
    sqere:string
    varietyOfCultureName:string
    collor:string

}
type cultureParamsPropsType = {
    setCultuteParam:(name:string,sqere:number,collor:string, variantyName:string)=>void

}

const CulturesParamsForm:React.FC<cultureParamsPropsType> = ({setCultuteParam}) => {
    const [isOpen,setIsOpen] = useState<boolean>(false);


    const[plaseholder,setPlaseholder] = useState(
        {
                sqere:"Введите S ",
                culture:"Введите название",
                varietyOfCultureName:"Введите название",
        },
    );
    const onSubmit: SubmitHandler<CultureFieldPropsType> = (data) => {
        console.log(data);
        //setCultuteParam();
    };
    const {handleSubmit, control} = useForm<CultureFieldPropsType>();

    return (
        <form  style={{backgroundColor:"#0f1526",borderBottomRightRadius:25,borderTopRightRadius:25}}>
            <header>
                Добавить культуру <input type={"checkbox"} checked={isOpen} onClick={()=>setIsOpen(!isOpen)}/>
                {isOpen&&<button type={"submit"} style={{marginLeft:125,backgroundColor:"#00041f",color:"#3aff02"}} onClick={(e)=>{e.preventDefault();setIsOpen(!isOpen)}}>+</button>}
            </header>
            <div className={`${style.cultureParamsFieldContainer} ${isOpen?style.containerOpen:""}`}>
              <span className={style.cultureParamsFieldItem}> Название -
                  <Controller
                      rules={{required:"Введите Название"}}
                      name="cultureName"
                      control={control}
                      render={({field:{onChange}}) =>
                          <RegularEditableSpan
                              placeholder={plaseholder.culture}
                              lang={"ru"}
                              type={"text"}
                              onChange={(newValue)=>{
                                  onChange(newValue);
                                  setPlaseholder({...plaseholder,culture: newValue ? newValue:"Введите название"})
                              }}
                          />
                      }
                  />
              </span>
                <span className={style.cultureParamsFieldItem}> Площадь - <span className={style.sgere}>
                     <Controller
                         name="sqere"
                         control={control}
                         render={({field:{onChange}}) =>
                             <RegularEditableSpan
                                 placeholder={plaseholder.sqere}
                                 type={"number"}
                                 onChange={(newValue)=>{
                                     onChange(newValue);
                                     setPlaseholder({...plaseholder,sqere: newValue ? newValue:"Введите площадь"})
                                 }}
                             />}
                     />
                </span></span>

                <span className={style.cultureParamsFieldItem}> Сорт-
               <Controller
                   name="varietyOfCultureName"
                   control={control}
                   render={({field:{onChange}}) =>
                       <RegularEditableSpan
                           placeholder={plaseholder.varietyOfCultureName}
                           type={"text"}
                           onChange={(newValue)=>{
                               onChange(newValue);
                               setPlaseholder({...plaseholder,varietyOfCultureName: newValue ? newValue:"Введите название"})
                           }}
                       />}
               />
              </span>
              <span className={style.cultureParamsFieldItem}> Цвет - <SelectComponent name={"выбрать"} options={[{value:"red"},{value:"blue"},{value:"yellow"}]}/></span>
            </div>

        </form>
    );
};
export default CulturesParamsForm;