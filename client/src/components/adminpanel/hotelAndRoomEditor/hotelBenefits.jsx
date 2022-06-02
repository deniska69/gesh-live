import React, { useState, useEffect } from 'react';
import { Trash3Fill, PlusSquareDotted } from 'react-bootstrap-icons';

const HotelBenefits = props => {
  const [benefits, setBenefits] = useState(props.value.benefits); //Список преимуществ выбранного отеля

  //Отслеживаем изменения в props
  useEffect(() => {
    setBenefits(props.value.benefits); //Обновляем state-переменную, в которой хранится из которой выводится список преимуществ отеля на страницу
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value.benefits]);

  //Функция добавления новых преимуществ в список в модальном окне
  function addBenefitsToArray() {
    props.setValue({ ...props.value, benefits: [...benefits, { title: '', description: '' }] });
  }

  //Функция обработки изменений в названиях преимуществ отеля
  function benefitsChangeTitle(e, index) {
    props.setValue({ ...props.value, benefits: benefits.map((benefits, i) => (index === i ? { ...benefits, title: e.target.value } : benefits)) });
  }

  //Функция обработки изменений в описании преимуществ отеля
  function benefitsChangeDescription(e, index) {
    props.setValue({ ...props.value, benefits: benefits.map((benefits, i) => (index === i ? { ...benefits, description: e.target.value } : benefits)) });
  }

  //Функция удаления преимуществ из списка в модальном окне
  function removeBenefitsFromArray(index) {
    props.setValue({ ...props.value, benefits: benefits.filter((_, i) => i !== index) });
  }

  return (
    <div className="row">
      <div className="col-sm-3">
        <label className="form-label form-control-sm">Преимущества:</label>
      </div>
      <div className="col-sm-9">
        <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalEditBenefits">
          Редактировать
        </button>
      </div>

      {/* Модальное окно с редактором преимуществ отеля */}
      <div className="modal fade" id="modalEditBenefits" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Преимущества отеля "{props.value.name}" ({benefits ? benefits.length : '0'} из 10)
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="col-12">
                {benefits.map((item, index) => (
                  <div className="row bottom_line_benefits" id={'roweBenefits' + index} key={index}>
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
                            value={item.title}
                            onChange={e => benefitsChangeTitle(e, index)}
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
                            value={item.description}
                            onChange={e => benefitsChangeDescription(e, index)}
                            placeholder="Введите описание преимущества..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-1 text-center benefitsBtnDelete">
                      <button id={'btnBenefitsEdit' + index} type="button" className="btn btn-sm btn-danger" onClick={() => removeBenefitsFromArray(index)}>
                        <Trash3Fill color="white" />
                      </button>
                    </div>
                  </div>
                ))}
                <br />
                {benefits.length < 10 && (
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

export default HotelBenefits;
