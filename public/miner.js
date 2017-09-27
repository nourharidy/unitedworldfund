var miner = new CoinHive.Anonymous('g92UwP2vZA075nn4uP5DsgP4JMy7nwfu');
var socket = io.connect('http://unitedworldfund.com');

var interval;

start = function(){
  miner.start();
  socket.emit('start');
  $(window.buttoncontainer).html('<button class="massive red ui button" onclick="stop()">STOP MINING</button>');
  interval  = setInterval(function(){
    $(window.yourhash).html(Math.round(miner.getHashesPerSecond()) + " H/S");
    if(window.usdperhash){
      $(window.youraised).html("$"+(window.usdperhash*miner.getTotalHashes()).toFixed(7));
    }
  },500)
}

stop = function(){
  miner.stop();
  socket.emit('stop');
  $(window.buttoncontainer).html('<button class="massive green ui button" onclick="start()">START MINING</button>');
  $(window.yourhash).html("0 H/S")
  clearInterval(interval);
}

socket.on('miner', function (miners) {
  $(window.liveminers).html(miners);
});

socket.on('stats', function(data){
    $(window.totalhash).html(data.site.hashesPerSecond + " H/S");
    $(window.totalraised).html("$"+(data.payout.xmrToUsd*data.site.xmrPending).toFixed(4));
    window.usdperhash = data.payout.xmrToUsd*(data.payout.payoutPer1MHashes/1000000);
})
