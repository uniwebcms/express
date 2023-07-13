import React from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

export default function Map(props) {
    const {
        website,
        extra: { height = '600px', width = '100%', center, zoom = 8, markerPositions = [] }
    } = props;

    const apiKey = website.getMapAPIKey();

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        language: website.getLanguage()
    });

    if (isLoaded) {
        return (
            <GoogleMap mapContainerStyle={{ height, width }} center={center} zoom={zoom}>
                {markerPositions.map((position, index) => {
                    let { lat, lng } = position;

                    if (!isNaN(lat) && !isNaN(lng)) {
                        lat = Number(lat);
                        lng = Number(lng);

                        return <Marker key={index} position={{ lat, lng }}></Marker>;
                    }
                    return null;
                })}
            </GoogleMap>
        );
    } else if (loadError) return <div>Unable to load Map.</div>;

    return null;
}
