import React from 'react';
import FileLogo from '../utils/FileLogo';
import {
    any,
    FieldsTracker,
    genericFieldRenderer,
    FileFieldRenderer
} from '../utils/FieldRenderer';

const Resources = (props) => {
    const { value, info = {}, profile } = props;

    let { contentId, contentType, viewType = 'profile' } = info;

    if (profile) {
        contentId = profile.getId();
        contentType = profile.getContentType();
        viewType = profile.getViewType();
    }

    const getValueRenderer = (value, index) => {
        const ft = new FieldsTracker(value);
        const { display_name: dn, url: u, file: fi, description: desc } = ft.getFields();

        const margin = index % 2 === 1 ? 'mb-8' : 'mb-8 md:mr-8';

        const fiVal = fi?.value || '';
        const basename = fiVal.substring(fiVal.lastIndexOf('/') + 1, fiVal.length);

        return (
            <div className={`${margin} w-full md:w-[46%]`}>
                <div
                    className={`h-full rounded-lg border border-gray-200 flex flex-col overflow-hidden group shadow-sm`}
                >
                    <div className={`h-56`}>
                        <FileFieldRenderer
                            {...{
                                field: fi,
                                profile
                            }}
                        />
                    </div>
                    <div
                        className={`flex items-start justify-beeen px-4 py-3 border-t border-gray-200`}
                    >
                        <div className={`flex flex-col space-y-1 max-w-[calc(100%-32px)]`}>
                            {any(dn) && (
                                <div className={`flex items-center`} title={basename}>
                                    <FileLogo filename={fiVal}></FileLogo>
                                    <strong className={`truncate ml-1`}>{dn.value}</strong>
                                </div>
                            )}
                            {any(desc) && genericFieldRenderer(desc, false)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const markup = value.map((itemValue, index) => (
        <React.Fragment key={index}>{getValueRenderer(itemValue, index)}</React.Fragment>
    ));

    return <div className={`flex flex-wrap items-stretch`}>{markup}</div>;
};

export default Resources;
