import os
import re

pattern = re.compile(r"\W+")


def get_file(f):
    with open(os.path.join(os.path.dirname(__file__), f), "r") as fp:
        file = fp.read()

    return lambda name, clean: file.replace("<service_name>", clean).replace(
        "<name>", name
    )


get_graphql = get_file("defaults/schema.graphql")


get_dockerfile = get_file("defaults/Dockerfile")


get_k8 = get_file("defaults/k8s.yaml")


get_k8_db = get_file("defaults/k8s.db.yaml")


get_src_readme = get_file("defaults/src_readme.md")
