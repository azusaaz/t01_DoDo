import React, { Fragment, useState } from 'react';
import './App.css';

type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: string,
  complete: boolean
}

export default function App() {
  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  const handleSubmit = (e: FormElem):void => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  const addTodo = (text: string):void => {
    const newTodos: ITodo[] = [{text, complete: false}, ...todos]
    setTodos(newTodos)
  }

  const completeTodo = (index: number):void =>{
     const newTodos: ITodo[] = [...todos]
     newTodos[index].complete = !newTodos[index].complete
     setTodos(newTodos)
  }

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  return (
    
    <Fragment >
      <div className="container text-center p-4"> 
      <h1 className="m-2 pb-3">DoDo Today!</h1>

      <form className="p-2" onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} required />
        <button type="submit" className="my-1" >
          <i className="fas fa-plus " style={{color: "#19aaca"}}></i>
        </button>
  
      </form>

      <section className="p-2">
        {todos.map((todo: ITodo, index: number) => (
          <Fragment key={index}>

            {/* bar */}
            <div className=" m-2 p-1 px-2" 
            style={{backgroundColor: "#1cbbdb", borderRadius: "1em", overflowWrap: "break-word", opacity: todo.complete ? 
              0.5 : 1}}> 

                {/* trash */}
                <div className="rounded-circle  m-2 bg-white float-right" style={{ width: "2em", lineHeight: "2em" }}>
                    <i onClick={() => removeTodo(index)} className="far fa-trash-alt rounded-circle"></i>
                </div>

                {/* checkmark */}
                <div className="rounded-circle  m-2 bg-white float-right" style={{ width: "2em", lineHeight: "2em" }}>
                    <i onClick ={() => completeTodo(index)} className={`fas ${todo.complete? "fa-redo-alt" : "fa-check"}`}></i>
                </div>
    
              {/* todo text */}
              <div className="p-1 px-2 m-2  text-white text-left" style={{ textDecoration: todo.complete ? 
              'line-through' : ""}}>
                <h4 className="mb-0">{todo.text}</h4>
              </div>

            </div>
          </Fragment>
        ))}
      </section>
      </div>
    </Fragment>
  );
}


