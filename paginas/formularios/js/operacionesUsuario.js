require('module-alias/register');
var $ = require("jquery")
var con = require('@models/db');
var swal = require('sweetalert');
var sql;
var consulta;
var captionid;

function guardarUsuario() {
    // Aqui se cargan las variables con los datos del Formulario

    var estado = document.getElementById("est_usu").value;
    var nombre = document.getElementById("nom_usu").value;
    var clave = document.getElementById("cla_usu").value;
    var email = document.getElementById("email_usu").value;
    var pregunta1 = document.getElementById("fky_pre_1").value;
    var respuesta1 = document.getElementById("res_pre_1").value;
    var pregunta2 = document.getElementById("fky_pre_2").value;
    var respuesta2 = document.getElementById("res_pre_2").value;
    var rol = document.getElementById("niv_usu").value;

    // Aqui se cargan los IDs de los DIVs que contienen los Inputs del Formulario

    var inputNombre = document.getElementById("inputNombre");
    var inputClave = document.getElementById("inputClave");
    var inputRol = document.getElementById("inputRol");
    var inputEmail = document.getElementById("inputEmail");
    var inputFkyPre1 = document.getElementById("inputFkyPre1");
    var inputResPre1 = document.getElementById("inputResPre1");
    var inputFkyPre2 = document.getElementById("inputFkyPre2");
    var inputResPre2 = document.getElementById("inputResPre2");
    var Checkbox = document.getElementById("ListCheck");

    // Validación de que los Inputs no estan vacios

    if (!nombre) {
        swal("", "Debe llenar el campo de Nombre.", "error", {
            button: false,
            timer: 1500
        });
        document.getElementById("nom_usu").focus();
        inputNombre.className = "form-group label-floating has-error";
        return
    } else {
        inputNombre.className = "form-group label-floating";
    }

    if (!clave) {
        swal("", "Debe llenar el campo de Contraseña.", "error", {
            button: false,
            timer: 1500
        });
        document.getElementById("cla_usu").focus();
        inputClave.className = "form-group label-floating has-error";
        return
    } else {
        inputClave.className = "form-group label-floating";
    }

    if (!rol) {
        swal("", "Debe seleccionar un Rol.", "error", {
            button: false,
            timer: 1500
        });
        document.getElementById("niv_usu").focus();
        inputRol.className = "form-group label-floating has-error";
        return
    } else {
        inputRol.className = "form-group label-floating";
    }

    if (!email) {
        swal("", "Debe llenar el campo de Email.", "error", {
            button: false,
            timer: 1500
        });
        document.getElementById("email_usu").focus();
        inputEmail.className = "form-group label-floating has-error";
        return
    } else {
        inputEmail.className = "form-group label-floating";
    }

    if (!pregunta1) {
        swal("", "Debe selecionar una Pregunta de Seguridad 1.", "error", {
            button: false,
            timer: 1500
        });
        document.getElementById("fky_pre_1").focus();
        inputFkyPre1.className = "form-group label-floating has-error";
        return
    } else {
        inputFkyPre1.className = "form-group label-floating";
    }

    if (!respuesta1) {
        swal("", "Debe responder la Pregunta de Seguridad 1.", "error", {
            button: false,
            timer: 1500
        });
        document.getElementById("res_pre_1").focus();
        inputResPre1.className = "form-group label-floating has-error";
        return
    } else {
        inputResPre1.className = "form-group label-floating";
    }

    if (!pregunta2) {
        swal("", "Debe selecionar una Pregunta de Seguridad 2.", "error", {
            button: false,
            timer: 1500
        });
        document.getElementById("fky_pre_2").focus();
        inputFkyPre2.className = "form-group label-floating has-error";
        return
    } else {
        inputFkyPre2.className = "form-group label-floating";
    }

    if (!respuesta2) {
        swal("", "Debe responder la Pregunta de Seguridad 1.", "error", {
            button: false,
            timer: 1500
        });
        document.getElementById("res_pre_2").focus();
        inputResPre2.className = "form-group label-floating has-error";
        return
    } else {
        inputResPre2.className = "form-group label-floating";
    }

    elemento_rep = Checkbox.children[1].checked;
    elem_cons = Checkbox.children[3].checked;
    elem_reg = Checkbox.children[5].checked;
    elem_panelAd = Checkbox.children[7].checked;
    elem_audit = Checkbox.children[9].checked;
    var ip = os.networkInterfaces()['Loopback Pseudo-Interface 1'][1].address;
    var mac = os.networkInterfaces()['Loopback Pseudo-Interface 1'][1].mac;
    // Guardado en la Base de Datos

    sql = "SELECT * FROM usuario";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
    });

    sql = "INSERT INTO usuario (nom_usu, cla_usu, email_usu, fky_pre_1, res_pre_1, fky_pre_2, res_pre_2, niv_usu, ip_usu, mac_usu, est_usu) VALUES ?";
    var values = [
        [nombre, clave, email, pregunta1, respuesta1, pregunta2, respuesta2, rol,ip, mac, estado]
    ];

    con.query(sql, [values], function (err, result) {
        if (err) {
            console.log(err);
            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                button: false,
                timer: 3000
            });
        } else {
            swal("", "Usuario registrado correctamente.", "success", {
                button: false,
                timer: 3000
            }).then(function () {
                user = "SELECT MAX(id_usu) FROM usuario";
                con.query(user, function (err, result) {
                    if (err) console.log(err);
                });
                
                sql1 = "INSERT INTO elementos (fky_usuario, elemento_rep, elem_cons, elem_reg, elem_audit, elem_panelAd, status) VALUES ?";
                var values1 = [
                    [result['insertId'], elemento_rep, elem_cons, elem_reg, elem_audit, elem_panelAd, estado]
                ];
                con.query(sql1, [values1], function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                });

                sql5 = "SELECT * FROM log";
                con.query(sql5, function (err, result) {
                    if (err) console.log(err);
                });

                var date_log = new Date();
                var usu_log = 'admin';
                values = [
                    [nombre, window.btoa(clave), email, pregunta1, window.btoa(respuesta1), pregunta2, window.btoa(respuesta2), rol,ip, mac, estado]
                ];
                sql2 = "INSERT INTO log (usu_log, tab_log, acc_log, reg_log, date_log, est_log) VALUES ?";
                var values2 = [
                    [usu_log, 'usuario', 'Registro', sql + "(" + values + ")", date_log, 'A']
                ];

                con.query(sql2, [values2], function (err, result) {
                    if (err) {
                        console.log(err);
                        swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                            button: false,
                            timer: 3000
                        });
                    } else {
                        sql = "USE academia";
                        con.query(sql, function (err, result) {
                            if (err) console.log(err);
                        });

                        sql = "CREATE USER '" + nombre + "'@localhost IDENTIFIED BY '" + clave + "';"

                        con.query(sql, function (err, result) {
                            if (err) {
                                console.log(err);
                                swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                                    button: false,
                                    timer: 3000
                                });
                            } else {
                                if (rol == 'Administrador') {
                                    sql = "USE academia";
                                    con.query(sql, function (err, result) {
                                        if (err) console.log(err);
                                    });

                                    sql = "GRANT SELECT, INSERT, UPDATE, SHOW DATABASES ON *.* TO '" + nombre + "'@'localhost';"

                                    con.query(sql, function (err, result) {
                                        if (err) {
                                            console.log(err);
                                            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                                                button: false,
                                                timer: 3000
                                            });
                                        } else {
                                            window.location.reload();
                                        };
                                    });
                                } else {
                                    sql = "USE academia";
                                    con.query(sql, function (err, result) {
                                        if (err) console.log(err);
                                    });

                                    sql = "GRANT INSERT, SELECT, SHOW DATABASES ON *.* TO '" + nombre + "'@localhost;"

                                    con.query(sql, function (err, result) {
                                        if (err) {
                                            console.log(err);
                                            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                                                button: false,
                                                timer: 3000
                                            });
                                        } else {
                                            window.location.reload();
                                        };
                                    });
                                }
                            };
                        });
                    };
                });
            });
        };
    });

}

function paginadorUsu(ini, fin) {
    this.consultarUsuarioPanel(ini, fin);
}

function consultarUsuarioPanel(ini, fin) {
    var init = ini;
    var paginas = "";
    if (!init) {
        init = 0;
        fin = 15;
    }
    con.query("SELECT * FROM usuario", function (err, result1, fields) {
        con.query("SELECT * FROM usuario LIMIT " + init + "," + fin, function (err, result, fields) {
            if (err) console.log(err);
            var pag = Math.ceil(result1.length / 15);
            var tam = result.length;
            var text;
            text = "<tr>";

            for (i = 0; i < tam; i++) {
                text += "<td>";
                text += result[i].id_usu;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += result[i].nom_usu;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += result[i].niv_usu;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += result[i].est_usu;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += '<a type="button" rel="tooltip" title="Editar" onclick="formularioEditarUsuario(' + result[i].id_usu + ')"><i class="material-icons text-info" data-toggle="modal">mode_edit</i></a>';
                text += '<a type="button" rel="tooltip" title="Eliminar" onclick="avisoBorrarUsuario(' + result[i].id_usu + ')"><i class="material-icons text-danger">delete_forever</i></a>';
                text += "</td>";
                text += "</tr>";
                document.getElementById("tusuario").innerHTML = text;
            }
            paginas += '<div align="center">'
            for (i = 1; i <= pag; i++) {
                init = i * 15 - 15;
                fin = init + 14;
                paginas += '<button id="piePag" onClick="paginadorUsu(' + init + ',' + fin + ')">' + i + '</button>';
            }
            paginas += '</div">'
            document.getElementById("pagUsu").innerHTML = paginas;
        });
    });
}
function avisoBorrarUsuario(capb) {
    $("#borradoUsuario").modal("show")
    captionid = capb;
}

// Borrado Lógico

function borrarUsuario() {
    sql = "SELECT * FROM usuario";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
    });

    sql = "UPDATE usuario SET est_usu='I' WHERE id_usu = " + captionid;
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                button: false,
                timer: 3000
            });
        } else {
            swal("", "Usuario eliminado correctamente.", "success", {
                button: false,
                timer: 3000
            }).then(function () {
                nameUser = localStorage.getItem('name');
                sql2 = "INSERT INTO log (usu_log, tab_log, acc_log, reg_log, date_log, est_log) VALUES ?";
                var values = [
                    [nameUser, 'Usuaurio', 'Borrado Logico', sql, date_log, 'A']
                ];

                con.query(sql2, [values], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        nameUser = localStorage.getItem('name');
                        date_log = new Date();

                        con.query("SELECT MAX(cod_log) as id FROM log", function (err, result1, fields) {
                            if (err) console.log(err);
                            else idMax = (result1[0].id) - 1;

                            updateUser = "UPDATE log SET usu_log='" + nameUser + "' WHERE cod_log='" + idMax + "'";
                            con.query(updateUser, function (err, result) {
                                if (err) {
                                    console.log(err);

                                } else {

                                    window.location.reload();
                                }
                            });
                        });
                    }
                });
            });
        };
    });
}