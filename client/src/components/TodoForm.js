import React, { Fragment, useState} from 'react';
import swal from 'sweetalert';

const TodoForm = () => {

  //const [nombre, apellido, email, fecha_nac, genero]
  const [todo,setTodo] = useState({
    nombre : '',
    apellido : '',
    email : '',
    fecha_nac : new Date(),
    genero : 'No definido'
  });
  

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = {todo};

      const response = await fetch("http://localhost:5000/formulario", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      
      const responseJson = await response.json();
      
      if (response.status===200){
        swal({
          title: "Éxito",
          text: responseJson.message,
          icon: "success",
          button: "Aceptar",
          timer: "5000" 
        }).then((value)=>{
          window.location = "./formulario";
        });

      }else if(response.status===400){
        swal({
          title: "Fecha no válida",
          text: responseJson.message,
          icon: "warning",
          button: "Aceptar",
          timer: "5000" 
        })
      }else{
        swal({
          title: "Oh no",
          text: responseJson.message,
          icon: "error",
          button: "Aceptar",
          timer: "5000" 
        })
      }

    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      <div>
        <form className="d-flex justify-content-center" onSubmit = {onSubmitForm}>
          <div >
            <div className="row">
              <div className="form-group col-sm-6 mt-3">
                <label  className="form-label">Nombre <b className="text-danger">*</b></label>
                <input type="text" name="nombre" className="form-control"  placeholder="Escriba su nombre"
                onChange = {e => setTodo({...todo, [e.target.name] : e.target.value})} required></input>
              </div>
              <div className="form-group col-sm-6 mt-3">
                <label  className="form-label">Apellido <b className="text-danger">*</b></label>
                <input type="text" name="apellido" className="form-control"  placeholder="Escriba su apellido"
                onChange = {e => setTodo({...todo, [e.target.name] : e.target.value})} required></input>
              </div>
            </div>
            <div className="form-group mt-3">
              <label  className="form-label">Correo electronico <b className="text-danger">*</b></label>
              <input type="email" name="email" className="form-control"   placeholder="correo@email.com"
              onChange = {e => setTodo({...todo, [e.target.name] : e.target.value})} required></input>
            </div>
            <div className="row">
              <div className="form-group col-sm-6 mt-3">
                <label  className="form-label">Fecha de nacimiento <b className="text-danger">*</b></label>
                <input type="date" id="fecha_actual" name="fecha_nac" 
                className="form-control" onChange = {e => setTodo({...todo, [e.target.name] : e.target.value})} required></input>
                <p id="fecha_nac"></p>
              </div>
              <div className="form-group col-sm-6 mt-3">
                <label  className="form-label">Genero <b className="text-danger">*</b></label>
                <select name="genero" className="form-control" onChange = {e => setTodo({...todo, [e.target.name] : e.target.value})} required>
                  <option>No definido</option>
                  <option>Femenino</option>
                  <option>Masculino</option>
                </select>
              </div>
            </div>
            <div className="col text-center mt-4">
              <button type="submit" className="btn btn-warning">Enviar</button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  )
}
export default TodoForm;