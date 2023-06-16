import React from 'react';
import { Link, Image } from '@uniwebcms/module-sdk';
import Container from '../basic/Container';
import RecentItems from '../basic/RecentItems';

// BigFooter
export default function ExtendedFooter(props) {
    let { website, profile, block } = props;

    const websiteProfile = website.getWebsiteProfile();

    const {
        linkNested = false,
        backgroundColor = '#333333',
        textColor = '#cccccc',
        ...properties
    } = block.getBlockProperties();

    const pages = website.getPageHierarchy({
        nested: linkNested,
        filterEmpty: true
    });

    let menus = pages.map((page) => {
        let { label, route } = page;

        return (
            <div className={`w-full py-2`} key={route}>
                <Link className={`text-base`} to={route}>
                    {label}
                </Link>
            </div>
        );
    });

    const hasExtendedData = properties['profileType'] && properties['section'];

    const columnWidth = hasExtendedData ? 'w-full lg:w-[calc(50%-20px)]' : 'w-full';

    return (
        <Container
            as='footer'
            className='sm:px-8 mt-16 !pb-12 md:!pb-16 xl:!pb-20 sm:mt-32 relative'
            style={{ background: backgroundColor, color: textColor }}>
            <div className='w-full lg:flex lg:justify-between'>
                <div className={columnWidth}>
                    <div className='w-auto h-12'>
                        <Link to='' className='w-full h-full'>
                            <Image
                                profile={websiteProfile}
                                type='avatar'
                                className='!object-contain object-left'
                            />
                        </Link>
                    </div>
                    {hasExtendedData ? (
                        <div className='w-full block lg:hidden mt-8'>
                            <RecentItems {...{ profile, website, properties }} />
                        </div>
                    ) : null}
                    <div
                        className='w-full mt-8 lg:mt-6 px-1'
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                            gridGap: '10px'
                        }}>
                        {menus}
                    </div>
                </div>
                {hasExtendedData ? (
                    <div className={`${columnWidth} hidden lg:block`}>
                        <RecentItems {...{ profile, website, properties }} />
                    </div>
                ) : null}
            </div>
        </Container>
    );
}
