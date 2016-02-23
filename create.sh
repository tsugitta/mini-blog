#!/bin/sh

hyphenDelimitedDate=`date +%Y-%m-%d`

read -p "Title: " title
read -p "Description: " description

hiyphenDelimitedTitle=`echo $title | tr '[A-Z]' '[a-z]' | sed -e 's/ /-/g'`
fileName=$hyphenDelimitedDate-$hiyphenDelimitedTitle

cat > _posts/$fileName.md << EOS
---
title: $title
date: $hyphenDelimitedDate
description: $description
---

EOS

open -a sublime\ text _posts/$fileName.md
