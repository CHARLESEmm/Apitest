

const inputBarre = document.querySelector('.search-box');
const addressList = document.querySelector('.address-list');
const form = document.querySelector('form');

let dataTableau = [];



const fetchPays = async ()=>{

    inputBarre.addEventListener('input', async (e)=>{
     
    const inputLength = e.target.value.length;
     if(inputLength >= 1){
        const URL = "https://api-adresse.data.gouv.fr/search/";
        const queryParams = new URLSearchParams({
            q: e.target.value
        })
        const res = `${URL}?${queryParams}`;
    
        try {
            const response = await fetch(res);
            const data =  await response.json();
            dataTableau = data.features;
            renduHtml();
           } catch (error) {
             console.error(`Adresse inconnue : ${error.message}`);
           }
    }
    else
    {
       location.reload();
    }
    
    
    

    });
};

const renduHtml = ()=>{
 
    dataTableau.forEach(({properties}, index) => {
       
        const score = properties.score;
        const context = properties.context;
        const label = properties.label;
        const result = `${label} ${context}`;
        if(score > 0.94)
        {
            const li = document.createElement('li');
             const p = document.createElement('p');
          addressList.classList.add('box')
          li.classList.add('list');
          p.textContent= result;

          addressList.appendChild(li);
          li.appendChild(p);
         
        }

       
      });
}


fetchPays();




