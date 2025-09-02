---
title: Simplify Privacy Using Caddy and CloudFlare Tunnels
slug: simplify-privacy-using-caddy-and-cloudflare-tunnels
description: Secure API endpoints with Caddy and Cloudflare Tunnels
sidebar_position: 3
tags: [https, api, endpoint, cloudflare, tunnels, zero-trust, network, caddy, reverse-proxy]
keywords: [https, api, endpoint, cloudflare, tunnels, zero-trust, network, caddy, reverse-proxy]
---
Let's say you are pitching an AI application to VCs for raising funds. Instead of browsing `http://localhost/`, you can have professional Domain Name with CloudFlare. But the application is still running on your development or SIT environment.

:::note Conceptual Diagram
```mermaid
flowchart TD
    %% External actors
    subgraph Public Internet

        %% Cloudflare side
        subgraph CloudflareEdge
            cf["Cloudflare Zero Trust"]
        end

        subgraph OpenAI
            openai["LLM API Endpoints"]
        end
    end

    %% End-users
    subgraph User
        user["fa:fa-user Prompt Engineer\n(web browser)"]
    end

    %% Corporate network behind firewall
    subgraph Codespace or DevContainer

        subgraph Docker Bridge Network

            subgraph routing
                firewall["Cloudflared"]
            end

            subgraph reverse-proxy
                caddy["Caddy \n<small> Auto-TLS via Let's Encrypt</small>"]
            end

            subgraph frontend
                fe_app["Open-WebUI"]
                rag_web["Web Search Retrieval"]
                rag_doc["Document Store Retrieval"]
            end

            subgraph Ollama
                ollama["LLM API Endpoints"]
            end
        end
    end

    %% Flow
    user  -->|HTTPS| cf
    cf    -->|HTTPS over tunnel| firewall
    firewall -->|HTTPS| caddy
    caddy --> fe_app

    fe_app -.-> rag_web
    fe_app -.-> rag_doc
    fe_app -->|context + prompt| ollama

    fe_app -->|context + prompt| openai
```
:::
## How-to Setup
For the sake of simplicity, please use Docker compose.yaml provided by [this repository](https://github.com/piky/open-webui).  
`TUNNEL_TOKEN` and `PUBLIC_HOSTNAME` can be found at Cloudflare Zero Trust Networks. If not present then create a new tunnel.

### Option 1: (Recommended) GitHub Codespace
Fork [the repo](https://github.com/piky/open-webui) and set required Codespace secrets environment varibales to match `TUNNEL_TOKEN` and `PUBLIC_HOSTNAME`:

### Option 2: Local DevContainer
Clone the repo locally then run:
```sh
$ git clone https://github.com/piky/open-webui.git
$ cd open-webui
$ export TUNNEL_TOKEN=<cloudlfare-tunnle-token>
$ export PUBLIC_HOSTNAME=<subdomain.your-domain.com>
$ docker compose up -d
```