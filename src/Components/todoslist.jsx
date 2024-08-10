import proptypes from 'prop-types';

const ToDoList = ({ id, name, description, status, editTodo, deleteTodo }) => {
    return (
        <>
            <div id={id} className='todos'>

                <h5>Name : <span>{name}</span></h5>
                <p>Description : <span>{description}</span></p>
                <div>Status : <span><button className="btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">Not completed</button>
                </span></div>
                <button className='edit' onClick={() => editTodo(id)}>Edit</button>
                <button className='delete' onClick={() => deleteTodo(id)}>Delete</button>
            </div>
        </>
    )
}
ToDoList.proptypes = {
    id: proptypes.oneOfType([proptypes.number, proptypes.string]),
    name: proptypes.string,
    description: proptypes.string,
    status: proptypes.string,
    editTodo: proptypes.func,
    deleteTodo: proptypes.func,
}

export default ToDoList;