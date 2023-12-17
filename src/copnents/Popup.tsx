import React from 'react';
import CalendarContainer from "../uiComponents/SelectOfData/CalendarContainer";
interface PopupProps {
    onClose: () => void;
}

const FormPopup: React.FC<PopupProps> = ({onClose}) => {
    return (
        <div className="popup">
            <button className="close-button" onClick={onClose}>
                X
            </button>
            <form
                style={{width: "93%", height: "99%", border: "1px solid red", display: "flex", flexDirection: "column"}}
                action="">
               <span>Цвет поля -
                   <input style={{width: 35, borderRadius: 10}} type="color" onBlur={() => {
                       console.log("color selected!")
                   }}/>
                   <span>  Нзавание-  <input type="text"/></span>
               </span>
                <br/>
                <span> культура <button onClick={(e)=>{e.preventDefault()}}>+</button> <input type="text"/></span>
                Подсолнух
                <div>
                    <span style={{display: "flex", width: 250, justifyContent: "space-around"}}><span>Уборка - </span><span><CalendarContainer
                        calback={() => {
                        }}/></span></span>
                </div>

            </form>
        </div>
    );
};

export default FormPopup;