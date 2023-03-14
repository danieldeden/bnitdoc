import os

import cmd


class GitRepoExistsException(Exception):
    pass


class GitRepo:
    def __init__(self, path):
        self.path = path
        self.name = path.split("/")[-1].split(".")[0]

    def exists(self):
        return os.path.exists(self.path)

    def remove(self):
        cmd.run("rm -r \"{}\"".format(self.path))

    def getpath(self):
        return self.path

    def getname(self):
        return self.name

    def pull(self):
        output = cmd.run("git -C \"{}\" pull".format(self.path))
        if "Already up to date." in output:
            return False
        return True

    def clone(self, remote):
        if self.exists():
            raise GitRepoExistsException
        cmd.run("git clone {} {}".format(remote, self.path))
        cmd.run("git -C \"{}\" config pull.rebase false".format(self.path))

