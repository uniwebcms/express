import React, { Suspense } from 'react';
import AuthorBar from './AuthorBar';
import { getComponent, useGetProfile } from '@uniwebcms/module-sdk';

const Editor = getComponent(null, 'ArticleEditor');

export default function (props) {
    const { website } = props;

    const { Link, useParams } = website.routingComponents;
    const activeLang = website.getLanguage();

    const params = useParams();
    const contentType = 'articles';
    const { contentId } = params;

    const articleProfile = useGetProfile(contentType, contentId);

    if (!articleProfile) return null;

    const [bodySection, assetSections] = articleProfile
        .getFullData()
        .filter((item) => item.name === 'article_body' || item.name === 'article_assets');

    const { section_id, fields, value } = bodySection;

    const fieldId = Object.keys(fields)[0];

    let itemId = 0,
        content = '';

    if (value.length) {
        const item = value[0];

        itemId = item.itemId;

        content =
            typeof item?.content?.value === 'string'
                ? JSON.parse(item?.content?.value)
                : item?.content?.value;
    }

    const { section_id: assetSection, fields: assetFields } = assetSections;
    const assetFieldId = Object.keys(assetFields)[0];

    const info = {
        sectionId: section_id,
        fieldId,
        itemId,
        initData: content,
        currentData: content,
        assetsInfo: {
            sectionId: assetSection,
            fieldId: assetFieldId,
            viewType: 'profile',
            contentType,
            contentId
        }
    };

    return (
        <>
            <AuthorBar profile={articleProfile} Link={Link}></AuthorBar>
            <div className='bg-white w-screen max-w-full min-h-screen relative flex justify-end'>
                <div className='mx-auto pt-8 pb-20 left-0 top-0 static w-screen max-w-full'>
                    <Suspense fallback={''}>
                        <Editor
                            assetsInfo={info?.assetsInfo}
                            value={info?.initData?.[activeLang]}
                            editable={false}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    );
}
