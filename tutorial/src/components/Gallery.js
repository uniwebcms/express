import React from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import './index.css';

export default function (props) {
    const { images = [], sizes = [] } = props;

    return (
        <div style={{}}>
            <Gallery id='image-gallery'>
                <div
                    style={{
                        display: 'flex',
                        padding: '20px 20px',
                        gap: '20px',
                        background: '#e5e5e5',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        width: '100%',
                        borderRadius: '8px'
                    }}>
                    {images.map((image, index) => (
                        <Item
                            key={index}
                            original={image}
                            thumbnail={image}
                            width={sizes[index]?.[0] || '800'}
                            height={sizes[index]?.[1] || '600'}>
                            {({ ref, open }) => (
                                <img
                                    ref={ref}
                                    onClick={open}
                                    style={{
                                        cursor: 'pointer',
                                        width: '180px',
                                        height: '180px',
                                        objectFit: 'contain',
                                        background: 'white',
                                        borderRadius: '8px',
                                        boxShadow:
                                            '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                                    }}
                                    src={image}
                                />
                            )}
                        </Item>
                    ))}
                </div>
            </Gallery>
        </div>
    );
}
