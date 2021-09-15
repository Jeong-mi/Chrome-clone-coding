const images =[ "lala.jpg", "mountain.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
bgImage.id = "bgImage"

bgImage.src=`img/${chosenImage}`;

document.body.appendChild(bgImage); //가장 아래로
//document.body.prepend(bgImage);     //가장 위로
