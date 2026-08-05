const scriptURL = "https://script.google.com/macros/s/AKfycbwXL948q6a3fBEDv_2XgNsYFRmB317QCKsnor6zLGhQDHbd3glIuACEBPwlaBgga6B_/exec";


let currentMode = "IN";

let html5QrCode = null;

let cameraRunning = false;



// =====================
// IN / OUT BUTTON
// =====================

document.getElementById("btnIn").onclick = function(){

    currentMode = "IN";

    document.getElementById("btnIn")
    .classList.add("active");

    document.getElementById("btnOut")
    .classList.remove("active");


    document.getElementById("modeBanner")
    .innerHTML =
    "🟢 CURRENT MODE : IN";

};



document.getElementById("btnOut").onclick = function(){

    currentMode = "OUT";

    document.getElementById("btnOut")
    .classList.add("active");

    document.getElementById("btnIn")
    .classList.remove("active");


    document.getElementById("modeBanner")
    .innerHTML =
    "🔴 CURRENT MODE : OUT";

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

        {
            facingMode:"environment"
        },


        {
            fps:10
        },


        onScanSuccess,


        onScanFailure


    )


    .then(()=>{


        cameraRunning = true;


        console.log("Camera Started");


    })


    .catch(err=>{


        console.log(err);


    });



}




// =====================
// OPEN CAMERA
// =====================


startCamera();







// =====================
// SCAN SUCCESS
// =====================

function onScanSuccess(decodedText){



    console.log("Scan:", decodedText);



    document.getElementById("barcode")
    .value = decodedText;




    // stop camera after scan


    if(html5QrCode){


        html5QrCode.stop()


        .then(()=>{


            cameraRunning = false;


            console.log("Camera stopped");


        })


        .catch(err=>{


            console.log(err);


        });


    }



}







// =====================
// SCAN FAILURE
// =====================

function onScanFailure(error){

    // 不显示错误

}







// =====================
// SUBMIT TO GOOGLE SHEET
// =====================


document.getElementById("submitBtn")
.onclick=function(){



    const data = {


        barcode:
        document.getElementById("barcode").value,


        mode:
        currentMode,


        batch:
        document.getElementById("batch").value,


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



    .then(response=>response.text())



    .then(result=>{



        console.log(result);



        alert("Submitted Successfully");





        // 清空 Barcode


        document.getElementById("barcode")
        .value="";





        // 自动重新开启 Camera


        setTimeout(()=>{


            startCamera();


        },500);



    })



    .catch(error=>{


        console.log(error);


        alert("Submit Failed");


    });



};
