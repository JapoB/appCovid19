import React, { useState ,} from "react";
import {Alert} from 'react-native'
import * as SQLite from 'expo-sqlite';



export const db = SQLite.openDatabase("db.db");
export const QueryInicial = () => {


  
  db.transaction((tx) => {
    console.log("Intento dropear hospital")
      tx.executeSql('DROP TABLE Hospital',[],() => {
    console.log("Dropeo de hospital exitoso")
  });
});

db.transaction((tx) => {
  console.log("Intento dropear signos vitales")
    tx.executeSql('DROP TABLE SignosVitales',[],() => {
  console.log("Dropeo de signos vitales exitoso")
});
});

  db.transaction((tx) => {
    console.log("Dropeo la tabla paciente")
    tx.executeSql('DROP TABLE Paciente', [], () =>
      console.log("Dropeo Paciente exitoso"))
  })

  db.transaction((tx) => {
    console.log("Dropeo la tabla Alerta")
    tx.executeSql('DROP TABLE Alerta', [], () =>
      console.log("Dropeo Alerta exitoso"))
  })

  db.transaction((tx) => {
    console.log("Dropeo la tabla Cierre Episodio")
    tx.executeSql('DROP TABLE CierreEpisodio', [], () =>
      console.log("Dropeo Cierre Episodio exitoso"))
  })


  db.transaction((tx) => {
    console.log("Dropeo la tabla usuarios ")
    tx.executeSql('DROP TABLE Usuario', [], () =>
      console.log("Dropeo usuarios exitoso"))
  })


  db.transaction((tx) => {
    console.log("Dropeo la tabla usuarios Hospital ")
    tx.executeSql('DROP TABLE UsuarioHospital', [], () =>
      console.log("Dropeo usuarios Hospital exitoso"))
  })

  db.transaction((tx) => {
    console.log("Dropeo la tabla Isla ")
    tx.executeSql('DROP TABLE Isla', [], () =>
      console.log("Dropeo Isla exitoso"))
  })

  db.transaction((tx) => {
    console.log("Dropeo la tabla usuario Sector ")
    tx.executeSql('DROP TABLE UsuarioSector', [], () =>
      console.log("Dropeo UsuarioSector  exitoso"))
  })


  db.transaction((tx) => {
    console.log("Dropeo la tabla Sectores ")
    tx.executeSql('DROP TABLE Sector', [], () =>
      console.log("Dropeo Sectores exitoso"))
  })


  db.transaction((tx) => {
    console.log("Dropeo la tabla Cama ")
    tx.executeSql('DROP TABLE Cama', [], () =>
      console.log("Dropeo Cama exitoso"))
  })



  db.transaction((tx) => {
    console.log("Dropeo la tabla Laboratorio  ")
    tx.executeSql('DROP TABLE Laboratorio', [], () =>
      console.log("Dropeo Laboratorio  exitoso"))
  })

  db.transaction((tx) => {
    console.log("Dropeo la tabla RXTORAX  ")
    tx.executeSql('DROP TABLE RxTorax', [], () =>
      console.log("Dropeo Paciente RXTORAX "))
  })


  console.log("**************************************************")


  db.transaction((tx)=>{
    console.log("Creo tabla Hospital")
    tx.executeSql('CREATE TABLE Hospital (id INT PRIMARY KEY NOT NULL, nombre varchar(40),'+
     'calle varchar(40),numero varchar(10),CP varchar(10),planoCamas varchar(20))',[],()=>{
       console.log("Creacion de tabla hospital exitosa")
     })
  },[],()=>{
                
              
    db.transaction((tx)=>{
      console.log("Creacion de usuario")
      tx.executeSql("CREATE TABLE Usuario ("+
      "cuil VARCHAR(20) PRIMARY KEY, clave VARCHAR(20), email VARCHAR(30),telefono VARCHAR(20))",
        [],()=>{
          console.log("Creacion de tabla Usuario exitosa")
        })
  
  },()=>{},()=>{
    db.transaction((tx)=>{
      console.log("Creacion de usuarioHospital")
      tx.executeSql("CREATE TABLE UsuarioHospital ("+
      "cuil VARCHAR(20), idHospital INT, idROl INT,PRIMARY KEY (cuil,idHospital,idRol),"+
      "FOREIGN KEY (idHospital) REFERENCES Hospital (id))"   ,
        [],()=>{
          console.log("Creacion de tabla UsuarioHospital exitosa")
        })
      

    },()=>{},()=>{
      db.transaction((tx)=>{
        console.log("Insertar en Usuario")
        var query = "INSERT INTO Usuario (cuil,clave, email,telefono) VALUES"+
        "('1','1','112@email.com','23123')"
        var params = []
        tx.executeSql(query, params, (tx, res) => {
          console.log('Insertar en usuario exitoso')
      }, (tx, err) => {
          console.log('Error al insertar usuario')
          console.log(err)
  
      })
      },()=>{},()=> {
    

    db.transaction((tx) => {
      console.log("creo tabla de paciente")
      tx.executeSql('CREATE TABLE Paciente(dni INT NOT NULL, tipoDocumento varchar(10) NOT NULL,numeroHC varchar(20) NOT NULL,'+
      'nombre VARCHAR(30),apellido VARCHAR(30), genero varchar(1),paisExp varchar(20),'+
      'nacionalidad varchar(30),calle varchar(40),numero varchar(10),piso varchar(20),depto varchar(10),'+
      'CP varchar(10),telefono varchar(20), telefonoFamiliar varchar(20), telefonoFamiliar2 varchar(20),' +
      'fechaNac date, fechaIngreso date, gravedad INT, nivelConfianza INT, auditoriaCormobilidades varchar(20),iccGrado2 varchar(2)'
      +',epoc varchar(2),diabetesDanioOrgano varchar(2),hipertension varchar(2),enfermedadRenalCronica varchar (20), idHospital INT ,PRIMARY KEY (idHospital,numeroHC),'+
      'FOREIGN KEY (idHospital) REFERENCES Hospital (id),FOREIGN KEY (auditoriaCormobilidades) REFERENCES Usuario(cuil))', [], () => {
        console.log("Creacion de tabla Paciente exitosa")
      })
      },(error)=>{console.log("Error pac "+error)},()=>{
        db.transaction((tx) => {
          console.log("inserto en tabla hospital")
          tx.executeSql('INSERT INTO Hospital (id, nombre,calle,numero,CP,planoCamas) VALUES (1,"Castro","Bs As","400","8300","Este es el plano")', [], (tx, results) => {
            console.log("insersion exitosa")
          })
        }, () => { }, () => {
          db.transaction((tx) => {
            console.log("busco tabla hospital")
            tx.executeSql('SELECT * FROM Hospital', [], (tx, results) => {
              console.log("Query busqueda hospital completed");


              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(`id : ${row.id}`);
              }
            
            });
          },()=>{},()=>{
            db.transaction((tx)=>{
              console.log("Inserto en la tabla de pacientes")
              tx.executeSql("Insert into Paciente (dni, tipoDocumento,numeroHC,nombre,apellido,genero,"+
                "paisExp,nacionalidad,calle,numero,piso,depto,CP,telefono,telefonoFamiliar,telefonoFamiliar2,fechaNac,fechaIngreso,gravedad,nivelConfianza,auditoriaCormobilidades,iccGrado2,epoc,diabetesDanioOrgano,hipertension,enfermedadRenalCronica,idHospital)"+
                "VALUES (1,'dni','1','juan','Moreno','M','Arg','Arg','calle falsa','123','2','B','8300','tele123123','tele123332','tele333211','1990-09-27','2019-09-27',1,50,'1','no','no','no','no','no',1),"+
                "(2,'dni','2','Pedro','Ramirez','M','Arg','Arg','calle falsa','123','2','B','8300','123123','123332','333211','1990-09-27','2019-09-27',1,50,'1','no','no','no','no','no',1)",
                [],()=>{
                  console.log("Insercion en pacientes exitosa")
                
                },(tx,err) => {console.log(err)} )
           
              },()=>{},()=>{
                console.log("Creacion de tabla cierreEpisodio")
                db.transaction((tx)=>{
                  tx.executeSql("CREATE TABLE CierreEpisodio ("+
                "idHospital INT, numeroHC VARCHAR(20), fecha DATE,cuil VARCHAR(20), razon VARCHAR(80),auditoria VARCHAR (20),PRIMARY KEY (idHospital,numeroHC,fecha),"+
                "FOREIGN KEY (idHospital) REFERENCES Hospital (id),FOREIGN KEY (numeroHC) REFERENCES Paciente (numeroHC),FOREIGN KEY (cuil) REFERENCES Usuario(cuil))"   ,
                  [],()=>{
                    console.log("Creacion de tabla CierreEpisodio exitosa")
                  })
                },()=>{},()=>{
                      db.transaction((tx)=>{
                        console.log("Creacion de tabla Alertas")
                        tx.executeSql("CREATE TABLE Alerta ("+
                        "idHospital INT, numeroHC VARCHAR(20), fecha DATE, gravedad INT, calificacionEnfermero VARCHAR(1),calificacionMedico VARCHAR(1),auditoriaEnfermero varchar(20),auditoriaMedico VARCHAR(20),PRIMARY KEY (idHospital,numeroHC,fecha),"+
                        "FOREIGN KEY (idHospital) REFERENCES Hospital (id),FOREIGN KEY (numeroHC) REFERENCES Paciente (numeroHC),FOREIGN KEY (auditoriaEnfermero) REFERENCES usuario(cuil),FOREIGN KEY (auditoriaMedico) REFERENCES usuario(cuil))"   ,
                          [],()=>{
                            console.log("Creacion de tabla alertas exitosa")
                          })
                
                      },()=>{},()=>{
                        db.transaction((tx)=>{
                          console.log("Creacion de UsuarioSector")
                          tx.executeSql("CREATE TABLE UsuarioSector ("+
                          "idIsla VARCHAR(20), idHospital INT, idSector INT,cuil VARCHAR(20),PRIMARY KEY (idIsla,idHospital,idSector,cuil),"+
                          "FOREIGN KEY (idHospital) REFERENCES Hospital (id), FOREIGN KEY (idIsla) REFERENCES Isla (idIsla),FOREIGN KEY (idSector) REFERENCES Sector (idSector))"   ,
                            [],()=>{
                              console.log("Creacion de tabla UsuarioSector exitosa")
                            })
                      
                
                        },()=>{},()=>{
                          db.transaction((tx)=>{
                            console.log("Creacion de Isla")
                            tx.executeSql("CREATE TABLE Isla ("+
                            "idIsla VARCHAR(20), idHospital INT, idLider INT,PRIMARY KEY (idIsla,idHospital),"+
                            "FOREIGN KEY (idHospital) REFERENCES Hospital (id))"   ,
                              [],()=>{
                                console.log("Creacion de tabla Isla exitosa")
                              })
                          },()=>{},()=>{
                            db.transaction((tx)=>{
                              console.log("Creacion de Sector")
                              tx.executeSql("CREATE TABLE Sector ("+
                              "idIsla VARCHAR(20), idHospital INT, idSector INT,PRIMARY KEY (idIsla,idHospital,idSector),"+
                              "FOREIGN KEY (idHospital) REFERENCES Hospital (id), FOREIGN KEY (idIsla) REFERENCES Isla (idIsla))"   ,
                                [],()=>{
                                  console.log("Creacion de tabla Sector exitosa")
                                })
                            },()=>{},()=>{
                                db.transaction((tx)=>{
                                  console.log("Creacion de Cama ")
                                  tx.executeSql("CREATE TABLE Cama ("+
                                  "idIsla VARCHAR(20), idHospital INT, idSector INT,idCama VARCHAR(20), estado VARCHAR(10),ubicacionX INT, ubicacionY INT,orientacion VARCHAR(2),numeroHC VARCHAR(20),PRIMARY KEY (idIsla,idHospital,idSector,idCama),"+
                                  "FOREIGN KEY (idHospital) REFERENCES Hospital (id), FOREIGN KEY (idIsla) REFERENCES Isla (idIsla),FOREIGN KEY (idSector) REFERENCES Sector (idSector), FOREIGN KEY (numeroHC) references Paciente (numeroHC))"   ,
                                    [],()=>{
                                      console.log("Creacion de tabla Cama exitosa")
                                    })
                                },()=>{},()=>{
                                    db.transaction((tx)=>{
                                      console.log("Creacion de Laboratorio")
                                      tx.executeSql("CREATE TABLE Laboratorio ("+
                                      "numeroHC varchar(20),idHospital INT,fecha DATE, cuil VARCHAR(20), dimeroD INT, linfopenia INT,proteinaC INT,PRIMARY KEY (numeroHC,fecha,idHospital),"+
                                      "FOREIGN KEY (idHospital) REFERENCES Hospital (id),FOREIGN KEY (numeroHC) REFERENCES Paciente (numeroHC),FOREIGN KEY (cuil) REFERENCES Usuario(cuil))"   ,
                                        [],()=>{
                                          console.log("Creacion de tabla Laboratorio exitosa")
                                        })
                                    },()=>{},()=>{
                                      db.transaction((tx)=>{
                                        console.log("Creacion de RxTorax")
                                        tx.executeSql("CREATE TABLE RxTorax ("+
                                        "numeroHC varchar(20),idHospital INT,idCama VARCHAR(20),cuil VARCHAR(20),fecha DATE,resultado varchar(100),PRIMARY KEY (numeroHC,fecha,idHospital),"+
                                        "FOREIGN KEY (idHospital) REFERENCES Hospital (id),FOREIGN KEY (numeroHC) REFERENCES Paciente (numeroHC),FOREIGN KEY (cuil) REFERENCES Usuario(cuil))"   ,
                                          [],()=>{
                                            console.log("Creacion de tabla RxTorax exitosa")
                                          })
                                      },()=>{},()=>{
                                        db.transaction((tx)=>{
                                          console.log("Creacion de SignosVitales")
                                          var query = 'CREATE TABLE IF NOT EXISTS SignosVitales (id_hospital INTEGER, numeroHC varchar(20), fecha date, fec_resp REAL, sat_oxi REAL, sat_epoc REAL,presSist REAL, frec_card REAL, temp REAL,nivelConciencia varchar(15), auditoria VARCHAR(20),PRIMARY KEY (id_hospital,numeroHC,fecha),FOREIGN KEY (auditoria) REFERENCES Usuario(cuil), FOREIGN KEY (id_hospital) REFERENCES Hospital (id),FOREIGN KEY (numeroHC) REFERENCES paciente (numeroHC))'
                                          var params = []
                                          tx.executeSql(query, params, (tx, res) => {
                                            console.log('Tabla signos vitales creada')
                                        }, (tx, err) => {
                                            console.log('Tabla signos vitales no pudo ser creada')
                                    
                                        })

                                        },()=>{},()=>{
                                            db.transaction((tx)=>{
                                              console.log("Insertar en Alerta")
                                              var query = "INSERT INTO ALERTA (idHospital, numeroHC, fecha, gravedad, calificacionEnfermero,calificacionMedico,auditoriaEnfermero,auditoriaMedico) VALUES "+
                                              " (1,'1','2018-05-05',1,'T','F','1','1')"
                                              var params = []
                                              tx.executeSql(query, params, (tx, res) => {
                                                console.log('Insertar en alerta exitoso')
                                            }, (tx, err) => {
                                                console.log('Error en insertar Alerta')
                                        
                                            })
                                            },()=>{},()=>{
                                                db.transaction((tx)=>{
                                                  console.log("Insertar en isla")
                                                  var query = "INSERT INTO Isla (idIsla,idHospital,idLider) VALUES "+
                                                  "('1',1,1)"
                                                  var params = []
                                                  tx.executeSql(query, params, (tx, res) => {
                                                    console.log('Insertar en Isla exitoso')
                                                }, (tx, err) => {
                                                    console.log('Error en insertar Isla')
                                            
                                                })
                                                },()=>{},()=>{
                                                  db.transaction((tx)=>{
                                                    console.log("insertar de SignosVitales")
                                                    var query = "INSERT INTO SignosVitales (id_hospital,numeroHc,fecha,fec_resp,sat_oxi,sat_epoc,presSist,frec_card,temp,nivelConciencia,auditoria) VALUES "+
                                                    "(1,'1','2020-01-05',50,15,35,10,60,37,'consciente','1')"
                                                    var params = []
                                                    tx.executeSql(query, params, (tx, res) => {
                                                      console.log('Insertar en Signos vitales exitoso')
                                                  }, (tx, err) => {
                                                      console.log('error en insertar signos vitales')
                                                      console.log(err)
                                              
                                                  })
                                                  },()=>{},()=>{
                                                    db.transaction((tx)=>{
                                                      console.log("insertar de sector")
                                                      var query = "INSERT INTO Sector(idIsla,idHospital,idSector) VALUES "+
                                                      "('1',1,1)"
                                                       var params = []
                                                      tx.executeSql(query, params, (tx, res) => {
                                                        console.log('Insertar en sector exitoso')
                                                    }, (tx, err) => {
                                                        console.log('error en insertar en sector')
                                                
                                                    })
                                                    },()=>{},()=>{
                                                      db.transaction((tx)=>{
                                                        console.log("insertar de cama")
                                                        var query = "INSERT INTO Cama (idIsla,idHospital,idSector,idCama,estado,ubicacionX,ubicacionY,orientacion,numeroHC) VALUES "+
                                                        "('1',1,'1','cama1','ocupada',45,55,'SE','1')"
                                                          var params = []
                                                        tx.executeSql(query, params, (tx, res) => {
                                                          console.log('insertar en cama exitoso')
                                                      }, (tx, err) => {
                                                          console.log('error al insertar en cama')
                                                      })
                                                      },()=>{},()=>{
                                                          db.transaction((tx)=>{
                                                            console.log("insertar de Laboratorio")
                                                            var query = "INSERT INTO Laboratorio (numeroHC,idHospital,fecha,cuil,dimeroD,linfopenia,proteinaC) VALUES "+
                                                            "('1',1,'2020-05-07','1',15,20,35)"
                                                             var params = []
                                                            tx.executeSql(query, params, (tx, res) => {
                                                              console.log('Insertar en laboratorio exitoso')
                                                          }, (tx, err) => {
                                                              console.log('error al insertar en laboratorio')
                                                      
                                                          })
                                                          },()=>{},()=>{
                                                            
                                                          })
                                                        })
                                                      })
                                                    })
                                                  })
                                                })
                                              })
                                            })
                                          })
                                        })
                                      })
                                    })
                                  })
                                })
                              })
                            })
                          })
                          
                        })
                        
                      })
                      
                    })
                    
                  })
                  
                })

              })

               
           



  return db;






  
}
/*     var re = await db.transaction((tx) => {
         tx.executeSql('SELECT * FROM Paciente', [], (tx,results) => {
         // return results.rows;
        });
        }); */


export const SelectPacientes = async (db) => {
  var re = await db.transaction((tx) => {
    tx.executeSql('SELECT * FROM Paciente', [], (tx, results) => {
      console.log("Exito en buscar pacientes");
      let row = results.rows.item(i);
      console.log($results.rows.item(0).dni)
    })
  });
  return re;

}

/*   export const SelectPacientes = async (db) => {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql('SELECT * FROM Paciente', [], (_, { rows }) => resolve(rows._array), reject)
    }))
  }  */