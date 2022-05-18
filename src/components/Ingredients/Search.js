import React,{useState,useEffect,useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {userIngredients,setUserIngredients} =props;
  const [enteredFilter,setEnteredFilter] = useState('');
  const inputRef = useRef();

  const searchHandler =(event)=>{
    setEnteredFilter(event.target.value)
  }

  useEffect(()=>{
   const timer = setTimeout(()=>{
      if(enteredFilter === inputRef.current.value){
        const query =
        enteredFilter.length === 0
          ? ""
          : `?orderBy="title"&equalTo="${enteredFilter}"`;
      fetch('https://ingredient-app-40b77-default-rtdb.firebaseio.com/ingredients.json' + query)
      .then(res =>{
        return res.json();
      }).then(responseData=>{
      
        const loadedIngredients = [];
  
        for (const key in responseData){
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setUserIngredients(loadedIngredients);
      }).catch(err=>{
        console.log(err);
      })
      }
    },500);
    return ()=>{
      clearTimeout(timer)
    };
  },[enteredFilter,userIngredients,setUserIngredients,inputRef]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={enteredFilter} onChange={searchHandler}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
