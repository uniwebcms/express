import React from 'react';
import { website } from '../core';

const getTypeByExt = (ext) => {
    const pic = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    const vid = ['mp4'];

    if (pic.includes(ext)) return 'img';
    if (vid.includes(ext)) return 'video';
    return '';
};

const MediaBackground = ({ src, alt }) => {
    const ext = src.split('.').pop();
    const mediaType = getTypeByExt(ext);

    if (mediaType) {
        if (mediaType === 'img') {
            return (
                <img
                    src={src}
                    className={'absolute top-0 left-0 w-full h-full object-cover'}
                    style={{ zIndex: -1 }}
                    alt={alt}
                    loading='lazy'
                />
            );
        } else if (mediaType === 'video') {
            return (
                <video
                    autoPlay
                    muted
                    loop
                    className={'absolute top-0 left-0 w-full h-full object-cover'}
                    style={{ zIndex: -1 }}>
                    <source src={src} type={`video/${ext}`}></source>
                    {alt || 'Your browser does not support the video tag.'}
                </video>
            );
        }
    }
};

export default function MediaHeader(props) {
    const { page, width = '100%', height = '600px' } = props;

    const webProfile = website.getWebsiteProfile();

    const pageTitle = page.getPageTitle();
    const pageLeadText = page.getPageLeadText();
    const pageHeaderImg = page.getPageHeaderImg();

    let src, alt;

    if (pageHeaderImg) {
        ({ src, alt } = webProfile.getAssetInfo(pageHeaderImg));
    }

    return (
        <div className='relative' style={{ height, width }}>
            <div
                className={`h-full z-1 relative flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-20`}>
                {pageTitle ? (
                    <p
                        className='text-4xl md:text-5xl font-bold text-white'
                        style={{
                            wordSpacing: '4px',
                            textShadow: 'black 1px 0 10px'
                        }}>
                        {pageTitle}
                    </p>
                ) : null}
                {pageLeadText ? (
                    <p
                        className='mt-4 text-lg md:text-xl text-gray-100'
                        style={{
                            wordSpacing: '4px',
                            textShadow: 'black 1px 0 10px'
                        }}>
                        {pageLeadText}
                    </p>
                ) : null}
            </div>
            {src ? <MediaBackground src={src} alt={alt} /> : null}
        </div>
    );
}
