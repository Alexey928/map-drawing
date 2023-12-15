import React, {useEffect, useId, useRef, useState} from 'react';
import {
    Circle,
    FeatureGroup,
    MapContainer,
    Marker,
    Polygon,
    Polyline,
    Popup,
    TileLayer,
    useMapEvents
} from "react-leaflet";


import 'leaflet/dist/leaflet.css';
import {LatLng, LatLngExpression} from "leaflet";

type PositionType = {
    lat:number,
    lng:number
}

const polyline = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
]

const multiPolyline:LatLngExpression[][] = [
    [
        [51.5, -0.1],
        [51.5, -0.12],
        [51.52, -0.12],
    ],
    [
        [51.5, -0.05],
        [51.5, -0.06],
        [51.52, -0.06],
    ],
]

const polygon = [
    [51.515, -0.09],
    [51.52, -0.1],
    [51.52, -0.12],
]

const multiPolygon = [
    [
        [51.51, -0.12],
        [51.51, -0.13],
        [51.53, -0.13],
    ],
    [
        [51.51, -0.05],
        [51.51, -0.07],
        [51.53, -0.07],
    ],
]

const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
]
interface PopupProps {
    onClose: () => void;
}
const FormPopup: React.FC<PopupProps> = ({ onClose }) => {
    return (
        <div className="popup">
            <button className="close-button" onClick={onClose}>
                X
            </button>
        </div>
    );
};
const PointOfPoligons = (props:{calback:(posiyion:PositionType|null)=>void})=> {
    const [position, setPosition] = useState<LatLng | null>(null);
    console.log(position);
    const map = useMapEvents({
        click(e){
            props.calback(e.latlng)
            console.log(e)
        },
        dblclick(e) {
            map.locate()
        },
        locationfound(e) {
            console.log("location founding")
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
        zoom(e){
            console.log(e,"zoom was changed ")
        },
        dragend(e){
            console.log("dragend -->",e.target._pixelOrigin)
        },

    })
    return null
}
const App = () => {
    const [poligons , setPoligons] = useState<Array<number[][]>>([]);
    const [painedPosition , setPainedPosition]= useState<Array<PositionType>>([]);
    const [flagForPaointPaint ,setFlagForPointPaint] = useState<boolean>(false);
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
    console.log(poligons)
    const calback = (position:PositionType | null)=>{
        if(!position) return
        setPainedPosition([...painedPosition,position])
        console.log(painedPosition);
    }
    const addPoligon = ()=>{
         if(painedPosition.length>2){
             const tempPaligon:number[][] = [];
             painedPosition.forEach((el,i)=>{
                 tempPaligon.push([el.lat,el.lng]);
             })
             setPoligons([...poligons,tempPaligon]);
             setPainedPosition([]);
         }
     }

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };
    const fillBlueOptions = { fillColor: 'blue'}
    const blackOptions = { color: 'green' }
    const limeOptions = { color: 'lime' }
    const purpleOptions = { color: 'purple' }
    const redOptions = { color: 'red' }

    return (
        <div style={{width:800, height:600 , position:"relative"}}>
            <MapContainer  center={[49.9935, 36.230383]} zoom={10} scrollWheelZoom={true} style={{width:"100%",height:"100%",padding:0, zIndex:0,cursor:"pointer"}} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <PointOfPoligons calback={calback}/>
                {poligons.map((el,i)=>{
                    return(
                        <FeatureGroup eventHandlers={{
                            click:(e)=>{
                                console.log(`${e.latlng} element`)
                            }
                        }} pathOptions={purpleOptions}>
                            <Popup autoClose  >
                                <div style={{color:"blue",height:300,backgroundColor:"brown",width:280}}>
                                    <header style={{width: "100%", backgroundColor: "salmon"}}>
                                        <div>
                                            NAME
                                        </div>
                                    </header>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100%",
                                    }}>
                                        <ul style={{listStyle:"none" , padding:0,color:"white"}}>
                                            <li><span>культура - </span></li>
                                            <li><span></span></li>
                                            <li><span></span></li>
                                            <li><span></span></li>
                                            <li><span></span></li>
                                        </ul>
                                    </div>
                                </div>
                            </Popup>
                         <Polygon key={i}  positions={el as LatLngExpression[]} />
                        </FeatureGroup>
                    )
                })}
                {painedPosition.map((el,i)=>{
                    return (
                        <Circle key={el.lat*el.lng - i} center={[el.lat,el.lng]} pathOptions={fillBlueOptions} radius={18}/>
                    )
                })}
            </MapContainer>
            {isPopupOpen && <FormPopup onClose={handleClosePopup} />}
            <input onChange={()=>{setFlagForPointPaint(!flagForPaointPaint)}}  type={"checkbox"} checked={flagForPaointPaint}/>
            <button onClick={()=>{
                setPainedPosition([]);
                console.log("rrr");
            }}>
                {"<--"}
            </button>
            <button onClick={()=>{addPoligon();handleOpenPopup()}}>+</button>

    </div>
    );
};

export default App;
