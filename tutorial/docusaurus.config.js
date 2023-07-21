const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
    module.exports = {
        title: 'Express Documentation',
        tagline: 'Dinosaurs are cool',
        url: 'https://your-docusaurus-test-site.com',
        baseUrl: '/',
        onBrokenLinks: 'throw',
        onBrokenMarkdownLinks: 'warn',
        favicon: 'img/favicon.ico',
        organizationName: 'facebook', // Usually your GitHub org/user name.
        projectName: 'docusaurus', // Usually your repo name.

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
                    title: 'Uniweb Express',
                    logo: {
                        alt: 'Uniwebcms Logo',
                        src: 'img/logo.svg'
                    },
                    items: [
                        {
                            type: 'doc',
                            docId: 'intro',
                            position: 'left',
                            label: 'Documentation'
                        }
                    ]
                },
                footer: {
                    style: 'dark',
                    links: [
                        {
                            title: 'Docs',
                            items: [
                                {
                                    label: 'Documentation',
                                    to: '/docs/intro'
                                }
                            ]
                        }
                    ],
                    copyright: `Copyright © ${new Date().getFullYear()} @uniwebcms-express, Inc. Built with Docusaurus.`
                },
                prism: {
                    theme: lightCodeTheme,
                    darkTheme: darkCodeTheme
                }
            }),
        // Allows use of @theme/JSONSchemaEditor or @theme/JSONSchemaViewer
        themes: ['docusaurus-json-schema-plugin']
    }
);
