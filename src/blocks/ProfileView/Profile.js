import React, { createRef, useRef, useEffect } from 'react';
import Container from '../../basic/Container';
import GoogleMap from '../Map';
import { Profile, Image, useLoadProfileBody, SafeHtml, MediaIcon } from '@uniwebcms/module-sdk';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { HiMail } from 'react-icons/hi';

const GridLayout = WidthProvider(Responsive);

const Description = ({ profile, description }) => {
    return (
        <div className='w-full h-full overflow-hidden border rounded-lg px-6 py-4 shadow-md bg-green-50'>
            <h3 className='text-2xl font-bold'>Description</h3>
            <SafeHtml
                value={description}
                title={profile.stripTags(description)}
                className='pt-4 text-lg'
            />
        </div>
    );
};

const MediaLink = ({ mediaLinks }) => {
    return (
        <div className='w-full h-full overflow-hidden border rounded-lg px-6 py-4 shadow-md bg-blue-50'>
            <h3 className='text-2xl font-bold'>Social Media Links</h3>

            <div className='flex items-center space-x-3 pt-4'>
                {mediaLinks.map((link, index) => {
                    const { website_type = '', url, name, label } = link;

                    return (
                        <a key={index} href={url} target='_blank' title={label || name}>
                            <MediaIcon type={website_type.toLowerCase()} size='6' />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

const Members = ({ members }) => {
    const markup = members.map((member) => {
        const { title, subtitle, head } = member.getBasicInfo();

        const { email } = head;

        return (
            <div key={member.key} className='flex items-start space-x-4 max-w-xs overflow-hidden'>
                <div className='w-32 h-32 rounded-full border flex-shrink-0'>
                    <Image profile={member} type='avatar' rounded />
                </div>
                <div className='overflow-hidden'>
                    <h3 className='text-xl font-semibold truncate mt-2'>{title}</h3>
                    <p className='text-md font-medium truncate mt-2'>{subtitle}</p>
                    {email ? (
                        <div className='mt-5 flex items-center space-x-1.5'>
                            <HiMail className='inline-block w-5 h-5 flex-shrink-0' />
                            <a href={`mailto:${email}`} className='text-base truncate'>
                                {email}
                            </a>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    });

    return (
        <div className='w-full h-full overflow-auto border rounded-lg px-6 py-4 shadow-md bg-yellow-50'>
            <h3 className='text-2xl font-bold'>Members</h3>
            <div className='flex justify-between flex-wrap gap-4 mt-4'>{markup}</div>
        </div>
    );
};

const Map = ({ researchPlaces, ...props }) => {
    const containerRef = useRef();
    const [height, setHeight] = React.useState(0);

    useEffect(() => {
        if (containerRef.current) {
            const height = containerRef.current.offsetHeight;
            setHeight(height);
        }
    }, []);

    let locations = [];

    researchPlaces.forEach((item) => {
        const { address } = item;
        const { geometry } = address;

        const { location } = geometry;

        if (location) {
            const { lat, lng } = location;
            locations.push({ lat: Number(lat), lng: Number(lng) });
        }
    });

    return (
        <div ref={containerRef} className='w-full h-full overflow-hidden px-6'>
            <h3 className='text-2xl font-bold truncate'>Research places</h3>
            <div className='mt-4 shadow-md'>
                <GoogleMap
                    {...props}
                    extra={{
                        center: locations[0],
                        markerPositions: locations,
                        height: `calc(${height}px - 32px - 1rem)`,
                        style: {
                            borderRadius: '10px',
                            overflow: 'hidden'
                        }
                    }}
                />
            </div>
        </div>
    );
};

const Renderer = ({ profile, props }) => {
    const { title } = profile.getBasicInfo();

    let description = '',
        mediaLinks = [],
        members = [],
        researchPlaces = [];

    if (useLoadProfileBody(profile)) {
        const descSection = profile.findSectionByFieldName('description', true);
        if (descSection) {
            description = profile.at(`${descSection}/description`);
        }

        mediaLinks = profile.at('social_media_links');

        const [section, field] = profile.findRelationField('members');
        if (section) {
            members = profile.getLinkedProfiles('members', section, field) || [];
        }

        researchPlaces = profile.at('research_places');
    }

    const layouts = {
        xxs: [],
        md: [],
        xl: []
    };

    const markup = [];

    if (description) {
        layouts.xxs.push({
            i: 'description',
            x: 0,
            y: 0,
            w: 6,
            h: 5,
            static: true
        });
        layouts.md.push({ i: 'description', x: 0, y: 0, w: 5, h: 4, static: true });
        layouts.xl.push({
            i: 'description',
            x: 0,
            y: 0,
            w: 8,
            h: 3,
            static: true
        });

        markup.push(
            <div key='description'>
                <Description profile={profile} description={description} />
            </div>
        );
    }

    if (mediaLinks?.length) {
        layouts.xxs.push({ i: 'mediaLinks', x: 0, y: 4, w: 4, h: 4, static: true });
        layouts.md.push({ i: 'mediaLinks', x: 5, y: 0, w: 3, h: 4, static: true });
        layouts.xl.push({
            i: 'mediaLinks',
            x: 8,
            y: 0,
            w: 4,
            h: 2,
            static: true
        });

        markup.push(
            <div key='mediaLinks'>
                <MediaLink mediaLinks={mediaLinks} />
            </div>
        );
    }

    if (members?.length) {
        layouts.xxs.push({ i: 'members', x: 0, y: 8, w: 6, h: 4, static: true });
        layouts.md.push({ i: 'members', x: 0, y: 8, w: 4, h: 6, static: true });
        layouts.xl.push({
            i: 'members',
            x: 0,
            y: 3,
            w: 7,
            h: 5,
            static: true
        });

        markup.push(
            <div key='members'>
                <Members members={members} />
            </div>
        );
    }

    if (researchPlaces?.length) {
        layouts.xxs.push({ i: 'researchPlaces', x: 0, y: 8, w: 6, h: 4, static: true });
        layouts.md.push({ i: 'researchPlaces', x: 0, y: 8, w: 4, h: 6, static: true });
        layouts.xl.push({
            i: 'researchPlaces',
            x: 7,
            y: 3,
            w: 5,
            h: 5,
            static: true
        });

        markup.push(
            <div key='researchPlaces'>
                <Map researchPlaces={researchPlaces} {...props} />
            </div>
        );
    }

    return (
        <Container className='!pt-8'>
            <div className='w-full h-96 relative'>
                <div className='w-full h-full'>
                    <Image profile={profile} type='banner' rounded='rounded-lg' />
                </div>
                <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                    <h2
                        className='text-5xl font-bold text-white max-w-3xl text-center'
                        style={{
                            textShadow:
                                '1px 0px 3px var(#000), -1px 0px 3px var(#000), 0px 2px 3px var(#000)'
                        }}>
                        {title}
                    </h2>
                </div>
            </div>

            <GridLayout
                className='mt-12'
                layouts={layouts}
                containerPadding={[0, 0]}
                measureBeforeMount={true}
                breakpoints={{ xl: 1280, md: 768, xxs: 0 }}
                cols={{ xl: 12, md: 8, xxs: 6 }}
                rowHeight={60}
                margin={[50, 50]}>
                {markup}
            </GridLayout>
        </Container>
    );
};

export default function (props) {
    const {
        profile,
        block: { inputType },
        website
    } = props;

    const { useParams } = website.routingComponents;
    const params = useParams();

    const { contentId } = params;

    if (!inputType) return null;

    const [section, field] = profile.findRelationField(inputType);
    const profileType = Profile.completeProfileType(inputType);

    if (!section) return null;

    const targetProfile = profile
        .getLinkedProfiles(profileType, section, field)
        .find((p) => p.contentId === contentId);

    if (!targetProfile) return null;

    return <Renderer profile={targetProfile} props={props} />;
}
