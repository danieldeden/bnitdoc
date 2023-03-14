// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const space = require("./space");
const plugins = require("./plugins");
const config = require('./config')

/** @type {import('@docusaurus/types').Config} */
module.exports = async function createConfig() {
  let remarkPlugins = (await plugins()).getRemarkPlugins();
  return {
    title: config.getConfig().title,
    tagline: config.getConfig().tagline,
    url: config.getConfig().url,
    baseUrl: config.getConfig().baseUrl,
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "favicon.ico",
    staticDirectories: ["site/static"].concat(
      space.getStaticAssetDirectoriesFromSpaces(space.getAllSpaces())
    ),
    organizationName: config.getConfig().organizationName,
    projectName: config.getConfig().projectName,
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
            remarkPlugins: remarkPlugins
          },
          theme: {
            customCss: [config.getConfig().customStyleSheet ? require.resolve("./site/" + config.getConfig().customStyleSheet) : require.resolve('./src/css/custom.css')]
          }
        }),
      ],
    ],

    customFields: {
      spaces: space.getAllSpaces(),
    },

    plugins: ["@lyrasearch/plugin-docusaurus"].concat(
      space.convertSpacesToPlugins(space.getAllSpaces(), remarkPlugins)
    ),
    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: config.getConfig().navbar.title,
          logo: {
            alt: "Logo",
            src: "logo.png",
          },
          items: (config.getConfig().showDefaultDocumentation ? [
            {
                label: "Bnitdoc",
                to: "/docs",
                items: [
                    {
                        label: "Setup",
                        to: "/docs/setup"
                    },
                    {
                        label: "Usage",
                        to: "/docs/usage"
                    }
                ]
            }
          ] : []).concat(space.convertSpacesToNavbarItems(space.getAllSpaces())),
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
              title: config.getConfig().footer.heading,
              items: config.getConfig().footer.items
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} ${config.getConfig().organizationName}.`,
        },
        /* prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        }, */
      }),
  };
};

// module.exports = config;
