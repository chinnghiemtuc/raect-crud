import React from "react";

const ListItem = props => {
    return <li className="list-group-item">
            <div className="d-flex">
                <div className="mr-auto">{props.item.name}</div>
                <div>
                    <button
                    className="btn-sm btn btn-info"
                    onClick={props.editTodo}
                    >
                    <i class="fas fa-pen"></i>
                    </button>
                    <button
                        className="btn-sm ml-2 btn btn-danger"
                        onClick={props.deleteTodo}
                    >
                    <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </li>;
};

export default ListItem
