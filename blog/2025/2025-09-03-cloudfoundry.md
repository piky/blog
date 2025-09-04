---
title: Cloud Foundry Korifi
slug: cloud-foundry-korifi
description: Code and Push
authors: piky
tags: [devops, cloud, cloud-native, container, kubernetes, platform-engineering, software-engineering]
keywords: [devops, cloud, foundry, korifi, cloud-native, container, kubernetes, platform-engineerin]
---  
**[Cloud Foundry](https://www.cloudfoundry.org/)** เดิมทีเป็น self-service internal developer platform(IDP) framework  
ไว้จัดการ workloads ที่เป็น virtual machines (VM) ยอมรับเลยว่าแนวคิดดีมาก นักพัฒนาโฟกัสแค่โค้ด (application-centric) ที่เหลือโยนงาน software packaging และงาน deploy ออกไปให้มัน  
น่าเสียดาย ของดีที่สร้าง ecosystem ไม่ได้ พันธมิตรค่อยๆหายไปทีละราย  
#
**[Korifi](https://github.com/cloudfoundry/korifi)** เป็นโปรเจกต์ลูกที่ปรับปรุงเพื่อจัดการ workloads ที่อยู่ใน Kubernetes  
ส่วน trade-offs สรุปคร่าวๆ ได้ดังนี้
<!-- truncate -->
- [Cloud Foundry](https://www.cloudfoundry.org/) treats resources either at the higher level (application-centric) abstraction from container level.
- [Korifi](https://github.com/cloudfoundry/korifi)’s purpose is to deliver an inherently higher-order abstraction over Kubernetes, ultimately enabling developers to focus on building applications and simplifying the operations process.
- ไม่ต้อง build & push container image ให้เปลือง compute & data transfer
- ไม่ต้องมี runtime
- ไม่ต้องแตะ file systems
- ไม่ต้องไปยุ่ง infra เช่น compute, storage, network, load balancer, services.
- ไม่ต้องหาคนมาเขียน Dockerfile ให้พร้อมทุก platforms & distros ที่ต้อง lean & secure 
- และที่สำคัญไม่ต้องเขียน k8s manifest files/Helm charts/Kustomise

:::warning ไม่เหมาะกับ
1. คุ้นเคยกับการ build container image ใน CI/CD pipeline อยู่แล้ว
2. ทำ GitOps ด้วย ArgoCD หรือ FluxCD อยู่แล้ว
:::