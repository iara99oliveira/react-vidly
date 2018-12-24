import React, { Component } from 'react';

const Like = (props) => {
    let classes = "fa fa-heart"
    classes += props.liked?"":"-o"

    return (
        <i
            onClick={props.onLike} 
            style={{cursor: 'pointer'}} 
            className={classes} aria-hidden="true">
        </i>
    );
}
 
export default Like;
