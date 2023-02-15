const fs = require("fs");

let config = undefined

module.exports = {
    getConfig() {
        if (config) {
            return config
        }
        if (!fs.existsSync("./site/config.json")) {
            return {};
        }
        config = JSON.parse(fs.readFileSync("./site/config.json"));
        return config
    }
}
