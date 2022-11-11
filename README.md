# things-nyc-www

Website for The Things Network New York.

Changes made here will be reflected on [`thethings.nyc`](https://thethings.nyc) upon being reviewed & pulled by the webmaster.

## Development

The site is static HTML generated from markdown with [jekyll](https://jekyllrb.com/).

If you don't want to install Ruby and jekyll you can use the Docker container. Install [Docker](https://www.docker.com/community-edition#/download) and [Docker-compose](https://docs.docker.com/compose/install/#install-compose). Clone the repo. Run `docker-compose up` from the project directory to start the container. The project directory is mounted as a volume in the container so you can edit the files with your normal editor. Jekyll will generate new HTML when you make changes. The container runs a web server [http://0.0.0.0:4000](http://0.0.0.0:4000) so you can preview your work.

```bash
git clone https://github.com/things-nyc/things-nyc.github.io.git
cd things-nyc.github.io
docker-compose build
docker-compose up
```

### Docker Troubleshooting

During the build, you may get the following error message:

```console
Err:1 http://security.debian.org/debian-security buster/updates InRelease
  Temporary failure resolving 'security.debian.org'
```

In that case, follow the suggestions from [StackOverflow](https://stackoverflow.com/questions/61567404/docker-temporary-failure-resolving-deb-debian-org):

* Try `sudo service docker restart`, then retry `docker-compose build`.
* If appropriate, try `sudo /etc/init.d/docker restart`, then retry `docker-compose build`
* Try rebooting the Linux system, then retry `docker-compose build`.

In our limited experience, the first step was enough.
