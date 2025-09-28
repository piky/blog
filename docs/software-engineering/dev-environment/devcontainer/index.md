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
- อยากประหยัดพื้นที่ดิสก์ ไม่อยากใช้ Virtual Environment
- ไม่อยากลง packages ให้รกเครื่อง
- เจอปัญหา dependencies conflict
- อยากใช้ runtime บน OS/Arch/Platform อื่น(เช่น Linux) แต่ไม่อยากใช้ VM
- เจอปัญหา unsupported OS/Arch/Platform เพราะตกรุ่นไปแล้ว
- ทีมเจอปัญหา "It works on my machine."

## feature
- เอา repo ไปรันใน GitHub Codespace ก็ได้ หรือเครื่อง Laptop/PC ขอแค่มี Docker
- มี image มาตรฐานมหาชน ให้เลือกหลากหลาย
- มี community features ที่รองรับ tech stack ยอดฮิต
- ถ้ายังไม่ถูกใจ Bring-Your-Own-Dockerfile หรือ Bring-Your-Own-Compose ก็ได้
- ทำ System Integration/Continuous Integration ได้ด้วย Docker Compose Watch
- ต่อกับ CloudFlare Tunnel ออกอินเตอร์เน็ตไว้เดโมโชว์ลูกค้าก็ได้