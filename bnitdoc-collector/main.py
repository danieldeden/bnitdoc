#!/usr/bin/env python

import os
import time
import re

import yaml

import cmd
import git


MAIN_PATH = os.getcwd()
WORKSPACE_PATH = os.path.join(MAIN_PATH, "repos")
TEMP_PATH = os.path.join(MAIN_PATH, "temp")
TARGET_PATH = os.path.join(MAIN_PATH, "target")
MINUTES_TO_KEEP_FILES = 10


def get_name_from_repo_remote(repo):
    return repo.split("/")[-1].split(".")[0]


def create_folder(folder):
    if not os.path.exists(folder):
        os.makedirs(folder)


def setup_repos(git_repos, config):
    updated = False
    for key in git_repos:
        if key not in config['repos']:
            git_repos[key].remove()
            del git_repos[key]
            updated = True
    for repo_remote in config['repos']:
        if repo_remote not in git_repos:
            repo_name = get_name_from_repo_remote(repo_remote)
            repo_path = os.path.join(WORKSPACE_PATH, repo_name)
            repo = git.GitRepo(repo_path)
            git_repos[repo_remote] = {
                "repo": repo,
                "docs": config['repos'][repo_remote]
            }
        else:
            repo = git_repos[repo_remote]["repo"]
        repo_exists = repo.exists()
        if not repo_exists:
            print("Cloning {}".format(repo.getname()))
            repo.clone(repo_remote)
            print("Cloned {} successfully".format(repo.getname()))
            updated = True
    return updated


def update_repos(git_repos):
    updated = False
    for key in git_repos:
        repo = git_repos[key]["repo"]
        updated_this = repo.pull()
        updated = updated or updated_this
        if updated_this:
            print("Repository {} has new commits".format(repo.getname()))
    return updated


def aggregate_all(git_repos):
    for key in git_repos:
        repo = git_repos[key]["repo"]
        docs = git_repos[key]["docs"]
        for space_folder in docs:
            full_repo_space_folder = os.path.join(repo.getpath(), space_folder)
            space_name = space_folder.split("/")[-1]
            temp_space_folder = repo.getname()
            if space_name != "":
                temp_space_folder += "-" + space_name
            full_temp_space_folder = os.path.join(TEMP_PATH, temp_space_folder)
            cmd.run("cp -R {} {}".format(full_repo_space_folder, full_temp_space_folder))
    target_folder = str(int(time.time()))
    full_target_folder = os.path.join(TARGET_PATH, target_folder)
    cmd.run("mv {} {}".format(TEMP_PATH, full_target_folder))
    print("Created target {}".format(target_folder))


def clean_target_dir():
    content = os.listdir(TARGET_PATH)
    content.sort()
    content.reverse()
    first = True
    for folder in content:
        if re.search("^[0-9]*$", folder) is None:
            continue
        full_folder = os.path.join(TARGET_PATH, folder)
        if not os.path.isdir(full_folder):
            continue
        if first:
            first = False
            continue
        folder_int = int(folder)
        keep_time = int(time.time()) - (MINUTES_TO_KEEP_FILES * 60)
        if folder_int < keep_time:
            cmd.run("rm -r {} ".format(full_folder))
            print("Removed target {}".format(folder))


def handle_config(git_repos, config):
    updated_setup = setup_repos(git_repos, config)
    updated_update = update_repos(git_repos)
    if updated_setup or updated_update:
        aggregate_all(git_repos)


def main():
    print("Setting up environment")
    create_folder(WORKSPACE_PATH)
    create_folder(TARGET_PATH)
    git_repos = {}
    while True:
        create_folder(TEMP_PATH)
        with open("config/config.yaml", "r") as stream:
            try:
                config = yaml.safe_load(stream)
                handle_config(git_repos, config)
            except yaml.YAMLError as e:
                print(e)
        clean_target_dir()
        time.sleep(10)


main()
