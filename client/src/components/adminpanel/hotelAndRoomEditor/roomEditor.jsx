import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allRooms } from '../../../actions/rooms';
import AddRoom from './addRoom';

const RoomEditor = props => {
  const dispatch = useDispatch();

  const allRoomsList = useSelector(state => state.room.roomsAll); //Получаем из редюсера список всех апартаментов, относящихся к выбранному отелю
  const [isSelectRoom, setIsSelectRoom] = useState(false); //Выбраны ли какие-либо апартаменты из списка
  const [selectRoom, setSelectRoom] = useState(''); //Выбранные апартаменты с данными из БД
  const [selectRoomUpdate, setSelectRoomUpdate] = useState(''); //Выбраннык апартаменты с обновлёнными данными

  //Функция загрузки списка всех апартаментов
  useEffect(() => {
    dispatch(allRooms(props.value._id)); //Вызов функции загрузки списка всех апартаментов
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

  //Функция вызова функции в родительском компоненте для сохранения отеля

  return (
    <div className="col-lg-5 blockRoomEditor">
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
        <AddRoom value={props.value} />
      </div>
    </div>
  );
};

export default RoomEditor;
