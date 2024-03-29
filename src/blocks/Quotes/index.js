import React from 'react';
import { Carousel as FbCarousel } from 'flowbite-react';
import { twJoin, Image, SafeHtml } from '@uniwebcms/module-sdk';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Container from '../../basic/Container';

export default function Quotes(props) {
    const { block, page } = props;

    let items = block.getBlockItems();

    block.childBlocks.forEach((childBlock) => {
        items.push(...childBlock.getBlockItems());
    });

    const background = items[0].banner || null;

    items = items.filter((item) => item.description);

    let { align = 'left' } = block.getBlockProperties();

    if (align === 'left') align = 'start';
    else if (align === 'right') align = 'end';
    else align = 'center';

    return (
        <Container className={twJoin(block.theme, '')} background={background}>
            <div className={twJoin('relative flex items-center', `justify-${align}`)}>
                <FbCarousel
                    slideInterval={5000}
                    className='w-full md:w-4/5 lg:w-3/5 xl:w-2/5 bg-[color:var(--primary,#eee)] z-10 px-16 py-8 rounded-xl shadow-lg'
                    style={{ height: '280px' }}
                    leftControl={
                        <div className='w-8 h-8 rounded-full p-1 bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-white'>
                            <HiOutlineChevronLeft className='w-full h-full' />
                        </div>
                    }
                    rightControl={
                        <div className='w-8 h-8 rounded-full p-1 bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-white'>
                            <HiOutlineChevronRight className='w-full h-full' />
                        </div>
                    }>
                    {items.map((item, index) => {
                        const { title, subtitle, description, images } = item;

                        let avatar = images[0];

                        return (
                            <div key={index} className='h-full w-full'>
                                <h3
                                    className='text-2xl font-bold'
                                    style={{ color: 'var(--on_primary,#000000)' }}>
                                    {title}
                                </h3>
                                <SafeHtml
                                    as='p'
                                    value={description}
                                    className='text-lg line-clamp-4 mt-2.5'
                                    style={{ color: 'var(--on_primary,#000000)' }}
                                />
                                <div className='flex space-x-3 mt-3.5 items-center'>
                                    {avatar ? (
                                        <div className='h-8 w-8'>
                                            <Image
                                                profile={page.getPageProfile()}
                                                value={avatar.value}
                                                alt={avatar.alt}
                                                rounded
                                            />
                                        </div>
                                    ) : null}
                                    <p
                                        className='text-base font-medium'
                                        style={{ color: 'var(--on_primary,#000000)' }}>
                                        {subtitle}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </FbCarousel>
            </div>
        </Container>
    );
}
