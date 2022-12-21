---
layout: default
wrap: true
title: TTN NYC Blog
---
# {{ page.title }}

<div class="filter-box">
  Show by Tag:
  <div id="show-all">All</div>
{% for tag_entry in site.tags %}
  <div id="show-{{ tag_entry[0] }}">{{ tag_entry[0] }}</div>
{% endfor %}
</div>

{% for post in site.posts %}
  <div class="post{% for tag in post.tags %} tag-{{ tag }}{% endfor %}" markdown="1">
## [{{ post.title }}]({{ post.url }})
{{ post.excerpt }}
Tags: {{post.tags | join: ", " }}
  </div>
{% endfor %}

<script>
function setVisibility(name, vis) {
  [].forEach.call(document.getElementsByClassName(name), function (el) {
    el.style.display = vis;
  });
}
function hideAll() { setVisibility("post", "none") }
function showAll() { setVisibility("post", "unset") }
function showClass(tag) {
  hideAll();
  setVisibility(tag, "unset");
}
document.getElementById("show-all").addEventListener("click",showAll,false);
{% for tag_entry in site.tags %}
document.getElementById("show-{{ tag_entry[0] }}").addEventListener("click",function(e) { showClass("tag-{{ tag_entry[0] }}"); }, false);
{% endfor %}
</script>