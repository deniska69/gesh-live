import React, { useEffect, useState } from "react";
import Input from "../../utils/input/Input";
import { allEvents } from "../../actions/events";
import AddEvents from "./addEvents";
import { updateEvents } from "../../actions/events";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const EventsEditor = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const allEventslist = useSelector((state) => state.events.listEvents);

  const [isSelectEvents, setIsSelectEvents] = useState(false);
  const [currentIDEvents, setIDEvents] = useState("");
  const [currentText1Events, setCurrentText1Events] = useState("");
  const [currentText2Events, setCurrentText2Events] = useState("");
  const [currentDateEvents, setDateEvents] = useState("");

  useEffect(() => {
    dispatch(allEvents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateEventsNow() {
    if (isSelectEvents) {
      updateEvents(currentIDEvents, currentText1Events, currentText2Events, currentDateEvents);
    } else {
      alert("Необходимо выбрать событие!");
    }
  }

  function changeHandlerEventsList(e) {
    /* eslint eqeqeq: 0 */
    if (e.target.value != 0) {
      allEventslist.reduce((res, note) => {
        if (note._id === e.target.value) {
          // eslint-disable-next-line
          return setIsSelectEvents(true), setIDEvents(note._id), setCurrentText1Events(note.text1), setCurrentText2Events(note.text2), setDateEvents(note.date);
        } else {
          return res;
        }
      }, {});
    } else {
      setIsSelectEvents(false);
    }
  }

  return (
    <div className="col-lg-6">
      <div className="row align-item-start">
        {/* Выбор новости */}
        <div className="col-lg-6">
          <label className="form-label otstupSelect">Отступ</label>
          <select className="form-select" aria-label="Default select example" onChange={(e) => changeHandlerEventsList(e)}>
            <option value={0}>Выберите событие...</option>
            {allEventslist.map((allEventslist) => (
              <option key={allEventslist._id.toString()} value={allEventslist._id.toString()}>
                {" "}
                {allEventslist.text1.toString()}
              </option>
            ))}
          </select>
          <br />
          <br />
          <div className="d-grid gap-2">
            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#addEventsModal">
              Добавить новое событие
            </button>
          </div>

          {/* Модальное окно добавления нового отеля */}
          <AddEvents />
        </div>

        {/* Редактор новости */}
        {isSelectEvents && (
          <div className="col-lg-6">
            <div className="mb-3">
              <label className="form-label">Заголовок:</label>
              <Input className="form-control" value={currentText1Events} setValue={setCurrentText1Events} type="text" />
            </div>
            <div className="mb-3">
              <label className="form-label">Описание:</label>
              {/* <Input value={descriptionHotelNew} setValue={setDescriptionHotel} type="text"  rows="3"/> */}
              <textarea className="form-control" rows="3" value={currentText2Events} setValue={setCurrentText2Events} />
            </div>
            <div className="mb-3">
              <label className="form-label">Доп.текст:</label>
              <Input className="form-control" value={currentDateEvents} setValue={setDateEvents} type="text" />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-primary" onClick={() => updateEventsNow()}>
                Сохранить событие
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsEditor;
