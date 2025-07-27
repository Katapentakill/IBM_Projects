# Build stage
FROM golang:1.18 AS builder

WORKDIR /app

COPY main.go .

RUN go mod init guestbook
RUN go mod tidy

RUN go build -o main main.go

# Final image
FROM ubuntu:18.04

# Copiamos el binario desde el builder
COPY --from=builder /app/main /app/guestbook

# Copiamos archivos estáticos
COPY public/index.html /app/public/index.html
COPY public/script.js /app/public/script.js
COPY public/style.css /app/public/style.css
COPY public/jquery.min.js /app/public/jquery.min.js

# Definimos el directorio de trabajo
WORKDIR /app

# Comando que se ejecutará al iniciar el contenedor
CMD ["./guestbook"]

# Exponemos el puerto 3000
EXPOSE 3000