// eslint-disable-next-line
//import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import React, { useRef, useState, useMemo, useEffect } from 'react';
// eslint-disable-next-line
import TextEditor from '../../../utils/input/TextEditor';
// eslint-disable-next-line
import JoditEditor from 'jodit-react';

const HotelDescription = props => {
  //Функция
  function updateDescription(value) {
    props.setValue({ ...props.value, description: value });
  }

  return (
    <div className="row">
      <div className="col-sm-3">
        <label className="form-label form-control-sm">Описание:</label>
      </div>
      <div className="col-sm-9">
        <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalEditDescription">
          Редактировать
        </button>
      </div>

      {/* Модальное окно с редактором описания отеля */}
      <div className="modal fade" id="modalEditDescription" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Описание отеля {props.value.nameHotel}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <TextEditor value={props.value.description} setValue={updateDescription} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDescription;
