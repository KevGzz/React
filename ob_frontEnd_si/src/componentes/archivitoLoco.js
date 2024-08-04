function IniciarSesion() {


	fetch("https://babytracker.develotion.com/login.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(),
	})
		.then(function (response) {
			console.log(response);
			return response.json();
		})
		.then(function (data) {
			console.log(data);

			if (data.codigo == 200) {
				
				localStorage.setItem("apiKey", data.apiKey);
				localStorage.setItem("idUser", data.id);
				localStorage.setItem("caloriasDiarias", data.caloriasDiarias);

			} else {
				MostrarToast("Error: " + data.mensaje, 5000, "danger");
			}
		});
}

function Registrar(nombreUsuario, password, pais, calorias) {
	let usuario = new Object();
	usuario.usuario = nombreUsuario;
	usuario.password = password;
	usuario.idPais = pais;
	usuario.caloriasDiarias = calorias;
	if (
		usuario.usuario != "" &&
		usuario.password != "" &&
		usuario.idPais != "" &&
		usuario.caloriasDiarias != 0
	) {
		fetch("https://calcount.develotion.com/usuarios.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(usuario),
		})
			.then(function (response) {
				console.log(response);
				return response.json();
			})
			.then(function (data) {
				console.log(data);

				if (data.codigo == 200) {
					MostrarToast("Exito!", 3000, "success");
					localStorage.setItem("apiKey", data.apiKey);
					ArmarMenuOpciones();
					NAV.push("page-home");
				} else {
					MostrarToast(data.mensaje, 5000, "danger");
				}
			});
	} else {
		if (usuario.usuario == "")
			MostrarToast("Error: El usuario no puede ser vacío.", 5000, "danger");
		else if (usuario.password == "")
			MostrarToast("Error: La contraseña no puede ser vacía.", 5000, "danger");
		else if (usuario.idPais  == "")
			MostrarToast("Error: Seleccione un país.", 5000, "danger");
		else if (usuario.caloriasDiarias  == 0)
			MostrarToast(
				"Error: Las calorías diarias no pueden ser vacías.",
				5000,
				"danger"
			);
	}
}