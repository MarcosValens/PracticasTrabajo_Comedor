FROM httpd:2.4
WORKDIR /usr/local/apache2/htdocs/
COPY spa/ ./
RUN ls -la
EXPOSE 80