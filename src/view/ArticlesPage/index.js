import Articles from './Articles';
import Article from './Article';
import * as React from 'react';

export default function (props) {
    const {
        // browser: { CardsRoutes }
        website: {
            routingComponents: { RouteSwitcher }
        }
    } = props;

    return <RouteSwitcher {...{ Cards: Articles, Item: Article, ...props }}></RouteSwitcher>;
}
