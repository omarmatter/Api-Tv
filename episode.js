var href = window.location.search; //window.location.href
const hrefParams = new URLSearchParams(href);

const episodes = document.querySelector('#episodes');
const count = document.querySelector('#count');
const select =document.querySelector('#select');
const search = document.querySelector('#search');
const main =document.querySelector('#main')

window.addEventListener('load',function(){
  spalsh.classList.add('hiden')

})

let id=hrefParams.get("id")
let   allEpisodes=[]
getAllEpisodes()
mainInfo();

function mainInfo(){
  fetch( `https://api.tvmaze.com/shows/${id}?embed=cast`)
  .then(function (re){
    return re.json(); 
      
  }).then(function(e){
    
    let html = "";

        html+=`<div class="show-detailse"><div class="image">
        <img src="${e.image.original}">
      </div>
       <div class="summarey">
        <p>${e.summary}</p>
    
       </div>
         <div class="detailse">
             <div>
           <span>Rated :</span> <span>${e.rating.average}</span>
        </div>
        <div>
            <span>Genres :</span> <span>${e.genres}</span>
         </div>
         <div>
            <span>Status :</span> <span>${e.status}</span>
         </div>
         <div>
         <span>Runttime :</span> <span>${e.runtime}</span>
      </div>
         </div>
         </div> 
         <div class='parson'>`+
        
         e._embedded.cast.map(e=>{
           return `
         <div class=card>
        <img src= '${e.person.image ==null ? '' :e.person.image.medium}'><br>
        <span> Name :${e.person.name} </span><br>
        <span> gender : ${e.person.gender} </span>
        </div>
       `
     })
+
     `<div>`
        
        
        
    
         main.innerHTML=html;

      })
    
 
}

 function  getAllEpisodes(){
  allEpisodes=[]

  fetch( `https://api.tvmaze.com/shows/${id}/episodes `)
  .then(function (re){
    return re.json();   
  }).then(function(data){
      let html = "";
      count.innerText=` ${data.length}/ ${data.length}`
  let sel=""
    data.forEach((element) => {
      allEpisodes.push(element)
   sel+=`<option value=${element.id}>E0${element.number}S0${element.season} - ${element.name} </option>`
      html += `
    
      <div class="card">
      <img src=${element.image==null ? "" :element.image.medium} class="episode-image">
       <div class="main-detailse">
        <div class="top">
            <span>${element.name}</span>
            <span>${element.number <10 ? 'E0'+element.number :'E'+ element.number}${element.season <10 ?'S0'+element.season :'S'+element.season}</span>
        </div>
        <div class="bottom">
          <p>${element.summary ==null ? "" :element.summary }</p>
       </div>
       </div>
    </div> `
  })
  episodes.innerHTML=html
  select.innerHTML= "<option value=-1>Show All</option>"+sel
  })
  


}


search.addEventListener('keyup' ,function(){

  let key = search.value ;
  key == "" ? getAllEpisodes(): Search(key)

})

function Search(search){

  console.log(allEpisodes.length)

  const x= allEpisodes.filter(
  
    e=>e.name.toLowerCase().includes(search.toLowerCase())
    ||( e.summary!=null? e.summary.toLowerCase().includes(search.toLowerCase()):""))
  let html = "";
  count.innerText=` ${x.length}/ ${allEpisodes.length}`

  if(x.length!==0){
  x.map(item=>{
      
         html += `
      

         <div class="card">
     <img src=${item.image==null ? "" :item.image.medium} class="episode-image">
      <div class="main-detailse">
       <div class="top">
           <span>${item.name}</span>
           <span>${element.number <10 ? 'E0'+element.number :'E'+ element.number}${element.season <10 ?'S0'+element.season :'S'+element.season}</span>
           </div>
       <div class="bottom">
         <p>${item.summary ==null ? "" :item.summary }</p>
      </div>
      </div>
   </div>`

 episodes.innerHTML=html 
  })
 }else{
   html+= "<h1 style='color:white ; margin:0 auto '>Not found Any vedio<h1>"
   episodes.innerHTML=html 
 }
}

select.addEventListener('change',function(){
  if(this.value!=-1){
  filterSelect(this.value)
  }else{
    getAllEpisodes()
  }

})

function filterSelect(id){
  const x=  allEpisodes.filter(
    e=> e.id ==id)

 let html = "";
 count.innerText=` ${x.length}/ ${allEpisodes.length}`
 x.map(item=>{
     
        html += `
        <div class="card">
    <img src=${item.image==null ? "" :item.image.medium} class="episode-image">
     <div class="main-detailse">
      <div class="top">
          <span>${item.name}</span>
          <span>${item.number <10 ? 'E0'+item.number :'E'+ item.number}${item.season <10 ?'S0'+item.season :'S'+item.season}</span>
          </div>
      <div class="bottom">
        <p>${item.summary ==null ? "" :item.summary }</p>
     </div>
     </div>
  </div> `

episodes.innerHTML=html 
 })
}





