
//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//booleanos
var paused = false;	
var aterrizado = false;	
var fuelAgotado = false;
var salir=false;
//condición de victoria
var velocidadVictoria=5;
//combustible dependiendo de la dificultad
var cdificultad=100;
//MARCADORES
var combustibleGastado= null;
var altura= null;
var velocidad=null;

//al cargar por completo la página...
window.onload = function(){
	
	//definición de eventos
	//mostrar menú móvil
	document.getElementById("mostrar").onclick = function () {
		stop();
		document.getElementById("contenedorMenu").style.display ="inline-block";
		document.getElementById("play").style.display = "inline-block";
		document.getElementById("pause").style.display = "none";
		paused=true;
	}
	//ocultar menú móvil
	document.getElementById("reanudar").onclick = function () {
		play();
	}
	//encender/apagar el motor al hacer click en la pantalla
	document.getElementById("motor").onclick = function () {
		if(a==g){
			motorOn();
		}else{
			motorOff();
		}
	}
	//reiniciar la partida al pulsar el botón de reiniciar
	document.getElementById("reiniciar").onclick = function () {
		reiniciar();
	}
	//Pausar la partida
	document.getElementById("pause").onclick = function () {
		if(!paused) pausar();
	}
	//Reanudar la partida
	document.getElementById("play").onclick = function () {
		play();
	}
	//Reiniciar la partida al terminarla
	document.getElementById("tryagain").onclick = function () {
		reiniciar();
	}
	//Abrir el menú de ajustes
	document.getElementById("ajustes").onclick = function () {
		stop();
		paused=true;
		document.getElementById("menuAjustes").style.display ="inline-block"; 
		document.getElementById("contenedorMenu").style.display ="inline-block"; 
	}
	//Cerrar el menú de ajustes
	document.getElementById("cerrar").onclick = function () {
		document.getElementById("contenedorMenu").style.display ="none";
		document.getElementById("menuAjustes").style.display ="none";  
		play();
	}
	//Cerrar el menú de ajustes dejando abierto el menú para móvil
	document.getElementById("cerrarMovil").onclick = function () {
		document.getElementById("menuAjustes").style.display ="none";  
		document.getElementById("play").style.display = "inline-block";
		document.getElementById("pause").style.display = "none";
	}
	//Ir a la web de instrucciones
	document.getElementById("info").onclick = function () {
		salir=confirm("¿Seguro que desea salir?");
		if(salir){
			window.open("instrucciones.html","_self");
			salir=false;
		}
	}
	//Ir a la web de istrucciones desde el móvil
	document.getElementById("instrucciones").onclick = function () {
		salir=confirm("¿Seguro que desea salir?");
		if(salir){
			window.open("instrucciones.html","_self");
			salir=false;
		}
	}
	//Ir a la web de información
	document.getElementById("acerca").onclick = function () {
		salir=confirm("¿Seguro que desea salir?");
		if(salir){
			window.open("informacion.html", "_self");
			salir=false;
		}
	}
	//Abrir el menú de ajustes desde el móvil
	document.getElementById("ajustesMovil").onclick = function () {
		document.getElementById("menuAjustes").style.display ="inline-block";  
	}
	//Cambiar a dificultad fácil
	document.getElementsByClassName("dificultad1")[0].onclick = function () {
	
		velocidadVictoria=5;
		cdificultad=100;
		document.getElementsByClassName("dificultad1")[0].style.backgroundColor ="#a2b7c9";
		document.getElementsByClassName("dificultad2")[0].style.backgroundColor ="#e7e7e7";
		document.getElementsByClassName("dificultad3")[0].style.backgroundColor ="#e7e7e7";
		quitarDificultad();
	}
	//Cambiar a dificultad normal
	document.getElementsByClassName("dificultad2")[0].onclick = function () {

		document.getElementsByClassName("dificultad1")[0].style.backgroundColor ="#e7e7e7";
		document.getElementsByClassName("dificultad2")[0].style.backgroundColor ="#a2b7c9";
		document.getElementsByClassName("dificultad3")[0].style.backgroundColor ="#e7e7e7";
		velocidadVictoria=3;
		cdificultad=80;
		quitarDificultad();
	}
	//Cambiar a dificultad difícil
	document.getElementsByClassName("dificultad3")[0].onclick = function () {

		document.getElementsByClassName("dificultad1")[0].style.backgroundColor ="#e7e7e7";
		document.getElementsByClassName("dificultad2")[0].style.backgroundColor ="#e7e7e7";
		document.getElementsByClassName("dificultad3")[0].style.backgroundColor ="#a2b7c9";
		velocidadVictoria=1;
		cdificultad=70;		
		quitarDificultad();
	}
	
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones

function start(){
	//cada intervalo de tiempo mueve la nave
	if(!paused){
		timer=setInterval(function(){ moverNave(); }, dt*1000);
	}
}

function stop(){
	//Parar la nave y su consumo
	clearInterval(timer);
	clearInterval(timerFuel);
	timerFuel=null;
	
	if(y>70){
		//Finalizar la partida
		aterrizado=true;
		document.getElementById("aguja").style.transform = "rotate(-90deg)";
		altura=80;
		document.getElementById("altura").style.top = altura+"%"; 
		
		//Comprobar victoria
		if(v<velocidadVictoria){
			document.getElementById("final").style.display ="inline-block"; 
			document.getElementById("textFinal").innerHTML = "¡Has ganado! ¡Felicidades!";
		}else{
			document.getElementById("imgNave").src="img/explosion.gif";
			document.getElementById("final").style.display ="inline-block"; 
			document.getElementById("textFinal").innerHTML = "¡Has perdido! <br> Vuelve a intentarlo";
		}
	}
}

function moverNave(){
	if(y>=0){
		//cambiar velocidad y posicion
		v +=a*dt;
		y +=v*dt;

		//actualizar marcadores
		if(v>=0){
			velocidad=(v-7.5)*90/7.5;
		}else{
			velocidad=((-v)-7.5)*90/7.5;
		}
		document.getElementById("aguja").style.transform = "rotate("+velocidad+"deg)";
		altura=y+10;
		document.getElementById("altura").style.top = altura+"%"; 
		//mover hasta que top sea un 70% de la pantalla
		if (y<70){ 
			document.getElementById("nave").style.top = y+"%"; 
		} else { 
			stop();
		}
	}else{
		//Reducir la velocidad a 0 y parar el motor si la nave ha llegado al límite superior
		y=0;
		v=0;
		if(a==-g){
			if(v>=0){
				velocidad=(v-7.5)*90/7.5;
			}else{
				velocidad=((-v)-7.5)*90/7.5;
			}
			document.getElementById("aguja").style.transform = "rotate("+velocidad+"deg)";
			altura=y+10;
			document.getElementById("altura").style.top = altura+"%"; 
			motorOff();
		}
	}
	
}
function motorOn(){
	if(!paused && !aterrizado && !fuelAgotado){
		//cambiar botón no pulsado
		document.getElementById("motor").src="img/button2.png"
		//cambiar nave
		document.getElementById("imgNave").src="img/fuego.png";
		//el motor da aceleración a la nave
		a=-g;
		//mientras el motor esté activado gasta combustible
		if (timerFuel==null)
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
	}
}
function motorOff(){
	if(!paused && !aterrizado){
		//cambiar botón pulsado
		document.getElementById("motor").src="img/button1.png"
		//cambiar nave
		document.getElementById("imgNave").src="img/nave.png";
		// aceleración igual a la gravedad
		a=g;
		// apagar el consumo del fuel
		clearInterval(timerFuel);
		timerFuel=null;
	}
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ){
		c = 0;
		//Apagar el motor al agotar el combustible
		fuelAgotado=true;
		if(a==-g){
			motorOff();
		}
	}
	//Actualizar marcador
	combustibleGastado=100-c;
	document.getElementById("barra").style.height = combustibleGastado+"%";
}
function reiniciar(){
	//Inicializar todas las variables y elementos para reiniciar la partida 
	
	y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
	v = 0;
	c = cdificultad;
	aterrizado=false;
	paused = false;
	fuelAgotado=false;
	if(a==-g){
		motorOff();
	}	
	g = 1.622;
	clearInterval(timerFuel);
	timerFuel=null;
	clearInterval(timer);
	document.getElementById("barra").style.height = 100-cdificultad+"%";
	document.getElementById("aguja").style.transform = "rotate(-90deg)";
	altura=y+10;
	document.getElementById("altura").style.top = altura+"%"; 
	document.getElementById("pause").style.display = "inline-block";
	document.getElementById("play").style.display = "none";	
	document.getElementById("imgNave").src="img/nave.png";
	document.getElementById("final").style.display = "none";	
	document.getElementById("contenedorMenu").style.display ="none";
	document.getElementById("menuAjustes").style.display ="none";  
	start();
}
function pausar(){
	
	if(!aterrizado){
		//Pausar partida
		stop();
		document.getElementById("play").style.display = "inline-block";
		document.getElementById("pause").style.display = "none";
		document.getElementById("contenedorMenu").style.display ="inline-block"; 
		paused=true;
	}
}
function play(){
	//Reanudar partida
	document.getElementById("pause").style.display = "inline-block";
	document.getElementById("play").style.display = "none";
	document.getElementById("contenedorMenu").style.display ="none";
	document.getElementById("menuAjustes").style.display ="none"; 	
	if(a==-g){
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
	}
	paused=false;
	start();
}
function quitarDificultad(){
		//Esconder menus y reiniciar partida con la nueva dificultad
		document.getElementById("contenedorMenu").style.display ="none";
		document.getElementById("menuAjustes").style.display ="none"; 
		reiniciar();
}
