FROM ruby as base

RUN gem install jekyll

FROM base as runtime

WORKDIR /app

CMD ["jekyll", "serve", "--drafts", "--incremental", "--watch", "--host", "0.0.0.0"]
