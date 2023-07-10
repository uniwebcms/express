import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Link, twJoin, Image, twMerge } from '@uniwebcms/module-sdk';
import SiteSearch from '../../basic/SiteSearch';
import LanguageToggle from '../../basic/LanguageToggle';
import PopoverMenu from '../../basic/PopoverMenu';
import { MdMenu, MdOutlineClose } from 'react-icons/md';
import { HiChevronDown } from 'react-icons/hi';

const MobileNavMenu = ({ pages }) => {
    return (
        <div className='mt-6 flow-root'>
            <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                {pages.map((page, index) => {
                    const { child_items, label, route } = page;
                    const isLast = index === pages.length - 1;
                    const isFist = index === 0;

                    if (child_items?.length) {
                        return (
                            <div
                                key={index}
                                className={twJoin(
                                    'col-span-2 space-y-2',
                                    !isLast && 'border-b pb-3 mb-3',
                                    !isFist && 'border-t pt-3 mt-3'
                                )}>
                                {route ? (
                                    <Link className={`text-lg font-medium`}>{label}</Link>
                                ) : (
                                    <p className={`text-lg font-medium text-gray-500`}>{label}</p>
                                )}
                                {child_items.map((item, index) => {
                                    const { route, label } = item;

                                    return (
                                        <Link
                                            key={index}
                                            to={route}
                                            className={`block px-4 py-2 hover:bg-gray-50 text-base font-medium`}>
                                            {label}
                                        </Link>
                                    );
                                })}
                            </div>
                        );
                    } else {
                        const { route, label } = page;

                        return (
                            <Link
                                key={index}
                                to={route}
                                className='text-base font-semibold pr-0.5 w-fit'>
                                {label}
                            </Link>
                        );
                    }
                })}
            </div>
        </div>
    );
};

const NavbarMenu = ({ label, route, child_items }) => {
    const menu = child_items.map((item, index) => {
        const { route, label } = item;

        return (
            <Link key={index} to={route} className='block px-5 py-4 hover:bg-gray-50'>
                <span className='text-base md:text-lg font-medium text-gray-900'>{label}</span>
            </Link>
        );
    });

    return (
        <PopoverMenu
            trigger={
                <>
                    {route ? <Link to={route}>{label}</Link> : <span>{label}</span>}
                    <HiChevronDown
                        className='ml-2 h-5 w-5 text-gray-500 group-hover:text-gray-700'
                        aria-hidden='true'
                    />
                </>
            }
            triggerClassName={
                '-ml-3 -mr-2 -my-1 pl-3 pr-2 py-1 group inline-flex items-center rounded-md text-base md:text-lg font-semibold text-gray-700 hover:text-gray-900 focus:outline-none'
            }
            position={'top-full -left-[13px] mt-[14px]'}
            width={'200px'}
            zIndex={'10'}
            options={menu}
        />
    );
};

export default function Header(props) {
    const {
        block,
        block: { theme, params },
        page,
        website
    } = props;

    const route = page.getRoute();
    const activeRoute = page.activeRoute;

    const { signIn = false, joinMenus = false, extraMenu = '' } = params;

    const websiteProfile = website.getWebsiteProfile();

    const blockLinks = block.getBlockLinks();
    let pages = website.getPageHierarchy({
        nested: true,
        filterEmpty: true
    });

    if (blockLinks.length) {
        if (joinMenus) {
            if (extraMenu) {
                pages.push({
                    label: extraMenu,
                    child_items: blockLinks
                });
            } else {
                pages.push(...blockLinks);
            }
        } else {
            pages = blockLinks;
        }
    }

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [route]);

    return (
        <header className={twJoin('z-10', theme)}>
            <nav className='mx-auto px-4 sm:px-6 lg:max-w-7xl xl:max-w-8xl 2xl:max-w-9xl lg:px-12 py-6'>
                <div
                    className='relative flex items-center justify-center'
                    style={{ minHeight: '24px' }}>
                    <div className='absolute top-0 left-0'>
                        <Link to='' className='block h-12 w-auto -mt-[12px]'>
                            <Image profile={websiteProfile} type='avatar' />
                        </Link>
                    </div>
                    <div className='absolute top-0 right-0 h-6 lg:hidden'>
                        <button
                            type='button'
                            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                            onClick={() => setMobileMenuOpen(true)}>
                            <span className='sr-only'>Open main menu</span>
                            <MdMenu className='h-6 w-6' aria-hidden='true' />
                        </button>
                    </div>
                    <div
                        className={twJoin(
                            'hidden lg:flex',
                            pages.length > 6 ? 'lg:gap-x-6 xl:gap-x-8' : 'lg:gap-x-8 xl:gap-x-12'
                        )}>
                        {pages.map((page, index) => {
                            if (page.child_items?.length) {
                                return <NavbarMenu key={index} {...page} />;
                            } else {
                                const { route, label } = page;
                                const active = route === activeRoute;

                                return (
                                    <Link
                                        key={index}
                                        to={route}
                                        className={twMerge(
                                            'text-base lg:text-lg font-semibold pr-0.5',
                                            active && '!text-[var(--link-active)]'
                                        )}>
                                        {label}
                                    </Link>
                                );
                            }
                        })}
                    </div>
                    <div className='hidden lg:absolute lg:right-0 lg:top-0 lg:flex lg:items-center lg:space-x-4 xl:space-x-6'>
                        <SiteSearch />
                        <LanguageToggle />
                        {signIn ? (
                            <div className='flex-1'>
                                <Link
                                    to='/account/signin'
                                    className='text-base font-semibold leading-6 !text-gray-700 hover:!text-gray-900'>
                                    {website.localize({
                                        en: 'Sign in',
                                        fr: "S'inscrire"
                                    })}
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </div>
            </nav>
            <Dialog as='div' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <Dialog.Panel
                    focus='true'
                    className={twJoin(
                        'fixed inset-0 z-50 overflow-y-auto bg-white px-4 sm:px-6 py-3 md:py-6 lg:hidden',
                        theme
                    )}>
                    <div className='flex h-10 items-center justify-between'>
                        <Link to='' className='block -m-1.5 p-1.5 pr-4 h-12 w-auto'>
                            <Image profile={websiteProfile} type='avatar' />
                        </Link>

                        <div className='flex items-center space-x-5'>
                            <LanguageToggle />
                            <button
                                type={'button'}
                                className='inline-flex items-center justify-center rounded-md text-gray-700 hover:text-gray-900'
                                onClick={() => setMobileMenuOpen(false)}>
                                <span className='sr-only'>Close menu</span>
                                <MdOutlineClose className='h-6 w-6' aria-hidden='true' />
                            </button>
                        </div>
                    </div>
                    <MobileNavMenu pages={pages} />
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
