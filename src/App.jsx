import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loading from './components/Loading';
import Simpsons from './components/Simpsons';
import "./App.css";



const App = () => {

  const [simpsons, setSimpson] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [nameOrderInput, setNameOrderInput] = useState("");

  //function to get the Simpson API data
  const getData = async () => {
    try {const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=10`
    );

    //fixed the api data to have unique id
    data.forEach((element, index) => {
      element.id = index + Math.random();
    });

    setSimpson(data)
  
  }catch(error){
      console.log(error)}
  }

  //invokes the Simpson API data function
  useEffect(()=>{getData()},[])

console.log(simpsons)

//toggle liked function
  const onLikeToggle = (id) => {
   const copySimpsons = [...simpsons]
   const indexOf = copySimpsons.findIndex((item) => {
    return item.id === id;
   })
   copySimpsons[indexOf].liked = !copySimpsons[indexOf].liked 
   setSimpson(copySimpsons)
  };


// Delete function

  const onDelete = (id) => {
    const copySimpsons1 = [...simpsons]
    const indexOf1 = copySimpsons1.findIndex((char) => {
      return char.id === id;
    });

    copySimpsons1.splice(indexOf1, 1);
    setSimpson(copySimpsons1);
  };

  const onSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  const onNameOrderInput = (e) => {
    setNameOrderInput(e.target.value)}

  
    console.log(searchInput)



  if (!simpsons) return <Loading/>;

  if (simpsons.length === 0) return <p>You deleted everything!</p>;

//     //calculate the total
  let total = 0;
  simpsons.forEach((char) => {
  if (char.liked) {total++;}
  });


// filter the results   


    let filteredSimpsons = [...simpsons]

    if (searchInput) {
      filteredSimpsons = filteredSimpsons.filter((item)=>{
    
      return item.character.toLowerCase().includes(searchInput.toLowerCase());
      })
    }

    //Sort by Name order
    
    if (nameOrderInput === "A to Z") {
      filteredSimpsons.sort((a, b) => {
        if (a.character > b.character) return 1;
        if (a.character < b.character) return -1;
      })} 
      
    else if (nameOrderInput === "Z to A") {
      filteredSimpsons.sort((a, b) => {
        if (a.character > b.character) return -1;
        if (a.character < b.character) return 1;
      })}

  

  return ( 
  <div>
    <h1>Total no of liked chars #{total}</h1>
    <Simpsons 
    simpsons={filteredSimpsons} 
    onLikeToggle={onLikeToggle} 
    onDelete={onDelete}
    onSearchInput={onSearchInput}
    onNameOrderInput={onNameOrderInput}
    />
  </div>
  )  
}
 


export default App;

