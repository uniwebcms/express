import React, { useState } from 'react';
import { twJoin, Image } from '@uniwebcms/module-sdk';
import { Carousel as FbCarousel } from 'flowbite-react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import './index.css';

const CarouselItem = ({ item, profile, setItemHovered, singleItem = false, mainBanner }) => {
    let { title, subtitle, images, links, banner, properties } = item;

    const { contentPosition = 'mid-center', gradient = false } = properties;

    const bg = banner || images[0] || mainBanner;

    let background = null,
        content = null;

    if (bg) {
        const { value, alt } = bg;

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

    const positions = {
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

    let linkJustifyPosition;

    if (contentPosition) {
        const horizontalPosition = contentPosition.split('-')[1];

        switch (horizontalPosition) {
            case 'left':
                linkJustifyPosition = 'start';
                break;
            case 'right':
                linkJustifyPosition = 'end';
                break;
            default:
                linkJustifyPosition = 'center';
                break;
        }
    }

    if (subtitle) {
        if (!Array.isArray(subtitle)) subtitle = [subtitle];
    }

    content = (
        <div
            className='z-10 space-y-6'
            onMouseEnter={() => {
                if (setItemHovered) setItemHovered(true);
            }}
            onMouseLeave={() => {
                if (setItemHovered) setItemHovered(false);
            }}>
            <div
                className='space-y-5 max-w-3xl'
                style={{
                    textShadow:
                        '1px 0px 3px var(--text-shadow), -1px 0px 3px var(--text-shadow), 0px 2px 3px var(--text-shadow)'
                }}>
                <h3 className='lg:text-5xl sm:text-4xl text-2xl font-semibold'>{title}</h3>
                {subtitle?.length ? (
                    <div className={twJoin('space-y-2', singleItem ? '' : 'line-clamp-6')}>
                        {subtitle.map((item, index) => (
                            <p
                                key={index}
                                className='lg:text-2xl sm:text-xl text-base leading-5 font-medium'
                                title={item}>
                                {item}
                            </p>
                        ))}
                    </div>
                ) : null}
            </div>
            {links.length ? (
                <div
                    className={twJoin(
                        'flex items-center space-x-4',
                        `justify-${linkJustifyPosition}`
                    )}>
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className='px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-100 rounded-xl'>
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
                'flex relative w-full',
                positions[contentPosition],
                singleItem ? 'min-h-[480px]' : 'h-[480px]',
                'py-20 xl:px-28 lg:px-20 md:px-16 px-8',
                gradient &&
                    'after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:z-0 after:to-[var(--gradient)]'
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

const Carousel = ({ items, page, mainBanner }) => {
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
                    mainBanner={mainBanner}
                />
            ))}
        </FbCarousel>
    );
};

export default function Header(props) {
    const { block, page } = props;

    const mainBanner = block.main.banner;
    let items = block.getBlockItems();
    let markup = null;

    const childBlocks = block.childBlocks;

    if (childBlocks.length) {
        childBlocks.forEach((childBlock) => {
            const childItems = childBlock.getBlockItems();

            items.push(...childItems);
        });
    }

    if (items.length > 1) {
        markup = <Carousel items={items} page={page} mainBanner={mainBanner} />;
    } else if (items.length === 1) {
        console.log(items);
        markup = (
            <CarouselItem
                item={items[0]}
                profile={page.getPageProfile()}
                mainBanner={mainBanner}
                singleItem={true}
            />
        );
    }

    return <div className={block.theme}>{markup}</div>;
}
