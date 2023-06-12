import React, { useState, useEffect } from 'react';
import ShareBar from './ShareBar';
import { Profile, ProfileImage } from '@uniwebcms/module-sdk';

export default function ({ profile, Link }) {
    const metadata = profile.getBasicInfo();

    const { owner, date } = metadata;

    const ownerId = owner?.[0];

    const memberProfile = Profile.useCompleteProfile(useState, useEffect, 'members', ownerId);

    if (!memberProfile) return null;

    const { title } = memberProfile.getBasicInfo();

    const ProfileMarkup = (
        <>
            <Link profile={{ contentType: 'members', contentId: ownerId }}>
                <div className='w-10 h-10 md:w-12 md:h-12 rounded-full mr-4'>
                    <ProfileImage profile={memberProfile} type={'avatar'} rounded></ProfileImage>
                </div>
            </Link>
            <div className='flex flex-col'>
                <h2 className='text-base self-stretch items-center flex text-gray-800'>{title}</h2>
                <p className='text-gray-400 text-sm'>{date}</p>
            </div>
        </>
    );

    return (
        <div
            className='`w-full flex items-center mx-auto mt-12 px-4 md:px-0'
            style={{ maxWidth: '740px' }}>
            {ProfileMarkup}
            <ShareBar Link={Link} />
        </div>
    );
}
