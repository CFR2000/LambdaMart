FROM golang:1.20

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o main .

# COPY wait-for-postgres.sh wait-for-postgres.sh
# RUN chmod +x wait-for-postgres.sh

# CMD ["./wait-for-postgres.sh", "veggie-gophers-db:5432", "./main"]
CMD ["./main"]