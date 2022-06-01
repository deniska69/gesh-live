import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { XCircleFill, CloudArrowUpFill } from 'react-bootstrap-icons';
import { API_URL } from '../../../config';
import imageError from '../../../assets/img/error.png';
import { uploadHotelsGallery, deleteHotelsGallery } from '../../../actions/hotels';
import { toastView } from '../../App';

const HotelGallery = props => {
  const dispatch = useDispatch(); //Определяем диспетчер

  const [gallery, setGallery] = useState(props.value.gallery); //Список изображений галереи отеля

  //Отслеживаем изменения в props
  useEffect(() => {
    setGallery(props.value.gallery); //Обновляем state-переменную, в которой хранится из которой выводится список изображений галереи оетля на страницу
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value.gallery]);

  //Обработка нажатия кнопки "Выбрать изображение" >> ручная инициализация элемента <Input> через вызов метода click()
  function selectGalleryShow() {
    //Получаем доступ к Input-элементу
    const fileInput = document.getElementById('btnSelectGalleryHide');

    //Вручную инициализируем нажатие по элементу
    fileInput.click();
  }

  //Функция добавления новых изображений в галерею отеля
  function addGalleryToArray(e) {
    const files = e.target.files; //Получаем список выбранных файлов из диалогового окна
    const filesVerified = []; //Создаём переменную, для проверенных файлов

    //Проверяем: не выбрано ли больше 10 файлов с учётом количества уже загруженых изображений в галерею отеля
    if (files.length > 10 || gallery.length + files.length > 10) {
      return toastView('error', 'Загрузить можно не более 10 изображений.');
    }

    //Проверяем: являются ли выбранные файлы подходящим нам изображением
    for (const file of files) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        filesVerified.push(file);
      } else {
        toastView('error', `Файл "${file.name}" не является изображением (или подходящим изображением) и не будет загружен."`);
      }
    }

    //Передаём список проверенных файлов в action загрузки изображений на сервер
    dispatch(uploadHotelsGallery(props.value._id, filesVerified));

    e.target.value = '';
  }

  //Функция удаления одного изображений из галереи отеля
  function removeGalleryFromArray(nameImage) {
    dispatch(deleteHotelsGallery(props.value._id, [{ image: nameImage }]));
  }

  //Функция удаления всех изображений из галереи отеля
  function removeAllGalleryFromArray() {
    const imageList = []; //Создаём переменную, для списка изображений на удаление

    //Помещаем все изображения в массив
    for (const image of gallery) {
      imageList.push({ image: image.image });
    }

    //Передаём список имён изображений в action удаления изображения с сервера
    dispatch(deleteHotelsGallery(props.value._id, imageList));
  }

  return (
    <div className="row">
      <div className="col-sm-3">
        <label className="form-label form-control-sm">Галерея:</label>
      </div>
      <div className="col-sm-9">
        <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalEditGallery">
          Редактировать
        </button>
      </div>

      {/* Модальное окно с редактором галереи отеля */}
      <div className="modal fade" id="modalEditGallery" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Галерея отеля {props.value.name} ({gallery ? gallery.length : '0'} из 10)
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="col-12">
                <div className="row row-cols-auto">
                  {gallery.map((item, index) => (
                    <div className="col colGalleryItem" key={index}>
                      {/* // eslint-disable-next-line */}
                      <a href={`${API_URL + '\\hotels\\' + props.value._id + '\\gallery\\' + item.image}`} target="_blank" rel="noopener noreferrer">
                        <img
                          className="rounded border shadow galleryHotelPreview"
                          src={`${API_URL + '\\hotels\\' + props.value._id + '\\gallery\\' + item.image}`}
                          alt={item.image}
                          // eslint-disable-next-line
                          onError={e => ((e.target.onerror = null), (e.target.src = imageError))}
                        />
                      </a>
                      <XCircleFill size={25} className="iconBtnGalleryDelete" onClick={() => removeGalleryFromArray(item.image)} />
                    </div>
                  ))}
                </div>
                {gallery.length < 10 && (
                  <div>
                    <input id="btnSelectGalleryHide" accept=".jpg,.jpeg,.png" onChange={e => addGalleryToArray(e)} type="file" multiple />
                    <button type="button" className="btn btn-outline-primary btnBenefitsAddnew" onClick={() => selectGalleryShow()}>
                      <CloudArrowUpFill size={40} className="iconBtnBenefitsAddNew" /> (.JPG/.JPEG/.PNG)
                    </button>
                  </div>
                )}
              </div>
            </div>
            {gallery.length > 0 && (
              <div className="modal-footer">
                <button type="button" className="btn btn-danger btn-sm" onClick={() => removeAllGalleryFromArray()}>
                  Удалить все изображения
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelGallery;
