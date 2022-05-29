import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../../utils/input/Input";
import TextEditor from "../../../utils/input/TextEditor";
import { allHotel, updateHotel, uploadHotelsGallery, deleteHotelsGallery, setOneHotelFrom_AllHotels } from "../../../actions/hotels";
import AddHotel from "./addHotel";
import { allUsers } from "../../../actions/users";
import { toastView } from "../../App";
// eslint-disable-next-line
import RoomEditor from "./roomEditor";
import { Trash3Fill, PlusSquareDotted, CloudArrowUpFill, XCircleFill } from "react-bootstrap-icons";
import { API_URL } from "../../../config";
import imageError from "../../../assets/img/error.png";

const HotelAndRoomEditor = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user.isAdmin); //Получаем из редюсера значение, авторизованный пользователь администратор или нет
  const allHotels = useSelector((state) => state.hotel.listHotels); //Получаем из редюсера список отелей
  const allUsers = useSelector((state) => state.user.listUsers); //Получаем из редюсера список пользователей (в данном случае будем дальше выбирать только менеджеров)
  const oneHotel = useSelector((state) => state.hotel.oneHotel); //

  //Профиль выбранного отеля
  const [isSelectHotel, setIsSelectHotel] = useState(false); //Выбран ли какой-либо отель из спика
  const [idSelectHotel, setIdSelectHotel] = useState("0"); //ID выбранного отеля
  const [nameSelectHotel, setNameSelectHotel] = useState(""); //Название выбранного отеля
  const [descriptionSelectHotel, setDescriptionSelectHotel] = useState(""); //Описание выбранного отеля
  const [idManagerSelectHotel, setIdManagerSelectHotel] = useState(""); //ID менеджера выбранного отеля
  const [urlSelectHotel, setURLSelectHotel] = useState(""); //URL выбранного отеля
  const [benefitsSelectHotel, setBenefitsSelectHotel] = useState([]); //Список преимуществ выбранного отеля
  const [gallerySelectHotel, setGallerySelectHotel] = useState([]); //Галерея выбранного отеля

  //Обновлённые данные профиля отеля
  const [nameSelectHotelNew, setNameSelectHotelNew] = useState(""); //Новое название выбранного отеля
  const [descriptionSelectHotelNew, setDescriptionSelectHotelNew] = useState(""); //Новое описание выбранного отеля
  const [idManagerSelectHotelNew, setIdManagerSelectHotelNew] = useState(""); //Новый ID менеджера выбранного отеля
  const [urlSelectHotelNew, setURLSelectHotelNew] = useState(""); //Новый URL выбранного отеля
  const [benefitsSelectHotelNew, setBenefitsSelectHotelNew] = useState([]); //Новый список преимуществ выбранного отеля

  //Функция загрузки списка отелей и списка пользователей с уровенем доступа "Менеджер отеля"
  useEffect(() => {
    dispatch(allHotel()); //Вызов функции загрузки списка всех отелей
    dispatch(allUsers(3)); //Вызов функции загрузски списка всех пользователей с уровнем доступа 3 ("Менеджер отеля")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Функция обработки выбора отеля из выпадающего списка
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
    console.log(id);
    dispatch(setOneHotelFrom_AllHotels(id));
    console.log(oneHotel);

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

        setGallerySelectHotel([...note.gallery]); //Получаем галерею отеля
        //setGallerySelectHotelNew([...note.gallery]); //Получаем галерею отеля

        // eslint-disable-next-line
        return;
      } else {
        return res;
      }
    }, {});
  }

  //Функция обновления данных выбранного отеля
  function updateHotelNow() {
    //Если выбран како-либо отель из спика
    if (isSelectHotel) {
      // if (nameSelectHotel !== nameSelectHotelNew) {
      //   console.log("nameSelectHotel", nameSelectHotel);
      //   console.log("nameSelectHotelNew", nameSelectHotelNew);
      // }

      // if (descriptionSelectHotel !== descriptionSelectHotelNew) {
      //   console.log("descriptionSelectHotel", descriptionSelectHotel);
      //   console.log("descriptionSelectHotelNew", descriptionSelectHotelNew);
      // }

      // if (idManagerSelectHotel !== idManagerSelectHotelNew) {
      //   console.log("idManagerSelectHotel", idManagerSelectHotel);
      //   console.log("idManagerSelectHotelNew", idManagerSelectHotelNew);
      // }

      // if (urlSelectHotel !== urlSelectHotelNew) {
      //   console.log("urlSelectHotel", urlSelectHotel);
      //   console.log("urlSelectHotelNew", urlSelectHotelNew);
      // }

      // if (benefitsSelectHotel !== benefitsSelectHotelNew) {
      //   console.log("benefitsSelectHotel", benefitsSelectHotel);
      //   console.log("benefitsSelectHotelNew", benefitsSelectHotelNew);
      // }

      //Если никакие данные не были измененны
      if (
        nameSelectHotel === nameSelectHotelNew &&
        descriptionSelectHotel === descriptionSelectHotelNew &&
        idManagerSelectHotel === idManagerSelectHotelNew &&
        urlSelectHotel === urlSelectHotelNew &&
        benefitsSelectHotel === benefitsSelectHotelNew
      ) {
        return toastView("warning", "Никакие данные не были изменены.");
      } else {
        if (urlSelectHotelNew != "") {
          //Вызываем функцию обновления данных отеля
          dispatch(updateHotel(idSelectHotel, nameSelectHotelNew, descriptionSelectHotelNew, idManagerSelectHotelNew, urlSelectHotelNew, benefitsSelectHotelNew));

          setNameSelectHotel(nameSelectHotelNew);
          setDescriptionSelectHotel(descriptionSelectHotelNew);
          setIdManagerSelectHotel(idManagerSelectHotelNew);
          setURLSelectHotel(urlSelectHotelNew);
          setBenefitsSelectHotel(benefitsSelectHotelNew);
        } else {
          return toastView("error", "Необходимо ввести ссылку!");
        }
      }
    } else {
      toastView("warning", "Необходимо выбрать отель!");
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

  /// ----- Преимущества отеля ----- ///

  //Функция принудительного присваивания текуших преимуществ в переменную храняющую новые значения
  function assignmentBenefitsToNewArray() {
    setBenefitsSelectHotelNew(benefitsSelectHotel);
  }

  //Функция добавления новых преимуществ в список в модальном окне
  function addBenefitsToArray() {
    setBenefitsSelectHotelNew([
      ...benefitsSelectHotelNew,
      {
        title: "",
        description: "",
      },
    ]);
  }

  //Функция удаления преимуществ из списка в модальном окне
  function removeBenefitsFromArray(index) {
    setBenefitsSelectHotelNew([...benefitsSelectHotelNew.filter((_, i) => i != index)]);
  }

  //Функция обработки изменений в названиях преимуществ отеля
  function benefitsChangeTitle(e, index) {
    setBenefitsSelectHotelNew(benefitsSelectHotelNew.map((benefits, i) => (index === i ? { ...benefits, title: e.target.value } : benefits)));
  }

  //Функция обработки изменений в описании преимуществ отеля
  function benefitsChangeDescription(e, index) {
    setBenefitsSelectHotelNew(benefitsSelectHotelNew.map((benefits, i) => (index === i ? { ...benefits, description: e.target.value } : benefits)));
  }

  /// ----- Галерея отеля ----- ///

  //Обработка нажатия кнопки "Выбрать изображение" >> ручная инициализация элемента <Input> через вызов метода click()
  function selectGalleryShow() {
    //Получаем доступ к Input-элементу
    const fileInput = document.getElementById("btnSelectGalleryHide");

    //Вручную инициализируем нажатие по элементу
    fileInput.click();
  }

  //Функция добавления новых изображений в галерею отеля
  function addGalleryToArray(e) {
    const files = e.target.files;
    const filesVerified = [];

    if (files.length > 10 || gallerySelectHotel.length + files.length > 10) {
      return toastView("error", "Загрузить можно не более 10 изображений.");
    }

    for (const file of files) {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        filesVerified.push(file);
      } else {
        toastView("error", `Файл "${file.name}" не является изображением (или подходящим изображением) и не будет загружен."`);
      }
    }

    dispatch(uploadHotelsGallery(idSelectHotel, filesVerified));

    e.target.value = "";
  }

  //Функция удаления одного изображений из галереи отеля
  function removeGalleryFromArray(nameImage) {
    const listNameImages = [{ image: nameImage }];
    dispatch(deleteHotelsGallery(idSelectHotel, listNameImages));

    setGallerySelectHotel([...gallerySelectHotel.filter((item) => item.image !== nameImage)]);
  }

  //Функция удаления всех изображений из галереи отеля
  function removeAllGalleryFromArray() {
    const imageList = [];

    for (const image of gallerySelectHotel) {
      imageList.push({ image: image.image });
    }
    dispatch(deleteHotelsGallery(idSelectHotel, imageList));

    setGallerySelectHotel([]);
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
              {isSelectHotel && (
                <button className="btn btn-primary btn-sm" type="button" onClick={() => console.log(oneHotel)}>
                  console.log(oneHotel)
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
            {/* Блок отображающийся только для администраторов */}
            {isAdmin && (
              <div className="alert alert-warning" role="alert">
                {/* ID выбранного отеля */}
                <div className="row">
                  <div className="col-sm-3">
                    <label className="form-label form-control-sm">ID:</label>
                  </div>
                  <div className="col-sm-9">
                    <label className="form-label form-control-sm">{idSelectHotel}</label>
                  </div>
                </div>
                {/* Менеджер выбранного отеля */}
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
                {/* URL выбранного отеля */}
                <div className="row">
                  <div className="col-sm-3">
                    <label className="form-label form-control-sm">Ссылка:</label>
                  </div>
                  <div className="col-sm-9">
                    <Input className="form-control form-control-sm" value={urlSelectHotelNew} setValue={setURLSelectHotelNew} placeholder="Введите Ссылку..." />
                  </div>
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
              </div>
            </div>

            {/* Преимущества выбранного отеля */}
            <div className="row">
              <div className="col-sm-3">
                <label className="form-label form-control-sm">Преимущества:</label>
              </div>
              <div className="col-sm-9">
                <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalEditBenefits" onClick={() => assignmentBenefitsToNewArray()}>
                  Редактировать
                </button>
              </div>
            </div>

            {/* Галерея выбранного отеля */}
            <div className="row">
              <div className="col-sm-3">
                <label className="form-label form-control-sm">Галерея:</label>
              </div>
              <div className="col-sm-9">
                <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalEditGallery">
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
                <div className="col-12">
                  {benefitsSelectHotelNew.map((benefitsSelectHotelNew, index) => (
                    <div className="row bottom_line_benefits" id={"roweBenefits" + index} key={index}>
                      <div className="col-1 text-center align-middle benefitsNumber">
                        <h5>{index + 1}</h5>
                      </div>

                      <div className="col-10">
                        <div className="row">
                          <div className="col-sm-2">
                            <label className="form-label form-control-sm">Название:</label>
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={benefitsSelectHotelNew.title}
                              onChange={(e) => benefitsChangeTitle(e, index)}
                              placeholder="Введите название преимущества..."
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-2">
                            <label className="form-label form-control-sm">Описание:</label>
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={benefitsSelectHotelNew.description}
                              onChange={(e) => benefitsChangeDescription(e, index)}
                              placeholder="Введите описание преимущества..."
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-1 text-center benefitsBtnDelete">
                        <button id={"btnBenefitsEdit" + index} type="button" className="btn btn-sm btn-danger" onClick={() => removeBenefitsFromArray(index)}>
                          <Trash3Fill color="white" />
                        </button>
                      </div>
                    </div>
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
                <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                  Отмена
                </button>
                <button type="button" className="btn btn-primary btn-sm" data-bs-dismiss="modal" onClick={() => updateHotelNow()}>
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Модальное окно с редактором галереи отеля */}
        <div className="modal fade" id="modalEditGallery" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Галерея отеля {nameSelectHotelNew} ({gallerySelectHotel.length} из 10)
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="col-12">
                  <div className="row row-cols-auto">
                    {gallerySelectHotel.map((gallery, index) => (
                      <div className="col colGalleryItem" key={index}>
                        {/* // eslint-disable-next-line */}
                        <a href={`${API_URL + "\\hotels\\" + idSelectHotel + "\\gallery\\" + gallery.image}`} target="_blank" rel="noopener noreferrer">
                          <img
                            className="rounded border shadow galleryHotelPreview"
                            src={`${API_URL + "\\hotels\\" + idSelectHotel + "\\gallery\\" + gallery.image}`}
                            alt={gallery.image}
                            // eslint-disable-next-line
                            onError={(e) => ((e.target.onerror = null), (e.target.src = imageError))}
                          />
                        </a>
                        <XCircleFill size={25} className="iconBtnGalleryDelete" onClick={() => removeGalleryFromArray(gallery.image)} />
                      </div>
                    ))}
                  </div>
                  {gallerySelectHotel.length < 10 && (
                    <div>
                      <input id="btnSelectGalleryHide" accept=".jpg,.jpeg,.png" onChange={(e) => addGalleryToArray(e)} type="file" multiple />
                      <button type="button" className="btn btn-outline-primary btnBenefitsAddnew" onClick={() => selectGalleryShow()}>
                        <CloudArrowUpFill size={40} className="iconBtnBenefitsAddNew" /> (.JPG/.JPEG/.PNG)
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {gallerySelectHotel.length > 0 && (
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => console.log(allHotels)}>
                    console.log(allHotels)
                  </button>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeAllGalleryFromArray()}>
                    Удалить все изображения
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* {isSelectHotel && <RoomEditor id_hotel={currentIDHotel} name_hotel={nameHotelNew} />} */}
    </div>
  );
};

export default HotelAndRoomEditor;
