import React, { useState, useEffect } from "react";
import {AiFillCloseCircle} from "react-icons/ai";


const List = ( ) => {
    const [elementlist, setElementList]=useState([]);
    const [change, setChange]= useState({label:""});
    const [invisible, setinVisible]= useState([]);
    const [numTask, setNumtask]=useState("");

    const localStorageKey = 'todoList';

    const url = 'https://playground.4geeks.com/apis/fake/todos/user/caro123';

    useEffect(() => {
        getlist();
        }, []);

    const createuser = () =>{
    fetch(url, {
    method: 'POST', // or 'POST'
    body: JSON.stringify([]), // los datos pueden ser una `cadena` o un {objeto} que proviene de algún lugar más arriba en nuestra aplicación
    headers:{
    'Content-Type': 'application/json',
    },
    })
    .then(res => {
        if (res.status>= 200 && res.status<=300){
            console.log("el request se hizo bien");
            return res.json();
        }else{
            console.log(`hubo un error ${res.status} en el request`)
        }
    })
    .then(estadoUsuario => {
        console.log("Estado del usuario:",estadoUsuario)
    }
     )
    .catch(error => console.error(error));
    };

    const getlist = () =>{
        try{
        
        const savedData = JSON.parse(localStorage.getItem(localStorageKey));
      console.log('Datos recuperados de localStorage:', savedData);

      if (savedData && Array.isArray(savedData)) {
        setElementList(savedData);
      } else {
        // Si no hay datos en el localStorage, puedes inicializarlo con un valor predeterminado
        localStorage.setItem(localStorageKey, JSON.stringify([]));
      }
    fetch(url, {
        method: 'GET', // or 'POST'
        headers:{
        'Content-Type': 'application/json',
        },
    })
        .then(res => {
            if (res.status>= 200 && res.status<=300){
                console.log("el request se hizo bien");
                return res.json();
            }else if (res.status ==404){
                
                console.log(`hubo un error ${res.status} en el request`)
                createuser();
            }
        })
        .then(data => {
            if (JSON.stringify(data) !== JSON.stringify(elementlist)) {
               setElementList(data);
               console.log('Datos actualizados desde el servidor:', data);
            }
          })
        .catch(error => console.error(error));
    } catch (error) {
        console.error('Error al recuperar datos de localStorage:', error);
      }
    };   
    
    const updateLocalStorage = (data) => {
        localStorage.setItem(localStorageKey, JSON.stringify(data));
      };

const update = (todos) =>{
    fetch(url, {
        method: 'PUT', // or 'POST'
        body: JSON.stringify(todos), // los datos pueden ser una `cadena` o un {objeto} que proviene de algún lugar más arriba en nuestra aplicación
        headers:{
            'Content-Type': 'application/json',
        },
    })
    .then(res => {
	    if (res.status>= 200 && res.status<=300){
		    console.log("el request se hizo bien");
		    return res.json();
	    }else{
            console.log(`hubo un error ${res.status} en el request`)
	    }
	
    })
    .then(data =>{
        console.log('Datos actualizados en el servidor:', data);
        // Luego de actualizar en el servidor, actualiza en localStorage
      updateLocalStorage(todos); // Llamada a updateLocalStorage
    })
    .catch(error => console.error(error));
    numlist();
    };    

function  handleOnChange (e) {
    setChange({label:e.target.value, done:false});
}   

function handleKeyDown (event) {
    if(event.key =='Enter')
        { 
            const newLabel = change.label.trim();
            if(newLabel !== ""){
            setElementList(elementlist.filter(element=>element.label!="No hay tareas" && element.label!="example task"))
            setElementList(current => [...current, change]);
            setChange({label:"",done:false});}
            numlist();
    }
}

function eliminartarea(param){
    const eliminar=elementlist[param];
    setElementList(prevElementlist => prevElementlist.filter(element=>element != eliminar));
    numlist();
};

function activedelete(ind){
    const index = ind;
    let array = []
    if(elementlist[index].label==="No hay tareas"){
        for(let i=0; i<elementlist.length; i++){
            array.push(0);
    }} else{
        for(let i=0; i<elementlist.length; i++){
            if(i==index){
                array.push(1)
            }else{array.push(0)}
        }}
    setinVisible(array);
    numlist();
};

function offdelete(){
    let inv=[]
    for(let j=0; j<elementlist.length; j++){
        inv.push(0)        
    }
    setinVisible(inv);
    numlist();
};

useEffect(() => {
    if(elementlist.length===0 || elementlist.some((item)=>item.label==="No hay tareas")){
        update([{label:"No hay tareas",done:false}]);
    }else{
   update(elementlist);}
  }, [elementlist]);


function handleClean(){
    setElementList([{label:"No hay tareas",done:false}]);
    
}

function numlist(){
    let num ="";
    if(elementlist.some((item) => item.label === "No hay tareas")){
        num = "0 item left";
            
          } else if(elementlist.length ===1){
            num = "1 item left";
          }
          else{
            num = `${elementlist.length} item left`;
           
          }
          setNumtask(num); 
    
}
	return (
            
                <div className="tasklist" >
                    <div className="uptask">
                        <input type="text" className="formtask" id="text" placeholder="What needs to be done?"  value={change.label} onKeyDown={handleKeyDown} onChange={handleOnChange}/>
                    </div>
                    <div className="tasktext">
                        <ul>
                            {elementlist?.map((thingdo, index)=><div className={"element py-2 "} key={index} onMouseEnter={()=>activedelete(index)} onMouseLeave={()=>offdelete()}>
                                <li className="list pl-1">{thingdo.label}</li>
                                <div className="delete" id={index} style={{opacity:invisible.length != 0 ? invisible[index]:0 }}  onClick={()=>eliminartarea(index)} ><AiFillCloseCircle/></div>
                            </div>)}
                        </ul>
                    </div>
                    <div className="numbertasks p-1">
                        <p>{numTask}</p>
                    </div>
                    <div className ="contentbutton p-2">
                        <button className="btn btn-secondary" onClick={()=>handleClean() }>Clean Tasks</button>
                    </div>
                    
                </div>  
                  
        
	);
};

export default List;