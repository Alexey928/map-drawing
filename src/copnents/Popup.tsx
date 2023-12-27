import React from 'react';
import {CultureType} from "../App";
import FieldParamsForm from "./Forms/FieldParamsForm";
import CulturesParamsForm from "./Forms/CulturesParamsForm";

interface PopupProps {
    onClose: () => void;
    setFieldParams:(id: string, name: string, squere: number) => void
    setCulture:(FieldID:string,name:string,sqere:number,collor:string, variantyName:string)=>void;
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
                <div style={{width: "93%",  border: "1px solid #02092f", display: "flex", flexDirection: "column"}}
                >
                    <FieldParamsForm name={""} sqere={""} setFieldParams={(name, squere)=>{setFieldParams(FieldID!,name,squere)}}/>
                    <br/>
                    <CulturesParamsForm setCultuteParam={(name:string,sqere:number,collor:string, variantyName:string)=>{}}/>
                </div>
                <div style={{width:"100%", backgroundColor:"#4556e0",marginTop:10}}>Подсолнух (Агрессор) S = 100 Га  <div style={{width:20,height:20,backgroundColor:"red",display:"inline-block"}}></div></div>
                <div style={{width:"100%", backgroundColor:"#4556e0",marginTop:10}}>Кукуруза (Вымпел) S = 50 Га  <div style={{width:20,height:20,backgroundColor:"yellow",display:"inline-block"}}></div></div>
            </div>



    );
};

export default FormPopup;