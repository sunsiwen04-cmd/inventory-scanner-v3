// =====================================
// Inventory Scanner V3
// script.js V3
// Barcode Scanner Optimized
// =====================================


// Elements

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


// Worker

const workerURL =
"https://inventory-scanner-v3.sunsiwen04.workers.dev/";


// Current Mode

let currentMode = "IN";

let scannerRunning = false;


// =====================================
// Mode
// =====================================


inBtn.onclick = function(){

    setMode("IN");

};


outBtn.onclick = function(){

    setMode("OUT");

};



function setMode(mode){

    currentMode = mode;

    modeText.innerText = mode;


    if(mode==="IN"){

        inBtn.classList.add("active");
        outBtn.classList.remove("active");

    }
    else{

        outBtn.classList.add("active");
        inBtn.classList.remove("active");

    }

}



// =====================================
// Start when page open
// =====================================


window.onload=function(){

    setMode("IN");

    startScanner();

};




// =====================================
// Scanner
// =====================================


function startScanner(){


if(scannerRunning){
    return;
}


Quagga.init({


    inputStream:{


        name:"Live",


        type:"LiveStream",


        target:document.querySelector("#camera"),


        constraints:{


            facingMode:"environment",


            width:{
                min:1280
            },


            height:{
                min:720
            }

        }

    },



    locator:{


        patchSize:"medium",

        halfSample:false

    },



    frequency:10,



    decoder:{


        readers:[


            "ean_reader",

            "ean_13_reader",

            "code_128_reader"


        ],


        multiple:false


    },


    locate:true



},function(err){


    if(err){

        console.log(err);

        return;

    }



    Quagga.start();


    scannerRunning=true;



});





Quagga.onDetected(function(result){



    let code =
    result.codeResult.code;



    console.log("SCAN:",code);



    // only accept 13 digits

    if(!/^\d{13}$/.test(code)){


        return;


    }



    barcode.value=code;



    stopScanner();



});



}



// =====================================
// Stop Scanner
// =====================================


function stopScanner(){


if(scannerRunning){


    Quagga.stop();


    scannerRunning=false;


}


}




// =====================================
// Submit
// =====================================


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


setTimeout(()=>{


startScanner();


},500);



})



.catch(err=>{


console.log(err);


});



};




// =====================================
// Success
// =====================================


function showSuccess(){


successMessage.style.display="block";


setTimeout(()=>{


successMessage.style.display="none";


},1500);



}



// =====================================
// Clear
// =====================================


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
