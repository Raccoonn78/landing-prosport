# syntax=docker/dockerfile:1

# ---------- Зависимости ----------
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---------- Разработка: Vite dev-сервер с горячей перезагрузкой ----------
FROM deps AS dev
ENV CHOKIDAR_USEPOLLING=true
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# ---------- Сборка production-версии ----------
FROM deps AS build
COPY . .
RUN npm run build

# ---------- Только готовые файлы (для выгрузки сборки в папку dist) ----------
FROM scratch AS dist
COPY --from=build /app/dist /

# ---------- Production: статика через nginx ----------
FROM nginx:1.29-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
