---
title: GitHub Codespace and DevContainer
slug: github-codespace-and-devcontainer
description: When to use Codespace and DevContainer
tags: [github, codespace, devcontainer, docker]
keywords: [github, codespace, devcontainer, docker]
---
## ทำไมต้องใช้
- เครื่องเก่า สเปกไม่แรง จนแทบไม่อยากลง/เปิด IDE (เช่น VSCode, NeoVim)
- เน็ตช้า
- ไม่อยากลง packages ให้รกเครื่อง
- อยากประหยัดพื้นที่ดิสก์ ไม่อยากใช้ Virtual Environment
- เจอปัญหา dependencies conflict
- อยากใช้ runtime บน OS/Arch/Platform อื่น เช่น Linux แต่ไม่อยากใช้ VM
- เจอปัญหา unsupported OS/Arch/Platform เพราะตกรุ่นไปแล้ว
- ทีมเจอปัญหา "It works on my machine."

## feature
- เอา repo ไปรันใน GitHub Codespace ก็ได้ หรือเครื่องที่มี Docker
- มี Image ให้เลือกหลากหลาย tech stack ที่เป็นที่นิยม
- ปรับแต่ง feature เพิ่มความสามารถได้ด้วย
- ทำ System Integration/Continuous Integration