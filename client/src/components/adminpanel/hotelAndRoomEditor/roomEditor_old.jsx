import React, { useEffect, useState } from "react";
import Input from "../../../utils/input/Input";
import { useSelector, useDispatch } from "react-redux";
import AddRoom from "./addRoom";
import { allRoom, updateRoom } from "../../../actions/rooms";

const RoomEditor = (props) => {
  const dispatch = useDispatch();
  const allRooms = useSelector((state) => state.room.listRooms);
  const [isSelectRoom, setIsSelectRoom] = useState(false);
  const [currentIDRoom, setIDRoom] = useState("");
  const [nameRoom, setNameRoom] = useState("");
  const [person1Room, setPerson1Room] = useState("");
  const [person2Room, setPerson2Room] = useState("");
  const [priceRoom, setPriceRoom] = useState("");

  useEffect(() => {
    setIsSelectRoom(false);
    dispatch(allRoom(props.id_hotel));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id_hotel]);

  function updateRoomNow() {
    if (isSelectRoom) {
      updateRoom(currentIDRoom, props.id_hotel, nameRoom, person1Room, person2Room, priceRoom);
    } else {
      alert("Необходимо выбрать комнату!");
    }
  }

  function changeHandlerRoomList(e) {
    /* eslint eqeqeq: 0 */
    if (e.target.value != 0) {
      allRooms.reduce((res, note) => {
        if (note._id === e.target.value) {
          // eslint-disable-next-line
          return setIsSelectRoom(true), setIDRoom(note._id), setNameRoom(note.name), setPerson1Room(note.person1), setPerson2Room(note.person2), setPriceRoom(note.price);
        } else {
          return res;
        }
      }, {});
    } else {
      setIsSelectRoom(false);
    }
  }

  return (
    <div className="col-lg-6">
      <div className="row align-item-start">
        <h5>Редактирование апартаментов отеля {props.name_hotel}:</h5>

        <div className="col-lg-6">
          <label className="form-label" id="otstup">
            Отступ
          </label>
          <select className="form-select" aria-label="Default select example" onChange={(e) => changeHandlerRoomList(e)}>
            <option value={0}>Выберите апартаменты...</option>
            {allRooms.map((allRooms) => (
              <option key={allRooms._id.toString()} value={allRooms._id.toString()}>
                {" "}
                {allRooms.name.toString()}
              </option>
            ))}
          </select>
          <br />
          <br />
          <div className="d-grid gap-2">
            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#addRoomModal">
              Добавить новые апартаменты
            </button>
          </div>

          <AddRoom id_hotel={props.id_hotel} name_hotel={props.name_hotel} />
        </div>

        {isSelectRoom && (
          <div className="col-lg-6">
            <div className="mb-3">
              <label className="form-label">Название:</label>
              <Input className="form-control" value={nameRoom} setValue={setNameRoom} />
            </div>
            <div className="mb-3">
              <label className="form-label">Количество вмещаемых взрослых:</label>
              <Input className="form-control" value={person1Room} setValue={setPerson1Room} />
            </div>
            <div className="mb-3">
              <label className="form-label">Количество вмещаемых детей:</label>
              <Input className="form-control" value={person2Room} setValue={setPerson2Room} />
            </div>
            <div className="mb-3">
              <label className="form-label">Цена за сутки:</label>
              <Input className="form-control" value={priceRoom} setValue={setPriceRoom} />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-primary" onClick={() => updateRoomNow()}>
                Сохранить апартаменты
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomEditor;
