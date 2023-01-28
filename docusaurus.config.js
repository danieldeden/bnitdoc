// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const space = require("./space");
const plugins = require("./plugins");

/** @type {import('@docusaurus/types').Config} */
module.exports = async function createConfig() {
  let remarkPlugins = (await plugins()).getRemarkPlugins();
  return {
    title: "BnearIT Developer Documentation",
    tagline: "Developer documentation made for and by BnearIT developers",
    url: "https://your-docusaurus-test-site.com",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    staticDirectories: ["static"].concat(
      space.getStaticAssetDirectoriesFromSpaces(space.getAllSpaces())
    ),

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "BnearIT", // Usually your GitHub org/user name.
    projectName: "bnitdoc", // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: "en",
      locales: ["en"],
    },
    presets: [
      [
        "classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            remarkPlugins: remarkPlugins,
            editUrl:
              "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          },
        }),
      ],
    ],

    customFields: {
      spaces: space.getAllSpaces(),
    },

    plugins: [].concat(
      space.convertSpacesToPlugins(space.getAllSpaces(), remarkPlugins)
    ),
    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: "Developer Documentation",
          logo: {
            alt: "BnearIT Logo",
            src: "img/it.png",
          },
          items: [
            {
              label: "All Spaces",
              to: "/spaces",
            },
          ].concat(space.convertSpacesToNavbarItems(space.getAllSpaces())),
        },
        footer: {
          links: [
            {
              title: "Spaces",
              items: [].concat(
                space.convertSpacesToFooterItems(space.getAllSpaces())
              ),
            },
            {
              title: "More",
              items: [
                {
                  label: "BnearIT Homepage",
                  to: "https://www.bnearit.se",
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} BnearIT, AB.`,
        },
        /* prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        }, */
      }),
  };
};

// module.exports = config;
