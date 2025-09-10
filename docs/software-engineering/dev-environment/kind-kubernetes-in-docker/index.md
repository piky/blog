---
title: Develop and Deploy Cloud Native Applications with KinD
slug: develop-and-deploy-cloud-native-applications-with-kind
description: Create a multi-nodes Kubernetes cluster with KinD
sidebar_position: 4
tags: [kind, kubernetes, k8s, cluster, docker, container, container-runtime, cloud-native, application, cncf, development, paas]
keywords: [kind, kubernetes, k8s, cluster, docker, container, container-runtime, cloud-native, application, cncf, development, paas]
---
# Kubernetes IN Docker - local clusters for testing Kubernetes
:::tip tl;dr
```sh
$ go install sigs.k8s.io/kind@v0.30.0 && time kind create cluster
```
:::
[kind](https://kind.sigs.k8s.io/) - Kubernetes in Docker, is a tool for running local Kubernetes clusters using Docker container “nodes”.
kind was primarily designed for testing Kubernetes itself, but may be used for local development or CI.  

## Features
- Spin up, tear down and rebuild clusters in seconds—literally.
- Runs with limited compute resources : a single CPU core and 1 GB of RAM is already enough.
- supports multi-node (including HA) clusters; of course, more nodes need more resources.
- Pick whichever Kubernetes version you’d like to test.
- Built-in [Load Balancer: Cloud Provider KIND](https://github.com/kubernetes-sigs/cloud-provider-kind), Ingress, and [Gateway API](https://gateway-api.sigs.k8s.io/).
- Supports Linux, macOS and Windows.

## Pre-requisite
**Required** : Installing [Docker](/blog/docker-quick-install)  
**Required** : Installing [kubectl](https://kubernetes.io/docs/tasks/tools/) and  
**Recommended** : Installing [Helm CLI](https://helm.sh/docs/intro/install/)

## Install KinD
Follow the instructions of KinD [official GitHub Repo](https://github.com/kubernetes-sigs/kind) or [Quick Start guide](https://kind.sigs.k8s.io/docs/user/quick-start/) for platform specific.
:::info MacOS
```sh
$ brew install kind
```
:::

:::tip Linux AMD64 / x86_64
```sh
$ [ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.30.0/kind-$(uname)-amd64
$ chmod +x ./kind
$ sudo mv ./kind /usr/local/bin/kind
```
:::

## Create a single node cluster with specific Kubernetes version
```sh
$ kind create cluster --image kindest/node:v1.33.4
```
## The most effective usage of KinD
Use a configuration file for advanced scenarios: For more complex configurations, such as multi-node clusters or custom networking, you can define the image in a YAML configuration file.

### Create a cluster with standard Kubernetes API server address and port
```yaml title="kind-config.yaml"
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
networking:
  apiServerAddress: "0.0.0.0" # Binds to all interfaces
  apiServerPort: 6443 # Default Kubernetes API port
```
Save file and issue command. 
```sh
$ kind create cluster --config kind-config.yaml
```

### Create multi-nodes cluster
```yaml title="kind-multi-nodes-config.yaml"
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
    image: kindest/node:v1.34
- role: worker
    image: kindest/node:v1.34
- role: worker
    image: kindest/node:v1.34
- role: worker
    image: kindest/node:v1.34
```
Now you're all set to create cluster :
```sh
$ kind create cluster --config kind-multi-nodes-config.yaml
```

### Create a multi-node HA cluster with Cilium CNI
```yaml title="kind-no-proxy-config.yaml"
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: control-plane
- role: worker
- role: worker
- role: worker
networking:
  disableDefaultCNI: true
  kubeProxyMode: none
```
Then create an HA cluster without kube-proxy:
```sh
$ kind create cluster --config kind-no-proxy-config.yaml
```

Install Cilium CNI using Helm
```sh
 $ helm install cilium cilium/cilium \
    --namespace kube-system \
    --set=ipam.mode=kubernetes \
    --set=kubeProxyReplacement=true \
    --set=securityContext.capabilities.ciliumAgent="{CHOWN,KILL,NET_ADMIN,NET_RAW,IPC_LOCK,SYS_ADMIN,SYS_RESOURCE,DAC_OVERRIDE,FOWNER,SETGID,SETUID}" \
    --set=securityContext.capabilities.cleanCiliumState="{NET_ADMIN,SYS_ADMIN,SYS_RESOURCE}" \
    --set=cgroup.autoMount.enabled=false \
    --set=cgroup.hostRoot=/sys/fs/cgroup \
    --set=k8sServiceHost=localhost \
    --set=k8sServicePort=7445
```
## Cleanup
```sh
$ kind delete cluster
```