// console.log('hello guys')

const universDataLoad = async () => {
        const url = `https://openapi.programming-hero.com/api/ai/tools`

        const res = await fetch(url);
        const data = await res.json();
        showUnuversData(data.data.tools.slice(0, 6))
}

const showUnuversData = (data) => {
        // console.log(data)
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = '';
        data.forEach(element => {
                // console.log(element)
                const { features, name, image, published_in } = element;

                const createDiv = document.createElement('div');
                //        createDiv.classList.add('col') 
                createDiv.innerHTML = `
         <div class="card" style="width: full; height: 550px">
                <img src=" ${image}" class="card-img-top p-3 h-50 img-fluid" alt="...">
                <div class="card-body">
        <h5 class="card-title fw-bold"> Features</h5>
         <small class="card-text  m-0 p-0">1. ${features[0]}</small> <br/>
        <small class="card-text  m-0 p-0">2. ${features[1].slice(0 ,25)}</small> <br/>
        <small class="card-text  m-0 p-0">3. ${features[2]}</small>
        <hr/>
        </div>

 <div class = "d-flex container justify-content-between aling-items-center">
         <div >
             <p class = "fw-bold m-0 p-0">${name}</p>
             <div class = "d-flex aling-items-center gap-2">
             <p><i class="fa-regular fa-calendar-minus"></i> </p>
             <small m-0 p-0>${published_in}</small>
             
             </div>
        </div>

        <div>
         <i onclick = "singleDataLoad()" class="fa-solid bg-info rounded-5 p-2 fa-arrow-right  data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
        </div>
        
</div>
  </div>
    
  `;
  cardContainer.appendChild(createDiv);

      });
}

// showAllData click showall button 
const showAllData = () => {
        fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res=> res.json())
        .then(data => {
                showUnuversData(data.data.tools);     
        })
}

const singleDataLoad = (id) => {
    fetch(` https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res => res.json())
    .then(data => console.log(data))
}

singleDataLoad()
  
               

universDataLoad()