---
title: Vibe Coding
slug: vibe-coding
authors: piky
tags: [opinion, fyi, note]
keywords: [ai, gen-ai, llm]
---
ลอง SDD ทั้ง Claude Code(CC) และ GitHub SpecKit เพื่อขึ้นระบบร้านดื่มกินมาสักพัก
1. ทั้งคู่ ใช้ context engineering มอง PROMPT (Specs/Intents/Idea) ว่าเป็น the (shared) source of truth ถีบ source code กลายเป็น artifacts
2. CC ใช้แนวทาง bottom-up เพื่อจัดการกับ non-deterministic features เหมาะกับ software PRODUCT ที่ต้อง release บ่อยๆ มี domain experts, tester และ end-user คือคนเดียวกัน คอยรีวิว
3. SpecKit ใช้แนวทาง top-down เพื่อจัดการกับ deterministic requirements เหมาะกับ software PROJECT ที่ใช้ CMMI/Waterfall ผู้มีส่วนได้ส่วนเสียไม่มีเวลามาพบกัน
4. เริ่มแรก input token น้อยกว่า output token แต่พอผ่านไปสักพัก เพื่อให้ model มี context aware เจ้า input token มากกว่า output token จนชน hourly/daily limit
5. วิธีประหยัด token เช่นเปลี่ยน provider/agent ซึ่ง CC ทำได้ยากลำบากมาก ต้องเปลี่ยนไปใช้ Open Code ดีที่ได้ miniMax กับ GLM ช่วยประหยัดได้เยอะเลย
6. ประเด็นคือ พอจะสลับใช้ทั้ง CC และ SpecKit ก็ไม่ได้ เพราะแนวทางต่างกัน การ initial project ไม่เหมือนกัน 
7. ฉะนั้นจงใช้ token ให้คุ้มค่า แต่ถ้ารับงานราคาหลักหมื่น หรือทุกคนในทีมต้องใช้ แทบมองไม่เห็นความคุ้ม
8. เริ่มหวั่นใจและเข้าใจว่าทำไมเกิด Great Lay-off 
9. เพราะด้วยแนวทางแบบนี้ product team สำหรับ startups เล็กๆ ต้องการสมาชิกแค่ 4 คน
    - Business/PO/Domain expert
    - UX/UI designer
    - Software engineer/Full-stack developer/System Analyst
    - Sales/AE/customer success
10. ส่วน project ใน corporate/enterprise ก็อาจเพิ่ม QA หรือ Mobile developer มา 
11. ไม่มีตำแหน่งว่างสำหรับเด็กจบใหม่อีกต่อไป หรือแม้แต่ Junior ที่เป็นงานแค่หน้าเดียว
12. Tech talents ที่เหลือ โชคดีหน่อยก็อาจจะได้ย้ายไปอยู่ platform team หรือ data team แต่ถ้าดวงดีก็รับซองกลับบ้าน 
13. มีโอกาสเกิดสงครามราคา เหมือนที่เคยเกิดกับวงการรับงานถ่ายภาพ เพราะใครมีกล้องก็รับงานได้