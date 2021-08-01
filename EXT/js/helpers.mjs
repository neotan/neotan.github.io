  
async function getAllData(urls=[]){
  const promises = urls.map(url=>{
      return fetch(url)
               .then(res=>res.json())
               .catch(e=>{console.error(e); return []})
  })

  var res = await Promise.all(promises)
  return res
}

function flat(dataSet = [], dataKey = 'data', mustKey = 'name'){
  return dataSet
          .filter(r=>!!r)
          .reduce((acc, data) => {
              acc = acc.concat(data[dataKey] || [])
              return acc
            }, [])
          .filter(r=>!!r[mustKey])
}

function emptyRender(value, type, row, meta){      
  return value || ''
}

function urlRender(colKey, urlColKey = `${colKey.trim()}Url`){
  return (value, type, row, meta)=>{
    var text = value
    var url = row[urlColKey]

    if(!url){
      text = 'Link'
      url = value
    }

    return `<a href="${url} class="btn btn-link">${text}</a>`
  }
}

function getByKeys(keys = [], records){
  if(!Array.isArray(keys) || !Array.isArray(records)){
    throw new Error('"keys" is not an Array!')
  }
  
  
  return records.map((rec)=>{
    const newObj = {}
    
    for(let key of keys){
      if(key in rec){
        newObj[key] = rec[key]
      }
    }
    return newObj
  })

}

function getHttpHeader(url, wch) {
    try {
        var req=new XMLHttpRequest();
        req.open("HEAD", url, false);
        req.send(null);
        if(req.status== 200){
            var dateStr = req.getResponseHeader(wch)
            return (new Date(dateStr)).toISOString()
        }
        else return false;
    } catch(er) {
        return er.message;
    }
}

function getFileLastModifiedDate(url){
  try{
    var dateStr = getHttpHeader(url, 'Last-Modified')
    return (new Date(dateStr)).toISOString()
  } catch(err){
      return err.message;
  }
}

export {
  getAllData,
  getByKeys,
  flat,
  emptyRender,
  urlRender,
  getHttpHeader,
  getFileLastModifiedDate,
}
