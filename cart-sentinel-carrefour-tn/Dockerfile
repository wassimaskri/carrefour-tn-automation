FROM mcr.microsoft.com/playwright:v1.45.3-jammy

WORKDIR /app

ENV BASE_URL=https://www.carrefour.tn \
    BROWSER=chromium \
    DEVICE=desktop \
    HEADLESS=true \
    DEFAULT_TIMEOUT_MS=15000 \
    STEP_TIMEOUT_MS=45000 \
    RETRY=1 \
    PARALLEL=1 \
    VIDEO=retain-on-failure \
    SCREENSHOT=only-on-failure \
    TRACE=retain-on-failure

RUN apt-get update \
  && apt-get install -y --no-install-recommends openjdk-17-jre \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npm", "run", "test:smoke"]
