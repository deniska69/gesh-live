import React from 'react';
import TextEditor from '../../../utils/input/TextEditor';

const HotelDescription = props => {
  //Функция изменения описания отеля в state-переменной родителя
  function updateDescription(value) {
    props.setValue({ ...props.value, description: value });
  }

  return (
    <div className="row">
      <div className="col-sm-3">
        <label className="form-label form-control-sm">Описание:</label>
      </div>
      <div className="col-sm-9">
        <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalEditDescriptionHotel">
          Редактировать
        </button>
      </div>

      {/* Модальное окно с редактором описания отеля */}
      <div className="modal fade" id="modalEditDescriptionHotel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Описание отеля "{props.value.name}"
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <TextEditor value={props.value.description} setValue={updateDescription} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                Отмена
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => props.updateHotelNow()}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDescription;
