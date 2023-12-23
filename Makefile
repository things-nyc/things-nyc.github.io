BOOTSTRAP_VERSION=5.2.3

BOOTSTRAP_URL=https://github.com/twbs/bootstrap/releases/download/v${BOOTSTRAP_VERSION}/bootstrap-${BOOTSTRAP_VERSION}-dist.zip
DEPENDS= \
	docs/js/bootstrap.bundle.min.js \
	docs/js/bootstrap.bundle.min.js.map \
	docs/css/bootstrap.min.css \
	docs/css/bootstrap.min.css.map

# Update dependencies, build container and start local web site
all: fetch
	${MAKE} up
up:
	docker compose up --build

build: fetch
	docker compose build

fetch: ${DEPENDS}

docs/js/bootstrap.bundle.min.js docs/js/bootstrap.bundle.min.js.map: _dl/bootstrap-${BOOTSTRAP_VERSION}-dist.zip
	cp -p _dl/bootstrap-${BOOTSTRAP_VERSION}-dist/js/bootstrap.bundle.min.js docs/js/bootstrap.bundle.min.js
	cp -p _dl/bootstrap-${BOOTSTRAP_VERSION}-dist/js/bootstrap.bundle.min.js.map docs/js/bootstrap.bundle.min.js.map

docs/css/bootstrap.min.css docs/css/bootstrap.min.css.map: _dl/bootstrap-${BOOTSTRAP_VERSION}-dist.zip
	cp -p _dl/bootstrap-${BOOTSTRAP_VERSION}-dist/css/bootstrap.min.css docs/css/bootstrap.min.css
	cp -p _dl/bootstrap-${BOOTSTRAP_VERSION}-dist/css/bootstrap.min.css.map docs/css/bootstrap.min.css.map

_dl/bootstrap-${BOOTSTRAP_VERSION}-dist.zip: _dl
	cd _dl && umask 0 && \
		wget -N -q ${BOOTSTRAP_URL} && \
		unzip -q -o bootstrap-${BOOTSTRAP_VERSION}-dist.zip
_dl:
	mkdir _dl
clean:
	-rm -rf docs/_site _dl
	-rm -f ${DEPENDS}

true: ;
