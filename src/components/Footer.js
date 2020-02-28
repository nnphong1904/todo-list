import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Footer.css';
    function Footer(props) {
        const {clearCompletedPermission,clearCompleted,currentFilterState,filter,noItems}=props;
        return (
            <div className={classNames('footer')}>
                    <span>{noItems} item left</span>
                        <div className={classNames('footer-btns')}>
                            <a className={classNames({'selected':currentFilterState==='all'})} onClick={filter} href='#'>All</a>
                            <a className={classNames({'selected':currentFilterState==='active'})} onClick={filter} href='#'>Active</a>
                            <a className={classNames({'selected':currentFilterState==='completed'})} onClick={filter} href='#'>Completed</a>      
                        </div>
                    {clearCompletedPermission===true && <a href='#' onClick={clearCompleted} className='clear-complete'>Clear completed</a>}
            </div>
        );
    }

Footer.propTypes ={
   
        currentFilterState: PropTypes.oneOf(['all','active','completed']),
        filter: PropTypes.func,
        noItems: PropTypes.number,
        clearCompleted: PropTypes.func,
        clearCompletedPermission: PropTypes.bool

}

export default Footer;