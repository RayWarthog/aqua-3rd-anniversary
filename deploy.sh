#!/usr/bin/env sh

# abort on errors

set -e

# build

npm run build

# navigate into the build output directory

cd dist

# Copy 404.html for gh pages
cp index.html 404.html

# if you are deploying to a custom domain

# echo 'www.example.com' > CNAME

git init

git branch -m gh-pages

git remote add origin https://github.com/RayWarthog/coco-graduation.git

git add -A

git commit -m 'deployment'

git push -u origin gh-pages

cd -
