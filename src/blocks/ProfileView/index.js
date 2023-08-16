import React from 'react';
import Profiles from './Profiles';
import Profile from './Profile';
import './index.css';

export default function (props) {
    const {
        website: {
            routingComponents: { RouteSwitcher }
        }
    } = props;

    return <RouteSwitcher {...{ Cards: Profiles, Item: Profile, ...props }}></RouteSwitcher>;
}
