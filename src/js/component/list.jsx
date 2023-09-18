import React, { useState } from "react";
import {AiFillCloseCircle} from "react-icons/ai";


const List = ( ) => {
    const [elementlist, setElementList]=useState([]);
    const [change, setChange]= useState("");
    const [invisible, setinVisible]= useState([]);

function  handleOnChange (e) {
    setChange(e.target.value);
}   
function handleKeyDown (event) {
        if(event.key =='Enter')
        { 
            setElementList(current => [...current, change]);
            setChange("");
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
	return (
            
                <div className="tasklist" >
                    <div className="uptask">
                        <input type="text" className="formtask" id="text" placeholder="What needs to be done?"  value={change} onKeyDown={handleKeyDown} onChange={handleOnChange}/>
                    </div>
                    <div className="tasktext">
                        <ul>{elementlist.map((thingdo, index)=>
                             <div className={"element py-2 " + index} key={index} onMouseEnter={activedelete} onMouseLeave={offdelete}  >
                                <li className="list pl-1">{thingdo}</li>
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