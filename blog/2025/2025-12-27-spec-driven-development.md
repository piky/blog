---
title: Spec-driven Development
slug: spec-driven-development
authors: piky
tags: [opinion, fyi, note]
keywords: [ai, gen-ai, llm, slm]
---
ขั้นตอนการพัฒนาซอฟต์แวร์ตามแนวทาง <a href="https://github.com/github/spec-kit/blob/main/spec-driven.md/" style={{color: 'blue', textDecoration: 'underline', textDecorationStyle: 'dotted'}}>Spec-driven Development</a> ด้วย <a href="https://github.com/github/spec-kit/blob/main/spec-driven.md/" style={{color: 'blue', textDecoration: 'underline', textDecorationStyle: 'dotted'}}>GitHub Spec Kit</a> และ Copilot
```mermaid
graph TD
    %% --- Styling ---
    classDef phase fill:#f6f8fa,stroke:#d0d7de,stroke-width:2px,color:#24292f;
    classDef action fill:#0969da,stroke:#0969da,stroke-width:2px,color:#ffffff,rx:5,ry:5;
    classDef artifact fill:#ddf4ff,stroke:#54aeff,stroke-width:1px,stroke-dasharray: 5 5,color:#24292f;

    %% --- Nodes & Structure ---

    %% Stage 1: Constitution
    subgraph Stage1 [<b>1 Define the Constitution</b>]
        direction TB
        ConstNode[Establish]:::phase
        ConstFile[<b>CONSTITUTION.md</b><br/>&lcub;Ground rules, <br/>Principles, <br/>Standards&rcub;]:::artifact
        ConstNode --> ConstFile
    end

    %% Stage 2: Specify
    subgraph Stage2 [<b>2 Specify Features</b>]
        direction TB
        CmdSpecify(("/specify")):::action
        SpecNode[Generate Specs]:::phase
        SpecArtifact(<b>Specification Docs</b><br/>&lcub;Features, <br/>Stories, <br/>Criteria&rcub;):::artifact
        
        CmdSpecify --> SpecNode
        SpecNode --> SpecArtifact
    end

    %% Stage 3: Plan
    subgraph Stage3 [<b>3 Plan Implementation</b>]
        direction TB
        CmdPlan(("/plan")):::action
        PlanNode[Create Blueprint]:::phase
        PlanArtifact(<b>Technical Plan</b><br/>&lcub;Tech Stacks, <br/>Architecture, <br/>Data Models&rcub;):::artifact
        
        CmdPlan --> PlanNode
        PlanNode --> PlanArtifact
    end

    %% Stage 4: Break into Tasks
    subgraph Stage4 [<b>4 Break into Tasks</b>]
        direction TB
        CmdTasks(("/tasks")):::action
        TaskNode[Granularize]:::phase
        TaskArtifact(<b>Step-by-step Tasks</b><br/><b>Actionable Checklist</b>):::artifact
        
        CmdTasks --> TaskNode
        TaskNode --> TaskArtifact
    end

    %% Stage 5: Implementation
    subgraph Stage5 [<b>5 Implement Code</b>]
        direction TB
        CmdImpl(("/implement")):::action
        ImplNode[Generate Code]:::phase
        CodeBase(<b>Source Code</b>):::artifact
        
        CmdImpl --> ImplNode
        ImplNode --> CodeBase
    end

    %% Stage 6: Analyze & Clarify (Floating Tool)
    subgraph Stage6 [<b>6 Continuous Review</b>]
        direction TB
        CmdAnalyze(("/analyze")):::action
        CmdClarify(("/clarify")):::action
        ReviewNode[Check Consistency<br/>Verify Intent]:::phase
        CmdAnalyze --- ReviewNode
        CmdClarify --- ReviewNode
    end

    %% --- Flow & Dependencies ---

    %% Main Process Flow
    Stage1 --> Stage2
    Stage2 --> Stage3
    Stage3 --> Stage4
    Stage4 --> Stage5

    %% Contextual Data Flow (The "Brain" of the operation)
    ConstFile -.-|Context| SpecNode
    ConstFile -.-|Context| PlanNode
    ConstFile -.-|Context| ImplNode
    
    SpecArtifact -.-|Input| PlanNode
    PlanArtifact -.-|Input| TaskNode
    TaskArtifact -.-|Input| ImplNode
    
    %% Review Loops (Analyze can happen anytime)
    %% Reversing direction arrows to force ReviewNode to bottom of the graph
    Stage2 <-.-|Refine| ReviewNode
    Stage3 <-.-|Refine| ReviewNode
    Stage4 <-.-|Refine| ReviewNode
    %% Anchor to bottom
    CodeBase ~~~ ReviewNode

    %% Layout adjustments
    linkStyle default stroke:#57606a,stroke-width:2px;
```
<!--truncate-->
1. **Define the Constitution:** Establish the
  - ground rules 
  - principles 
  - standards for the entire project in a `CONSTITUTION.md` file.  

This document sets constraints and context that the AI agent references throughout the process.  

2. **Specify Features:** Use the `/specify` command in Copilot Chat to define what to build:
  - features
  - user stories
  - acceptance criteria rather than how.  

The AI helps generate detailed specification documents (often in Markdown).  

3. **Plan the Implementation:** Use the `/plan` command to create a technical blueprint. The AI, using the context from the specification and constitution, generates a detailed plan including:
  - technology stacks/frameworks
  - architecture
  - data models.  

4. **Break into Tasks:** The `/tasks` command instructs the AI to break down the plan into granular, actionable steps with clear acceptance criteria. 

5. **Implement the Code:** Finally, use the `/implement` command or manually prompt Copilot Chat to generate the code for the defined tasks. The AI leverages all the previously generated documentation to provide highly contextual and accurate code suggestions.

6. **Analyze and Clarify:** The `/analyze` and `/clarify` commands can be used at any point to check for inconsistencies or missing information in the specifications, ensuring all stakeholders (human and AI) agree on the intent before implementation.  

<a href="https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/" style={{color: 'blue', textDecoration: 'underline', textDecorationStyle: 'dotted'}}>Read more on GitHub's blog</a>