---
title: "Canada Universities Ranking"
date: 2020-07-27
draft: false

resources:
- name: "featured-image"
  src: "featured-image.jpg"

tags: ["university", "Canada", "ranking"]
categories: ["tools"]
---

<div style="margin: 0 5px;">
  <link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
  <style type="text/css">
      input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: searchfield-cancel-button;
      }
      mark {
        padding: 0;
      }
  </style>
  <table id="ca-universities-table"></table>

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
<script type="module">
  import {getAllData, flat, emptyRender, urlRender} from '../../js/helpers.mjs'

  var urls = [
      "./canada-universities.json"
  ]

  $(document).ready(function() {
        getAllData(urls).then((data)=>{
          $('#ca-universities-table').DataTable({
              data: flat(data, 'data', 'University'),
              mark: true,
              responsive: true,
              stateSave: true,
              columns: [
                { data: 'Ranking', title:'Ranking' },
                { data: 'WorldRank', title:'WorldRank' },
                { data: 'University', title:'University', render: urlRender('University') },
                { data: 'Detalles', title:'Detalles', render: urlRender('Detalles') },
                { data: 'PresenceRank', title:'PresenceRank' }]
          })
        })
  })
  </script>
</div>
<a href="https://datatables.net/manual" class="badge badge-light" title="jQuery Datatables APIs" target="_blank">Datatables APIs</a>
<a href="https://getbootstrap.com/docs/3.3/components/" class="badge badge-light" title="Bootstrap APIs" target="_blank">Bootstrap APIs</a>
