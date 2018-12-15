# things-nyc-www
Website for TheThingsNetwork NYC

Changes made here will be reflected on http://thethings.nyc upon being reviewed & pulled by the webmaster.

## Development

The site is static HTML generated from markdown with [jekyll](https://jekyllrb.com/).

If you don't want to install Ruby and jekyll you can use the Docker container. Install [Docker](https://www.docker.com/community-edition#/download) and [Docker-compose](https://docs.docker.com/compose/install/#install-compose). Clone the repo. Run `docker-compose up` from the project directory to start the container. The project directory is mounted as a volume in the container so you can edit the files with your normal editor. Jekyll will generate new HTML when you make changes. The container runs a web server http://0.0.0.0:4000 so you can preview your work.

```
git clone https://github.com/things-nyc/things-nyc.github.io.git
cd things-nyc.github.io
docker-compose up
```
