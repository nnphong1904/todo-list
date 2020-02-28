import React from 'react';
import './TodosItem.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import checkImg from './img/checkImg.svg';
import checkImgComplete from './img/checkImgComplete.svg';
import clear from './img/clear.svg';
function TodosItem(props){
    const {currentFilterState,checkComplete,removeTodo,item}=props;
    let url;
    let finalItems={};
        if (currentFilterState==='active' && item.isComplete===false){
            finalItems={...item};
            url=checkImg;
        }
        if (currentFilterState==='completed' && item.isComplete===true){
            finalItems={...item};
            url=checkImgComplete;
        }
        if (currentFilterState==='all'){
            finalItems={...item};
                if (finalItems.isComplete===true){
                    url=checkImgComplete;
                }
                else {
                    url=checkImg;
                }
        }
  
   if (!url){
       return (<div></div>);
   }
   else {
    return(
        <div  className={classNames("TodoItem",{'TodoItem-complete':item.isComplete===true})} >
            <img onClick={checkComplete} src={url} width={32}/>
            <p >{finalItems.title}</p>
        <img onClick={removeTodo} id="clear-btn" src={clear} width={10}  />
    </div>  
    );
   }
}


TodosItem.propTypes={
    currentFilterState: PropTypes.oneOf(['active','all','completed']),
    checkComplete: PropTypes.func,
    removeTodo: PropTypes.func,
    item: PropTypes.shape({
        title: PropTypes.string,
        isComplete: PropTypes.bool
    })
}

export default TodosItem;