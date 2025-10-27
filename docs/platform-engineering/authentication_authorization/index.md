---
title: OAuth 2.0 with Keycloak
slug: oauth-2_0_with_keycloak
description: OAuth 2.0 with Keycloak and auth-tools service
tags: [api-security, authentication, authorization, oauth, keycloak, identity-provider, idp, cloud, cloud-native,  platform-engineering]
keywords: [api-security, authentication, authorization, oauth, keycloak, identity-provider, idp, cloud, cloud-native,  platform-engineering]
---
Keycloak is an open-source identity and access management (IAM) solution that simplifies securing applications by handling user authentication and authorization. It provides features like single sign-on (SSO), social login, and user federation with existing directories like LDAP, allowing users to access multiple applications after a single login. Keycloak is designed to be flexible and can be deployed on-premises or in the cloud, supporting modern protocols like OpenID Connect, OAuth 2.0, and SAML.  
## Key Features
- IAM Solution: It acts as a central system for managing user identities and controlling access to your applications and services.
- Single Sign-On (SSO): Users log in once to Keycloak and gain access to all their connected applications, which streamlines the user experience.
- Protocol Support: Keycloak supports standard protocols like OpenID Connect, OAuth 2.0, and SAML, making it easy to integrate with various applications.
- User Federation: It can synchronize user data from external sources like LDAP or Active Directory, preventing the need to create separate user databases for each application.
- Admin Console: A web-based console allows administrators to easily configure users, roles, and permissions. 

## Setup Keycloak with Cloudflared tunnel
```info
To expose Keycloak as IdP, you need a registered domain with tunnel token of Cloudflare zero trust.
Let's say, here you want to public the service as `auth.example.com`.
```
```yaml title="compose.yaml"
services:
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    container_name: keycloak
    command:
      - start-dev
      - --proxy-headers=xforwarded
      - --hostname=auth.example.com
    environment:
      - KC_BOOTSTRAP_ADMIN_USERNAME=${ADMIN_USERNAME:-admin}
      - KC_BOOTSTRAP_ADMIN_PASSWORD=${ADMIN_PASSWORD:-p@ssw0rd}
    ports:
      - "8080:8080"

  cloudflared:
    image: cloudflare/cloudflared:latest
    restart: unless-stopped
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
    depends_on: [keycloak]
```
```sh
$ docker compose up
```