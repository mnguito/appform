import React, {Fragment} from 'react';
import './App.css';

//Components
import TodoForm from './components/TodoForm';

function App() {
  return(
    <Fragment>  
      <div>
        <nav className="navbar navbar-default bg-dark">
          <div className="nav navbar-nav navbar-left">
            <a href="/formulario" className="navbar-brand"><h1 className="display-5 text-secondary">EQUAA</h1></a>
          </div>
        </nav>
        <div className="page-title text-center mt-5">
          <h2 className="align-center">Formulario</h2>
        </div>
        <div>
          <TodoForm />
        </div>
      </div>
    </Fragment>
  )
}


export default App;
