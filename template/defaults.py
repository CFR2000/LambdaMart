import os
import re

from colorama import Fore, Back, Style
from defaults import *

pattern = re.compile(r"\W+")

logo = f"""{Style.BRIGHT}{Back.BLUE}{Fore.WHITE}\
   __                 _         _                         _   
  / /  __ _ _ __ ___ | |__   __| | __ _  /\/\   __ _ _ __| |_ 
 / /  / _` | '_ ` _ \| '_ \ / _` |/ _` |/    \ / _` | '__| __|
/ /__| (_| | | | | | | |_) | (_| | (_| / /\/\ \ (_| | |  | |_ 
\____/\__,_|_| |_| |_|_.__/ \__,_|\__,_\/    \/\__,_|_|   \__|
{Style.RESET_ALL}"""


def get_file(f):
    with open(os.path.join(os.path.dirname(__file__), f), "r") as fp:
        return fp.read()


def get_graphql(name, clean_name):
    return get_file("defaults/schema.graphql")


def get_dockerfile(name, clean_name):
    return get_file("defaults/Dockerfile")


def get_k8(name, clean_name):
    return get_file("defaults/k8s.yaml").replace("<service_name>", clean_name)


def get_k8_db(name, clean_name):
    return get_file("defaults/k8s.db.yaml").replace("<service_name>", clean_name)


def get_src_readme(name, clean_name):
    return get_file("defaults/src_readme.md").replace("<name>", name)
