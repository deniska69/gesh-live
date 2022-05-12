import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../utils/input/Input";
import TextEditor from "../../utils/input/TextEditor";
import { allHotel, updateHotel } from "../../actions/hotels";
import AddHotel from "./addHotel";
import { allUser } from "../../actions/users";
import { toastView } from "../App";
//import RoomEditor from "./roomEditor";

const HotelEditor = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user.isAdmin); //Получаем из редюсера значение, авторизованный пользователь администратор или нет
  const allHotels = useSelector((state) => state.hotel.listHotels); //Получаем из редюсера список отелей
  const allUsers = useSelector((state) => state.user.listUsers); //Получаем из редюсера список пользователей (в данном случае будем дальше выбирать только менеджеров)

  //Профиль выбранного отеля
  const [isSelectHotel, setIsSelectHotel] = useState(false); //Выбран ли какой-либо отель из спика
  const [idSelectHotel, setIdSelectHotel] = useState(""); //ID выбранного отеля
  const [nameSelectHotel, setNameSelectHotel] = useState(""); //Название выбранного отеля
  const [descriptionSelectHotel, setDescriptionSelectHotel] = useState(""); //Описание выбранного отеля
  const [idManagerSelectHotel, setIdManagerSelectHotel] = useState(""); //ID менеджера выбранного отеля

  //Обновлённые данные профиля отеля
  const [nameSelectHotelNew, setNameSelectHotelNew] = useState(""); //Новое название выбранного отеля
  const [descriptionSelectHotelNew, setDescriptionSelectHotelNew] = useState(""); //Новое описание выбранного отеля
  const [idManagerSelectHotelNew, setIdManagerSelectHotelNew] = useState(""); //Новый ID менеджера выбранного отеля

  //Функция загрузки списка отелей и списка пользователей с уровенем доступа "Менеджер отеля"
  useEffect(() => {
    dispatch(allHotel());
    dispatch(allUser(3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Функция обновления данных выбранного отеля
  function updateHotelNow() {
    //Если выбран како-либо отель из спика
    if (isSelectHotel) {
      //Если никакие данные не были измененны
      if (nameSelectHotel === nameSelectHotelNew && descriptionSelectHotel === descriptionSelectHotelNew && idManagerSelectHotel === idManagerSelectHotelNew) {
        return toastView("warning", "Никакие данные не были изменены.");
      } else {
        //Вызываем функцию обновления данных отеля
        dispatch(updateHotel(idSelectHotel, nameSelectHotelNew, descriptionSelectHotelNew, idManagerSelectHotelNew));
        setNameSelectHotel(nameSelectHotelNew);
        setDescriptionSelectHotel(descriptionSelectHotelNew);
        setIdManagerSelectHotel(idManagerSelectHotelNew);
      }
    } else {
      toastView("warning", "Необходимо выбрать отель!");
    }
  }

  //Функция выбора отеля из списка
  function changeHandlerHotelList(e) {
    setIsSelectHotel(false); //Предварительно сбрасываем выбор отеля из списка

    /* eslint eqeqeq: 0 */
    if (e.target.value != 0) {
      allHotels.reduce((res, note) => {
        if (note._id === e.target.value) {
          setIsSelectHotel(true); //Подтверждаем выбор отеля из списка

          setIdSelectHotel(note._id); //Получаем ID отеля
          setNameSelectHotel(note.name); //Получаем Название отеля
          setDescriptionSelectHotel(note.description); //Получаем Описание отеля
          setIdManagerSelectHotel(note.id_manager); //Получаем ID менеджера отеля

          setNameSelectHotelNew(note.name); //Получаем Название отеля
          setDescriptionSelectHotelNew(note.description); //Получаем Описание отеля
          setIdManagerSelectHotelNew(note.id_manager); //Получаем ID менеджера отеля

          // eslint-disable-next-line
          return;
        } else {
          return res;
        }
      }, {});
    } else {
      setIsSelectHotel(false); //Сбрасываем выбор отеля из списка
    }
  }

  //Функция выбора менеджера из выпадающего списка
  function changeHandlerManagerList(e) {
    /* eslint eqeqeq: 0 */
    if (e.target.value != 0) {
      //Получаем данные пользователя из редюсера, хранящего всех пользователей
      allUsers.reduce((res, note) => {
        if (note._id === e.target.value) {
          setIdManagerSelectHotelNew(note._id); //Получаем ID выбранного менеджера

          // eslint-disable-next-line
          return;
        } else {
          return res;
        }
      }, {});
    } else {
      setIdManagerSelectHotelNew(""); //Заносим пустое значение в переменную отвечающую за хранение нового значения id менеджера
    }
  }

  return (
    <div className="row align-item-start">
      <div className="row align-item-start">
        {/* Блок выбора отеля */}
        {isAdmin && (
          <div className="col-lg-2">
            <select className="form-select form-select-sm" aria-label="Default select example" onChange={(e) => changeHandlerHotelList(e)}>
              <option value={0}>Выберите отель...</option>
              {allHotels.map((allHotels) => (
                <option key={allHotels._id.toString()} value={allHotels._id.toString()}>
                  {" "}
                  {allHotels.name.toString()}
                </option>
              ))}
            </select>
            <br />
            <div className="d-grid gap-2">
              <button className="btn btn-success btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#addHotelModal">
                Добавить отель
              </button>
              {isSelectHotel && (
                <button className="btn btn-primary btn-sm" type="button" onClick={() => updateHotelNow()}>
                  Сохранить отель
                </button>
              )}
            </div>

            {/* Модальное окно добавления нового отеля */}
            <AddHotel />
          </div>
        )}
        {/* Блок редактирования данных выбранного отеля */}
        {isSelectHotel && (
          <div className="col-lg-5">
            {/* ID выбранного отеля (отображается только для администратора) */}
            {isAdmin && (
              <div className="row">
                <div className="col-sm-3">
                  <label className="form-label form-control-sm">ID:</label>
                </div>
                <div className="col-sm-9">
                  <label className="form-label form-control-sm">{idSelectHotel}</label>
                </div>
              </div>
            )}

            {/* Менеджер выбранного отеля (отображается только для администратора) */}
            {isAdmin && (
              <div className="row">
                <div className="col-sm-3">
                  <label className="form-label form-control-sm">Менеджер:</label>
                </div>
                <div className="col-sm-9">
                  <select className="form-select form-select-sm" aria-label="Default select example" value={idManagerSelectHotelNew} onChange={(e) => changeHandlerManagerList(e)}>
                    <option value={0}>Выберите менеджера...</option>
                    {allUsers.map((allUsers) => (
                      <option key={allUsers._id.toString()} value={allUsers._id.toString()}>
                        {" "}
                        {allUsers.name.toString()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Название выбранного отеля */}
            <div className="row">
              <div className="col-sm-3">
                <label className="form-label form-control-sm">Название:</label>
              </div>
              <div className="col-sm-9">
                <Input className="form-control form-control-sm" value={nameSelectHotelNew} setValue={setNameSelectHotelNew} placeholder="Введите Название..." />
              </div>
            </div>

            {/* Описание выбранного отеля */}
            <div className="row">
              <div className="col-sm-3">
                <label className="form-label form-control-sm">Описание:</label>
              </div>
              <div className="col-sm-9">
                <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalEditDescription">
                  Редактировать
                </button>
                <div className="modal fade" id="modalEditDescription" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Описание отеля {nameSelectHotelNew}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <TextEditor setValue={setDescriptionSelectHotelNew} initialValue={descriptionSelectHotel} />
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => updateHotelNow()}>
                          Сохранить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Блок вывода предпросмотра описания карточки отеля */}
        {isSelectHotel && (
          <div className="col-lg-5">
            Предпросмотр описания отеля:
            <br />
            <br />
            <h3>{nameSelectHotelNew}</h3>
            <br />
            <div dangerouslySetInnerHTML={{ __html: descriptionSelectHotelNew }} />
          </div>
        )}
      </div>

      {/* {isSelectHotel && <RoomEditor id_hotel={currentIDHotel} name_hotel={nameHotelNew} />} */}
    </div>
  );
};

export default HotelEditor;
