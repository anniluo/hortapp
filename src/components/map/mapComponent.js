import React from 'react'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

 const MapComponent = () => {
    const position = [51.505, -0.09]
    return (
       <Map center={position} zoom={13}>
           <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
       </Map>
    )
}

export default MapComponent