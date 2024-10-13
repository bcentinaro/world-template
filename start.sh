#! /bin/bash
bundle install 
npm install 
npx tinacms dev -p 5321 -c "bundle exec jekyll serve --watch --livereload --drafts --host 0.0.0.0 -P 4321"
