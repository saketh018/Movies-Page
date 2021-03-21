import React from 'react';
import _ from 'lodash';
const Pagination =(props)=>
{
const {itemCount, pageSize,currentPage,pageChange} = props;
const pageCount = itemCount/pageSize;
const pages =_.range(1,pageCount+1);

return (
<nav >
  <ul class="pagination">
      {pages.map(page =>(<li key={page} class={page === currentPage ? 'page-item active': 'page-item'}>
        <a className="page-link" onClick={()=>pageChange(page)}>{page}</a>
        </li>))}
    
  </ul>
</nav>
);
};
export default Pagination;