document.addEventListener("DOMContentLoaded", ()=>{

  // SocketIO Connection
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port, {cookie: true});

  socket.on("connect", ()=>{
    console.log("socket connected");
  }) // socket on connect exit

  socket.on("announce tap in", data => {
    let tapInCard = document.getElementById('card-'+data["card"]);
    let tapInCardSubtitle = document.getElementById('subtitle-'+data["card"]);
    tapInCardSubtitle.innerHTML = "is occupied"

    activaeCard(tapInCard);

    let characEl = document.getElementById('charc-'+data["card"]);

    characEl.innerHTML = optMsg[data["card"]];
    characEl.style.color = optMsgColor[data["card"]];
    updateCountLabel()

  })

  // socket.on("announce tap out", data => {
  //   let tapOutCard = document.getElementById('card-'+data["card"]);
  //   let tapOutCardSubtitle = document.getElementById('subtitle-'+data["card"]);
  //   tapOutCardSubtitle.innerHTML = "is available"
  //
  //   deActivaeCard(tapOutCard)
  //
  //   let characEl = document.getElementById('charc-'+data["card"]);
  //
  //   characEl.innerHTML = "";
  //   characEl.style.color = optMsgColor[data["card"]];
  //   updateCountLabel()
  //
  // })
  //
  // socket.on("announce status change", data => {
  //   let statusMessage = data["status"];
  //   let characEl = document.getElementById('charc-'+data["card"]);
  //   localStorage.setItem("statusMessage", statusMessage)
  //   characEl.innerHTML = statusMessage;
  //   updateCountLabel()
  //
  // })

})
