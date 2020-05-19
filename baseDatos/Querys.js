import React, { useState } from "react";

import * as SQLite from 'expo-sqlite';
//import SQLite from 'react-native-sqlite-storage';
import { openDatabase } from 'react-native-sqlite-storage';



export const QueryInicial = () => {

  const db = SQLite.openDatabase("db.db");

  //var db =  openDatabase({ name: 'test.db' , createFromLocation : 1});

  console.log("**************************************************")


  db.transaction((tx) => {
    console.log("Dropeo la tabla paciente")
    tx.executeSql('DROP TABLE Paciente', [], results =>
      console.log("Dropeo exitoso"))
    db.transaction((tx) => {
      console.log("creo trabla de paciente")
      tx.executeSql('CREATE TABLE Paciente(dni INTEGER PRIMARY KEY, nombre VARCHAR(20),apellido VARCHAR(20), genero varchar(20))', [], (tx, results) => {
        console.log("Creacion de tabla exitosa")
        db.transaction((tx) => {
          console.log("inserto en tabla paciente")
          tx.executeSql('INSERT INTO Paciente (dni, nombre,apellido,genero) VALUES (1,"Juan","Perez","M")', [], (tx, results) => {
            console.log("insersion exitosa")

            db.transaction((tx) => {
              console.log("busco tabla")
              tx.executeSql('SELECT * FROM Paciente', [], (tx, results) => {
                console.log("Query completed");


                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(`dni : ${row.dni}`);
                  
                  db.transaction((tx) => {
                    var query = 'CREATE TABLE IF NOT EXISTS signos_vitales (id_hospital INTEGER, id_HC INTEGER, fecha TEXT, fec_resp INTEGER, sat_oxi INTEGER, sat_epoc INTEGER,presSist INTEGER, frec_card INTEGER, temp REAL, auditoria TEXT)'
                    var params = []
                    tx.executeSql(query, params, (tx, res) => {
                        console.log('Tabla signos vitales creada')
                    }, (tx, err) => {
                        console.log('Tabla signos vitales no pudo ser creada')
                
                    })
                }, (err) => {
                    console.log(err)
                }, () => { });
                
                }
              });
            });
          })

        });
      })
    });
  })

  function cargaTablaSignosVitales(){
    db.transaction((tx) => {
      var query = 'CREATE TABLE IF NOT EXISTS signos_vitales (id_hospital INTEGER, id_HC INTEGER, fecha TEXT, fec_resp INTEGER, sat_oxi INTEGER, sat_epoc INTEGER,presSist INTEGER, frec_card INTEGER, temp REAL, auditoria TEXT)'
      var params = []
      tx.executeSql(query, params, (tx, res) => {
          console.log('Tabla signos vitales creada')
      }, (tx, err) => {
          console.log('Tabla signos vitales no pudo ser creada')
  
      })
  }, (err) => {
      console.log(err)
  }, () => { });
  }

  return db;
}


export const SelectPacientes = async (db) => {
  var re = await db.transaction((tx) => {
    tx.executeSql('SELECT * FROM Paciente', [])
  });
  return re;
}
