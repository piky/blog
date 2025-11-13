---
title: GitHub Codespace and DevContainer
slug: github-codespace-and-devcontainer
description: When to use Codespace and DevContainer
sidebar_position: 2
tags: [github, codespace, devcontainer, docker]
keywords: [github, codespace, devcontainer, docker]
---
## ทำไมต้องใช้
- เครื่องเก่า สเปกไม่แรง จนแทบไม่อยากลง/เปิด IDE (เช่น VSCode, NeoVim)
- เน็ตเต่า
- ไม่อยากลง packages ให้รกเครื่อง
- แต่ก็ไม่อยากใช้ Virtual Environment ให้เปลืองพื้นที่ดิสก์
- เจอปัญหา dependencies conflict
- อยากใช้ runtime บน OS/Arch/Platform อื่น(เช่น Linux) แต่ไม่อยากใช้ VM
- เจอปัญหา unsupported OS/Arch/Platform เพราะตกรุ่นไปแล้ว
- ทีมเจอปัญหา "It works on my machine."

## feature
- เอา repo ไปรันใน GitHub Codespace ก็ได้ หรือเครื่อง Laptop/PC ขอแค่มี Docker
- มี image มาตรฐานมหาชน ให้เลือกหลากหลาย
- มี community features ที่รองรับ tech stack ยอดฮิต
- ถ้ายังไม่ถูกใจ จะ Bring-Your-Own-Dockerfile หรือ Bring-Your-Own-Compose ก็ได้
- ทำ System Integration/Continuous Integration ได้ด้วย Docker Compose Watch
- ต่อกับ CloudFlare Tunnel ออกอินเตอร์เน็ตไว้นำเสนอลูกค้า
- ที่สำคัญมี free credit ให้ใช้ 60 ชั่วโมง สำหรับเครื่อง 2vCPU, 8GB RAM, 32GB storage และลดลงครึ่งหนึ่งเมื่อเลือกสเปกเครื่องสูงขึ้น

## ตัวอย่างการใช้งาน
### สร้าง Kubernetes cluster ด้วย [KinD](../kind-kubernetes-in-docker/index.md)
```json title=".devcontainer/devcontainer.json"
{
	"name": "Ubuntu",
	"image": "mcr.microsoft.com/devcontainers/base:noble",
	"features": {
		"ghcr.io/devcontainers/features/docker-outside-of-docker:1": {},
		"ghcr.io/devcontainers/features/kubectl-helm-minikube:1": {},
		"ghcr.io/devcontainers-extra/features/kubectx-kubens:1": {},
		"ghcr.io/audacioustux/devcontainers/k9s:1": {},
		"ghcr.io/devcontainers-extra/features/kind:1": {}
	}
}
```
:::warning ข้อแนะนำ
1. สร้าง secret เพื่อเก็บค่า sensitive environment variables โดยเข้าไปตั้งค่าใน User Settings -> Codespaces -> Secrets/Codespace user secrets  
2. ควรตั้งค่า Default idle timeout และ Default retaintion period ให้เหมาะสม เพื่อป้องกันการใช้งานเกินโควต้า
:::