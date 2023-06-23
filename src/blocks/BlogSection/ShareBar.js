import React, { useRef, useState, useEffect } from 'react';
import { FaTwitter, FaFacebook, FaLinkedin, FaLink } from 'react-icons/fa';

export default function ({ Link }) {
    const [link, setLink] = useState('');
    const href = location.href;

    useEffect(() => {
        setLink(href);
    }, [href]);

    const input = useRef(null);

    let encodedLink = link.replace(/\:/g, '%3A');
    encodedLink = encodedLink.replace(/\//g, '%2F');
    encodedLink = encodedLink.replace(/\=/g, '%3D');

    const twitterLink = `https://twitter.com/intent/tweet?url=${encodedLink}`;
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
    const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;

    const linkStyle = `w-5 h-5 text-gray-400 hover:text-gray-800`;

    const [copied, setCopied] = useState(false);

    return (
        <div className='ml-auto mr-2 relative flex items-center'>
            <div className='flex items-center space-x-4'>
                <Link to={twitterLink} external target='_blank'>
                    <FaTwitter className={`${linkStyle}`} />
                </Link>
                <Link to={facebookLink} external target='_blank'>
                    <FaFacebook className={`${linkStyle}`} />
                </Link>
                <Link to={linkedinLink} external target='_blank'>
                    <FaLinkedin className={`${linkStyle}`} />
                </Link>
                <FaLink
                    className={`${linkStyle} cursor-pointer`}
                    onClick={() => {
                        if (input) {
                            input.current.select();
                            document.execCommand('copy');

                            setCopied(true);

                            setTimeout(() => {
                                setCopied(false);
                            }, 3000);
                        }
                    }}
                />
            </div>
            <input
                readOnly
                className='absolute -z-10 border-none outline-none text-xs flex-1 mr-1.5 bg-transparent pointer-events-none opacity-0'
                value={link}
                ref={input}
                aria-label='copy url'
            />
            {copied && (
                <div className='text-base flex items-center px-4 py-2 rounded bg-gray-800 text-white absolute -right-full z-50'>
                    Link Copied
                </div>
            )}
        </div>
    );
}
