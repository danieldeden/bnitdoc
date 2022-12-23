const fs = require('fs')

const getDirectories = (path) => {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory();
  });
}

const spacesPath = "/spaces/"
const spacesDirectory = "./spaces/"

module.exports = {
  getAllSpaces() {
    let spaces = []
    getDirectories(spacesDirectory).forEach(directory => {
      var space = {
        // path: spacesPath + directory, maybe add back later, idk
        directory: spacesDirectory + directory
      }
      space.config = this.getSpaceConfiguration(space)
      spaces.push(space)
    });
    return spaces;
  },
  getSpaceConfiguration(space) {
    if (!fs.existsSync(space.directory + "/config.json")) {
      return {}
    }
    let rawdata = fs.readFileSync(space.directory + "/config.json")
    let spaceConfig = JSON.parse(rawdata);
    // TODO: ADD VALIDATION
    return spaceConfig
  },
  getStaticAssetDirectoriesFromSpaces(spaces) {
    let staticDirectories = []
    spaces.forEach(space => {
      staticDirectories.push(space.directory + "/static")
    })
    return staticDirectories
  },
  convertSpacesToPlugins(spaces, remarkPlugins) {
    let plugins = []
    spaces.forEach(space => {
      let sidebarPath = space.directory + '/sidebars.js'
      let config = {
        id: space.config.slug,
        path: space.directory + "/docs",
        routeBasePath: spacesPath + space.config.slug,
        remarkPlugins: remarkPlugins,
        sidebarPath: require.resolve('./sidebars.js')
      }
      if (fs.existsSync(sidebarPath)) {
        config.sidebarPath = require.resolve(sidebarPath)
      }
      console.log(config)
      let plugin = [
        '@docusaurus/plugin-content-docs',
        config
      ]
      plugins.push(plugin)
    })
    return plugins
  },
  convertSpacesToNavbarItems(spaces) {
    let navbarItems = []
    spaces.forEach(space => {
      let navbarItem = {
        label: space.config.name,
        position: 'left',
        to: spacesPath + space.config.slug
      }
      navbarItems.push(navbarItem)
    })
    return navbarItems
  }
}