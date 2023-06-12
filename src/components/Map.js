/**
 * Google Map with markers.
 * @module Map
 */

import React from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { website } from '../core';

/**
 * Create a Map.
 *
 * @example
 * function MyComponent() {
 *    return (
 *       <Map
 *          APIKey="xxx"
 *          center={{lat:40, lng:50}}
 *          zoom={4}
 *          markerPositions={[{lat:10,lng:20}]}
 *          width='800px'
 *          height='600px' />
 *    );
 * }
 *
 * @component Map
 * @prop {string} APIKey -
 * @prop {object} center - The position of the map center
 * @prop {number} zoom - The initial zoom level
 * @prop {object[]} markerPositions -The markers' position
 * @prop {string} height - The height of the map element
 * @prop {string} [width] - The width of the map element
 * @returns {function} A Map component.
 */
export default function Map(props) {
    const { APIKey, center, zoom, markerPositions = [], height = '600px', width = '800px' } = props;

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: APIKey,
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
