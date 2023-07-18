import React, { Suspense } from 'react';
import { getComponent, twJoin } from '@uniwebcms/module-sdk';
import Container from '../../basic/Container';

const Editor = getComponent(null, 'ArticleEditor');

export default function Section(props) {
    const { block, page, website } = props;

    const { content, theme } = block;

    return (
        <Container className={twJoin('py-12 sm:py-24', theme)}>
            <Suspense fallback={''}>
                <Editor
                    contentId={page.getPageId()}
                    value={website.parseLinksInArticle(content)}
                    editable={false}
                />
            </Suspense>
        </Container>
    );
}
