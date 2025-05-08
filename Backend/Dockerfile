FROM php:8.2-apache

# Install required PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Enable Apache mod_rewrite (if needed)
RUN a2enmod rewrite

# Copy all source code into Apache's root directory
COPY . /var/www/html/

# Expose port 80 (default for Apache)
EXPOSE 80
