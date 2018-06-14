---
layout: default
wrap: true
title: TheThingsNetwork NYC
---

<div class="filter-box">
  Show by Category:
  <div id="show-all">All</div>
{% for cat_entry in site.categories %}
  <div id="show-{{ cat_entry[0] }}">{{ cat_entry[0] }}</div>
{% endfor %}
</div>

<ul>
  {% for post in site.posts %}
    <li class="post{% for cat in post.categories %} category-{{ cat }}{% endfor %}">
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>

<script>
function setVisibility(name, vis) {
  [].forEach.call(document.getElementsByClassName(name), function (el) {
    el.style.display = vis;
  });
}
function hideAll() { setVisibility("post", "none") }
function showAll() { setVisibility("post", "unset") }
function showCategory(category) {
  hideAll();
  setVisibility(category, "unset");
}
document.getElementById("show-all").addEventListener("click",showAll,false);
{% for cat_entry in site.categories %}
document.getElementById("show-{{ cat_entry[0] }}").addEventListener("click",function(e) { showCategory("category-{{ cat_entry[0] }}"); }, false);
{% endfor %}
</script>