import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../utils/input/Input";
import TextEditor from "../../utils/input/TextEditor";
import { allHotel, updateHotel } from "../../actions/hotels";
import AddHotel from "./addHotel";
import { allUser } from "../../actions/users";
import { toastView } from "../App";
// eslint-disable-next-line
import RoomEditor from "./roomEditor";
// eslint-disable-next-line
import { Check2Circle, PencilFill, Trash3Fill, CheckLg, PlusSquareDotted } from "react-bootstrap-icons";

const HotelEditor = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user.isAdmin); //Получаем из редюсера значение, авторизованный пользователь администратор или нет
  const allHotels = useSelector((state) => state.hotel.listHotels); //Получаем из редюсера список отелей
  const allUsers = useSelector((state) => state.user.listUsers); //Получаем из редюсера список пользователей (в данном случае будем дальше выбирать только менеджеров)

  //Профиль выбранного отеля
  const [isSelectHotel, setIsSelectHotel] = useState(false); //Выбран ли какой-либо отель из спика
  const [idSelectHotel, setIdSelectHotel] = useState("0"); //ID выбранного отеля
  const [nameSelectHotel, setNameSelectHotel] = useState(""); //Название выбранного отеля
  const [descriptionSelectHotel, setDescriptionSelectHotel] = useState(""); //Описание выбранного отеля
  const [idManagerSelectHotel, setIdManagerSelectHotel] = useState(""); //ID менеджера выбранного отеля
  const [urlSelectHotel, setURLSelectHotel] = useState(""); //URL выбранного отеля

  //Обновлённые данные профиля отеля
  const [nameSelectHotelNew, setNameSelectHotelNew] = useState(""); //Новое название выбранного отеля
  const [descriptionSelectHotelNew, setDescriptionSelectHotelNew] = useState(""); //Новое описание выбранного отеля
  const [idManagerSelectHotelNew, setIdManagerSelectHotelNew] = useState(""); //Новый ID менеджера выбранного отеля
  const [urlSelectHotelNew, setURLSelectHotelNew] = useState(""); //Новый URL выбранного отеля

  // eslint-disable-next-line
  const [benefitsSelectHotel, setBenefitsSelectHotel] = useState([]); //Список преимуществ выбранного отеля
  const [benefitsSelectHotelNew, setBenefitsSelectHotelNew] = useState([]); //новый список преимуществ выбранного отеля

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
      if (nameSelectHotel === nameSelectHotelNew && descriptionSelectHotel === descriptionSelectHotelNew && idManagerSelectHotel === idManagerSelectHotelNew && urlSelectHotel === urlSelectHotelNew) {
        return toastView("warning", "Никакие данные не были изменены.");
      } else {
        if (urlSelectHotelNew != "") {
          //Вызываем функцию обновления данных отеля
          dispatch(updateHotel(idSelectHotel, nameSelectHotelNew, descriptionSelectHotelNew, idManagerSelectHotelNew, urlSelectHotelNew));

          // setNameSelectHotel(nameSelectHotelNew);
          // setNameSelectHotelNew(nameSelectHotelNew);

          // setDescriptionSelectHotel(descriptionSelectHotelNew);
          // setDescriptionSelectHotelNew(descriptionSelectHotelNew);

          // setIdManagerSelectHotel(idManagerSelectHotelNew);
          // setIdManagerSelectHotelNew(idManagerSelectHotelNew);

          // setURLSelectHotel(urlSelectHotelNew);
          // setURLSelectHotelNew(urlSelectHotelNew);

          selectHotel(idSelectHotel);
        } else {
          return toastView("error", "Необходимо ввести ссылку!");
        }
      }
    } else {
      toastView("warning", "Необходимо выбрать отель!");
    }
  }

  //Функция обаботки выбора отеля из выпадающего списка
  function changeHandlerHotelList(e) {
    setIsSelectHotel(false); //Предварительно сбрасываем выбор отеля из списка

    /* eslint eqeqeq: 0 */
    if (e.target.value != 0) {
      selectHotel(e.target.value); //Вызов функции вывода данных отеля на страницу
      setIsSelectHotel(true); //Подтверждаем выбор отеля из списка
    } else {
      setIsSelectHotel(false); //Сбрасываем выбор отеля из списка
    }
  }

  //Функция выбора отеля >> вывод данных отеля на страницу
  function selectHotel(id) {
    allHotels.reduce((res, note) => {
      if (note._id === id) {
        setIdSelectHotel(note._id); //Получаем ID отеля

        setNameSelectHotel(note.name); //Получаем Название отеля
        setNameSelectHotelNew(note.name); //Получаем Название отеля

        setDescriptionSelectHotel(note.description); //Получаем Описание отеля
        setDescriptionSelectHotelNew(note.description); //Получаем Описание отеля

        setIdManagerSelectHotel(note.id_manager); //Получаем ID менеджера отеля
        setIdManagerSelectHotelNew(note.id_manager); //Получаем ID менеджера отеля

        setURLSelectHotel(note.url); //Получаем URL отеля
        setURLSelectHotelNew(note.url); //Получаем URL отеля

        setBenefitsSelectHotel([...note.benefits]); //Получаем преимущества отеля
        setBenefitsSelectHotelNew([...note.benefits]); //Получаем преимущества отеля

        // eslint-disable-next-line
        return;
      } else {
        return res;
      }
    }, {});
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

  //Функция добавления новых преимуществ в список в модальном окне
  function addBenefitsToArray() {
    setBenefitsSelectHotelNew([
      ...benefitsSelectHotelNew,
      {
        title: "Название",
        description: "Описание",
      },
    ]);
  }

  //Функция удаления преимуществ из списка в модальном окне
  function removeBenefitsFromArray(index) {
    setBenefitsSelectHotelNew([...benefitsSelectHotelNew.filter((_, i) => i != index)]);
  }

  function _test() {
    console.log(benefitsSelectHotelNew);
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
              {isSelectHotel && (
                <a className="btn btn-warning btn-sm" href={`/hotels/${urlSelectHotel}`} role="button" target="_blank" rel="noopener noreferrer">
                  Открыть страницу
                </a>
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

            {/* URL выбранного отеля */}
            <div className="row">
              <div className="col-sm-3">
                <label className="form-label form-control-sm">Ссылка:</label>
              </div>
              <div className="col-sm-9">
                <Input className="form-control form-control-sm" value={urlSelectHotelNew} setValue={setURLSelectHotelNew} placeholder="Введите Ссылку..." />
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
              </div>
            </div>

            {/* Преимущества выбранного отеля */}
            <div className="row">
              <div className="col-sm-3">
                <label className="form-label form-control-sm">Преимущества:</label>
              </div>
              <div className="col-sm-9">
                <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalEditBenefits">
                  Редактировать
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Модальное окно с редактором описания отеля */}
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

        {/* Модальное окно с редактором преимуществ отеля */}
        <div className="modal fade" id="modalEditBenefits" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Преимущества отеля {nameSelectHotelNew} ({benefitsSelectHotelNew.length} из 10)
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="col-8">
                  {benefitsSelectHotelNew.map((benefitsSelectHotelNew, index) => (
                    <table id={"tableBenefitsHeader" + index} key={index}>
                      <tbody>
                        <tr>
                          <td id="tdBenefitsIcon" rowSpan="2">
                            <Check2Circle color="#0daff2" size={40} />
                          </td>
                          <td id="tdBenefitsHeader">{benefitsSelectHotelNew.title}</td>
                          <td id="tdBenefitsBtnEdit" rowSpan="2">
                            <button id={"btnBenefitsEdit" + index} type="button" className="btn btn-sm btn-warning ">
                              <PencilFill color="white" />
                            </button>
                          </td>
                          <td id="tdBenefitsBtnCheck" rowSpan="2">
                            <button id={"btnBenefitsComplete" + index} type="button" className="btn btn-sm btn-success" disabled>
                              <CheckLg color="white" />
                            </button>
                          </td>
                          <td id="tdBenefitsBtnDelete" rowSpan="2">
                            <button id={"btnBenefitsEdit" + index} type="button" className="btn btn-sm btn-danger" onClick={() => removeBenefitsFromArray(index)}>
                              <Trash3Fill color="white" />
                            </button>
                          </td>
                        </tr>
                        <tr id="trBenefitsBottom">
                          <td id="tdBenefitsText">{benefitsSelectHotelNew.description}</td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
                  <br />
                  {benefitsSelectHotelNew.length < 10 && (
                    <button type="button" className="btn btn-outline-primary btnBenefitsAddnew" onClick={() => addBenefitsToArray()}>
                      <PlusSquareDotted size={40} className="iconBtnBenefitsAddNew" />
                    </button>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => _test()}>
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {isSelectHotel && <RoomEditor id_hotel={currentIDHotel} name_hotel={nameHotelNew} />} */}
    </div>
  );
};

export default HotelEditor;
