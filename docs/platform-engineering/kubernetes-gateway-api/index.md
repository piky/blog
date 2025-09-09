---
title: Kubenetes Gateway API
slug: kubernetes-gateway-api
description: Next Generation L4 and L7 Routing in Kubernetes
tags: [container, kubernetes, cloud, cloud-native, iac, devops, sre, platform-engineering]
keywords: [container, kubernetes, cloud, cloud-native, iac]
---
[Gateway API](https://gateway-api.sigs.k8s.io/) เป็นข้อกำหนดคุณลักษณะและความสามารถของ Next-Generation Advanced Routing L4&L7 ให้มีมาตรฐาน โดยครอบคลุมทั้ง North-South (Ingress), East-West (Mesh) และ Load Balancing traffic สำหรับ Kubernetes ถูกออกแบบด้วยโมเดลผู้ใช้ 3 กลุ่ม(persona) ได้แก่ Infrastructure Providers, Cluster Operators และ Application Developers โดยมองทุกอย่างเป็น Routing Layer  
![Kubernetes Gateway API](https://gateway-api.sigs.k8s.io/images/resource-model.png 'Routing Layer with Role-oriented')

[ที่มาของปัญหา](https://www.cncf.io/blog/2025/05/02/understanding-kubernetes-gateway-api-a-modern-approach-to-traffic-management/)

[Use Cases](https://gateway-api.sigs.k8s.io/concepts/use-cases/)