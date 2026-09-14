FROM golang:1.25-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 go build -o bin/calculator .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/bin/calculator ./bin/calculator
CMD ["./bin/calculator"]
