import React, {useState} from 'react';
import {Circle, FeatureGroup, MapContainer, Polygon, Popup, TileLayer, useMapEvents} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {  LatLngExpression} from "leaflet";

import {v4 as uuidv4} from 'uuid';
import FormPopup from "./copnents/Popup";
import {useFields} from "./Hooks/UseFields/useFields";

type PositionType = {
    lat: number,
    lng: number
}
//_________________________TASKS TYPE_________________________________
type MowingTheCropTaskType = {
    status: "isDone" | "inProgres"
    type: "FOR-CULTURE"
    startDate: Date
    endDate: Date
}
type SprayingTaskType = {
    status: "isDone" | "inProgres"
    type: "FOR-CULTURE"
}
type SoilWorksTaskType = {
    status: "isDone" | "inProgres"
    type: "FOR-FIELD"
}
type FertilizationTasksType = {
    status: "isDone" | "inProgres"
    type: "FOR-FIELD"
}
//____________________________________________________________________________

export type FieldType = {
    id: string;// forigen
    trajectory: number[][];
    name: string | null;
    sqere: number|null;
    //culture: Array<{id:string,name:string,collor:string,sqere:number|null}>;
    // SoilWorksTasks: Array<SoilWorksTaskType>;// can bee refactoring to asociotiv array
    // FertilizationTasks:Array<FertilizationTasksType>;
    // SprayingTasks:Array<SprayingTaskType>;
    // MowingTheCropTasks:Array<MowingTheCropTaskType>;
}
//  in this case id is forigen key from FieldType
 export  type SoilTasksTypes = {
    [id:string]:{
        SOIL_GROUP:Array<SoilWorksTaskType>;
        FERTILIZATION_GROUP:Array<FertilizationTasksType>;
    }
}
export type CultureType = {
    [id:string]:Array<{ id:string,name:string,collor:string,sqere:number|null }>
}
export type CultureTaskType = {
    [id:string]:{
        "SPRAYING_GROUP":Array<SprayingTaskType>;
        "MOWING_THE_CROP":Array<MowingTheCropTaskType>
    }
}
const initialFieldState:FieldType = {
    id:uuidv4(),
    sqere:null,
    trajectory:[],
    name:null,
    //culture:[],
    // SoilWorksTasks:[],
    // FertilizationTasks:[],
    // SprayingTasks:[],
    // MowingTheCropTasks:[],
}
const fillBlueOptions = {fillColor: 'blue'}
const limeOptions = {color: '#e305f1', fillColor: "rgb(241,5,40)"}
const tempBasePosition = {lat: 48.9935, lng: 36.230383};

const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
]

const PointOfPoligons = (props: { calback: (posiyion: PositionType | null) => void }) => {
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
    const {agroFields,fieldCultures,setNewField,setCulture} = useFields()
    const [fields, setFields] = useState<Array<number[][]>>([]);
    const [painedPosition, setPainedPosition] = useState<Array<PositionType>>([]);
    const [flagForPaointPaint, setFlagForPointPaint] = useState<boolean>(false);
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
    const [thoisedField, setThoisedField] = useState<number[][]>();

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
            setNewField(tempPaligon)
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
                <PointOfPoligons calback={flagForPaointPaint ? calback : () => {}}/>
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
