import React from 'react';

const StatusBooking = (props) => {

    const status = props.status

    // eslint-disable-next-line
    if (status == 0) {
        return (
            <div className="row">
                <div className="col-sm-7">
                    <p className="text-primary"><b>Статус бронирования: На подтверждении</b></p>
                </div>
                <div className="col-sm-1">
                    <div className="spinner-border text-primary spinner-border-sm" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </div>
                </div>
            </div>
        )
    }

    // eslint-disable-next-line
    if(status == 1) {
        return (
            <p className="text-danger"><b>Статус бронирования: Отказано отелем</b></p>
        )
    }

    // eslint-disable-next-line
    if(status == 2) {
        return(
            <p className="text-success"><b>Статус бронирования: Подтверждено отелем</b></p>
        )
    }

};

export default StatusBooking;