---
title: Cloning a Directory
slug: git-sparse-checkout
description: Checkout only a specific directory
tags: [git, merge, rebase, branch, version-control, vcs, source-control, scm]
keywords: [git, merge, rebase, branch, version-control, vcs, source-control, scm]
---
Git does not directly support cloning only a specific subdirectory from a repository.  
The git clone command always clones the entire repository, including its history and all files.  
However, you can achieve the effect of "cloning only a directory" using `sparse-checkout`. 

```sh
git clone --depth 1 --no-checkout https://github.com/open-telemetry/opentelemetry-demo.git
cd opentelemetry-demo
git sparse-checkout init --cone
git sparse-checkout set src/flagd-ui
git checkout
code .
```