---
title: uv Python Package Manager
slug: uv-python-package-manager
authors: [piky]
tags: [coding, uv, python, package-manager, project-management, virtualenv, dependencies, package]
keywords: [coding, uv, python, package-manager, project-management, virtualenv, dependencies, package]
---
# Unified Python Project and Package Management
uv เป็นเครื่องมือจัดการ packages สำหรับภาษา Python ที่มีประสิทธิภาพสูงกว่าตัวจัดการแบบเดิมอย่าง pip โดยรวมเอาความสามารถในการจัดการ projects, packages/dependencies และ virtual environment ไว้ในเครื่องมือเดียว ช่วยให้การจัดการ Python project ง่ายขึ้น 
:::tip tl;dr
```sh
curl -LsSf https://astral.sh/uv/install.sh | sh
```
```sh
uv init --python=3.13 hello-world && cd "$_"
```
```sh
source .venv/bin/activate
```
:::
## เหตุผลที่ควรใช้ uv
คุณกำลังปวดหัวกับสิ่งเหล่านี้อยู่ใช่หรือไม่?
- ต้องจัดการ Python project หลายโปรเจกต์ในเครื่องเดียว แต่ไม่อยากใช้ Docker
- แต่ละ project ใช้ Python version แตกต่างกัน
- ต้องการสร้าง package และส่งขึ้น repo ได้ง่าย
- ต้องการติดตั้ง dependencies ได้เร็วขึ้น
- ต้องการเครื่องมือที่มีประสิทธิภาพสูง  

ถ้าใช่ แสดงว่า uv เป็นเครื่องมือที่เหมาะกับคุณ

## จุดเด่นของ uv
1. จัดการได้ทั้ง project, packages/dependencies และ virtual environment
2. สร้าง Python project พร้อม git repository ได้ในครั้งเดียว
3. เลือกเวอร์ชันของ Python ได้
4. สร้าง package แล้วส่งขึ้น repo ได้เลย
5. ติดตั้ง dependencies ได้เร็วขึ้น
6. เขียนด้วยภาษา Rust ทำให้มีประสิทธิภาพสูง

## การติดตั้ง
โดยใช้ Standalone Installer  
**macOS and Linux:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```
**Windows:**
```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```
:::warning Update UV
เพื่อให้ได้ฟีเจอร์ใหม่ ปลอดภัย และไร้บั๊ก:
```bash
uv self update
```
:::

## เริ่มต้นใช้งาน uv
สร้าง directory/folder เพื่อเก็บโปรเจกต์ใหม่ด้วยคำสั่ง
```bash
mkdir -p hello-world && cd "$_"
```
### สร้าง Python Project
โดยระบุเวอร์ชั่นของ Python ที่ต้องการ  และ uv จะสร้าง git repository ใน directory ปัจจุบัน
```bash
uv init --python=3.8 .
```
### เปิดใช้ virtualenv 
```bash
uv venv --python=3.8
```
```bash
source .venv/bin/activate
```
:::info ยกเลิกการใช้งาน virtualenv ได้ด้วยคำสั่ง
```bash
deactivate
```
:::
## จัดการเวอร์ชันของ Python
### แสดงเวอร์ชัน
ดูว่ามี Python เวอร์ชันไหนที่ลงไว้ในเครื่องแล้ว และมีเวอร์ชันไหนที่สามารถติดตั้งได้
```bash
uv python list
```
### ติดตั้งเฉพาะเวอร์ชันที่ต้องการ
```bash
uv python install 3.10 3.11 3.12
```
:::tip
สามารถดาวน์โหลด ติดตั้ง และใช้งาน Python เวอร์ชันที่ต้องการใน virtualenv ได้อย่างง่ายดาย
```bash
uv venv --python=3.9
```
:::

## จัดการ Dependencies
ติดตั้ง package dependencies ได้ง่ายๆ เช่น ต้องการติดตั้ง requests ด้วยคำสั่ง
```bash
uv add requests
```
## ใช้งาน Tools ด้วย uvx
Tool เป็น Python package ประเภทหนึ่ง ที่เรียกใช้งานผ่าน CLI  
_uvx_ ช่วยให้รัน tool แล้วใช้งานได้เลยทันที โดยไม่ต้องติดตั้งจริง  
```sh
uvx pycowsay 'hello world!'
```
และถ้าใช้แล้วชอบ จะติดตั้งถาวรเลยก็ได้ด้วยคำสั่ง
```sh
uv tool install ruff
```
## สร้าง Package และส่งขึ้น Repository
```bash
uv package create
uv package publish