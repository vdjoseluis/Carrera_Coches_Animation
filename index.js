var finalPosition=1;
$(document).ready(function(){

    // Empieza con el botón "restart" y la tabla resultados ocultos.
    $("#restart").hide();
    $("#div-results").hide();

    // En cuanto se realiza un cambio en el select, vacía el div de pista y crea el nuevo array.
    $("#participantes").change(function() {
        $("#race").empty();
        drivers = $(this).children("option:selected").val();
        cars = new Array();
        for (let i = 1; i <= drivers; i++) { 
            cars[i] = "<hr>" + "<div id ='race-position" + i + "'>" +   
            "<p id='message" + i + "'></p>" + "<img src='img/car" + i + ".png' id='car" + i + "' >"; 
            $("#race").append(cars[i]);
        }
    });

    // Muestra "restart" y se oculta "start" hasta q alcance el final marcado y llama a "resultados de carrera"
    $("#start").click(function () { 
        $("#restart").show(); 
		$(this).hide(); 
        for (let i = 1; i <= drivers; i++) {
            let random = Math.floor((Math.random() * 100) + 3);
            $("#race-position"+i).animate({ marginLeft: "+=90%" }, 85 * (random), function() {
                var imgCar = document.getElementById("car"+i);
                $("#table-results").append("<tr> <td>" + finalPosition + "º</td> <td> <img src='" +
                imgCar.src + "'></td> <td>Car "+i+"</tr>");
                if (finalPosition == drivers) {
                    $("#message"+i).append(finalPosition++);
                    $(document).ready(function () {
                        getRaceResults();
                    })
                } else {
                    $("#message"+i).append((finalPosition++));
                }
            });
        }
    });

    // Muestra "start" y se oculta "restart". Vacía la tabla resultados y muestra de nuevo la pista.
    $("#restart").click(function(){
        for (let i = 1; i <= drivers; i++) {
            $("#message"+i).empty();
            $("#race-position"+i).stop();
            $("#race-position"+i).animate({ marginLeft: "0px"}, 2000);
            finalPosition = 1;
        }
        $("#table-results").empty(); 
        $("#table-results").append("<tr><th>Position</th><th>Car</th><th>Driver</th></tr>");
		$("#div-results").hide(); 
		$(".div-race").show(); 
		$(this).hide(); 
		$('#start').show();
    });
});

// Función que oculta la pista y muestra la tabla resultados.
function getRaceResults() {
    $(".div-race").hide();
    $("#div-results").show();
    $("#table-results").show();

}