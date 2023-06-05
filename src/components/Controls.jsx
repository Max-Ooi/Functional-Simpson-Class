import React from 'react';

const Controls = (props) => {

    const {onSearchInput, onNameOrderInput} = props;

    return (
        <>
        <input onInput={onSearchInput} type="text"/>
        <select onInput={onNameOrderInput} >
        <option value=""></option>
        <option value="A to Z">A to Z</option>
        <option value="Z to A">Z to A</option>
        </select>
        </>   
        );
}
 
export default Controls;

