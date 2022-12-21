---
layout: default
wrap: true
title: TTN NYC Repositories of Interest
---
# {{ page.title }}

{% assign topics = "" | split: "," %}
{% for entry in site.data.repos %}
  {% assign repo = entry[1] %}
  {% unless repo.exclude %}
  {% if   repo.topics %}
    {% assign topics = topics | concat: repo.topics %}
  {% endif %}
  {% endunless %}
{% endfor %}
{% assign topics = topics | uniq %}

<div class="filter-box">
  Show by Topic:
  <div id="show-all">All</div>
{% for topic in topics %}
  <div id="show-{{topic}}">{{topic}}</div>
{% endfor %}
</div>

<!-- Loop through Things-NYC repositories -->
{% for repo in site.github.public_repositories %}
  {% if site.data.repos[repo.full_name] %}
    {% assign rtopics = site.data.repos[repo.full_name].topics %}
  {% else %}
    {% assign rtopics = "" | split: "," %}
  {% endif %}
{% unless site.data.repos[repo.full_name].exclude %}
  <div class="post{% for topic in rtopics %} topic-{{ topic }}{% endfor %}" markdown="1">
## [{{ repo.name }}]({{ repo.html_url }})
    {{repo.description}}
    {% if site.data.repos[repo.full_name] -%}
      {% if site.data.repos[repo.full_name].description -%}
        {{site.data.repos[repo.full_name].description}}
      {% endif %}
Topics: {{ site.data.repos[repo.full_name].topics | join: ", " }}
    {% endif %}
  </div>
{% endunless %}
{% endfor %}

<!-- Loop through selected external repositories -->
{% for entry in site.data.repos %}
  {% assign user_repo = entry[0] | split: "/" %}
  {% assign user = user_repo[0] %}
  {% unless user == "things-nyc" %}
    {% assign repo = entry[1] %}
    {% assign rtopics = repo.topics %}
  <div class="post{% for topic in rtopics %} topic-{{ topic }}{% endfor %}" markdown="1">
## [{{ entry[0] }}]({{ repo.html_url }})
    {{repo.description}}
Topics: {{ repo.topics | join: ", " }}
  </div>
  {% endunless %}
{% endfor %}

<script>
function setVisibility(name, vis) {
  [].forEach.call(document.getElementsByClassName(name), function (el) {
    el.style.display = vis;
  });
}
function hideAll() { setVisibility("post", "none") }
function showAll() { setVisibility("post", "block") }
function showCategory(category) {
  hideAll();
  setVisibility(category, "block");
}
document.getElementById("show-all").addEventListener("click",showAll,false);
{% for topic in topics %}
document.getElementById("show-{{ topic }}").addEventListener("click",function(e) { showCategory("topic-{{ topic }}"); }, false);
{% endfor %}
</script>