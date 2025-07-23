---
title: Git Best Practices
description: Merge and Rebase are same same but different.
slug: git-best-practices
tags: [git, merge, rebase, branch, version-control, vcs, source-control, scm]
keywords: [git, merge, rebase, branch, version-control, vcs, source-control, scm]
---
:::warning Please note 
This content was summarized by [NotebookLM](https://notebooklm.google.com/) and translated into Thai by [Typhoon Translate](https://opentyphoon.ai/blog/th/typhoon-translate-release). Therefore it may contain inaccuracies.
:::
<iframe width="560" height="315" src="https://www.youtube.com/embed/cjSjlHUmaBU?si=k4nYN3vTXczsU6_c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

:::info tradeoffs
การเลือกใช้ merge หรือ rebase ขึ้นอยู่กับขั้นตอนการทำงานของทีม และการให้ความสำคัญ ระหว่างความชัดเจนของประวัติการทำงาน กับความปลอดภัยของโค้ด
:::

[ByteMonk](https://www.youtube.com/@ByteMonk) อธิบายความแตกต่างพื้นฐานระหว่าง `git merge` และ `git rebase` ซึ่งเป็นสองวิธีที่ใช้กันทั่วไปในการรวมการเปลี่ยนแปลงซอร์สโค้ดในระบบควบคุมเวอร์ชัน

### Git merge
`git merge` รวมสองสาขา (branches) โดยการสร้าง commit ใหม่ที่เชื่อมโยงประวัติการทำงานของทั้งสองสาขาเข้าด้วยกัน ทำให้โครงสร้างการแยกสาขาเดิมยังคงอยู่ แต่ก็อาจทำให้ commit log ดู
"รก" ขึ้นมาได้ เนื่องจากมี commit merge จำนวนมาก

### Git rebase
ในทางกลับกัน `git rebase` จะเขียน commit history ใหม่โดยการย้าย commits จากสาขาหนึ่งไปยังอีกสาขาหนึ่ง ทำให้ได้ประวัติการทำงานที่เป็นเส้นตรง (linear) และสะอาดกว่า
แต่ควรใช้กับสาขาที่แชร์ร่วมกันอย่างระมัดระวัง เนื่องจากจะเปลี่ยน commit ID ของ commits ที่มีอยู่แล้ว
:::tip ดูประวัติการทำงาน
```sh
$ git log --online --graph
```
:::

## สรุปการใช้งาน
ใช้ git merge สำหรับการทำงานร่วมกันบนสาขาที่แชร์ เพื่อรักษาประวัติการทำงาน
และใช้ git rebase สำหรับการทำความสะอาดก่อนเปิด pull request เพื่อให้ log ดูเรียบร้อยกว่าเดิม
```sh
$ git fetch origin
$ git rebase origin/main
```

:::tip
ใช้คำสั่ง `git pull --rebase` เพื่อดึงการเปลี่ยนแปลงจาก remote repository โดยไม่สร้าง commit merge ใหม่ เช่น:
```sh
$ git pull --rebase origin main
```
:::