import React from 'react';
import Name from "./Name";
import Quote from "./Quote";
import Image from "./Image";
import Delete from "./Delete";

const Character = (props) => {

  const { character, quote, image, id, liked} = props.item;
  const { onLikeToggle, onDelete} = props;


  return (

        <div className="characterContainer">
        <Name
          character={character}
          id={id}
          onLikeToggle={onLikeToggle}
          liked={liked}
        />
        <Quote quote={quote} />
        <Image image={image} />
        <Delete onDelete={onDelete} id={id} />
      </div>


  );
}
 
export default Character;

