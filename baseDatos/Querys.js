import React, { useState } from "react";

import * as SQLite from 'expo-sqlite';
//import SQLite from 'react-native-sqlite-storage';
import { openDatabase } from 'react-native-sqlite-storage';



export const QueryInicial=  () => {

const db =  SQLite.openDatabase("db.db");

//var db =  openDatabase({ name: 'test.db' , createFromLocation : 1});

console.log("**************************************************")


 db.transaction((tx) =>{
  console.log("Dropeo la tabla paciente")
  tx.executeSql('DROP TABLE Paciente',[],results=>
  console.log("Dropeo exitoso"))
})


db.transaction((tx ) => {
  console.log("creo trabla de paciente")
  tx.executeSql('CREATE TABLE Paciente(dni INTEGER PRIMARY KEY, nombre VARCHAR(20),apellido VARCHAR(20), genero varchar(20))',[],(tx,results)=>{
  console.log("Creacion de tabla exitosa")
 })
});

db.transaction((tx ) => {
  console.log("inserto en tabla paciente")
  tx.executeSql('INSERT INTO Paciente (dni, nombre,apellido,genero) VALUES (1,"Juan","Perez","M")',[],(tx,results)=>{
  console.log("insersion exitosa")
})

});

props.db.transaction((tx) => {
  console.log("busco tabla")
  tx.executeSql('SELECT * FROM Paciente', [], (tx, results) => {
      console.log("Query completed");


      var len = results.rows.length;
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        console.log(`dni : ${row.dni}`);
      }
    });
});


return  db;
}
/*     var re = await db.transaction((tx) => {
         tx.executeSql('SELECT * FROM Paciente', [], (tx,results) => {
         // return results.rows;
        });
        }); */


  export const SelectPacientes = async (db) => {
      var re = await db.transaction( (tx) => {
        tx.executeSql('SELECT * FROM Paciente', [], (tx,results)=>{
          console.log("Exito en buscar pacientes");
          let row = results.rows.item(i);
          console.log("8888888888888888888")
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