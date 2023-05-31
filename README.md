# Distribute this A+

## Description

LambdaMart is an online distributed marketplace for purchasing *"THINGS"*. It is a distributed system that consists of a frontend, a broker, and a backend. The frontend allows users to browse. and purchase items, and was built using React and Gatsby. The broker is a GraphQL server that acts as a middleman between the frontend and the backend. The backend is a REST API using GraphQL that manages the items and vendors.

## How to run

To run LambdaMart:

- Ensure that Docker is installed (install [here](https://www.docker.com/))
- Ensure you are currently in the root directory (should see folders called “lambda-mart”, “veggie-gophers”, etc.)
- Run the following command:

```bash
docker-compose up --build
```

- After the build is complete, the website will be available through [`http://localhost:8000/`](http://localhost:8000/)

## Report

The report can be found in the root of the repository ([REPORT.pdf](https://gitlab.com/ucd-cs-rem/comp30220-2023/distribute-this-a/-/blob/d10d3394b6b67b0cc8ca0f1f2679738ab154a029/REPORT.pdf))

## Video

The video can be found [here]()

## Creating a new vendor using the template

To create a new vendor using the template tool:

- From the root directory, enter the command

    ```bash
    python ./template/main.py
    ```

- Enter the name of the vendor. This will create a new folder with a sanitised version of the vendor's name along with the necessary files

![Screenshot of template tool](https://gitlab.com/ucd-cs-rem/comp30220-2023/distribute-this-a/-/raw/main/assets/template-screenshot.png)

---
