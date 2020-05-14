import React, { useState } from "react";
import * as SQLite from 'expo-sqlite';


export const SelectPacientes = (db) => {

    var re;

    db.transaction((tx) => {
        console.log("busco tabla en querys comunes SelectPacientes")
        tx.executeSql('SELECT * FROM Paciente', [], (tx, results) => {
            re = results;
          });
      });
    
    return re;

}