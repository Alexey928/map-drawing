import React, {createRef, useEffect, useId, useRef, useState} from 'react';
import {Circle, FeatureGroup, MapContainer, Marker, Polygon, Popup, TileLayer, useMapEvents} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { LatLng, LatLngExpression} from "leaflet";
import CalendarContainer from "./uiComponents/SelectOfData/CalendarContainer";
import {v4 as uuidv4} from 'uuid';

type PositionType = {
    lat: number,
    lng: number

}
type MowingTheCropTaskType = {
    status: "isDone" | "inProgres"
    type: "MOWING-THE-CROP"
    startDate: Date
    endDate: Date
}
type SprayingTaskType = {
    type: "SPRAYING"
}
type SoilWorksTaskType = {
    type: "SOIL-WORKS"
}
type FertilizationTasksType = {
    type:"FERTILZATION"
}

type FieldType = {
    id: string;
    trajectory: number[][];
    name: string | null;
    culture: string[];
    SoilWorksTasks: Array<SoilWorksTaskType>;// can bee refactoring to asociotiv array
    FertilizationTasks:Array<FertilizationTasksType>;
    SprayingTasks:Array<SprayingTaskType>;
    MowingTheCropTasks:Array<MowingTheCropTaskType>;
}
const initialFieldState:FieldType = {
    id:uuidv4(),
    trajectory:[],
    name:null,
    culture:[],
    SoilWorksTasks:[],
    FertilizationTasks:[],
    SprayingTasks:[],
    MowingTheCropTasks:[],
}



const fillBlueOptions = {fillColor: 'blue'}
const limeOptions = {color: '#e305f1', fillColor: "rgb(241,5,40)"}
const tempBasePosition = {lat: 48.9935, lng: 36.230383};

const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
]

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
const PointOfPoligons = (props: { calback: (posiyion: PositionType | null) => void }) => {
    const [position, setPosition] = useState<LatLng | null>(null);
    console.log(position);
    const map = useMapEvents({
        click(e) {
            props.calback(e.latlng)
            console.log(e)
        },
        dblclick(e) {

            map.flyTo(tempBasePosition, map.getZoom())
        },
        zoom(e) {
            console.log(e, "zoom was changed ")
        },
        dragend(e) {
            console.log("dragend -->", e.target._pixelOrigin)
        },
    })
    return null
}
const App = () => {
    const [fields, setFields] = useState<Array<number[][]>>([]);
    const [painedPosition, setPainedPosition] = useState<Array<PositionType>>([]);
    const [flagForPaointPaint, setFlagForPointPaint] = useState<boolean>(false);
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
    const [thoisedField, setThoisedField] = useState<number[][]>();

    console.log(fields)
    const calback = (position: PositionType | null) => {
        if (!position) return
        setPainedPosition([...painedPosition, position])
        console.log(painedPosition);
    }
    const addPoligon = () => {
        if (painedPosition.length > 2) {
            const tempPaligon: number[][] = [];
            painedPosition.forEach((el, i) => {
                tempPaligon.push([el.lat, el.lng]);
            })
            setFields([...fields, tempPaligon]);
            setPainedPosition([]);
        }
    }

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
        setFlagForPointPaint(false);
    };

    return (
        <div style={{width: "99vw", height: "90vh", position: "relative"}}>
            <MapContainer center={[49.9935, 36.230383]} zoom={10} scrollWheelZoom={true}
                          style={{width: "100%", height: "100%", padding: 0, zIndex: 0, cursor: "pointer"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <PointOfPoligons calback={flagForPaointPaint ? calback : () => {
                }}/>
                {fields.map((el, i) => {
                    return (
                        <FeatureGroup eventHandlers={{
                            click: (e) => {
                                setThoisedField([...el])
                                console.log(`${e.latlng} element`)
                            }
                        }} pathOptions={limeOptions}>
                            <Popup autoClose className={"leaflet-popup-content-wrapper"}>
                                <div style={{color: "blue", height: 300, backgroundColor: "#adbbe8", width: 280}}>
                                    <header style={{width: "100%", backgroundColor: "salmon"}}>
                                        <div style={{color: "white", textAlign: "center"}}>
                                            Номер/название Поля
                                        </div>
                                    </header>
                                    <div style={{}}>
                                        <ul style={{
                                            listStyle: "none",
                                            padding: 0,
                                            color: "white",
                                            width: "100%",
                                            height: "100%"
                                        }}>
                                            <li><span>культура - </span></li>
                                            <li><span>посев : 25,03,2024 р </span></li>
                                            <li><span>Обработка почв : 3 --</span></li>
                                            <li><span>Внесение Удобрений :</span></li>
                                            <li><span>Уборка : Дата </span></li>
                                        </ul>
                                    </div>
                                </div>
                                <button onClick={() => setPopupOpen(!isPopupOpen)}>SET</button>
                            </Popup>
                            <Polygon key={i} positions={el as LatLngExpression[]}/>
                        </FeatureGroup>
                    )
                })}
                {painedPosition.map((el, i) => {
                    return (
                        <Circle key={el.lat * el.lng - i} center={[el.lat, el.lng]} pathOptions={fillBlueOptions}
                                radius={18}/>
                    )
                })}
            </MapContainer>
            {isPopupOpen && <FormPopup onClose={handleClosePopup}/>}
            <input onChange={() => {
                setFlagForPointPaint(!flagForPaointPaint)
            }} type={"checkbox"} checked={flagForPaointPaint}/>
            <button onClick={() => {
                setPainedPosition([]);
                console.log("rrr");
            }}>
                {"Сброс"}
            </button>
            <button disabled={!(painedPosition.length > 2)} onClick={() => {
                addPoligon();
                handleOpenPopup();
            }}>+
            </button>
        </div>
    );
};

export default App;
