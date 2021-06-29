$ErrorActionPreference = "Stop"

npm run build

Set-Location dist

# if you are deploying to a custom domain

# echo 'www.example.com' > CNAME

git init

git branch -m gh-pages

git remote add origin https://github.com/RayWarthog/coco-graduation.git

git add -A

git commit -m 'deployment'

git push -f -u origin gh-pages

Set-Location -
