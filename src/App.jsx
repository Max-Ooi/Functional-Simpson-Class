import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Simpsons from "./components/Simpsons";
import "./App.css";
import joi from "joi";

const App = () => {
  const [simpsons, setSimpson] = useState();
  const [input, setInput] = useState({ searchInput: " " });
  const [nameOrderInput, setNameOrderInput] = useState("");
  const [errors, setErrors] = useState(null);

  // //function to get the Simpson API data

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=15&character=${input.searchInput}`
      );

      //fixed the api data to have unique id
      data.forEach((element, index) => {
        element.id = index + Math.random();
      });

      setSimpson(data);
    } catch (error) {
      console.log(error);
    }
  }, [input]);

  //invokes the Simpson API data function

  useEffect(() => {
    getData();
  }, [getData]);

  console.log(simpsons);

  //toggle liked function
  const onLikeToggle = (id) => {
    const copySimpsons = [...simpsons];
    const indexOf = copySimpsons.findIndex((item) => {
      return item.id === id;
    });
    copySimpsons[indexOf].liked = !copySimpsons[indexOf].liked;
    setSimpson(copySimpsons);
  };

  // Delete function

  const onDelete = (id) => {
    const copySimpsons1 = [...simpsons];
    const indexOf1 = copySimpsons1.findIndex((char) => {
      return char.id === id;
    });

    copySimpsons1.splice(indexOf1, 1);
    setSimpson(copySimpsons1);
  };

  const onSearchInput = async (e) => {

    const {value} = e.target;

    if (value.includes('fuck')) {
      setInput({ searchInput: 'f*ck'})
      return;
    }  


    setInput({ searchInput: e.target.value });

    //Validation

    // define the schema
    const schema = { searchInput: joi.string().max(10) };

    //call Joi
    const r = joi.object(schema);

    try {
      await r.validateAsync(input, { abortEarly: false });
      setErrors(null);
    } catch (errors) {
      const errorsMod = {};
      console.log(errors.details);

      errors.details.forEach((error) => {
        errorsMod[error.context.key] = error.message;
      });
      setErrors(errorsMod)
    }
  };

  const onNameOrderInput = (e) => {
    setNameOrderInput(e.target.value);
  };

  console.log(input);

  if (!simpsons) return <Loading />;

  //     //calculate the total
  let total = 0;
  simpsons.forEach((char) => {
    if (char.liked) {
      total++;
    }
  });

  //Sort by Name order

  if (nameOrderInput === "A to Z") {
    filteredSimpsons.sort((a, b) => {
      if (a.character > b.character) return 1;
      if (a.character < b.character) return -1;
    });
  } else if (nameOrderInput === "Z to A") {
    filteredSimpsons.sort((a, b) => {
      if (a.character > b.character) return -1;
      if (a.character < b.character) return 1;
    });
  }

  return (
    <div>
      <h1>Total no of liked chars #{total}</h1>
      <p>{errors && errors.searchInput}</p>
      <Simpsons
        input={input.searchInput}
        simpsons={simpsons}
        onLikeToggle={onLikeToggle}
        onDelete={onDelete}
        onSearchInput={onSearchInput}
        onNameOrderInput={onNameOrderInput}
      />
    </div>
  );
};

export default App;
