// console.log('hello guys')

document.getElementById('spinner').classList.remove("d-none");
const universDataLoad = async () => {
        const url = `https://openapi.programming-hero.com/api/ai/tools`

        const res = await fetch(url);
        const data = await res.json();
        showUnuversData(data.data.tools.slice(0, 6))

        document.getElementById('spinner').classList.add("d-none");
        document.getElementById('showall-btn').classList.remove("d-none")
}

const sortByDate = () => {
        fetch('https://openapi.programming-hero.com/api/ai/tools')
            .then(res => res.json())
        .then(data => {
            data.data.tools.sort(function (a,b){
                return new Date(a.published_in) - new Date(b.published_in);
            });
            showUnuversData(data.data.tools.slice)
        })
    }

const showUnuversData = (data) => {
        // console.log(data[0])
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = '';
        data.forEach(element => {
                // console.log(element)
                const { features, name, image, published_in,id } = element;

                const createDiv = document.createElement('div');
                //        createDiv.classList.add('col') 
                createDiv.innerHTML = `
         <div class="card" style="width: full; height: 550px">
                <img src=" ${image}" class="card-img-top p-3 h-50 img-fluid" alt="...">
                <div class="card-body">
        <h5 class="card-title fw-bold"> Features</h5>
         <small class="card-text  m-0 p-0">1. ${features[0]}</small> <br/>
        <small class="card-text  m-0 p-0">2. ${features[1].slice(0 ,25)}</small> <br/>
        <small class="card-text  m-0 p-0">3. ${features[2]? features[2] : "no data"}</small>
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
         <i onclick = "singleDataLoad('${id}')" class="fa-solid bg-info rounded-5 p-2 fa-arrow-right"  data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
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
                document.getElementById('showall-btn').classList.add('d-none');    
        });
};
// show singledata ui.....

const singleDataLoad = (id) => {
   const URL = ` https://openapi.programming-hero.com/api/ai/tool/${id}`
//    console.log(URL)
   fetch(URL)
   .then(res => res.json())
   .then(data => showSimgleData(data.data))
   
}

const showSimgleData = (singleData) => {
        console.log(singleData)

        const {accuracy, description, integrations, pricing, input_output_examples, } = singleData;

        document.getElementById('modal-body').innerHTML = `
        
        <div class="row row-cols-1 row-cols-mg-2 ">
                <div class="col-sm-6 mb-3 mb-sm-0 ">
                  <div class="card h-100 p-3">
                    <div class="card-body p-3">
                      <h5 class="card-title">${description}</h5>
                      
        <div class = "d-flex justify-content-evenly container align-items-center gap-1 mt-3 p-1">

                      <div class = " bg-warning-subtle text-center p-1 shadow-lg rounded">
                      <p class = "m-0 fw-bold p-0">
                      ${pricing? pricing[0].price : "cost of free"} </p>
                      <p class = "m-0 fw-bold p-0">${pricing ? pricing[0].plan : "free" }</p>
                      </div>

                      <div class = "  bg-warning-subtle text-center p-1 shadow-lg rounded">
                      <p class = "m-0 fw-bold p-0">${pricing? pricing[1].price : "cost of free"}</p>
                      <p class = "m-0 fw-bold p-0">${pricing? pricing[1].plan  : "pro"}</p>
                      </div>

                      <div class = " bg-warning-subtle text-center p-1 shadow-lg rounded">
                      <p class = "m-0 fw-bold p-0">${pricing?pricing[2].price.slice(0, 10): "cost of free"}</p>
                      <p class = "m-0 fw-bold p-0">${pricing? pricing[2].plan : "enterprise"}</p>
                      </div>
                      
                      
        </div>

        <div class = "row row cols-1 row-cols-md-2  mt-3">
                <div >
                        <h5>Features</h5>
                        <li class ="text-sm"><small>${singleData.features[1].feature_name}</small> </li>
                        <li class ="text-sm"><small>${singleData.features[2].feature_name}</small> </li>
                        <li class ="text-sm"><small>${singleData.features[3].feature_name}</small> </li>
                        
                 </div>
         
                <div >
                        <h5>Integration</h5>
                        <li class = "text-sm"><small>${integrations ? integrations[0] : "No Data Found"}</small></li>
                        <li class = "text-sm"><small>${integrations ? integrations[1] : "No Data Found"}</small></li>
                        <li class = "text-sm"><small>${integrations ? integrations[2] : "No Data Found"}</small></li>
                        
                         
                </div>
        </div>
  
    </div>
  </div>
</div>
                <div class="col-sm-6 ">
                  <div class="card h-100 p-3">
                    <div class="card-body">
                     
                    <div>
                    <img src=" ${singleData.image_link[0]}" class="card-img-top " alt="...">
                 ${accuracy.score? `<div class = " text-warning bg-danger p-1 rounded " style ="position:absolute; top: 40px; right:50px;">${accuracy.score*100}% accuracy</div>` : '' }

                    
                   
                 
                    <h5 class = "text-center mt-3">${input_output_examples? input_output_examples[0].input : "Can you give any example?"}</h5>
                    <p class = "text-center mt-3">${input_output_examples?input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
       
       
        `

}
 
 
  
               

universDataLoad()