import React, { useState, useEffect } from "react";
import {AiFillCloseCircle} from "react-icons/ai";


const List = ( ) => {
    const [elementlist, setElementList]=useState([]);
    const [change, setChange]= useState({});
    const [invisible, setinVisible]= useState([]);

const update = (todos) =>{
    fetch('https://playground.4geeks.com/apis/fake/todos/user/caro', {
    method: 'PUT', // or 'POST'
    body: JSON.stringify(todos), // los datos pueden ser una `cadena` o un {objeto} que proviene de algún lugar más arriba en nuestra aplicación
    headers:{
    'Content-Type': 'application/json'
    }
    })
    .then(res => {
	    if (res.status>= 200 && res.status<=300){
		    console.log("el request se hizo bien");
		    return res.json();
	    }else{
		console.log(`hubo un error ${res.status} en el request`)
	    }
	
    })
    .then(data => {console.log(data);})
    .catch(error => console.error(error));
    }    

function  handleOnChange (e) {
    setChange({label:e.target.value, done:false});
}   
function handleKeyDown (event) {
        if(event.key =='Enter')
        { 
            setElementList(current => [...current, change]);
            setChange({label:"",done:false});
    }
      }

function eliminartarea(param){
    const eliminar=elementlist[param.index]
    setElementList(elementlist.filter(element=>element != eliminar))
    
}
function activedelete(event){
    const index = event._targetInst.key
    let array = []
    for(let i=0; i<elementlist.length; i++){
        if(i==index){
            array.push(1)
        }else{array.push(0)}
        
    }
    
    setinVisible(array)
}
function offdelete(){
    let inv=[]
    for(let j=0; j<elementlist.length; j++){
        inv.push(0)        
    }
    setinVisible(inv)
}

useEffect(() => {
    if(elementlist.length===0){
        update({label:"",done:false})
    }else{
   update(elementlist);}
  }, [elementlist]);

	return (
            
                <div className="tasklist" >
                    <div className="uptask">
                        <input type="text" className="formtask" id="text" placeholder="What needs to be done?"  value={change.label} onKeyDown={handleKeyDown} onChange={handleOnChange}/>
                    </div>
                    <div className="tasktext">
                        <ul>{elementlist.map((thingdo, index)=>
                             <div className={"element py-2 " + index} key={index} onMouseEnter={activedelete} onMouseLeave={offdelete}  >
                                <li className="list pl-1">{thingdo.label}</li>
                                <div className="delete" id={index} style={{opacity:invisible.length != 0 ? invisible[index]:0 }}  onClick={()=>eliminartarea({index})} ><AiFillCloseCircle/></div>
                            </div>)}
                        </ul>
                    </div>
                    <div className="numbertasks p-1">
                        <p>{elementlist.length} item left</p>
                    </div>
                    
                </div>  
                  
        
	);
};

export default List;