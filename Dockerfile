FROM httpd:2.4
WORKDIR /usr/local/apache2/
RUN cd conf/
RUN echo "LoadModule rewrite_module modules/mod_rewrite.so" >> httpd.conf
RUN echo "RewriteEngine On" >> httpd.conf
RUN echo "RewriteBase /" >> httpd.conf
RUN echo "RewriteRule ^index\.html$ - [L]" >> httpd.conf
RUN echo "RewriteCond %{REQUEST_FILENAME} !-f" >> httpd.conf
RUN echo "RewriteCond %{REQUEST_FILENAME} !-d" >> httpd.conf
RUN echo "RewriteRule . /index.html [L]" >> httpd.conf
RUN cd ../
COPY spa/ ./htdocs
RUN ls -la
EXPOSE 80
