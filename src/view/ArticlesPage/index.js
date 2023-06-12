import Articles from './Articles';
import Article from './Article';
import * as React from 'react';

export default function (props) {
    const {
        browser: { CardsRoutes }
    } = props;

    return <CardsRoutes {...{ Cards: Articles, Item: Article, ...props }}></CardsRoutes>;
}
