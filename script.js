//
// Inventory Scanner V3
// script.js V2
//


const inBtn = document.getElementById("inBtn");
const outBtn = document.getElementById("outBtn");

const modeText = document.getElementById("modeText");

const barcode = document.getElementById("barcode");
const productName = document.getElementById("productName");
const expiry = document.getElementById("expiry");
const batchNumber = document.getElementById("batchNumber");

const pieces = document.getElementById("pieces");
const cartons = document.getElementById("cartons");
const qty = document.getElementById("qty");

const writer = document.getElementById("writer");

const submitBtn = document.getElementById("submitBtn");

const successMessage = document.getElementById("successMessage");


// ========================
// Worker URL
// ========================

const workerURL =
"https://inventory-scanner-v3.sunsiwen04.workers.dev/";


// ========================
// Mode
// ========================

let currentMode="IN";



inBtn.onclick=function(){

    setMode("IN");

};


outBtn.onclick=function(){

    setMode("OUT");

};



function setMode(mode){

    currentMode=mode;

    modeText.innerText=mode;


    if(mode==="IN"){

        inBtn.classList.add("active");
        outBtn.classList.remove("active");

    }else{

        outBtn.classList.add("active");
        inBtn.classList.remove("active");

    }

}



// ========================
// Start Camera
// ========================

window.onload=function(){

    setMode("IN");

    startScanner();

};




// ========================
// Quagga Scanner
// ========================

function startScanner(){


Quagga.init({

    inputStream:{

        name:"Live",

        type:"LiveStream",

        target:document.querySelector("#camera"),

        constraints:{

            facingMode:"environment"

        }

    },


    decoder:{

        readers:[

            "ean_reader"

        ]

    }


},function(err){


    if(err){

        console.log(err);

        return;

    }


    Quagga.start();


});



Quagga.onDetected(function(result){


    let code=result.codeResult.code;


    if(code){


        barcode.value=code;


        stopScanner();


    }


});


}



// ========================
// Stop Camera
// ========================

function stopScanner(){

    Quagga.stop();

}



// ========================
// Submit
// ========================

submitBtn.onclick=function(){



let data={


    mode:currentMode,

    barcode:barcode.value,

    productName:productName.value,

    batch:batchNumber.value,

    expiry:expiry.value,

    pieces:pieces.value,

    cartons:cartons.value,

    qty:qty.value,

    writer:writer.value


};




fetch(workerURL,{

    method:"POST",

    headers:{

        "Content-Type":"application/json"

    },

    body:JSON.stringify(data)


})


.then(res=>res.text())


.then(result=>{


    console.log(result);


    showSuccess();


    clearForm();


    startScanner();



})


.catch(error=>{


    console.log(error);


});



};




// ========================
// Success
// ========================


function showSuccess(){

successMessage.style.display="block";


setTimeout(()=>{

successMessage.style.display="none";


},1500);


}



// ========================
// Clear
// ========================


function clearForm(){


barcode.value="";

productName.value="";

batchNumber.value="";

expiry.value="";

pieces.value="";

cartons.value="";

qty.value="";

writer.selectedIndex=0;


}
