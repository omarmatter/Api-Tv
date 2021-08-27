const episodes = document.querySelector('#episodes');
const keySearch = document.querySelector('#inputSearch');
const butnSearch = document.querySelector('#butnSearch');
const count = document.querySelector('#count');
const spalsh =document.querySelector('#spalsh');

 let allEpisodes=[];

 window.addEventListener('load',function(){
   spalsh.classList.add('hiden')

 })
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
    
      
    html += display(element)
})
episodes.innerHTML=html
      
})



}

function Search(search){

  console.log(allEpisodes.length)

   const x= allEpisodes.filter(
   
     e=>e.name.toLowerCase().includes(search.toLowerCase())
     ||( e.summary!=null? e.summary.toLowerCase().includes(search.toLowerCase()):""))
   let html = "";
   count.innerText=` ${x.length}/ ${allEpisodes.length}`

   if(x.length!==0){
   x.map(item=>{
       
          html +=  display(item)
 
  episodes.innerHTML=html 
   })
  }else{
    html+= "<h1 style='color:white ; margin:0 auto '>Not found Any vedio<h1>"
    episodes.innerHTML=html 
  }

}

function display(item){
   return `
          <a href="episode.html?id=${item.id}">

          <div class="card">
      <img src=${item.image==null ? "" :item.image.medium} class="episode-image">
       <div class="main-detailse">
        <div class="top">
            <span>${item.name}</span>
         
        </div>
        <div class="bottom">
          <p>${item.summary ==null ? "" :item.summary.substring(1,250) +'....'}</p>
       </div>
       </div>
    </div> </a>`
}

