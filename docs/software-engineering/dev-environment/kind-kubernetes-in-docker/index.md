---
title: Develop and Deploy Cloud Native Applications with KinD
slug: develop-and-deploy-cloud-native-applications-with-kind
description: Create a multi-nodes Kubernetes cluster with KinD
sidebar_position: 4
tags: [kind, kubernetes, k8s, cluster, docker, container, container-runtime, cloud-native, application, cncf, development, paas]
keywords: [kind, kubernetes, k8s, cluster, docker, container, container-runtime, cloud-native, application, cncf, development, paas]
---
# Kubernetes in Docker - local clusters for testing Kubernetes
:::tip tl;dr
```sh
$ go install sigs.k8s.io/kind@v0.30.0 && time kind create cluster
```
:::
[kind](https://kind.sigs.k8s.io/) - Kubernetes in Docker, is a tool for running local Kubernetes clusters using Docker container “nodes”.
kind was primarily designed for testing Kubernetes itself, but may be used for local development or CI, as well as proof-of-concept before upgrade current running cluster in production.  

## Features
- Spin up, tear down and rebuild clusters in seconds—literally.
- Runs with limited compute resources : a single CPU core and 1 GB of RAM is already enough.
- supports multi-node (including HA) clusters; of course, more nodes need more resources.
- Pick whichever Kubernetes version you’d like to test.
- Built-in [Load Balancer: Cloud Provider KIND](https://github.com/kubernetes-sigs/cloud-provider-kind), Ingress, and [Gateway API](https://gateway-api.sigs.k8s.io/).
- Supports Linux, macOS and Windows.

## Pre-requisite
Installing [Go](https://go.dev/doc/install)  
Installing [Docker](/blog/docker-quick-install)  
Installing [kubectl](https://kubernetes.io/docs/tasks/tools/)  
Installing [Helm CLI](https://helm.sh/docs/intro/install/) and  
Installing [Cilium CLI](https://github.com/cilium/cilium-cli)

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
## Advanced Usage
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

### L3/L7 Traffic Management
:::warning PRE-REQUISITE
If you plan to enable Cilium Gateway API feature, the Gateway API CRDs must be installed first.
:::

<details>
<summary>Recommended : Kubernetes Gateway API</summary>

[Gateway API](https://github.com/kubernetes-sigs/gateway-api) is ideal for large-scale cluster (i.e. 10+ workers and 100+ services). In addition to drop-in traditional Ingress Controller features, it also supports HTTP2/gRPC/WebSocket.  

**Install Gateway API CRDs**:
```sh
$ kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.3.0/standard-install.yaml
```
Ensure that installation was successfully.
```sh
$ kubectl get crd gatewayclasses.gateway.networking.k8s.io
```
</details>

<details>
<summary>Optional : Ingress Controller</summary>

```sh
$ kubectl apply -f https://kind.sigs.k8s.io/examples/ingress/deploy-ingress-nginx.yaml
```
```sh
$ kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s
```
```sh
$ kubectl apply -f https://kind.sigs.k8s.io/examples/ingress/usage.yaml
```
```sh
$ kubectl -n ingress-nginx get services
```
</details>

**Install Cilium CNI:**
```sh
$ cilium install --set kubeProxyReplacement=true --set gatewayAPI.enabled=true && cilium status --wait
```
**Verify installation successfully:**
```sh
$ cilium config view
```
```sh
$ kubectl get nodes -o wide
```

### L2 Load-balancer
![Simple Gateway](https://gateway-api.sigs.k8s.io/images/single-service-gateway.png)
<details>
<summary>Option 1 : using Cloud Provider KIND</summary>
<p>
[Cloud Provider KIND](https://github.com/kubernetes-sigs/cloud-provider-kind) brings up the Kubernetes service of type `LoadBalancer` working in a KinD cluster.  
To install it using Go:  
```sh
$ go install sigs.k8s.io/cloud-provider-kind@latest
```
```sh
$ sudo install ~/go/bin/cloud-provider-kind /usr/local/bin
```
Run Cloud Provider KIND as a foreground process.
```sh
$ tmux new -s cloud-provider-kind
```
```sh
$ cloud-provider-kind
```
</p>
</details>

<details>
<summary>Option 2 : using MetalLB</summary>
<p>

**Install MetalLB:**
```sh
$ helm repo add metallb https://metallb.github.io/metallb
```
```sh
$ helm install metallb metallb/metallb --namespace metallb-system --create-namespace
```
Wait til all pod **STATUS** are **READY** then configure MetalLB.
```sh
$ kubectl wait --namespace metallb-system --for=condition=ready pod --selector=app.kubernetes.io/name=metallb --timeout=240s
```
**Configure MetalLB:**  
Get Docker network that KinD is running on:
```sh
$ docker network inspect kind | jq .[].IPAM.Config
```
<details>
<summary>Output</summary>
```json
[
  {
    "Subnet": "172.18.0.0/16",
    "Gateway": "172.18.0.1"
  },
  {
    "Subnet": "fc00:f853:ccd:e793::/64",
    "Gateway": "fc00:f853:ccd:e793::1"
  }
]
```
</details>

Create an IPAddressPool Resource.
```yaml title="metallb-config.yaml"
---
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: kind-pool
  namespace: metallb-system
spec:
  addresses:
  - 172.18.255.1-172.18.255.254 # Use the last IPv4 subnet CIDR from the docker command.
  autoAssign: true
  avoidBuggyIPs: false
---
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: lb
  namespace: metallb-system
spec:
  ipAddressPools:
  - kind-pool
```
```sh
$ kubectl apply -f metallb-config.yaml
```
<details>
<summary>To verify:</summary>
```sh
$ kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
```
```sh
$ kubectl expose deployment/kubernetes-bootcamp --type="LoadBalancer" --port 8080
```
```sh
$ EXTERNAL_IP=$(kubectl get svc kubernetes-bootcamp -o json | jq -r '.status.loadBalancer.ingress[0].ip')
```
```sh
$ curl http://$EXTERNAL_IP:8080/
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-658f6cbd58-mnrnx | v=1
```
</details>
</p>
</details>


### Real-world Scenario
![Basic HTTP Routing](https://cdn.sanity.io/images/xinsvxfu/production/a4b92641ecd979505f42a7d97fed253a9f365331-2630x1176.png?auto=format&q=80&fit=clip&w=2560)
<details>
<summary>Deploying Bookinfo Demo Applications</summary>

Verify success by installing Istio's Bookinfo applications and Cilium's Gateway with HTTPRoutes:
```sh
$ kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.27/samples/bookinfo/platform/kube/bookinfo.yaml
```
```sh
$ kubectl apply -f https://raw.githubusercontent.com/cilium/cilium/1.18.0/examples/kubernetes/gateway/basic-http.yaml
```
```sh
$ kubectl get svc cilium-gateway-my-gateway 
NAME                        TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)        AGE
cilium-gateway-my-gateway   LoadBalancer   10.96.190.51   172.18.255.1   80:32243/TCP   30s
```
```sh
$ kubectl get gateway
NAME         CLASS    ADDRESS        PROGRAMMED   AGE
my-gateway   cilium   172.18.255.1   True         98s
```
```sh
$ GATEWAY=$(kubectl get gateway my-gateway -o jsonpath='{.status.addresses[0].value}')
```
```sh
$ curl -v -H 'magic: foo' http://"$GATEWAY"\?great\=example
```
```sh
$ curl --fail -s http://$GATEWAY/details/1 | jq .
```
<details>
<summary>Output</summary>
```json
{
  "id": 1,
  "author": "William Shakespeare",
  "year": 1595,
  "type": "paperback",
  "pages": 200,
  "publisher": "PublisherA",
  "language": "English",
  "ISBN-10": "1234567890",
  "ISBN-13": "123-1234567890"
}
```
</details>
</details>

<details>
<summary>HTTPS with self-signed TLS certificate</summary>

**Create a certificate:**
```sh
$ mkcert '*.cilium.rocks'
```
<details>
<summary>Output</summary>  
```
Created a new local CA 💥  
Note: the local CA is not installed in the system trust store.  
Run "mkcert -install" for certificates to be trusted automatically ⚠️

Created a new certificate valid for the following names 📜
 - "*.cilium.rocks"

Reminder: X.509 wildcards only go one level deep, so this won't match a.b.cilium.rocks ℹ️

The certificate is at "./_wildcard.cilium.rocks.pem" and the key at "./_wildcard.cilium.rocks-key.pem" ✅

It will expire on 18 December 2027 🗓
```
</details>

**Let's now create a Kubernetes TLS secret** with this key and certificate:
```sh
$ kubectl create secret tls ca --key=_wildcard.cilium.rocks-key.pem --cert=_wildcard.cilium.rocks.pem
```

**Deploy Gateway for HTTPS traffic**
```sh
$ kubectl apply -f https://raw.githubusercontent.com/cilium/cilium/1.18.2/examples/kubernetes/gateway/basic-https.yaml
```

**Edit the /etc/hosts file**
```sh
$ GATEWAY_IP=$(kubectl get gateway tls-gateway -o jsonpath='{.status.addresses[0].value}')
```
```sh
$ cat << EOF >> /etc/hosts
${GATEWAY_IP} bookinfo.cilium.rocks
${GATEWAY_IP} hipstershop.cilium.rocks
EOF
```

**Install self-signed certificates**
```sh
$ mkcert -install
```
**Ensure that HTTPS works**
```sh
$ curl -s https://bookinfo.cilium.rocks/details/1 | jq .
```
</details>

:::tip SSH TUNNEL
Chances are you running KinD on a remote host and need to send traffic to KinD node IPs from a different host than where KinD is running.  

**On remote KinD host:**  
Get load-balancer IP of the service exposing by KinD node.
```sh
$ LB_IP=$(kubectl get svc cilium-gateway-my-gateway -o json | jq -r '.status.loadBalancer.ingress[0].ip')
```
*Replace `cilium-gateway-my-gateway` with your intended service. Run `$ kubectl get svc` if not sure. 
```sh 
$ echo $LB_IP
```
**On local SSH client:**
```sh
$ ssh -L 8080:<$LB_IP>:80 username@<SSH-SERVER>
```
:::

:::danger Cleanup
## Delete KinD Cluster
```sh
$ kind delete cluster
```
:::