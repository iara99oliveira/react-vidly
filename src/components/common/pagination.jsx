import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  //define as props necessarias em variáveis
  const {itemsCount, pageSize, currentPage, onPageChange} = props;
  console.log(currentPage);
  
  
  //define o número de página necessárias
    //(Math.ceil define um num inteiro maior ou igual do que o float que é retornado na divisão)
  const pagesCount = Math.ceil(itemsCount/pageSize);
  
  //cria um array com a quantidade de páginas, a não ser que a qdt seja 1 (não exibe paginação)
  if(pagesCount === 1) return null;
  const pages = _.range(1,pagesCount+1);
    
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => 
          <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
            <a className="page-link" onClick={()=> onPageChange(page)}>
              {page}
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

//verifica se as propriedades passadas ao componente são dos tipos esperados
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Pagination;
