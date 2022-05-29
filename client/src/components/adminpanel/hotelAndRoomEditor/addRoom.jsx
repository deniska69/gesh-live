import React, { useState } from "react";
import Input from "../../../utils/input/Input";
import { addRoom } from "../../../actions/rooms";

const AddRoom = (props) => {
  const [nameRoom, setNameRoom] = useState("");
  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");
  const [price, setPrice] = useState("");

  function addRoomNow() {
    addRoom(props.id_hotel, nameRoom, person1, person2, price);
  }

  return (
    <div className="modal fade" id="addRoomModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Добавление новых апартаментов для отеля: <p /> {props.name_hotel}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Название:</label>
              <Input className="form-control" value={nameRoom} setValue={setNameRoom} />
            </div>
            <div className="mb-3">
              <label className="form-label">Количество вмещаемых взрослых:</label>
              <Input className="form-control" value={person1} setValue={setPerson1} />
            </div>
            <div className="mb-3">
              <label className="form-label">Количество вмещаемых детей:</label>
              <Input className="form-control" value={person2} setValue={setPerson2} />
            </div>
            <div className="mb-3">
              <label className="form-label">Цена за сутки:</label>
              <Input className="form-control" value={price} setValue={setPrice} />
            </div>
            <div className="d-grid gap-2 d-md-blockr overflow-hidden">
              <button className="btn btn-primary" type="button" onClick={() => addRoomNow()}>
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
