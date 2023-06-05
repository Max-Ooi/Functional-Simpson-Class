import React from 'react';
import Character from "./Character";
import Controls from "./Controls";

const Simpsons = (props) => {

  const { simpsons, onLikeToggle, onDelete, onSearchInput, onNameOrderInput } = props;


  return (
  <>

      <Controls onSearchInput={onSearchInput} onNameOrderInput={onNameOrderInput}/>

      {simpsons.map((item) => {
          return (
            <Character
              item={item}
              key={item.id}
              onDelete={onDelete}
              onLikeToggle={onLikeToggle}
            />
          );
        })}
  </>
  );
}
 
export default Simpsons;

