FROM keymetrics/pm2:16-alpine

RUN mkdir -p /nuxt-app/.output
WORKDIR /nuxt-app/.output

COPY .output .
COPY ./ecosystem.config.js /nuxt-app

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000 

ENTRYPOINT ["pm2-runtime", "start", "/nuxt-app/ecosystem.config.js"]