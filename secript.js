const episodes = document.querySelector('#episodes');
const keySearch = document.querySelector('#inputSearch');
const butnSearch = document.querySelector('#butnSearch');
const count = document.querySelector('#count');

 const allEpisodes=[];


const url_all_episodes=  ' https://api.tvmaze.com/schedule/full' 
getAllEpisodes();
keySearch.addEventListener('keyup',function(){
  
    let key = keySearch.value ;
   key == "" ? getAllEpisodes(): Search(key)
})

function getAllEpisodes(){
fetch(url_all_episodes )
.then(function (re){
  return re.json();   
}).then(function(data){
let html = "";
  data.forEach((element) => {
    allEpisodes.push(element)
    
 
    html += `<div class="card">
    <img src=${element._embedded.show.image==null ? "" :element._embedded.show.image.medium} class="episode-image">
     <div class="main-detailse">
      <div class="top">
          <span>${element.name}</span>
          <span>S${element.season}E${element.number} </span>
      </div>
      <div class="bottom">
        <p>${element.summary ==null ? "" :element.summary }</p>
     </div>
     </div>
  </div>`
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



   const x= allEpisodes.filter(
     e=>e.name.includes(search)
     ||( e.summary!=null? e.summary.includes(search):""))
   let html = "";
   count.innerText=` ${x.length}/ ${allEpisodes.length}`

   if(x.length!==0){
   x.map(item=>{
       
          html += `
          <div class="card">
      <img src=${item._embedded.show.image==null ? "" :item._embedded.show.image.medium} class="episode-image">
       <div class="main-detailse">
        <div class="top">
            <span>${item.name}</span>
            <span>S${item.season}E${item.number} </span>
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
