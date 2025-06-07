FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libonig-dev \
    nodejs npm \
    && docker-php-ext-install pdo_mysql zip mbstring

# Composer installieren
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Symlink für node (nur falls nötig)
RUN ln -s /usr/bin/nodejs /usr/bin/node || true

WORKDIR /var/www/html
