import React from 'react';

const Name = (props) => {


  const {character, onLikeToggle, id, liked} = props;

  return (
    <div className={liked ? "SimpsonItem liked" : "SimpsonItem disLinked"}>
      <h1>{character}</h1>
      <button onClick={() => onLikeToggle(id)}>
          {liked ? "Liked" : "Not liked"}
      </button>
      </div>
    );
}
 
export default Name;

