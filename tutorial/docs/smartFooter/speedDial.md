---
sidebar_position: 3
sidebar_label: Speed Dial
---

import CodeBlock from '@theme/CodeBlock';
import JSFormViewer from '../../src/components/JSViewer.js';
import Options from "@site/static/schemas/smartFooter/speedDial/options.json";
import Gallery from '../../src/components/Gallery.js';

# Speed Dial Footer

Render a footer that can preview the content of other pages.

<Gallery images={['/img/smartFooter/speedDial/outcome.png']} sizes={[[1224, 562]]} />

### Options
<JSFormViewer schema={ Options } />

#### Option example
```json
maxCol: 4,
maxCount: 3,
bannerRound: 'none',
bannerShape: 'rect'
```