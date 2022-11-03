

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Vr5xaxTzn/model.json',modelLoaded);

function modelLoaded()  {
    console.log('Model Loaded!');
}

function check()
{
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " +prediction_1;
    speak_data_2 = "The second prediction is " +prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis)
}

function gotResult(error, results) {
    if(error) {
        console.log(results);
    } else{
        console.log(results);
        document.getElementById('result_emotion_name').innerHTML = results[0].label;
        document.getElementById('result_emotion_name2').innerHTML = results[1].label;
        prediction_1= results[0].label;
        prediction_2= results[1].label;
        speak();
        if(results[0].label == "Fist")
        {
            document.getElementById("update_emoji").innerHTML= ("&#128522;");
        }
        if(results[0].label == "Ok")
        {
            document.getElementById("update_emoji").innerHTML= ("&#9996;");
        }
        if(results[0].label == "Peace")
        {
            document.getElementById("update_emoji").innerHTML= ("&#128548");
        }

        if(results[1].label == "Fist")
        {
            document.getElementById("update_emoji2").innerHTML= ("&#128522;");
        }
        if(results[1].label == "Ok")
        {
            document.getElementById("update_emoji2").innerHTML= ("&#9996;");
        }
        if(results[1].label == "Peace")
        {
            document.getElementById("update_emoji2").innerHTML= ("&#128548");
        }
    }
}