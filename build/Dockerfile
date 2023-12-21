FROM ruby:2.7.3-alpine

ENV \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8

COPY Gemfile Gemfile.lock /src/gh/pages-gem/

# one step to exclude .build_deps from docker cache
RUN \
    echo "*** Install build dependencies ***" && \
    apk update && apk add --no-cache git && \
    echo "*** Install required packages ***" && \
    apk add --no-cache --virtual .build_deps make build-base && \
    echo "*** Build jekyl ***" && \
    bundle config local.github-pages /src/gh/pages-gem && \
    bundle install --gemfile=/src/gh/pages-gem/Gemfile && \
    echo "*** Clean up build dependencies ***" && \
    apk del .build_deps

WORKDIR /src/site

CMD ["jekyll", "serve", "-H", "0.0.0.0", "-P", "4000"]
