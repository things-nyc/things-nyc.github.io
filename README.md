# things-nyc-www

Website for The Things Network New York.

Changes made here will be reflected on [`thethings.nyc`](https://thethings.nyc) upon being reviewed & pulled by the webmaster.

## Development

The site is static HTML generated from markdown with
[jekyll](https://jekyllrb.com/), using the [Bootstrap
5](https://getbootstrap.com/docs/5.2/getting-started/introduction/) framework.

Website pages live in the `docs` directory.

### Updating the web pages

XXX - Add some notes about the layout of the directory and what to
modify.

XXX - Add notes on how to add a blog entry.

### Running under docker

#### TL;DR

```bash
git clone https://github.com/things-nyc/things-nyc.github.io.git
cd things-nyc.github.io
make
# Open http://localhost:4000 in your browser
# Edit files in docs/
# Commit your changes and push to a branch
# Create a Pull Request on Github
```

#### Notes

The `_dl` and `_site` directories are temporary, created by the fetch
and build process, any changes there will be overwritten.
Use
```bash
make clean
```
to delete them.
They will not saved to github.

To update a JavaScript package, update the version info in the
`Makefile` and
```bash
make clean fetch
```

#### Details

If you don't want to install Ruby and Jekyll (hint: you don't) you can use the Docker container.
Install [Docker](https://www.docker.com/community-edition#/download) and [Docker-compose](https://docs.docker.com/compose/install/#install-compose).
Clone the repo.
Run `docker-compose up` from any project directory to start the container.
The project directory is mounted as a volume in the container so you can edit the files with your normal editor.
Jekyll will automatically generate new HTML when you make changes.
The container runs a web server [http://0.0.0.0:4000](http://0.0.0.0:4000) so you can preview your work.

### Docker Troubleshooting

During the build, you may get DNS failures similar to:

```console
Err:1 http://security.debian.org/debian-security buster/updates InRelease
  Temporary failure resolving 'security.debian.org'
```

In that case, follow the suggestions from [StackOverflow](https://stackoverflow.com/questions/61567404/docker-temporary-failure-resolving-deb-debian-org):

* Try `sudo service docker restart`, then retry `docker-compose build`.
* If appropriate, try `sudo /etc/init.d/docker restart`, then retry `docker-compose build`
* Try rebooting the Linux system, then retry `docker-compose build`.

In our limited experience, the first step was enough.


