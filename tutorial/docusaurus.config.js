const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
    module.exports = {
        title: 'Express Documentation',
        tagline: 'Tutorial of Uniwebcms express',
        url: 'https://uniwebcms.github.io',
        baseUrl: '/express/',
        onBrokenLinks: 'warn',
        onBrokenMarkdownLinks: 'warn',
        favicon: 'img/favicon.png',
        organizationName: 'uniwebcms',
        projectName: 'express',
        trailingSlash: false,
        presets: [
            [
                '@docusaurus/preset-classic',
                /** @type {import('@docusaurus/preset-classic').Options} */
                ({
                    docs: {
                        sidebarPath: require.resolve('./sidebars.js'),
                        // Please change this to your repo.
                        editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/'
                    },
                    blog: {
                        showReadingTime: true,
                        // Please change this to your repo.
                        editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/blog/'
                    },
                    theme: {
                        customCss: require.resolve('./src/css/custom.css')
                    }
                })
            ]
        ],

        themeConfig:
            /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
            ({
                navbar: {
                    title: 'Express',
                    logo: {
                        alt: 'UNIWEB Logo',
                        src: 'img/uniweb_black.svg',
                        srcDark: 'img/uniweb_white.svg',
                        width: 120,
                        style: { marginRight: '18px' }
                    },
                    items: [
                        {
                            type: 'doc',
                            docId: 'articles',
                            position: 'left',
                            label: 'Components'
                        }
                    ]
                },
                footer: {
                    style: 'dark',
                    logo: {
                        alt: 'UNIWEB Logo',
                        src: 'img/uniweb_white.svg',
                        width: 160,
                        height: 51
                    },
                    links: [
                        {
                            label: 'Home',
                            to: '/'
                        },
                        {
                            label: 'Components',
                            to: '/docs/articles'
                        }
                    ],
                    copyright: `Copyright © ${new Date().getFullYear()} @uniwebcms-express, Inc. Built with Docusaurus.`
                },
                prism: {
                    theme: lightCodeTheme,
                    darkTheme: darkCodeTheme
                }
            })
    }
);
