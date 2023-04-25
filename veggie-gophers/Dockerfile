# veggie-gophers/Dockerfile
FROM golang:1.20 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o veggie-gophers

FROM gcr.io/distroless/base-debian10

COPY --from=builder /app/veggie-gophers /app/veggie-gophers

EXPOSE 8080

ENTRYPOINT ["/app/veggie-gophers"]