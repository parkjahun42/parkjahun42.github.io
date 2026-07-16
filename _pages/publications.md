---
layout: default
title: Publications
permalink: /publications/
description: Peer-reviewed publications and preprints by Jaehyun Park.
nav: false
---

<main class="jp-publications-page">
  <header class="jp-publications-hero">
    <p class="jp-eyebrow">Research Output</p>
    <h1>Publications</h1>
    <p>Peer-reviewed papers and preprints. An asterisk denotes equal contribution.</p>
  </header>

  <section class="jp-publications" aria-label="Publication list">
    {% bibliography --group_by none --query @*[selected=true]* %}
  </section>
</main>
