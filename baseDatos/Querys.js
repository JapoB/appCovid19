import React, { useState } from "react";

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
    console.log("Dropeo la tabla paciente")
    tx.executeSql('DROP TABLE Paciente', [], () =>
      console.log("Dropeo exitoso"))
  })

  console.log("**************************************************")


  db.transaction((tx)=>{
    console.log("Creo tabla Hospital")
    tx.executeSql('CREATE TABLE Hospital (id INT PRIMARY KEY NOT NULL, nombre varchar(40),'+
     'calle varchar(40),numero varchar(10),CP varchar(10),planoCamas varchar(20))',[],()=>{
       console.log("Creacion de tabla hospital exitosa")
     })
  },[], () =>{


    db.transaction((tx) => {
      console.log("creo tabla de paciente")
      tx.executeSql('CREATE TABLE Paciente(dni INT NOT NULL, tipoDocumento varchar(10) NOT NULL,'+
      'nombre VARCHAR(30),apellido VARCHAR(30), genero varchar(1),paisExp varchar(20),'+
      'nacionalidad varchar(30),calle varchar(40),numero varchar(10),piso varchar(20),depto varchar(10),'+
      'CP varchar(10),telefono varchar(20), telefonoFamiliar varchar(20), telefonoFamiliar2 varchar(20),' +
      'fechaNac date, fechaIngreso date, idHospital INT ,PRIMARY KEY (dni,tipoDocumento)'+
      'FOREIGN KEY (idHospital) REFERENCES Hospital (id))', [], () => {
        console.log("Creacion de tabla Paciente exitosa")
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
              tx.executeSql("Insert into Paciente (dni, tipoDocumento,nombre,apellido,genero,"+
                "paisExp,nacionalidad,calle,numero,piso,depto,CP,telefono,telefonoFamiliar,telefonoFamiliar2,idHospital)"+
                "VALUES (1,'dni','juan','Moreno','M','Arg','Arg','calle falsa','123','2','B','8300','123123','123332','333211',1),"+
                "(2,'dni','Pedro','Ramirez','M','Arg','Arg','calle falsa','123','2','B','8300','123123','123332','333211',1)",
                [],()=>{
                  console.log("Insercion en pacientes exitosa")
                
                })
           
              },()=>{},()=>{
               
            })
          });
        });
      })
    });
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