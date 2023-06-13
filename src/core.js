import { website, Profile } from '@uniwebcms/module-sdk';
import React, { lazy } from 'react';

export { website, Profile };

export const localize = website.localize;
export const getComponent = (type, name) => lazy(() => uniweb.getComponent(type, name));
