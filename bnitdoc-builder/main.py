import os
import time
import cmd


IMPORT_PATH = "import"
SPACES_PATH = "spaces"
BUILD_PATH = "build"
WWW_PATH = "www"


last_build = ""


def main():
    global last_build
    while True:
        content = os.listdir(IMPORT_PATH)
        content.sort()
        content.reverse()
        if len(content) > 0 and content[0] != last_build:
            full_import_path = os.path.join(IMPORT_PATH, content[0])
            cmd.run("rm -r {}".format(SPACES_PATH))
            cmd.run("cp -R {} {}".format(full_import_path, SPACES_PATH))
            cmd.run("npm run build")
            cmd.run("rm -r {}/*".format(WWW_PATH))
            cmd.run("mv {}/* {}".format(BUILD_PATH, WWW_PATH))
            last_build = content[0]
        time.sleep(10)


main()
