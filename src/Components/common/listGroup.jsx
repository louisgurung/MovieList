import React, { Component } from "react";
//gets name of genres(items), current selected genre and handles on item select
const ListGroup = props => {
  const {
    items,
    textProperty,
    selectedItem,
    valueProperty,
    onItemSelect
  } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
//with this default props we dont have to send it from movies
export default ListGroup;
