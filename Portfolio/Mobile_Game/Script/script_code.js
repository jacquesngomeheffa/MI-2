"use strict";
//declaratie van variabelen die worden als een container beschouwd
var highScore, teller, tText, db, naam, score, myTimer;
var voegScoreEenKeer = 1;
var counter = 1
    , muziek, aantalCollision, aantalCollisionMobile, huidigeCollisionVal, huidigeCollisionVal2;
// Code om de geposte value op te halen
function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function (m, key, value) { // callback
            vars[key] = value !== undefined ? value : '';
        });
    if (param) {
        return vars[param] ? vars[param] : "Gast";
    }
    return vars;
}
/**
 *Hieronder wordt de naam van de speler opgehaald en weergegeven
 * De muziek wordt ook afgespeeld
 *Hier wordt de ingegeven aantal collision ook opgenomen
 **/
$(function () {
    $('#muziek')[0].loop = true;
    $('#muziek')[0].play();
    aantalCollision = document.getElementById("collisionIn");
    aantalCollisionMobile = document.getElementById("collisionInMobile");
    naam = $_GET('name');
    var x = document.getElementsByClassName("toonNaam");
    muziek = document.getElementById("muziek");
    x[0].innerHTML = naam;
    x[1].innerHTML = naam;
});
// Functie om het spel te herstarten
function herstartFunction() {
    window.location.href = "index.html";
}
//Functie om de muziek te pauzeren en terug af te spelen
function pauseFunction() {
    return muziek.paused ? muziek.play() : muziek.pause();
}
/**
 * Indien de speler de default collision waarde veranderd wordt de code uitgevoerd
 * Waar men gaat de inputveld omzetten naar een read only inputveld
 **/
function aantalCollisionFunction() {
    huidigeCollisionVal = parseInt(aantalCollision.value, 10);
    huidigeCollisionVal2 = parseInt(aantalCollisionMobile.value, 10);
    document.getElementById("collisionIn").readOnly = true;
    document.getElementById("collisionInMobile").readOnly = true;
}
//Functie om de auto te besturen 
$(document).keydown(function (e) {
    var geleAutoX = parseInt(($('#geleAuto').css('left')), 10);
    if (e.which === 39) {
        if (geleAutoX < 280) {
            $('#geleAuto').css('left', geleAutoX + 30);
        }
    }
    if (e.which === 37) {
        if (geleAutoX > 70) {
            $('#geleAuto').css('left', geleAutoX - 30);
        }
    }
});
// beide nakomende codes zorgen ervoor om het spel te besturen door touchscreen dus eigenlijk op mobile.
var custom_event = $.support.touch ? "vclick" : "click";
$(document).on(custom_event, "#links", function () {
    var geleAutoX = parseInt(($('#geleAuto').css('left')), 10);
    if (geleAutoX > 60) {
        $('#geleAuto').css('left', geleAutoX - 30);
    }
});
$(document).on(custom_event, "#rechts", function () {
    var geleAutoX = parseInt(($('#geleAuto').css('left')), 10);
    if (geleAutoX < 285) {
        $('#geleAuto').css('left', geleAutoX + 30);
    }
});
// Hieronder wordt er drie verschillende mogelijk level functies van het spel
// Level Gemakkelijk
function gemakkelijkFunction() {
    // De inputveld waar de speler de aantal collision ingeeft wordt de variabel Readonly aan toegekend
    $(function () { 
        if((huidigeCollisionVal == null) ||(huidigeCollisionVal2 == null))  {
    huidigeCollisionVal = 3;
    huidigeCollisionVal2 = 3;
        document.getElementById("collisionIn").value = 3;
        document.getElementById("collisionInMobile").value = 3;
            document.getElementById("collisionIn").readOnly = true;
        document.getElementById("collisionInMobile").readOnly = true;
        }
    });
    $(function () {
        var ok = 1
            , minute = 0;
        (function () {
            myTimer = setInterval(function () {
                var setTimer = document.getElementsByClassName("timer");
                if (counter === 60) {
                    minute += 1;
                    counter = 1;
                }
                if (counter >= 0 && minute === 0) {
                    counter = counter + 1;
                    setTimer[0].innerHTML = "uw aantal second(en) " + counter;
                    setTimer[1].innerHTML = "uw aantal second(en) " + counter;
                }
                else if (minute > 0 && minute < 10) {
                    counter = counter + 1;
                    setTimer[0].innerHTML = "uw aantal second(en) 0" + minute + ":" + counter;
                    setTimer[1].innerHTML = "uw aantal second(en) 0" + minute + ":" + counter;
                }
                else if (minute >= 10) {
                    counter = counter + 1;
                    setTimer[0].innerHTML = "uw aantal second(en) " + minute + ":" + counter;
                    setTimer[1].innerHTML = "uw aantal second(en) " + minute + ":" + counter;
                }
                else {
                    counter = counter + 1;
                    setTimer[0].innerHTML = "uw aantal second(en) " + counter;
                    setTimer[1].innerHTML = "uw aantal second(en) " + counter;
                }
                // Display 'counter' wherever you want to display it.
            }, 1000);
        }());

        function deplace() {
            $('#rodeAuto').animate({
                top: '-=600'
            }, 1450, 'linear', function () {
                var rodeAutoX = Math.floor(Math.random() * 200) + 80
                    , rodeAutoY = 500;
                $('#rodeAuto').css('top', rodeAutoY);
                $('#rodeAuto').css('left', rodeAutoX);
                ok = 1;
            });
            $('.fond').animate({
                top: '-=360'
            }, 1000, 'linear', function () {
                $('.fond').css('top', 0);
                deplace();
            });
        }

        function collision() {
            var geleAutoX = parseInt(($('#geleAuto').css('left')), 10)
                , rodeAutoX = parseInt(($('#rodeAuto').css('left')), 10)
                , geleAutoY = 10
                , rodeAutoY = parseInt(($('#rodeAuto').css('top')), 10);
            if (((rodeAutoX > geleAutoX) && (rodeAutoX < (geleAutoX + 30)) && (rodeAutoY > geleAutoY) && (rodeAutoY < (geleAutoY + 75)) && (ok === 1)) || ((geleAutoX > rodeAutoX) && (geleAutoX < (rodeAutoX + 30)) && (rodeAutoY > geleAutoY) && (rodeAutoY < (geleAutoY + 75)) && (ok === 1))) {
                $('#son')[0].play();
                collision = parseInt($('#info').text()) + 1;
                $('#info').text(collision);
                $('#infoMobile').text(collision);
                ok = 0;
            }
            if ((huidigeCollisionVal - 1 < collision) || (huidigeCollisionVal2 - 1 < collision)) {
                document.getElementById("verlies").style.visibility = "visible";
                naam = $_GET('name');
                if (minute === 0) {
                    score = "00:" + counter;
                }
                else if (minute > 0 && minute < 10) {
                    score = "0" + minute + ":" + counter;
                }
                else {
                    score = minute + ":" + counter;
                }
                $("#fond1").stop();
                $("#fond2").stop();
                $("#fond3").stop();
                $('#geleAuto').stop();
                $('#rodeAuto').stop();
                clearInterval(myTimer);
                document.getElementById("timerMobile").style.display = 'none';
                document.getElementById("timer").style.display = 'none';
                document.getElementById("uwScore").innerHTML = "Uw score " + score;
                document.getElementById("uwScoreMobile").innerHTML = "Uw score " + score;
                if (voegScoreEenKeer === 1) {
                    // voeg deze gegevens toe aan een nieuw item in de array highScore
                    highScore.push({
                        "naam": naam
                        , "score": score
                    });
                    // voeg de gegevens OOK toe aan de highscores tabel met WebSQL
                    db.transaction(function (tx) {
                        tx.executeSql('INSERT INTO highscores (naam,score) VALUES (?, ?)', [naam, score]);
                    });
                    // update de gegevens in de tabellen op het 2e en 3e scherm
                    updateTablesSQL();
                    voegScoreEenKeer = 0;
                }
            }
        }
        deplace();
        setInterval(collision, 20);
    });
}
// Level Gemiddeld
function gemiddeldFunction() {
    // De inputveld waar de speler de aantal collision ingeeft wordt de variabel Readonly aan toegekend
       $(function () { 
        if((huidigeCollisionVal == null) ||(huidigeCollisionVal2 == null))  {
    huidigeCollisionVal = 3;
    huidigeCollisionVal2 = 3;
        document.getElementById("collisionIn").value = 3;
        document.getElementById("collisionInMobile").value = 3;
            document.getElementById("collisionIn").readOnly = true;
        document.getElementById("collisionInMobile").readOnly = true;
        }
    });
    $(function () {
        var ok = 1
            , minute = 0;
        (function () {
            myTimer = setInterval(function () {
                var setTimer = document.getElementsByClassName("timer");
                if (counter === 60) {
                    minute += 1;
                    counter = 1;
                }
                if (counter >= 0 && minute === 0) {
                    counter = counter + 1;
                    setTimer[0].innerHTML = "uw aantal second(en) " + counter;
                    setTimer[1].innerHTML = "uw aantal second(en) " + counter;
                }
                else if (minute > 0 && minute < 10) {
                    counter = counter + 1;
                    setTimer[0].innerHTML = "uw aantal second(en) 0" + minute + ":" + counter;
                    setTimer[1].innerHTML = "uw aantal second(en) 0" + minute + ":" + counter;
                }
                else if (minute >= 10) {
                    counter = counter + 1;
                    setTimer[0].innerHTML = "uw aantal second(en) " + minute + ":" + counter;
                    setTimer[1].innerHTML = "uw aantal second(en) " + minute + ":" + counter;
                }
                else {
                    counter = counter + 1;
                    setTimer[0].innerHTML = "uw aantal second(en) " + counter;
                    setTimer[1].innerHTML = "uw aantal second(en) " + counter;
                }
                // Display 'counter' wherever you want to display it.
            }, 1000);
        })();

        function deplace() {
            $('#rodeAuto').animate({
                top: '-=600'
            }, 1200, 'linear', function () {
                var rodeAutoX = Math.floor(Math.random() * 100) + 60
                    , rodeAutoY = 500;
                $('#rodeAuto').css('top', rodeAutoY);
                $('#rodeAuto').css('left', rodeAutoX);
                ok = 1;
            });
            $('#rodeAuto2').animate({
                top: '-=600'
            }, 1370, 'linear', function () {
                var rodeAutoX2 = Math.floor(Math.random() * 95) + 180
                    , rodeAutoY = 500;
                $('#rodeAuto2').css('top', rodeAutoY);
                $('#rodeAuto2').css('left', rodeAutoX2);
                ok = 1;
            });
            $('.fond').animate({
                top: '-=360'
            }, 1000, 'linear', function () {
                $('.fond').css('top', 0);
                deplace();
            });
        }

        function collision() {
            var geleAutoX = parseInt(($('#geleAuto').css('left')), 10)
                , rodeAutoX = parseInt(($('#rodeAuto').css('left')), 10)
                , geleAutoY = 10
                , rodeAutoY = parseInt(($('#rodeAuto').css('top')), 10)
                , rodeAutoY2 = parseInt(($('#rodeAuto2').css('top')), 10)
                , rodeAutoX2 = parseInt(($('#rodeAuto2').css('left')), 10);
            if (((rodeAutoX > geleAutoX) && (rodeAutoX < (geleAutoX + 30)) && (rodeAutoY > geleAutoY) && (rodeAutoY < (geleAutoY + 75)) && (ok === 1)) || ((geleAutoX > rodeAutoX) && (geleAutoX < (rodeAutoX + 30)) && (rodeAutoY > geleAutoY) && (rodeAutoY < (geleAutoY + 75)) && (ok === 1))) {
                $('#son')[0].play();
                collision = parseInt($('#info').text()) + 1;
                $('#info').text(collision);
                $('#infoMobile').text(collision);
                ok = 0;
            }
            if ((((rodeAutoX2 > geleAutoX) && (rodeAutoX2 < (geleAutoX + 30)) && (rodeAutoY2 > geleAutoY) && (rodeAutoY2 < (geleAutoY + 75)) && (ok === 1)) || ((geleAutoX > rodeAutoX2) && (geleAutoX < (rodeAutoX2 + 30)) && (rodeAutoY2 > geleAutoY) && (rodeAutoY2 < (geleAutoY + 75)) && (ok === 1)))) {
                $('#son')[0].play();
                collision = parseInt($('#info').text()) + 1;
                $('#info').text(collision);
                $('#infoMobile').text(collision);
                ok = 0;
            }
            if ((huidigeCollisionVal - 1 < collision) || (huidigeCollisionVal2 - 1 < collision)) {
                document.getElementById("verlies").style.visibility = "visible";
                naam = $_GET('name');
                if (minute === 0) {
                    score = "00:" + counter;
                }
                else if (minute > 0 && minute < 10) {
                    score = "0" + minute + ":" + counter;
                }
                else {
                    score = minute + ":" + counter;
                }
                $("#fond1").stop();
                $("#fond2").stop();
                $("#fond3").stop();
                $('#geleAuto').stop();
                $('#rodeAuto').stop();
                $('#rodeAuto2').stop();
                clearInterval(myTimer);
                document.getElementById("timerMobile").style.display = 'none';
                document.getElementById("timer").style.display = 'none';
                document.getElementById("uwScore").innerHTML = "Uw score " + score;
                document.getElementById("uwScoreMobile").innerHTML = "Uw score " + score;
                if (voegScoreEenKeer === 1) {
                    // voeg deze gegevens toe aan een nieuw item in de array highScore
                    highScore.push({
                        "naam": naam
                        , "score": score
                    });
                    // voeg de gegevens OOK toe aan de highscores tabel met WebSQL
                    db.transaction(function (tx) {
                        tx.executeSql('INSERT INTO highscores (naam,score) VALUES (?, ?)', [naam, score]);
                    });
                    // update de gegevens in de tabellen op het 2e en 3e scherm
                    updateTablesSQL();
                    voegScoreEenKeer = 0;
                }
            }
        }
        deplace();
        setInterval(collision, 20);
    });
}
// Level moeilijk
function moeilijkFunction() {
    // De inputveld waar de speler de aantal collision ingeeft wordt de variabel Readonly aan toegekend
       $(function () { 
        if((huidigeCollisionVal == null) ||(huidigeCollisionVal2 == null))  {
    huidigeCollisionVal = 3;
    huidigeCollisionVal2 = 3;
        document.getElementById("collisionIn").value = 3;
        document.getElementById("collisionInMobile").value = 3;
            document.getElementById("collisionIn").readOnly = true;
        document.getElementById("collisionInMobile").readOnly = true;
        }
    });
    $(function () {
        var ok = 1
            , minute = 0;
        (function () {
            myTimer = setInterval(function () {
                var setTimer = document.getElementsByClassName("timer");
                if (counter === 60) {
                    minute += 1;
                    counter = 1;
                }
                if (counter >= 0 && minute === 0) {
                    counter = counter + 1;
                    setTimer[0].innerHTML = "uw aantal second(en) " + counter;
                    setTimer[1].innerHTML = "uw aantal second(en) " + counter;
                }
                else if (minute > 0 && minute < 10) {
                    counter = counter + 1;
                    setTimer[0].innerHTML = "uw aantal second(en) 0" + minute + ":" + counter;
                    setTimer[1].innerHTML = "uw aantal second(en) 0" + minute + ":" + counter;
                }
                else if (minute >= 10) {
                    counter = counter + 1;
                    setTimer[0].innerHTML = "uw aantal second(en) " + minute + ":" + counter;
                    setTimer[1].innerHTML = "uw aantal second(en) " + minute + ":" + counter;
                }
                else {
                    counter = counter + 1;
                    setTimer[0].innerHTML = "uw aantal second(en) " + counter;
                    setTimer[1].innerHTML = "uw aantal second(en) " + counter;
                }
                // Display 'counter' wherever you want to display it.
            }, 1000);
        })();

        function deplace() {
            $('#rodeAuto').animate({
                top: '-=600'
            }, 1000, 'linear', function () {
                var rodeAutoX = Math.floor(Math.random() * 70) + 50
                    , rodeAutoY = 500;
                $('#rodeAuto').css('top', rodeAutoY);
                $('#rodeAuto').css('left', rodeAutoX);
                ok = 1;
            });
            $('#rodeAuto2').animate({
                top: '-=600'
            }, 1190, 'linear', function () {
                var rodeAutoX2 = Math.floor(Math.random() * 40) + 160
                    , rodeAutoY = 500;
                $('#rodeAuto2').css('top', rodeAutoY);
                $('#rodeAuto2').css('left', rodeAutoX2);
                ok = 1;
            });
            $('#rodeAuto3').animate({
                top: '-=600'
            }, 1300, 'linear', function () {
                var rodeAutoX3 = Math.floor(Math.random() * 40) + 240
                    , rodeAutoY = 500;
                $('#rodeAuto3').css('top', rodeAutoY);
                $('#rodeAuto3').css('left', rodeAutoX3);
                ok = 1;
            });
            $('.fond').animate({
                top: '-=360'
            }, 1000, 'linear', function () {
                $('.fond').css('top', 0);
                deplace();
            });
        }

        function collision() {
            var geleAutoX = parseInt(($('#geleAuto').css('left')), 10)
                , rodeAutoX = parseInt(($('#rodeAuto').css('left')), 10)
                , rodeAutoX2 = parseInt(($('#rodeAuto2').css('left')), 10)
                , rodeAutoX3 = parseInt(($('#rodeAuto3').css('left')), 10)
                , geleAutoY = 10
                , rodeAutoY = parseInt(($('#rodeAuto').css('top')), 10)
                , rodeAutoY2 = parseInt(($('#rodeAuto2').css('top')), 10)
                , rodeAutoY3 = parseInt(($('#rodeAuto3').css('top')), 10);
            if (((rodeAutoX > geleAutoX) && (rodeAutoX < (geleAutoX + 30)) && (rodeAutoY > geleAutoY) && (rodeAutoY < (geleAutoY + 75)) && (ok === 1)) || ((geleAutoX > rodeAutoX) && (geleAutoX < (rodeAutoX + 30)) && (rodeAutoY > geleAutoY) && (rodeAutoY < (geleAutoY + 75)) && (ok === 1))) {
                $('#son')[0].play();
                collision = parseInt($('#info').text()) + 1;
                $('#info').text(collision);
                ok = 0;
            }
            if ((((rodeAutoX2 > geleAutoX) && (rodeAutoX2 < (geleAutoX + 30)) && (rodeAutoY2 > geleAutoY) && (rodeAutoY2 < (geleAutoY + 75)) && (ok === 1)) || ((geleAutoX > rodeAutoX2) && (geleAutoX < (rodeAutoX2 + 30)) && (rodeAutoY2 > geleAutoY) && (rodeAutoY2 < (geleAutoY + 75)) && (ok === 1)))) {
                $('#son')[0].play();
                collision = parseInt($('#info').text()) + 1;
                $('#info').text(collision);
                ok = 0;
            }
            if ((((rodeAutoX3 > geleAutoX) && (rodeAutoX3 < (geleAutoX + 30)) && (rodeAutoY3 > geleAutoY) && (rodeAutoY3 < (geleAutoY + 75)) && (ok === 1)) || ((geleAutoX > rodeAutoX3) && (geleAutoX < (rodeAutoX3 + 30)) && (rodeAutoY3 > geleAutoY) && (rodeAutoY3 < (geleAutoY + 75)) && (ok === 1)))) {
                $('#son')[0].play();
                collision = parseInt($('#info').text()) + 1;
                $('#info').text(collision);
                $('#infoMobile').text(collision);
                ok = 0;
            }
            if ((huidigeCollisionVal - 1 < collision) || (huidigeCollisionVal2 - 1 < collision)) {
                document.getElementById("verlies").style.visibility = "visible";
                naam = $_GET('name');
                if (minute === 0) {
                    score = "00:" + counter;
                }
                else if (minute > 0 && minute < 10) {
                    score = "0" + minute + ":" + counter;
                }
                else {
                    score = minute + ":" + counter;
                }
                $("#fond1").stop();
                $("#fond2").stop();
                $("#fond3").stop();
                $('#geleAuto').stop();
                $('#rodeAuto').stop();
                $('#rodeAuto2').stop();
                $('#rodeAuto3').stop();
                clearInterval(myTimer);
                document.getElementById("timerMobile").style.display = 'none';
                document.getElementById("timer").style.display = 'none';
                document.getElementById("uwScore").innerHTML = "Uw score " + score;
                document.getElementById("uwScoreMobile").innerHTML = "Uw score " + score;

                if (voegScoreEenKeer === 1) {
                    // voeg deze gegevens toe aan een nieuw item in de array highScore
                    highScore.push({
                        "naam": naam
                        , "score": score
                    });
                    // voeg de gegevens OOK toe aan de highscores tabel met WebSQL
                    db.transaction(function (tx) {
                        tx.executeSql('INSERT INTO highscores (naam,score) VALUES (?, ?)', [naam, score]);
                    });
                    // update de gegevens in de tabellen op het 2e en 3e scherm
                    updateTablesSQL();
                    voegScoreEenKeer = 0;
                }
            }
        }
        deplace();
        setInterval(collision, 20);
    });
}
// De functie om het spel te pauzeren 
function stopFunction() {
    $(function () {
        $("#fond1").stop();
        $("#fond2").stop();
        $("#fond3").stop();
        $("#geleAuto").stop();
        $("#rodeAuto").stop();
        $("#rodeAuto2").stop();
        $("#rodeAuto3").stop();
        clearInterval(myTimer);
    });
}
//Virtuele database om de score van iedere speler aan te tonen
function updateTables() {
    // update de tabel in het '2e' scherm met de inhoud
    // van de array highScore (niet WebSQL)
    teller = 0;
    tText = "";
    for (teller = 0; teller < highScore.length; teller += 1) {
        tText += "<tr><td>" + highScore[teller].naam + "<\/td><td>" + highScore[teller].score + "<\/td><\/tr>";
    }
    $("#highscore tbody").html(tText);
}

function updateTablesSQL() {
    // update de tabel in het '3e' scherm met de inhoud
    // van een select query op de highscores tabel in de
    // lokale WebSQL databank)
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM highscores order by score desc', [], function (tx, results) {
            var len = results.rows.length
                , i;
            tText = "";
            for (teller = 0; teller < len; teller += 1) {
                tText += "<tr><td>" + results.rows.item(teller).naam + "<\/td><td>" + results.rows.item(teller).score + "<\/td><\/tr>";
            }
            $("#highscoreDB tbody").html(tText);
        }, null);
    });
}
$(document).ready(function () {
    naam = "Jacques";
    score = "00:30";
    highScore = [{
        "naam": naam
        , "score": score
    }];
    $(document).bind('pageinit', function () {
        // schakel de transities bij navigatie tussen
        // schermen uit.
        $.mobile.defaultPageTransition = 'none';
    });
    // open de databank
    db = openDatabase('mydb', '1.0', 'Test DB', 0.1 * 1024 * 1024);
    db.transaction(function (tx) {
        // maak de tabel aan als deze nog niet bestond
        tx.executeSql('CREATE TABLE IF NOT EXISTS highscores (naam, score)');
        // haal het aantal highscores op uit de tabel highscores
        // de ? worden vervangen door de elementen in de array na
        // de querystring
        tx.executeSql('select count(*) as aantal from highscores where naam like ? and score like ?', [naam, score], function (tx, results) {
            // kijk na of het resultaat ok is.
            console.log("select werkt");
            if (results.rows.item(0).aantal === 0) {
                // er was nog geen combinatie met de naam & score in de db, dus voeg die nu toe :
                tx.executeSql('INSERT INTO highscores (naam,score) VALUES (?, ?)', [naam, score], function (tx, results) {
                    // de select was ok
                    console.log("ok!");
                }, function (tx, error) {
                    // er was een probleem met de select
                    console.log("NOK!");
                });
            }
        }, function (tx, error) {
            console.log("NOK!");
        });
    });
    // update de gegevens in de tabellen op het 2e en 3e scherm
    updateTables();
    updateTablesSQL();
});