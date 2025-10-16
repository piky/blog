---
title: Observability 2.0
slug: observability-2_0
description: Correlation signal with OTel Collector and SigNoz
tags: [container, kubernetes, cloud, cloud-native, iac, devops, sre, platform-engineering, opentelemetry,signal, oltp, metrics, logs, traces]
keywords: [container, kubernetes, cloud, cloud-native, iac, opentelemetry, signal, oltp, metrics, logs, traces]
---
## Prerequisite
### Kubernetes cluster for deploying demo application
:::tip references
- [Create KinD cluster](https://blog.khainui.com/docs/software-engineering/dev-environment/kind-kubernetes-in-docker/develop-and-deploy-cloud-native-applications-with-kind)
:::
```sh
kind create cluster
```
### SigNoz
:::tip reference
[Deploy SigNoz on Kubernetes with Helm](https://signoz.io/docs/install/kubernetes/)
:::
Create custom Helm values file:
```yaml title="signoz-custom-values.yaml"
global:
  storageClass: standard

clickhouse:
  installCustomStorageClass: true
```
```sh
helm repo add signoz https://charts.signoz.io
helm repo update
helm install signoz signoz/signoz \
   --namespace signoz --create-namespace \
   --wait \
   --timeout 1h \
   -f signoz-custom-values.yaml
```
### Code Instrumentation applications
:::tip references
- [Getting Started with OpenTelemetry(LFS148)](https://training.linuxfoundation.org/training/getting-started-with-opentelemetry-lfs148/)
- [OpenTelemetry Demo repository](https://github.com/open-telemetry/opentelemetry-demo)  
- [Deploy Demo app](https://opentelemetry.io/docs/demo/kubernetes-deployment/)
:::
## Configure OTel Collector using OTLP
```yaml title="my-values-file.yaml"
opentelemetry-collector:
  config:
    exporters:
      otlp:
        endpoint: "signoz-otel-collector.signoz.svc.cluster.local:4317"
        tls:
          insecure: true

    service:
      pipelines:
        metrics:
          exporters: [otlp]
        traces:
          exporters: [spanmetrics, otlp]
        logs:
          exporters: [otlp]
```
```sh
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
helm install my-otel-demo open-telemetry/opentelemetry-demo --values my-values-file.yaml --version 0.37.8
```
:::warning
As of writing, Helm chart v0.38+ which bundled the OTEL DEMO v2.1.3 with `flagd-ui` service has Out-of-Memory issue.
- [OpenTelemetry Helm chart repository](https://github.com/open-telemetry/opentelemetry-helm-charts)
:::
## Root cause analysis with Signal Correlation using SigNoz
:::tip references
[Exploring OpenTelemetry Demo Application with SigNoz](https://signoz.io/blog/opentelemetry-demo/#debugging-real-life-scenarios-with-signoz-simulated-by-the-otel-demo-app)
:::
![Service Map of OTEL DEMO app](https://pub-44a464d4394a43d6834ffdc08038cb38.r2.dev/docs/otel-demo-service-map.gif)