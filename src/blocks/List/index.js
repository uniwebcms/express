/**
 * @module blocks/List
 */

import React from 'react';
import ProfileList from './Profile';
import AssetList from './Asset';
import GenericList from './Generic';
import ListProfile from './List';

export default function List(props) {
    const {
        block: { inputType, input, dataSource }
    } = props;

    if (inputType) {
        return <ProfileList {...props} />;
    } else if (input) {
        return <AssetList {...props} />;
    } else if (dataSource) {
        return <ListProfile {...props} />;
    } else {
        return <GenericList {...props} />;
    }
}
