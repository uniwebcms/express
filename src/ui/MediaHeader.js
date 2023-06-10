import React from 'react';

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
                    className={
                        'absolute top-0 left-0 w-full h-full object-cover'
                    }
                    style={{ zIndex: -1 }}
                    alt={alt}
                    loading="lazy"
                />
            );
        } else if (mediaType === 'video') {
            return (
                <video
                    autoPlay
                    muted
                    loop
                    className={
                        'absolute top-0 left-0 w-full h-full object-cover'
                    }
                    style={{ zIndex: -1 }}
                >
                    <source src={src} type={`video/${ext}`}></source>
                    {alt || 'Your browser does not support the video tag.'}
                </video>
            );
        }
    }
};

export default function MediaHeader(props) {
    const {
        page,
        website,
        width = '',
        height = '',
        // mediaClassName,
        // mediaStyle,
    } = props;

    const pageTitle = page.getPageTitle();
    const pageLeadText = page.getPageLeadText();

    const webProfile = website.getWebsiteProfile();
    const { src, altText } = webProfile.getAssetInfo(page.getPageHeaderImg());

    return (
        <div className="relative" style={{ height, width }}>
            <div
                className={`h-full z-1 relative flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-20`}
            >
                {pageTitle ? (
                    <p
                        className="text-4xl md:text-5xl font-bold text-white"
                        style={{
                            wordSpacing: '4px',
                            textShadow: 'black 1px 0 10px',
                        }}
                    >
                        {pageTitle}
                    </p>
                ) : null}
                {pageLeadText ? (
                    <p
                        className="mt-4 text-lg md:text-xl text-gray-100"
                        style={{
                            wordSpacing: '4px',
                            textShadow: 'black 1px 0 10px',
                        }}
                    >
                        {pageLeadText}
                    </p>
                ) : null}
            </div>
            <MediaBackground
                src={src}
                alt={altText}
                // className={mediaClassName}
                // style={mediaStyle}
            />
        </div>
    );
}
