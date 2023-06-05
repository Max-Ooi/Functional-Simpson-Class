import Character from "./Character";

const Simpsons = (props) => {

  const { simpsons, onLikeToggle } = props;


  return (
  <>

      {simpsons.map((item) => {
          return (
            <Character
              item={item}
              key={item.id}
              // onDelete={onDelete}
              onLikeToggle={onLikeToggle}
            />
          );
        })}
  </>
  );
}
 
export default Simpsons;








// import React, { Component } from "react";
// import Character from "./Character";
// import Controls from "./Controls";

// class Simpsons extends Component {
//   render() {
//     const { simpsons, onDelete, onLikeToggle, onSearchInput, onNameOrderInput } = this.props;

//     return (
//       <> 
      
//         <Controls onSearchInput={onSearchInput} onNameOrderInput={onNameOrderInput}/>

//         {simpsons.map((item) => {
//           return (
//             <Character
//               item={item}
//               key={item.id}
//               onDelete={onDelete}
//               onLikeToggle={onLikeToggle}
//             />
//           );
//         })}

//       </>
//     );
//   }
// }

// export default Simpsons;
