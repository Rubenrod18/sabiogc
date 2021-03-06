$(function(){
	respuestasIn = []; // array donde guardar respuestas incorrectas para asociarlas a la pregunta que se esté creando

	$('#tabs').tabs();// crear menú de pestañas

	/**
	* Petición AJAX para crear nuevas categorias
	*/
	$('#newCateg').click(function(e){
		e.preventDefault();
		$.get("bdcategorias.php", {nombre : $('#categoria').val()}, function(respuesta){
			$("#listaCateg").html(respuesta);
		});
	});

	$('.agrPregunta').on('click', function(){
		$.get("listarcategorias.php", function(respuesta){
			$("#selectCategoria").html(respuesta);
		});
	});

	/**
	* Petición AJAX para eliminar categorías
	*/
	$('.close').click(function(){
		$.get("borrarcategoria.php", {idcategoria : $(this).prop('id')}, function(respuesta){
			$("#listaCateg").html(respuesta);
		});
	});
	
	$('#confirmod').click(function(e){
		var editfoto = $('#editfoto').val();
		/*editfoto = editfoto.split('\\');
		editfoto = editfoto[editfoto.length-1];*/

		if(editfoto == ''){
			e.preventDefault();
			var correcto = true;
			var nombre = $('#editnombre').val();
			var apellidos = $('#editapellidos').val();
			var email = $('#editemail').val();

			if($('#editpassword2').val() != $('#editpassword').val()){
				alert("Las contraseñas deben coincidir");
				correcto = false;
			}else{
				var pass = $('#editpassword').val();
			}

			if(correcto){
				$.post("modificaexperto.php", {nombre : nombre, apellidos : apellidos, email : email, pass : pass}, function(respuesta){
					$("#datosperfil").html(respuesta);
				});
			}
		}
	});

	$('#btnPregRes').on('click', function(e){
		e.preventDefault();
		var pregunta = $('#pregunta').val();

		if(pregunta != ''){
			$('#divBotonesRespuesta').show('slow');
			$(this).css('display', 'none');
			$('#btnHecho').css('display', 'block');
		}else{
			alert('Debe escribir la pregunta');
		}
	});

	$('#btnIn').on('click', function(e){
		e.preventDefault();
		$('#divRespuestaCorrecta').hide('slow', function(){
			$('#divRespuestaIncorrecta').show('slow');
		});
	});

	$('#btnCo').on('click', function(e){
		e.preventDefault();
		$('#divRespuestaIncorrecta').hide('slow', function(){
			$('#divRespuestaCorrecta').show('slow');
		});
	});

	$('#tickCo').on('click', function(){
		var respuestaCo = $('#respuestaCo').val();

		if(respuestaCo != ''){
			$('#btnCo').hide('slow');
			$('#divRespuestaCorrecta').hide('slow');
		}
	});

	$('#tickIn').on('click', function(){
		var respuesta = $('#respuestaIn').val();
		if(respuesta != ''){
			respuestasIn.push(respuesta);
			$('#divRespuestaIncorrecta').hide('slow', function(){
				$('#respuestaIn').val('');
				$(this).show('slow');
				$('#listIn').append("<li>" + respuesta + "</li>");
			});
		}
	});

	$('#btnHecho').on('click', function(e){
		e.preventDefault();
		var pregunta = $('#pregunta').val();
		var respuestaCo = $('#respuestaCo').val();
		var categoria = $('#selectCategoria').val();
		var dificultad = $('#selectDificultad').val();
		var alerta = '';

		if(pregunta != '' && respuestaCo!= ''){
			$.get("introRespuestaCo.php", {respuestaCo : respuestaCo}, function(){
				$.get("introPregunta.php", {pregunta : pregunta, categoria : categoria, dificultad : dificultad}, function(){
					$.get("introRespuestasIn.php", {respuestasIn : respuestasIn}, function(){
						respuestasIn = [];
					});
				});
			});
			$('#formPregunta').hide('slow').show('slow');
			$('#pregunta').val('');
			$('#listIn').html('');
			$('#respuestaCo').val('');
			$('#btnCo').show('fast');
		}
		if(pregunta == ''){
			alerta += '-Debe escribir la pregunta\n';
		}
		if(respuestaCo == ''){
			alerta += '-Debe agregar al menos la respuesta correcta de la pregunta';
		}
		if(pregunta == '' || respuestaCo == ''){
			alert(alerta);
		}
	});

	$('.ultPreg').on('click', function(e){
		$.get("ultimaspreguntas.php", function(respuesta){
			$("#preguntas").html(respuesta);
		});
	});

	//ACTIVACIÓN DE EXPERTOS
	$('#activarExpertos .icon-tick').click(function(){
		$.get("activaexpertos.php", {id : $(this).prop('id')}, function(respuesta){
			$("#activarExpertos ul").html(respuesta);
		});
	});

	//ELIMINACIÓN DE EXPERTOS
	$('#eliminarExpertos .close').click(function(){
		$.get("eliminarexpertos.php", {id : $(this).prop('id')}, function(respuesta){
			$("#eliminarExpertos ul").html(respuesta);
		});

		$.get("activaexpertos.php", {id : $(this).prop('id')}, function(respuesta){
			$("#activarExpertos ul").html(respuesta);
		});
	});

	$('.close2').on('click', function(){
		$.get("borrarpregunta.php", {idpregunta : $(this).prop('id')}, function(respuesta){
			$("#listaPre").html(respuesta);
		});
	});

	// AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    $('#categoria_seguir').on('click', function(){
        $.get("seguirCategoria.php", {value : $(this).prop('value')}, function(respuesta){
            $("#mostrarCategorias").html(respuesta);
        });
    });
    // -------------------------------------------

	$('#buscaenunciado').on('keyup', function(){
		$.get("buscaenunciado.php", {enunciado : $(this).val()}, function(respuesta){
			$("#preguntas").html(respuesta);
		});
	});

	$('#filtroCateg').on('click', function(){
		$.get("filtraCategorias.php", {categoria : $(this).val()}, function(respuesta){
			$("#preguntas").html(respuesta);
		});
	});
});	
