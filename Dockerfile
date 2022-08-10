FROM node:16.16.0

WORKDIR /app

EXPOSE 4000

COPY . .

RUN npm i

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait

RUN chmod +x /wait

CMD /wait && npm i && npx prisma migrate dev && npm run dev