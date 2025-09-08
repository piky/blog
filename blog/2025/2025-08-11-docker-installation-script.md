---
title: Docker Quick Installation
slug: docker-quick-install
authors: piky
tags: [opinion, fyi, note]
keywords: [docker]
---
The purpose of [the install script](https://github.com/docker/docker-install) is for a convenience for quickly installing the latest Docker-CE releases on the supported linux distros. It is not recommended to depend on this script for deployment to production systems.
```sh
$ curl -fsSL https://get.docker.com | sh
$ sudo usermod -aG docker $USER && newgrp docker
```