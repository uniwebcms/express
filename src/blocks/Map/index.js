import React from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

export default function Map(props) {
    const { website, block, extra } = props;

    const { markerPositions = [] } = extra;

    const blockProperties = block.getBlockProperties();

    const center = blockProperties.center || extra.center || { lat: 45.424721, lng: -75.695 };
    const height = blockProperties.height || extra.height || '600px';
    const width = blockProperties.width || extra.width || '100%';
    const zoom = blockProperties.zoom || extra.zoom || 8;
    const style = blockProperties.style || extra.style || {};

    const apiKey = website.getMapAPIKey();

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        language: website.getLanguage()
    });

    if (isLoaded) {
        return (
            <GoogleMap mapContainerStyle={{ height, width, ...style }} center={center} zoom={zoom}>
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
