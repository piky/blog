---
title: Spec-driven Development
slug: spec-driven-development
authors: piky
tags: [opinion, fyi, note]
keywords: [ai, gen-ai, llm, slm]
---
ขั้นตอนการพัฒนาซอฟต์แวร์ตามแนวทาง Spec-driven Development(SDD) ด้วย GitHub Spec Kit และ Copilot
```mermaid
graph TD
    %% --- Styling ---
    classDef phase fill:#f6f8fa,stroke:#d0d7de,stroke-width:2px,color:#24292f;
    classDef action fill:#0969da,stroke:#0969da,stroke-width:2px,color:#ffffff,rx:5,ry:5;
    classDef artifact fill:#ddf4ff,stroke:#54aeff,stroke-width:1px,stroke-dasharray: 5 5,color:#24292f;
    classDef context fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,stroke-dasharray: 5 5,color:#24292f;

    %% --- Nodes & Structure ---

    %% Stage 1: Constitution
    subgraph Stage1 [1 Define the Constitution]
        direction TB
        ConstNode[Establish]:::phase
        ConstFile[<b>CONSTITUTION.md</b><br/>Ground rules, Principles, Standards]:::context
        ConstNode --> ConstFile
    end

    %% Stage 2: Specify
    subgraph Stage2 [2 Specify Features]
        direction TB
        CmdSpecify(("/specify")):::action
        SpecNode[Generate Specs]:::phase
        SpecArtifact(Specification Docs<br/>Features, Stories, Criteria):::artifact
        
        CmdSpecify --> SpecNode
        SpecNode --> SpecArtifact
    end

    %% Stage 3: Plan
    subgraph Stage3 [3 Plan Implementation]
        direction TB
        CmdPlan(("/plan")):::action
        PlanNode[Create Blueprint]:::phase
        PlanArtifact(Technical Plan<br/>Tech stacks, Architecture, Data Models):::artifact
        
        CmdPlan --> PlanNode
        PlanNode --> PlanArtifact
    end

    %% Stage 4: Break into Tasks
    subgraph Stage4 [4 Break into Tasks]
        direction TB
        CmdTasks(("/tasks")):::action
        TaskNode[Granularize]:::phase
        TaskArtifact(Actionable Checklist<br/>Step-by-step Tasks):::artifact
        
        CmdTasks --> TaskNode
        TaskNode --> TaskArtifact
    end

    %% Stage 5: Implementation
    subgraph Stage5 [5 Implement Code]
        direction TB
        CmdImpl(("/implement")):::action
        ImplNode[Generate Code]:::phase
        CodeBase(Source Code):::artifact
        
        CmdImpl --> ImplNode
        ImplNode --> CodeBase
    end

    %% Stage 6: Analyze & Clarify (Floating Tool)
    subgraph Stage6 [6 Continuous Review]
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
    ImplNode ~~~ ReviewNode

    %% Layout adjustments
    linkStyle default stroke:#57606a,stroke-width:2px;
```
<!--truncate-->
1. **Define the Constitution:** Establish the
  - ground rules 
  - principles 
  - standards for the entire project in a `constitution.md` file.  

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