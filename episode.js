var href = window.location.search; //window.location.href
const hrefParams = new URLSearchParams(href);

const episodes = document.querySelector('#episodes');
const count = document.querySelector('#count');
const select =document.querySelector('#select');
const search = document.querySelector('#search');



let id=hrefParams.get("id")
let   allEpisodes=[]
getAllEpisodes()

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
      <a href="episode.html?id=${element.id}">
      <div class="card">
      <img src=${element.image==null ? "" :element.image.medium} class="episode-image">
       <div class="main-detailse">
        <div class="top">
            <span>${element.name}</span>
            <span>E0${element.number}S0${element.season}</span>
        </div>
        <div class="bottom">
          <p>${element.summary ==null ? "" :element.summary }</p>
       </div>
       </div>
    </div> </a>`
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
         <a href="episode.html?id=${item.id}">

         <div class="card">
     <img src=${item.image==null ? "" :item.image.medium} class="episode-image">
      <div class="main-detailse">
       <div class="top">
           <span>${item.name}</span>
           <span>S${item.season}E${item.number} </span>
       </div>
       <div class="bottom">
         <p>${item.summary ==null ? "" :item.summary }</p>
      </div>
      </div>
   </div> </a>`

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
        <a href="episode.html?id=${item.id}">

        <div class="card">
    <img src=${item.image==null ? "" :item.image.medium} class="episode-image">
     <div class="main-detailse">
      <div class="top">
          <span>${item.name}</span>
          <span>S${item.season}E${item.number} </span>
      </div>
      <div class="bottom">
        <p>${item.summary ==null ? "" :item.summary }</p>
     </div>
     </div>
  </div> </a>`

episodes.innerHTML=html 
 })
}



