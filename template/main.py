import os
import shutil
import re

from colorama import init as colorama_init
from colorama import Fore, Style
from defaults import *


def strong(s):
    return f"{Style.BRIGHT}{s}{Style.RESET_ALL}"


intro = f"""\n\n\
This command will create a new vendor for you in {strong(os.path.abspath(os.curdir))}\
with the values you provide in this setup. {strong("Let's answer some questions:")}\n\
"""

if __name__ == "__main__":
    colorama_init()

    splash = "Welcome to λ-Mart!".center(shutil.get_terminal_size().columns)
    print(f"{Style.BRIGHT}{Fore.LIGHTMAGENTA_EX}{splash}{Style.RESET_ALL}")

    print(intro)

    name = input(f"{Style.BRIGHT}What is the name of your store?{Style.RESET_ALL}\n> ")

    internal_name = name.strip().replace(" ", "_").lower()
    internal_name = re.sub(pattern, "", internal_name)

    def get_path(d, p=internal_name):
        return os.path.join(p, d)

    os.mkdir(internal_name)

    os.mkdir(get_path("db"))

    # Create source directory
    src_path = get_path("src")
    os.mkdir(src_path)

    with open(get_path("README.md", src_path), "w") as fp:
        fp.write(get_src_readme(name, internal_name))

    # Create graphql directory and files
    gql_path = get_path("graphql")
    os.mkdir(gql_path)

    with open(get_path("schema.graphql", gql_path), "w") as fp:
        fp.write(get_graphql(name, internal_name))

    # Create kubernetes directory and files
    k8s_path = get_path("k8s")
    os.mkdir(k8s_path)

    with open(get_path(f"{internal_name}.yaml", k8s_path), "w") as fp:
        fp.write(get_k8(name, internal_name))

    with open(get_path(f"{internal_name}.db.yaml", k8s_path), "w") as fp:
        fp.write(get_k8_db(name, internal_name))

    print(f"\nCreated template for {name} in {strong(os.path.abspath(internal_name))}")

    print(f"\n{Style.BRIGHT}{Fore.CYAN}Happy distributing{Style.RESET_ALL}")
