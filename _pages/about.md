---
layout: default
title: About
permalink: /
nav: false
---

<main class="jp-home">
  <section id="about" class="jp-hero" aria-labelledby="about-title">
    <div class="jp-hero-copy">
      <p class="jp-eyebrow">Legged Robotics · Learning-based Control</p>
      <h1 id="about-title">Jaehyun Park</h1>
      <p class="jp-role">
        Ph.D. Student in Mechanical Engineering at
        <a href="https://www.kaist.ac.kr/en/">KAIST</a>
      </p>

      <p class="jp-lead">
        Learning-based control, motion generation, and perception for legged robots.
      </p>

      <p>
        My research combines motion priors, reinforcement learning, and onboard perception for dynamic motion generation and
        perceptive locomotion. I am currently extending these methods from quadrupeds to humanoid locomotion, with whole-body
        manipulation as a future direction.
      </p>

      <p class="jp-affiliation">
        <a href="https://dynamicrobot.kaist.ac.kr/">Dynamic Robot Control &amp; Design Laboratory</a>
        <span aria-hidden="true">·</span>
        advised by
        <a href="https://scholar.google.com/citations?user=q7v_ewQAAAAJ&amp;hl=en">Prof. Hae-Won Park</a>
      </p>

      <p class="jp-education-note">
        M.S. in Mechanical Engineering, KAIST · B.S. in Mechanical Engineering, Sungkyunkwan University
      </p>

      <nav class="jp-social-links" aria-label="Academic and contact links">
        <a
          href="https://scholar.google.com/citations?user={{ site.data.socials.scholar_userid }}&amp;hl=en"
          aria-label="Google Scholar"
          title="Google Scholar"
        >
          <i class="ai ai-google-scholar" aria-hidden="true"></i>
        </a>
        <a href="https://github.com/{{ site.data.socials.github_username }}" aria-label="GitHub" title="GitHub">
          <i class="fa-brands fa-github" aria-hidden="true"></i>
        </a>
        <a
          href="{{ site.data.socials.linkedin_url }}"
          aria-label="LinkedIn"
          title="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>
        </a>
        <a href="mailto:{{ site.data.socials.email }}" aria-label="Email" title="{{ site.data.socials.email }}">
          <i class="fa-solid fa-envelope" aria-hidden="true"></i>
        </a>
      </nav>
    </div>

    <figure class="jp-profile">
      <img
        src="{{ '/assets/img/jaehyun-park.jpg' | relative_url }}"
        alt="Portrait of Jaehyun Park"
        width="207"
        height="276"
      >
    </figure>

  </section>

  <section id="research" class="jp-section jp-research" aria-labelledby="research-title">
    <header class="jp-section-heading">
      <p class="jp-section-number" aria-hidden="true">01</p>
      <div>
        <h2 id="research-title">Research</h2>
        <p>Selected work in learning-based control, motion generation, and perceptive locomotion.</p>
      </div>
    </header>

    <div class="jp-research-list">
      {% assign sorted_projects = site.projects | sort: 'importance' %}
      {% for project in sorted_projects %}
        {% include research_row.liquid project=project %}
      {% endfor %}
    </div>

  </section>

  <section id="platforms" class="jp-section jp-platforms" aria-labelledby="platforms-title">
    <header class="jp-section-heading">
      <p class="jp-section-number" aria-hidden="true">02</p>
      <div>
        <h2 id="platforms-title">Robot Platforms</h2>
        <p>Platforms I have worked with in quadrupedal and humanoid robotics.</p>
      </div>
    </header>

    <ul class="jp-platform-grid" role="list">
      {% for platform in site.data.robot_platforms %}
        <li>
          <figure class="jp-platform-card{% if platform.fit == 'contain' %} jp-platform-card--contain{% endif %}">
            <span class="jp-platform-media">
              <img
                src="{{ platform.image | relative_url }}"
                alt="{{ platform.alt }}"
                width="{{ platform.width }}"
                height="{{ platform.height }}"
                loading="lazy"
                decoding="async"
                {% if platform.position %}
                  style="--jp-platform-position: {{ platform.position }}"
                {% endif %}
              >
            </span>
            <figcaption>{{ platform.name }}</figcaption>
          </figure>
        </li>
      {% endfor %}
    </ul>

  </section>

</main>

<script defer src="{{ '/assets/js/research-hover.js' | relative_url | bust_file_cache }}"></script>
