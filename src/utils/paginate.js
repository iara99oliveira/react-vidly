import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
   
    //startIndex = os items na página serão dispostos a partir desse num.
        //(ex: estamos na página 2. Se o tamanho de cada página for 4,
        // então (2-1 = 1 e 1*4 = 4) nossos itens devem ter o id > 4 
    const startIndex = (pageNumber-1)*pageSize;

    //_(meuArray) - define o array que vamos executar a ação (o transforma num lodash wrapper)
    //slice() - corta o array de itens a partir do startIndex
    //take() - pega os itens de acordo com o tamanho pré-definido da pagina
    //value() - devolve o valor do que acabamos de executar como um array javascript
    return _(items).slice(startIndex).take(pageSize).value();
    
}