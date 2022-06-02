import React from 'react';
import RoomDescription from './roomDescription';
import RoomGallery from './roomGallery';

const RoomEditor = props => {
  return (
    <div className="blockRoomEditor">
      {/* Название апартаментов */}
      <div className="row">
        <div className="col-sm-3">
          <label className="form-label form-control-sm">Название:</label>
        </div>
        <div className="col-sm-9">
          <input
            className="form-control form-control-sm"
            value={props.valueUpdate.name}
            onChange={e => props.setValue({ ...props.value, name: e.target.value })}
            placeholder="Введите Название..."
          />
        </div>
      </div>

      {/* Описание апартаментов */}
      <RoomDescription value={props.value} setValue={props.setValue} updateRoomNow={props.updateRoomNow} />

      {/* Галеря апартаментов */}
      <RoomGallery value={props.valueUpdate} setValue={props.setValue} updateRoomNow={props.updateRoomNow} id_hotel={props.id_hotel} />
    </div>
  );
};

export default RoomEditor;
