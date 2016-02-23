#!/bin/zsh
setopt KSH_ARRAYS BASH_REMATCH

newPostsCount=$(git status -s | grep '??' | grep md | cut -d " " -f 2 | wc -l)

if [ $newPostsCount -ne 1 ]; then
  echo 'error: Check that there is only one new post.'
  exit 1
fi

newPost=$(git status -s | grep '??' | grep md | cut -d " " -f 2)
titleLine=`sed -n 2p $newPost`

if [[ ! $titleLine =~ "title: (.+)" ]]; then
  echo "error: Check the format of $newPost"
  exit 1
fi

title=${BASH_REMATCH[1]}

git add $newPost

echo 'Committing..'
git commit -m "Post '$title'"

echo 'Pushing..'
git push origin master
