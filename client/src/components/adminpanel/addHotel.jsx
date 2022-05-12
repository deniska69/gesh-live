import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../utils/input/Input";
import { allUser } from "../../actions/users";
import { addHotel } from "../../actions/hotels";

const AddHotel = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.listUsers); //Получаем из редюсера список пользователей
  const [nameHotel, setNameHotel] = useState(""); //Название отеля
  const [idManager, setIdManager] = useState(""); //ID выбранного менеджера

  //Функция загрузки списка пользователей с уровнем доступа 3 (Менеджеры отелей)
  useEffect(() => {
    dispatch(allUser(3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Функция выбора пользователя из выпадающего списка
  function changeHandlerManagerList(e) {
    /* eslint eqeqeq: 0 */
    //Получаем данные пользователя из редюсера, хранящего всех пользователей
    allUsers.reduce((res, note) => {
      if (note._id === e.target.value) {
        setIdManager(note._id); //Получаем ID выбранного пользователя
        // eslint-disable-next-line
        return;
      } else {
        return res;
      }
    }, {});
  }

  //Функция отправки запроса добавления нового отеля
  function addHotelNow() {
    addHotel(nameHotel, idManager);
  }

  return (
    <div className="modal fade" id="addHotelModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel">
              Добавление нового отеля:
            </h6>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-3">
                <label className="form-label form-control-sm">Название:</label>
              </div>
              <div className="col-sm-9">
                <Input className="form-control form-control-sm" value={nameHotel} setValue={setNameHotel} placeholder="Введите Название..." />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-3">
                <label className="form-label form-control-sm">Менеджер:</label>
              </div>
              <div className="col-sm-9">
                <select className="form-select form-select-sm" aria-label="Default select example" onChange={(e) => changeHandlerManagerList(e)}>
                  <option value={0}>Выберите пользователя...</option>
                  {allUsers.map((allUsers) => (
                    <option key={allUsers._id.toString()} value={allUsers._id.toString()}>
                      {" "}
                      {allUsers.name.toString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <div className="d-grid gap-2 d-md-blockr overflow-hidden">
              <button className="btn btn-primary btn-sm" type="button" id="button_auth" onClick={() => addHotelNow()}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotel;
