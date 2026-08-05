const scriptURL = "https://script.google.com/macros/s/AKfycbz2SVM9HK07_m5skHCUacBHYdplyOFfyrR888mPleCIX9F2JjLqxmA45lk3nEe2iY3vxA/exec";


let currentMode = "IN";

let html5QrCode = null;

let cameraRunning = false;

let lastScan = "";



// =====================
// IN / OUT
// =====================


document.getElementById("btnIn").onclick=function(){


currentMode="IN";


document.getElementById("btnIn")
.classList.add("active");


document.getElementById("btnOut")
.classList.remove("active");



document.getElementById("modeBanner")
.innerHTML="🟢 CURRENT MODE : IN";



};





document.getElementById("btnOut").onclick=function(){


currentMode="OUT";


document.getElementById("btnOut")
.classList.add("active");


document.getElementById("btnIn")
.classList.remove("active");



document.getElementById("modeBanner")
.innerHTML="🔴 CURRENT MODE : OUT";



};






// =====================
// START CAMERA
// =====================


function startCamera(){



if(cameraRunning){

return;

}



html5QrCode = new Html5QrCode("reader");



html5QrCode.start(


{facingMode:"environment"},


{
fps:10
},


onScanSuccess,


onScanFailure



)


.then(()=>{


cameraRunning=true;


console.log("Camera Start");


})


.catch(err=>{


console.log(err);


});



}





startCamera();








// =====================
// SCAN SUCCESS
// =====================


function onScanSuccess(decodedText){



if(decodedText===lastScan){

return;

}



lastScan=decodedText;



console.log("Scan:",decodedText);



document.getElementById("barcode")
.value=decodedText;



stopCamera();




// 查询 Product

getProduct(decodedText);



// OUT 自动 FEFO

if(currentMode==="OUT"){


getFEFO(decodedText);


}



}







function onScanFailure(error){

// 不显示错误

}








// =====================
// STOP CAMERA
// =====================


function stopCamera(){


if(html5QrCode){


html5QrCode.stop()


.then(()=>{


cameraRunning=false;


console.log("Camera stopped");


})


.catch(err=>{


console.log(err);


});


}



}







// =====================
// GET PRODUCT
// =====================


function getProduct(barcode){



fetch(

scriptURL+

"?action=product&barcode="+barcode


)


.then(res=>res.json())


.then(data=>{


console.log(data);



if(data.product){


document.getElementById("product")
.value=data.product;


}



})


.catch(err=>{


console.log(err);


});



}








// =====================
// GET FEFO
// =====================


function getFEFO(barcode){



fetch(

scriptURL+

"?action=fefo&barcode="+barcode


)



.then(res=>res.json())


.then(data=>{



console.log(data);



if(data.found){



document.getElementById("product")
.value=data.product;



document.getElementById("batch")
.value=data.batch;



document.getElementById("expiry")
.value=data.expiry;



}



})


.catch(err=>{


console.log(err);


});



}









// =====================
// SUBMIT
// =====================


document.getElementById("submitBtn")
.onclick=function(){



const data={



barcode:

document.getElementById("barcode").value,



mode:

currentMode,



product:

document.getElementById("product").value,



batch:

document.getElementById("batch").value,



expiry:

document.getElementById("expiry").value,



pieces:

document.getElementById("pieces").value,



cartons:

document.getElementById("cartons").value,



qty:

document.getElementById("qty").value,



writer:

document.getElementById("writer").value



};






if(data.barcode===""){


alert("Please scan barcode");


return;


}







fetch(scriptURL,{


method:"POST",


body:JSON.stringify(data)



})



.then(res=>res.text())


.then(result=>{


console.log(result);


alert("Submitted Successfully");



clearForm();




setTimeout(()=>{


lastScan="";


startCamera();


},500);




})



.catch(error=>{


console.log(error);


alert("Submit Failed");


});



};









// =====================
// CLEAR
// =====================


function clearForm(){



document.getElementById("barcode")
.value="";



document.getElementById("product")
.value="";



document.getElementById("batch")
.value="";



document.getElementById("expiry")
.value="";



document.getElementById("pieces")
.value="";



document.getElementById("cartons")
.value="";



document.getElementById("qty")
.value="";



document.getElementById("writer")
.selectedIndex=0;



}
