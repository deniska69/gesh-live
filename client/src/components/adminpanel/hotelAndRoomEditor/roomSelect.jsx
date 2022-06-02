import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { roomsAll, roomOneUpdate } from '../../../actions/rooms';
import RoomAdd from './roomAdd';
import RoomEditor from './roomEditor';

const RoomSelect = props => {
  const dispatch = useDispatch();

  const allRoomsList = useSelector(state => state.room.roomsAll); //Получаем из редюсера список всех апартаментов, относящихся к выбранному отелю
  const [isSelectRoom, setIsSelectRoom] = useState(false); //Выбраны ли какие-либо апартаменты из списка
  const [selectRoom, setSelectRoom] = useState(''); //Выбранные апартаменты с данными из БД
  const [selectRoomUpdate, setSelectRoomUpdate] = useState(''); //Выбраннык апартаменты с обновлёнными данными

  //Функция загрузки списка всех апартаментов
  useEffect(() => {
    dispatch(roomsAll(props.value._id)); //Вызов функции загрузки списка всех апартаментов
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  //Функция обработки выбора апартаментов из выпадающего списка
  function selectRoomFromTheList(e) {
    setIsSelectRoom(false); //Предварительно сбрасываем выбор апартаментов из списка

    if (e.target.value !== '0') {
      setIsSelectRoom(true); //Подтверждаем выбор отеля из списка
      setSelectRoom(allRoomsList.filter(n => n._id === e.target.value)[0]); //Записываем в переменную данные выбранных апартаментов
      setSelectRoomUpdate(allRoomsList.filter(n => n._id === e.target.value)[0]); //Записываем в переменную данные выбранных апартаментов с изменениями
    } else {
      setIsSelectRoom(false); //Сбрасываем выбор апартаментов из списка
    }
  }

  //Функция сохранения данных выбранных апартаментов
  function updateRoomNow() {
    dispatch(
      roomOneUpdate(
        selectRoomUpdate._id,
        selectRoomUpdate.id_hotel,
        selectRoomUpdate.name,
        selectRoomUpdate.description,
        selectRoomUpdate.gallery,
        selectRoomUpdate.count_adults,
        selectRoomUpdate.count_childrens,
        selectRoomUpdate.price
      )
    );
  }

  return (
    <div className="col-lg-5 blockRoomSelect">
      {/* Выбор апартаментов + Добавление новых */}
      <div className="alert alert-success" role="alert">
        <div className="row">
          <div className="col-lg-10">
            <select className="form-select form-select-sm selectRooms" aria-label="Default select example" onChange={e => selectRoomFromTheList(e)}>
              <option value={0}>Выберите апартаменты...</option>
              {allRoomsList.map(room => (
                <option key={room._id.toString()} value={room._id.toString()}>
                  {' '}
                  {room.name.toString()}
                </option>
              ))}
            </select>
          </div>
          <RoomAdd value={props.value._id} />
        </div>
      </div>

      {isSelectRoom && <RoomEditor value={selectRoom} valueUpdate={selectRoomUpdate} setValue={setSelectRoomUpdate} updateRoomNow={updateRoomNow} />}
    </div>
  );
};

export default RoomSelect;
