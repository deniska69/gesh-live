import React, { useState } from 'react';
import Input from '../../../utils/input/Input';
import { addRoom } from '../../../actions/rooms';
import { Plus } from 'react-bootstrap-icons';

const AddRoom = props => {
  const [name, setName] = useState('');

  //Функция отправки запроса добавления новый апартаментов
  function addRoomNow() {
    addRoom(props.value._id, name);
  }

  return (
    <div className="col-lg-1">
      <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalAddRoom">
        <Plus color="white" />
      </button>

      <div className="modal fade" id="modalAddRoom" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="exampleModalLabel">
                Добавление новых апартаментов для отеля: <p /> {props.value.name}
              </h6>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-3">
                  <label className="form-label form-control-sm">Название:</label>
                </div>
                <div className="col-sm-9">
                  <Input className="form-control form-control-sm" value={name} setValue={setName} placeholder="Введите Название..." />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                Отмена
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => addRoomNow()}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
