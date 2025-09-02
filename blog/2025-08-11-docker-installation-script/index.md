---
title: Docker Quick Installation
slug: docker-quick-install
authors: piky
tags: [opinion, fyi, note]
keywords: [docker]
---
Docker is the most popular container platform. Here is the step for installation on Linux.
```sh
$ curl -fsSL https://get.docker.com | sh
$ sudo usermod -aG docker $USER && newgrp docker
```