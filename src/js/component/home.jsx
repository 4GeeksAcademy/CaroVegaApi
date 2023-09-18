import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import background from "../../img/imgbackgroundtasks.jpg";
import List from "./list"

//create your first component
const Home = () => {
	return (
	<div className="contenedor">
		<div className="conteinertasks pb-3 m-5" style={{backgroundImage: `url(${background})`}}>
			<div className="title mt-5 mb-1">
				<h1>todos</h1>
			</div>
			<div className ="tasks">
				<List text="tarea1"/>
			</div>
			<div className="draw1"></div>
            <div className="draw2"></div>
		</div>
	</div>
	);
};

export default Home;