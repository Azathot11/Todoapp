import React,{useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator'

import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const IngredientForm = React.memo(props => {

  const [title,setTitle] = useState('');
  const [amount,setAmount] =useState('');
  const [loading,setIsLoading] =useState(false)


  const notify=()=>{
    toast.success('Succesfully created',{autoClose:2000})
 }
 const notifyErr=(err)=>{
  toast.error(err,{autoClose:2000})
}

const notifyWarn=(war)=>{
  toast.warn(<p>{war}</p>,{autoClose:2000})
}

  const nameHandler=(event)=>{
    setTitle(event.target.value);
  }
 const amountHandler = (event)=>{
   setAmount(event.target.value);
 }
  const submitHandler = event => {
    event.preventDefault();
    if(title === '' && amount === ''){
      notifyWarn('please enter valid information');
      return;
    }
     const titleExist = props.userIngredients.find((exist => exist.title === title));

     if(titleExist){
       notifyErr('the value you entered already exist please enter another one');
       return;
     }
    
    setIsLoading(true);
    fetch('https://ingredient-app-40b77-default-rtdb.firebaseio.com/ingredients.json',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({title,amount})
    }).then(res =>{
      if (res.ok){
        setIsLoading(false);
        notify()
        setTitle('');
        setAmount('')
      }
      return res.json();
    }).then(responseData=>{
     
      console.log(responseData)
      if(responseData){
        props.setUserIngredients( prevIngredients => [...prevIngredients,{id:responseData.name,title,amount}]);
      }
     
    }).catch(err=>{
      console.log(err);
      setIsLoading(false);
      notifyErr('An error occured')
    })
 
    // ...
   
  };

  return (
    <section className="ingredient-form">
      <ToastContainer />
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={title} onChange={nameHandler} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={amount} onChange={ amountHandler}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {loading &&<LoadingIndicator/> }
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
