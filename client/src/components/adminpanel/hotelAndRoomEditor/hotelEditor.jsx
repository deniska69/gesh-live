import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allUsers } from "../../../actions/users";

const HotelEditor = (props) => {
  const dispatch = useDispatch();

  const isAdmin = useSelector((state) => state.user.isAdmin); //Получаем из редюсера значение: является лиавторизованный пользователь администратором или нет
  const managersList = useSelector((state) => state.user.listUsers); //Получаем из редюсера список пользователей (в данном случае только с уровнем доступа 3 - "Менеджер отеля")

  //Функция загрузки данных одного отеля
  useEffect(() => {
    dispatch(allUsers(3)); //Вызов функции загрузки списка всех пользователей с уровнем доступа 3 ("Менеджер отеля")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  // Функция выбора менеджера из выпадающего списка
  function selectManagerFromTheList(e) {
    if (e.target.value !== 0) {
      //Получаем данные менеджера из переменной, хранящей список  менеджеров
      managersList.reduce((res, note) => {
        if (note._id === e.target.value) {
          return props.setValue({ ...props.value, id_manager: e.target.value }); //Записываем ID выбранного менеджера
        } else {
          return res;
        }
      }, {});
    } else {
      props.setValue({ ...props.value, id_manager: "" }); //Заносим пустое значение в переменную отвечающую за хранение нового значения id менеджера
    }
  }

  return (
    <div className="col-lg-5">
      {/* Блок отображающийся только для администраторов */}
      {isAdmin && (
        <div className="alert alert-warning" role="alert">
          {/* ID отеля */}
          <div className="row">
            <div className="col-sm-3">
              <label className="form-label form-control-sm">ID:</label>
            </div>
            <div className="col-sm-9">
              <label className="form-label form-control-sm">{props.value._id}</label>
            </div>
          </div>
          {/* Менеджер отеля */}
          <div className="row">
            <div className="col-sm-3">
              <label className="form-label form-control-sm">Менеджер:</label>
            </div>
            <div className="col-sm-9">
              <select className="form-select form-select-sm" aria-label="Default select example" value={props.value.id_manager} onChange={(e) => selectManagerFromTheList(e)}>
                <option value={0}>Выберите менеджера...</option>
                {managersList.map((managers) => (
                  <option key={managers._id.toString()} value={managers._id.toString()}>
                    {" "}
                    {managers.name.toString()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* URL выбранного отеля */}
          <div className="row">
            <div className="col-sm-3">
              <label className="form-label form-control-sm">Ссылка:</label>
            </div>
            <div className="col-sm-9">
              <input className="form-control form-control-sm" value={props.value.url} onChange={(e) => props.setValue({ ...props.value, url: e.target.value })} placeholder="Введите Ссылку..." />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelEditor;
