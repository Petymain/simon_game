"use strict";
$(document).ready(function(){

  // variable that will be used.
  let count;
  let count2;
  let delay;
  const colorArray = ["green", "blue", "red", "yellow"];
  let gameSequence = [];
  let onOff = false;
  let strictMode = false;

  // this function make action for each active or clicked button.
  let gameColor = {
      green: function () {
          document.getElementById("s1").play();
          $("#green").css("background-color","white");
          setTimeout(function(){
              $("#green").css("background-color","green");
          }, 1000);
      },
      blue: function () {
          document.getElementById("s2").play();
          $("#blue").css("background-color","white");
          setTimeout(function(){
              $("#blue").css("background-color","blue");
          }, 1000);
      },
      red: function () {
          document.getElementById("s3").play();
          $("#red").css("background-color","white");
          setTimeout(function(){
              $("#red").css("background-color","red");
          }, 1000);
      },
      yellow: function () {
          document.getElementById("s4").play();
          $("#yellow").css("background-color","white");
          setTimeout(function(){
              $("#yellow").css("background-color","yellow");
          }, 1000);
      }
  }

  // this function start the game whith new random color.
  function start(){
    count = 0;
    count2 = 0;
    gameSequence = [];
    let firstColor = colorArray[Math.round(Math.random()*3)];
    gameSequence.push(firstColor);
    gameColor[firstColor].call(gameColor);
  }


  //this function show the color that must to be clicked in order.
  function gameRun() {
      let x = 0;
      let i =  setInterval(function () {
              gameColor[gameSequence[x]].call(gameColor);
              console.log(x);
              x++;
              if (x === gameSequence.length){
                  clearInterval(i);
              }
          }, 1500);

  }

  // this function check that user click the right button.
  function checkGame(color) {
      if (color === gameSequence[count2] && gameSequence[count2+1] !== undefined){
          gameColor[color].call(gameColor);
          count2++;
      }
      else if (color === gameSequence[count2] && gameSequence[count2+1] === undefined){
          count++;
          count2=0;
          if (count === 20){
              $("#count p").text(count);
              setTimeout(function () {
                  $("#count p").text("WIN!");
              }, 2000);
              count = 0;
              count2 = 0;
              gameSequence = [];
          } else {
              gameColor[color].call(gameColor);
              if(count < 10){
                  $("#count p").text("0"+count);
              } else {
                  $("#count p").text(count);
              }

              let firstColor = colorArray[Math.round(Math.random()*3)];
              gameSequence.push(firstColor);

              setTimeout(function () {
                  gameRun();
              }, 1000);

          }

      }
      else {
          if(strictMode === true){
              count2=0;
              count=0;
              errorGame();
              setTimeout(function () {
                  start();
              }, 3000);
          } else {
              errorGame();
              gameRun();
              count2=0;
          }

      }
  }

  // this function alert error.
  function errorGame(){
    $("#count p").text("!!");
    setTimeout(function () {
       $("#count p").text("");
     }, 1000);
    setTimeout(function () {
        $("#count p").text("!!");
    }, 1000);
    setTimeout(function () {
          $("#count p").text("");
      }, 1000);
    setTimeout(function () {
        if(count < 10){
            $("#count p").text("0"+count);
        } else {
            $("#count p").text(count);
        }
      }, 1000);

  }

    // button to turn on or off the game.
    $("#btn").click(function(){
        count = 0;
        $("#btn").toggleClass("btn-on");
        gameSequence = [];
        if(onOff === false){
            $("#count p").text("--");
            onOff = true;
        } else if ( onOff === true){
            $("#count p").text("");
            onOff = false;
        }
    })

    // this button start the game when he is clicked.
    $("#start-button").click(function () {
        count = 0;
        if (onOff === true){
            start();
            $("#count p").text("00");
        }
    })

    // to enable the "strict" game mode.
    $("#strict-button").click(function () {
        if (onOff === true){
            if (strictMode === false){
                $("#strict-button").css("background-color", "#f50847");
                strictMode = true;
            } else {
                $("#strict-button").css("background-color", "#e3e4f5");
                strictMode = false;
            }
        }
    })


    $("#green").click(function () {
        checkGame("green");
    })

    $("#blue").click(function () {
        checkGame("blue");
    })

    $("#yellow").click(function () {
        checkGame("yellow");
    })

    $("#red").click(function () {
        checkGame("red");
    })
  
})