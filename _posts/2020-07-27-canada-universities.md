---
layout: wide
title: Canada Universities

cover-img: /_posts/images/featured-canada-study.jpg
thumbnail-img: ../images/featured-canada-study.jpg
share-img: ../images/featured-canada-study.jpg
---

<a href="https://datatables.net/manual" class="badge badge-light" title="jQuery Datatables APIs" target="_blank">Datatables APIs</a>
<a href="https://getbootstrap.com/docs/3.3/components/" class="badge badge-light" title="Bootstrap APIs" target="_blank">Bootstrap APIs</a>
<div style="margin: 0 5px;">
  <style type="text/css">
      input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: searchfield-cancel-button;
      }
      mark {
        padding: 0;
      }
  </style>
  <table id="ca-universities-table" class="display" width="100%"></table>
  
<script type="module">
  import {getAllData, flat, emptyRender, urlRender} from '/js/helpers.mjs'

  var urls = [
      "/data/canada-universities.json"
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
