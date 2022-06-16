console.log("Postman app.js file");

//parameter count
let parameterCount = 0;

// utility function to get DOM element from String
function getElementFromString(paramString) {
    let div = document.createElement('div');
    div.innerHTML = paramString;
    return div.firstElementChild;


}

// hide the parameter box initially
let parameterBox = document.getElementById("paramterbox");
parameterBox.style.display = 'none';

//if user clicks param option then hide json box

let paramRadio = document.getElementById("paramRadio");
paramRadio.addEventListener('click', () => {
    document.getElementById("paramterbox").style.display = 'block';
    document.getElementById("jsonbox").style.display = 'none';
})

//if user clicks json option then hide param box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener('click', () => {
    document.getElementById("paramterbox").style.display = 'none';
    document.getElementById("jsonbox").style.display = 'block';

})

//if user clicks on + button then add more parameter box
let addParams = document.getElementById("addParams");
addParams.addEventListener('click', () => {
    let addedParams = document.getElementById("addedParams");
    let paramString = `<div class="row mb-3 my-2">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">Parameter${parameterCount + 2}</label>
                        <div class="col-sm-3">
                            <input type="text" class="form-control" id="paramKey${parameterCount + 2}" placeholder="Enter Key">
                        </div>
                        <div class="col-sm-3">
                            <input type="text" class="form-control" id="paramValue${parameterCount + 2}" placeholder="Enter Value">
                        </div>
                        
                            <button class="col-sm-1 btn btn-primary deleteParam">-</button>
                        
                    </div>`
    //convert the element string to DOM node
    let paramElement = getElementFromString(paramString);
    addedParams.appendChild(paramElement);
    // add an event listner for - button to remove the parameter
    let deleteParam = document.getElementsByClassName("deleteParam");
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();

        })
    }

    parameterCount++;

})

let submit = document.getElementById("submit");
submit.addEventListener('click',()=>{
    document.getElementById('responsePrism').innerHTML='Please wait fetching your response';

    //fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

   let  data={};

    //if user has selected params option instead of json then fetch all the parameters and store it in a object
    if(contentType=='customParameter')
    {
       
        for(let i=0;i<parameterCount+1;i++)
        {
            if(document.getElementById('paramKey' + (i+1))!=undefined){
            let key = document.getElementById('paramKey' + (i+1)).value;
            let value = document.getElementById('paramValue' + (i+1)).value;
            data[key]=value;
            }


        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById("jsonValue").value;
    }

     // log all the fetched values in console
     console.log(url);
     console.log(requestType);
     console.log(contentType);
     console.log(data);

     // if request is post then invoke fetch api for post request
     if(requestType=='get')
     {
         fetch(url,{
             method:'GET',
         }).then(response=>response.text()).then((text)=>{
            
            
            document.getElementById('responsePrism').innerHTML = text;
            //document.getElementById('responseText').value = text;
            Prism.highlightAll();
         });

     }
     else{
        fetch(url,{
            method:'POST',
            body:data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'}
        }).then(response=>response.text()).then((text)=>{
           //document.getElementById('responseText').value = text;
           document.getElementById('responsePrism').innerHTML = text;
           Prism.highlightAll();
        });
     }

})
