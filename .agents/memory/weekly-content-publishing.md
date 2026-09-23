---
name: Weekly content publishing
description: Archive-preservation and verification rules for publishing new GreyRadius weekly content.
---

Publish uploaded newsletter HTML without rewriting its contents, add a new archive card rather than replacing an old one, and update both static latest links and runtime newsletter data.

**Why:** A prior weekly update left existing issue pages unavailable from their archives, and static hub text can be overwritten by stale runtime data even when the HTML itself is correct.

**How to apply:** After every weekly import, compare each source newsletter with its published file, verify every issue folder is linked exactly once from its publication archive, confirm one current card per archive, and visually check the rendered newsletter hub. For DOCX articles, inspect every converted table for leaked Word XML before publishing.