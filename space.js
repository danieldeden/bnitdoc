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
        path: spacesPath + directory,
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
    return spaceConfig
  },
  getStaticAssetDirectoriesFromSpaces(spaces) {
    let staticDirectories = []
    spaces.forEach(space => {
      staticDirectories.push(space.directory + "/static")
    })
    return staticDirectories
  },
  convertSpacesToPlugins(spaces) {
    let plugins = []
    spaces.forEach(space => {
      
      let sidebarPath = space.directory + '/sidebars.js'
      let config = {
        id: space.config.slug,
        path: space.directory + "/docs",
        routeBasePath: space.path
      }

      if (fs.existsSync(sidebarPath)) {
        config.sidebarPath = require.resolve(sidebarPath)
      }

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
        to: space.path,
        label: space.alias,
        position: 'left'
      }
      navbarItems.push(navbarItem)
    })
    return navbarItems
  }
}