---
layout: post
title: Canada Atlantic Immigration Pilot Program (AIPP)- Designated Employers (incl. NS, NB, NL, PEI)
date: 2020-08-18
---

<div style="margin: 0 5px;">
  <style type="text/css">
      input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: searchfield-cancel-button;
      }
      mark {
        padding: 0;
      }
      .label-location{
        font-weight: 400;
        display: table-cell;
        white-space: pre-wrap;
        text-align: left;
        font-size: 11px;
      }
      .nowrap{
        white-space: nowrap;
      }
      .fixed-narrow-col{
        width: 60px !important;
      }
      .data-src > li{
        font-size: 12px;
      }
      .paginate_button{
        padding: 0 !important;
      }
  </style>
  <table id="aipp-employers-table" class="display" width="100%"></table>
  <h4>Data Source: </h4>
  <ul class="data-src"></ul>
  
  <a href="https://datatables.net/manual" class="badge badge-light" title="jQuery Datatables APIs" target="_blank">Datatables APIs</a>
  <a href="https://getbootstrap.com/docs/3.3/components/" class="badge badge-light" title="Bootstrap APIs" target="_blank">Bootstrap APIs</a>
  
<script type="module">
  import {getAllData, getByKeys, flat, emptyRender} from '/EXT/js/helpers.mjs'

  function provinceRender(value = '', type, row, meta){
    var badge = row.location
                  ? `<div class="label label-default 
                  
                  ">${row.location}</div>`
                  : '' 
    return `${value} ${badge}`
  }

  var urls = [
      "/data/aipp-new-brunswick-employers.json",
      "/data/aipp-newfoundland-labrador-employers.json",
      "/data/aipp-nova-scotia-employers.json",
      "/data/aipp-prince-edward-island-employers.json",
  ]
  
  $(document).ready(function() {
      getAllData(urls).then((data)=>{
        $('#aipp-employers-table').DataTable( {
            data: flat(data, 'data', 'name'),
            mark: true,
            responsive: true,
            stateSave: true,
            columnDefs: [
              { className: "fixed-narrow-col", "targets": 1 }
            ],
            columns: [
              { data: 'name', title:'Company', render: emptyRender },
              { data: 'provinceAbbr', title:'Location', render: provinceRender },
            ]
        })
        
        const result = getByKeys(['dataUrl', 'lastModified'], data)
        console.log({result})
        $('.data-src').append(result.map(({dataUrl, lastModified}) =>{
          return  `<li><a href="${dataUrl}">${dataUrl}</a> 
          <i onclick>${lastModified.substring(0,10)}</i></li>`
        }))
      })
  } )
</script>
<pre style="display: none;">

var all = []
var list = [...document.querySelectorAll('td.sorting_1')]
all = all.concat(list.map(n=>n.innerText))
console.log(all)


var all = []
var list = [...document.querySelectorAll('.field-items li')]
all = all.concat(list.map(n=>n.innerText))
all.length

all.map(txt=>{

    return `{"name": "${txt}", "region": "Atlantic", "province": "Prince Edward Island", "provinceAbbr": "PEI"}`
}).join(',\n ')
</pre>
    
    
    
</div>
