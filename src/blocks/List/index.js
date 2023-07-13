import React from 'react';
import ProfileList from './ProfileList';
import AssetList from './AssetList';

export default function List(props) {
    const {
        block: { inputType, input }
    } = props;

    if (inputType) {
        return <ProfileList {...props} />;
    } else if (input) {
        return <AssetList {...props} />;
    }

    return null;
}
