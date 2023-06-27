import React, { useState } from 'react';
import { twJoin, Image } from '@uniwebcms/module-sdk';
import { Carousel as FbCarousel, createTheme, ThemeProvider } from 'flowbite-react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import './index.css';

// export default function HeroImage(props) {
//     const {
//         height = '500px',
//         width = '100%',
//         src,
//         gradient = null,
//         children,
//         title,
//         subtile
//     } = props;

//     let gradientClassName = '';

//     if (gradient) {
//         const { color = '#fff213' } = gradient;

//         gradientClassName = `after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:z-0 `;

//         const { theme, level } = gradient;

//         switch (theme) {
//             case 'dark':
//                 gradientClassName += `after:to-gray-600`;
//                 break;
//             case 'medium':
//                 gradientClassName += `after:to-gray-400`;
//                 break;
//             case 'light':
//                 gradientClassName += `after:to-gray-200 after:to-[var(--primary)]`;
//                 break;
//         }
//     }

//     console.log('gradientClassName', gradientClassName);

//     return (
//         <div
//             className={cn('relative bg-cover bg-center bg-no-repeat', gradientClassName)}
//             style={{
//                 width,
//                 height,
//                 backgroundImage: `url(${src})`
//             }}>
//             {children}
//         </div>
//     );
// }

const CarouselItem = ({ item, profile, setItemHovered }) => {
    const { title, subtitle, images, links, properties } = item;

    const banner = images[0];

    let background = null,
        content = null;

    if (banner) {
        const { value, alt } = banner;

        background = (
            <Image
                value={value}
                className={`absolute top-0 left-0 w-full h-full object-cover`}
                alt={alt}
                profile={profile}></Image>
        );
    } else {
        background = <div className='absolute top-0 left-0 bg-gray-400 w-full h-full'></div>;
    }

    const contentPosition = {
        'top-left': 'items-start justify-start text-left',
        'top-center': 'items-start justify-center text-center',
        'top-right': 'items-start justify-end text-right',
        'mid-left': 'items-center justify-start text-left',
        'mid-center': 'items-center justify-center text-center',
        'mid-right': 'items-center justify-end text-right',
        'bottom-left': 'items-end justify-start text-left',
        'bottom-center': 'items-end justify-center text-center',
        'bottom-right': 'items-end justify-end text-right'
    };

    content = (
        <div className='z-10 space-y-6'>
            <div
                className='space-y-2'
                style={{
                    textShadow:
                        '3px 0px 7px var(--text-shadow), -3px 0px 7px var(--text-shadow), 0px 4px 7px var(--text-shadow)'
                }}>
                <h3 className='lg:text-5xl sm:text-4xl text-2xl font-semibold'>{title}</h3>
                <p className='lg:text-2xl sm:text-xl text-base'>{subtitle}</p>
            </div>
            {links.length ? (
                <div className='flex items-center justify-center space-x-4'>
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className='px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-100 rounded-xl'
                            onMouseEnter={() => {
                                if (setItemHovered) setItemHovered(true);
                            }}
                            onMouseLeave={() => {
                                if (setItemHovered) setItemHovered(false);
                            }}>
                            {link.label}
                        </a>
                    ))}
                </div>
            ) : null}
        </div>
    );

    return (
        <div
            className={twJoin(
                'flex relative w-full h-[480px]',
                contentPosition[properties?.contentPosition || 'mid-center'],
                'py-20 xl:px-28 lg:px-20 md:px-16 px-8'
            )}>
            {background}
            {content}
        </div>
    );
};

const CarouselControl = ({ side }) => {
    let Icon;
    if (side === 'left') {
        Icon = HiOutlineChevronLeft;
    } else if (side === 'right') {
        Icon = HiOutlineChevronRight;
    }

    if (!Icon) return null;

    return (
        <div className='w-10 h-10 p-2 rounded-full bg-gray-300 hover:bg-gray-400 bg-opacity-50'>
            <Icon className='w-full h-full text-white' />
        </div>
    );
};

const Carousel = ({ items, page }) => {
    const pageProfile = page.getPageProfile();

    const [itemHovered, setItemHovered] = useState(false);

    return (
        <FbCarousel
            slideInterval={itemHovered ? 100000 : 3000}
            className='carousel-root'
            leftControl={<CarouselControl side='left' />}
            rightControl={<CarouselControl side='right' />}>
            {items.map((item, index) => (
                <CarouselItem
                    key={index}
                    item={item}
                    profile={pageProfile}
                    setItemHovered={setItemHovered}
                />
            ))}
        </FbCarousel>
    );
};

export default function HeaderSection(props) {
    const { block, page } = props;

    let items = block.getBlockItems();
    let markup = null;

    if (items.length > 1) {
        markup = <Carousel items={items} page={page} />;
    } else if (items.length === 1) {
        markup = <CarouselItem item={items[0]} profile={page.getPageProfile()} />;
    }

    return <div className={twJoin(block.theme, 'mt-16 sm:mt-32')}>{markup}</div>;
}
