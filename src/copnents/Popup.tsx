import React from 'react';
import CalendarContainer from "../uiComponents/SelectOfData/CalendarContainer";
import {useFields} from "../Hooks/UseFields/useFields";
import {CultureType} from "../App";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import FieldParamsForm from "./Forms/FieldParamsForm";

interface PopupProps {
    onClose: () => void;
    setCulture:(FieldID:string,name:string,sqere:number,collor:string)=>void;
    fieldCultures:CultureType;
    FieldID: string | undefined;
}



const FormPopup: React.FC<PopupProps> = ({onClose,FieldID}) => {
    console.log(FieldID);

     return (
        <div className="popup">
            <button className="close-button" onClick={onClose}>
                X
            </button>
            <div
                style={{width: "93%", height: "99%", border: "1px solid red", display: "flex", flexDirection: "column"}}
                >
                <FieldParamsForm/>
                <br/>
                <span> культура <button onClick={(e)=>{e.preventDefault()}}>+</button> <input type="text"/></span>
                Подсолнух
                <div>
                    <span style={{display: "flex", width: 250, justifyContent: "space-around"}}><span>Уборка - </span><span><CalendarContainer
                        calback={() => {
                        }}/></span></span>
                </div>

            </div>
        </div>
    );
};

export default FormPopup;