---
title: Cloud Foundry Korifi
slug: cloud-foundry-korifi
description: Code and Push
authors: piky
tags: [devops, cloud, cloud-native, container, kubernetes, iac, gitops, platform-engineering]
keywords: [devops, cloud, foundry, korifi, cloud-native, container, kubernetes, gitops, platform-engineerin]
---
ของดีที่สร้าง ecosystem ไม่ได้ พันธมิตรค่อยๆหายไปทีละราย
Cloud Foundry เป็น frameworks สำหรับ self-service internal developer platform(IDP)
คือแนวคิดดีนะ application-centric โยนงาน software packaging ออกไปให้มัน
- Korifi’s purpose is to deliver an inherently higher-order abstraction over Kubernetes, ultimately enabling developers to focus on building applications and simplifying the operations process.
- [Korifi](https://github.com/cloudfoundry/korifi) treats resources either at the higher level (application-centric) abstraction from container level.
- ไม่ต้องหาคนมาเขียน Dockerfile ให้ lean & secure ไว้ให้พร้อมทุก platforms & distros
- ไม่ต้องเขียน k8s manifest files/Helm charts/Kustomise

:::warn ไม่เหมาะกับ
1. build container image ใน CI/CD pipeline อยู่แล้ว
2. ทำ GitOps ด้วย ArgoCD หรือ FluxCD อยู่แล้ว
:::

ดูเพิ่มได้ที่ที่ [Cloud Foundry](https://www.cloudfoundry.org/)