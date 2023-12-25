import React from 'react';
import {CultureType} from "../App";
import FieldParamsForm from "./Forms/FieldParamsForm";
import CulturesParamsForm from "./Forms/CulturesParamsForm";

interface PopupProps {
    onClose: () => void;
    setFieldParams:(id: string, name: string, squere: number) => void
    setCulture:(FieldID:string,name:string,sqere:number,collor:string)=>void;
    fieldCultures:CultureType;
    FieldID: string | undefined;

}
const FormPopup: React.FC<PopupProps> = ({onClose,FieldID,setFieldParams}) => {
    console.log(FieldID);
    return (
        <div className="popup">
            <button className="close-button" onClick={onClose}>
                X
            </button>
            <div style={{width: "93%", height: "99%", border: "1px solid #02092f", display: "flex", flexDirection: "column"}}
                >
                <FieldParamsForm name={""} sqere={""} setFieldParams={(name, squere)=>{setFieldParams(FieldID!,name,squere)}}/>
                <br/>
                <CulturesParamsForm/>
            </div>
        </div>
    );
};

export default FormPopup;