import React from 'react';
const ListGroup = (props)=> {
const {items,valueProperty,textproperty,onItemSelect,selectedItem}=props;
        return(
            <ul className="list-group">
                {items.map(item=>(<li key={item[valueProperty]} onClick={()=>onItemSelect(item)}   className={item ===  selectedItem ? "list-group-item active":"list-group-item"}>{item[textproperty]}</li>))}
                
            </ul>
            );
};
ListGroup.defaultProps={
    textproperty:"name",
     valueProperty:"_id"
}
 
export default ListGroup;