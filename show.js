const episodes = document.querySelector('#episodes');
const keySearch = document.querySelector('#inputSearch');
const butnSearch = document.querySelector('#butnSearch');
const count = document.querySelector('#count');

 let allEpisodes=[];


const url_all_episodes=  'https://api.tvmaze.com/shows' 
getAllEpisodes();
keySearch.addEventListener('keyup',function(){
  
    let key = keySearch.value ;
   key == "" ? getAllEpisodes(): Search(key)
})

function getAllEpisodes(){
  
  allEpisodes=[]
  
fetch(url_all_episodes )
.then(function (re){
  return re.json();   
}).then(function(data){
let html = "";
count.innerText=` ${data.length}/ ${data.length}`

  data.forEach((element) => {

    allEpisodes.push(element)
    
 
    html += `
    <a href="episode.html?id=${element.id}">
    <div class="card">
    <img src=${element.image==null ? "" :element.image.medium} class="episode-image">
     <div class="main-detailse">
      <div class="top">
          <span>${element.name}</span>
      </div>
      <div class="bottom">
        <p>${element.summary ==null ? "" :element.summary }</p>
     </div>
     </div>
  </div> </a>`
})
episodes.innerHTML=html
      
})



}

function Search(search){
 
  
//  fetch(`https://api.tvmaze.com/singlesearch/shows?q=${search}&embed=episodes`)
//  .then(function (re){
//     return re.json();   
//   }).then(function(data){
//   console.log(data)
//   let html = "";
//   data.forEach((element) => {
      
   
//       html += `<div class="card">
//       <img src=${element._embedded.show.image==null ? "" :element._embedded.show.image.medium} class="episode-image">
//        <div class="main-detailse">
//         <div class="top">
//             <span>${element.name}</span>
//             <span>S${element.season}E${element.number} </span>
//         </div>
//         <div class="bottom">
//           <p>${element.summary ==null ? "" :element.summary }</p>
//        </div>
//        </div>
//     </div>`
//   })
//   episodes.innerHTML=html
        
  // })

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
