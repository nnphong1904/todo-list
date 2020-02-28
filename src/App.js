import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import TodosItem from './components/TodosItem';
import Footer from './components/Footer';
import Tick from './components/img/tick.svg';


function App() {
    const inputEl=useRef(null);
    const [todosList, setTodosList]=useState(JSON.parse(localStorage.getItem('todosList'))||[]);
    const [newTodo,setNewTodo]=useState('');
    const [lastSectionFlag, setLastSectionFlag]=useState(JSON.parse(localStorage.getItem('footerFlag'))||false);
    const [fiterState, setFilterState]=useState('all');
    const [clearCompletedPermission,setClearCompletedPermission]=useState(false);
  
    

    useEffect(()=>{
      inputEl.current.focus();
    },[])

    
    
  function checkAll() {
    const listTodos= todosList;
      if (listTodos.filter(item=>item.isComplete===true).length===todosList.length){
        localStorage.setItem('todosList',JSON.stringify([...listTodos.map(item=>{return {title: item.title, isComplete: !item.isComplete}})]));
        setTodosList([...listTodos.map(item=>{return {title: item.title, isComplete: !item.isComplete}})]);
      } 
      else {
        localStorage.setItem('todosList',JSON.stringify([...listTodos.map(item=>item.isComplete? {title: item.title, isComplete: item.isComplete} : {title: item.title, isComplete: !item.isComplete})]));
        setTodosList([...listTodos.map(item=>item.isComplete? {title: item.title, isComplete: item.isComplete} : {title: item.title, isComplete: !item.isComplete})]);
      }
  }
  function clearCompleted(event) {
      const listToDos= todosList;
      localStorage.setItem('todosList',JSON.stringify([...listToDos.filter(item=>item.isComplete===false)]));
      if (listToDos.filter(item=>item.isComplete===false).length===listToDos){
        localStorage.setItem('footerFlag',false);
        setLastSectionFlag(false);
      }
      setTodosList([...listToDos.filter(item=>item.isComplete===false)]);
      setClearCompletedPermission(false);
  }

 
   function filter(event) {
     const text=event.target.text;    

      if (text==='Active'){
        setFilterState('active');   
     }
      else if (text==='Completed'){
        setFilterState('completed');
      }
      else {
        setFilterState('all');
      }
   }


    
   function checkComplete(item) {
     return (event)=>{
       const isComplete=item.isComplete;
       const listToDos= todosList;
       const index= listToDos.indexOf(item);
       let permisionFlag=false;
       const tmpListTodos=[
        ...listToDos.slice(0,index),
        {...item,isComplete:!isComplete},
        ...listToDos.slice(index+1)
        ];
        
        tmpListTodos.forEach((item)=>{
          if (item.isComplete===true){
            permisionFlag=true;
            return;
          }
        });

        if (permisionFlag===true){
          setClearCompletedPermission(true);
        }
        else {
          setClearCompletedPermission(false);
        }
        localStorage.setItem('todosList',JSON.stringify([
          ...listToDos.slice(0,index),
          {...item,isComplete:!isComplete},
          ...listToDos.slice(index+1)
          ]));
        setTodosList([
              ...listToDos.slice(0,index),
              {...item,isComplete:!isComplete},
              ...listToDos.slice(index+1)
              ]);
        

       
     }
    }

    function removeTodo(item) {
      return(event)=>{
        const listToDos= todosList;
        const index= listToDos.indexOf(item);
        if (listToDos.length===1){
          localStorage.setItem('footerFlag',false);
          setLastSectionFlag(false);
        }
          localStorage.setItem('todosList',JSON.stringify([
            ...listToDos.slice(0,index),
            ...listToDos.slice(index+1)
          ]))
         setTodosList([
           ...listToDos.slice(0,index),
           ...listToDos.slice(index+1)
         ]);
        
      }
      
    }

    function handlingOnKeyUp(event) {
      let text= event.target.value;
      if (!text){return;}
        text=text.trim();
      if (text===''){return;}
      
     if (event.keyCode===13){
       setTodosList([...todosList,{title:text, isComplete:false}]);
       localStorage.setItem('todosList',JSON.stringify([...todosList,{title:text, isComplete:false}]));
       localStorage.setItem('footerFlag',true);
       setNewTodo('');
       setLastSectionFlag(true);
     }
    }

    function onChange(event){
      setNewTodo(event.target.value);
    }
  console.log(typeof lastSectionFlag);
  return (
    
   <div className="Header">
      <h1>todos</h1>
      <div className="App">
        <div className="input-header">
                <img onClick={checkAll} src={Tick} width={32}/>
                <input ref={inputEl} value={newTodo} onChange={onChange} onKeyUp={handlingOnKeyUp} type="text" placeholder="What needs to be done?" />
        </div>
        
        {todosList.length>0 && todosList.map((item,index)=>
            <TodosItem 
                currentFilterState={fiterState}
                checkComplete={checkComplete(item)}
                removeTodo={removeTodo(item)}
                key={index} 
                item={item}/>)}
      
        {lastSectionFlag===true && <Footer clearCompletedPermission={clearCompletedPermission} clearCompleted={clearCompleted} currentFilterState={fiterState} filter={filter} noItems={todosList.length}/>}
        </div>
    </div>
  );
}

export default App;
