import React, {useState, useEffect} from 'react'
import  Login  from "./Login.js";
import  HomeScreen  from "../HomeScreen";
import Loading from "../../components/Loading"

const AcountScreen = () => {

    const [login,setLogin] = useState(null);

    useEffect(()=>{
        //aca hay que buscar el usuario en la bd
    }, [])

    if(login === null) return <Loading isVisible = {true} text= "Cargando..."></Loading>


    return login ? <HomeScreen/> : <Login/>

}
export default AcountScreen;