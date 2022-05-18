import React,{useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Ingredients() {
  const [userIngredients,setUserIngredients] = useState([]);

  const notify=()=>{
    toast.success('Succesfully created',{autoClose:2000})
 }
 const notifyErr=()=>{
  toast.error('An error occured',{autoClose:2000})
}
  const onRemoveItem =(event,id)=>{
    event.preventDefault()
    fetch(`https://ingredient-app-40b77-default-rtdb.firebaseio.com/ingredients/${id}.json`,{
      method:'DELETE',
    }).then(response=>{
      if(response.ok){
        notify();
        const updatedArray =  userIngredients.filter(ing => ing.id !== id );
      setUserIngredients(updatedArray);
      }
      
    }).catch((err)=>{
      console.log(err)
      notifyErr()
    })
   
  }
  return (
    <div className="App">
      <IngredientForm userIngredients={userIngredients} setUserIngredients={setUserIngredients} />

      <section>
        <Search setUserIngredients={setUserIngredients} ingredients={userIngredients}/>
        <IngredientList ingredients={userIngredients}  onRemoveItem={onRemoveItem}/>
      </section>
    </div>
  );
}

export default Ingredients;
