import React from 'react';
import Container from '../../basic/Container';
import { twJoin, Link, SafeHtml } from '@uniwebcms/module-sdk';

const Item = ({ item, properties }) => {
    const { title, subtitle, description, links } = item;

    return (
        <div className='pt-5 mb-3.5'>
            <h3 className='text-2xl font-bold'>{title}</h3>
            <p className='text-lg font-medium mt-0.5'>{subtitle}</p>
            <SafeHtml as='p' value={description} className='text-base mt-2' />
            <div className='mt-4 flex flex-wrap'>
                {links.map((link, index) => (
                    <Link key={index} className='mr-2' to={link.href}>
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default function (props) {
    const {
        block,
        extra: { as = 'section', className = 'divide-y', renderCard = undefined }
    } = props;

    let items = block.getBlockItems();

    block.childBlocks.forEach((childBlock) => {
        items.push(...childBlock.getBlockItems());
    });

    const blockProperties = block.getBlockProperties();
    const firstItemProperties = items[0]?.properties || {};

    const title = blockProperties.title || firstItemProperties.title || '';
    const itemProperties = blockProperties.item || firstItemProperties.item || {};

    items = items.filter(
        (item) => item.title || item.subtitle || item.description || item.links.lengths
    );

    return (
        <Container as={as} className={twJoin('', block.theme)}>
            <h2 className='text-3xl font-bold leading-10 tracking-tight mb-2'>{title}</h2>
            <div className={className}>
                <ul role='list' className={className}>
                    {items.map((item, index) =>
                        renderCard ? (
                            renderCard(index, item, itemProperties)
                        ) : (
                            <Item key={index} item={item} properties={itemProperties} />
                        )
                    )}
                </ul>
            </div>
        </Container>
    );
}
