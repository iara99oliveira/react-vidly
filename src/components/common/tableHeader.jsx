import React, {Component} from 'react';

class TableHeader extends Component {
    
    raiseSort = path => {
        const sortColumn = this.props.sortColumn;
    
        if (sortColumn.path === path){
            sortColumn.order = sortColumn.order === "asc"? "desc" : "asc"
        }else{
            if(path !== undefined)sortColumn.path = path;
            sortColumn.order = "asc";
        }
        this.props.onSort(sortColumn);
    }

    renderSortIcon = column => {
        const {sortColumn} = this.props;

        if(column.path !== sortColumn.path) {
            return null
        }else{
            
            return <i className={"fa fa-sort-"+sortColumn.order}></i>
        }

    }

    render() { 
        return ( 
            <thead>
                <tr className="clickable">
                    {this.props.columns.map(c =>
                        <th key={c.path||c.key} onClick={()=> this.raiseSort(c.path)} scope="col">
                            {c.label}{this.renderSortIcon(c)}
                        </th>
                    )}
                </tr>
            </thead>
         );
    }
}
 
export default TableHeader;