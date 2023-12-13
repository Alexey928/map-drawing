import React, {useEffect, useId, useRef, useState} from 'react';
import {Circle, MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents} from "react-leaflet";

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

const LocationMarker = (props:{calback:(posiyion:PositionType|null)=>void})=> {
    const [position, setPosition] = useState<LatLng | null>(null);
    console.log(position)
    const map = useMapEvents({
        click(e){
            props.calback(e.latlng)
            console.log(e)
        },
        dblclick(e) {
            map.locate()

        },
        locationfound(e) {
            console.log("rrrrrrr")
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
        zoom(e){
            console.log(e,"")
        },
        dragend(e){
            console.log("druged -->",e.target._pixelOrigin)
        },

    })
    return position === null ? null : (
        <Circle center={ [51.5030,-0.09] as LatLngExpression } pathOptions={{ color: 'lime' }} radius={10} />
    )
}
const App = () => {
    // let canvasRef = useRef<HTMLCanvasElement>(null);
    // const [drowCanvass ,setDrowCanvas] = useState<boolean>(false);
     const [poligons , setPoligons] = useState<number[][]>([])

    // Пока повыключаем логику связанную с отрисрвкрй канвас , пробуем реализовать только средствами лефлета
    // const [drawing, setDrawing] = useState<boolean>(false);
    // const [currentX, setCurrentX] = useState<number>(0);
    // const [currentY, setCurrentY] = useState<number>(0);

    const [painedPosition , setPainedPosition]= useState<Array<PositionType>>([])
    console.log("ddd")

    // useEffect(() => {
    //     let canvas = canvasRef.current;
    //     if (!canvas) return
    //     const context = canvas.getContext('2d');
    //     const startDrawing = (event: globalThis.MouseEvent) => {
    //         console.log(event,canvas!.offsetLeft,canvas!.offsetTop)
    //         setDrawing(true);
    //         setCurrentX(event.offsetX);
    //         setCurrentY(event.offsetY);
    //     };
    //     const drawLine = (event: globalThis.MouseEvent) => {
    //         console.log(event.offsetX,event.clientX)
    //         if (!drawing || !context) return;
    //         if (!canvas) return
    //
    //         const newX = event.offsetX
    //         const newY = event.offsetY
    //
    //         context.beginPath();
    //         context.moveTo(currentX, currentY);
    //         context.lineTo(newX, newY);
    //         context.stroke();
    //
    //         setCurrentX(newX);
    //         setCurrentY(newY);
    //     };
    //     const stopDrawing = () => {
    //         setDrawing(false);
    //     };
    //     canvas.addEventListener('mousedown', startDrawing);
    //     canvas.addEventListener('mousemove', drawLine);
    //     canvas.addEventListener('mouseup', stopDrawing);
    //     canvas.addEventListener('mouseout', stopDrawing);
    //     return () => {
    //         canvas!.removeEventListener('mousedown', startDrawing);
    //         canvas!.removeEventListener('mousemove', drawLine);
    //         canvas!.removeEventListener('mouseup', stopDrawing);
    //         canvas!.removeEventListener('mouseout', stopDrawing);
    //     };
    // }, [currentX, currentY, drawing,drowCanvass]);
    const calback = (position:PositionType|null)=>{
        setPainedPosition([...painedPosition,position!])
        console.log(painedPosition);
    }
    const adPoligons = ()=>{

    }

    // const center:LatLngExpression = [51.505, -0.09]
    const fillBlueOptions = { fillColor: 'blue' }
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
                <LocationMarker calback={calback}/>
                {painedPosition.map((el,i)=>{
                    return (
                        <Circle key={el.lat*el.lng - i} center={[el.lat,el.lng]} pathOptions={fillBlueOptions} radius={25}/>
                    )
                })}
                {/*<Circle center={ center } pathOptions={fillBlueOptions} radius={200} />*/}
                {/*<Circle center={ [51.5030,-0.09] as LatLngExpression } pathOptions={fillBlueOptions} radius={200} />*/}
                {/*<Circle center={ [51.5030,-0.09] as LatLngExpression } pathOptions={blackOptions} radius={1} />*/}
                {/*<Polyline pathOptions={limeOptions} positions={multiPolyline} />*/}
            </MapContainer>
            {/*{drowCanvass && <canvas*/}
            {/*    ref={canvasRef}*/}
            {/*    width={800}*/}
            {/*    height={600}*/}
            {/*    style={{ border: '1px solid #f54', zIndex: 100, backgroundColor: 'transparent',position:"absolute", top:0 , boxSizing:"border-box"}}*/}
            {/*></canvas>}*/}
            <button onClick={()=>{
                //setDrowCanvas(!drowCanvass);
                setPainedPosition([]);
                console.log("rrr");
            }}>
                {"<--"}
            </button>
            <input  type={"checkbox"}/>
            <button>+</button>

    </div>
    );
};

export default App;
