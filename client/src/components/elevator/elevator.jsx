import React from 'react';
import './elevator.css';
import imgElevator from '../../assets/img/elevator/elevator.png';

const Elevator = () => {
  return (
    <div className="card" id="card_elevator">
      <br />
      <div className="container">
        <div className="row">
          <div className="col-5">
            <div className="container">
              <img src={imgElevator} className="img-fluid" alt="Горнолыжная школа Ski-Country"></img>
            </div>
            <br />
            <h5 className="text-center">Телефон: 8-905-078-1818</h5>
          </div>
          <div className="col-7">
            <h5>Стоимость занятия с инструктором</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Время и количество человек</th>
                  <th scope="col">Стоимость</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 час индивидуально</td>
                  <td>2000 рублей</td>
                </tr>
                <tr>
                  <td>1 час два человека</td>
                  <td>по 1800 рублей каждый</td>
                </tr>
                <tr>
                  <td>1 час три человека</td>
                  <td>по 1500 рублей каждый</td>
                </tr>
                <tr>
                  <td>1 час четыре человека и более</td>
                  <td>по 1200 рублей каждый</td>
                </tr>
              </tbody>
            </table>
            <small className="text-muted">
              Обучение детей катанию на горных лыжах с 3-х лет, на сноуборде с 6-ти лет. Индивидуальные и групповые занятия с инструктором для начинающих и опытных райдеров.
              Все цены указаны в рублях.
            </small>
          </div>
        </div>

        <br />
        <div className="row">
          <div className="col-5">
            <h5>Цены на прокат инвентаря</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Время</th>
                  <th scope="col">Цена за комплект</th>
                  <th scope="col">Лыжи / сноуборд</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1-4 часа</td>
                  <td>400</td>
                  <td>200 / 200</td>
                </tr>
                <tr>
                  <td>4-8 часов</td>
                  <td>500</td>
                  <td>250 / 250</td>
                </tr>
              </tbody>
            </table>
            <small className="text-muted">
              Указаны самые низкие цены по Шерегешу. В поселке стоимость начинается от 500 руб за комплект и доходит до 1500 руб на горе Зеленая.
            </small>
          </div>
          <div className="col-7">
            <h5>Цены на прокат аксессуаров</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Время</th>
                  <th scope="col">Очки</th>
                  <th scope="col">Перчатки</th>
                  <th scope="col">Шлем</th>
                  <th scope="col">Куртка</th>
                  <th scope="col">Штаны</th>
                  <th scope="col">Комбинезон</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 день</td>
                  <td>200</td>
                  <td>200</td>
                  <td>200</td>
                  <td>200</td>
                  <td>200</td>
                  <td>200</td>
                </tr>
              </tbody>
            </table>
            <small className="text-muted">Размеры: ботинки лыжные от 15 до 47; ботинки сноубордические от 31 до 46; одежда 44-54.</small>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="field-item even">
            <p>
              <strong>
                <span>Ваш Прокат</span>:
              </strong>{' '}
              Шерегеш, ул. Весенняя, 24. Тел. 8-913-139-87-27
            </p>
            <p>
              <span>
                <strong>Райдер</strong>:
              </span>{' '}
              "У шлагбаума", ул. Снежная, 20; "Приют райдера", ул. Снежная, 45; "Доска", ул. Снежная, 36. Тел. 8-929-300-00-07
            </p>
            <p>
              <strong>
                <span>ТОП прокат</span>
              </strong>
              : ул. Весенняя, 28; ул. Советская, 15Б; прокат в гостинице Ольга. Тел. 8-923-526-11-11
            </p>
            <p>
              <span>
                <strong>Фристайл</strong>:
              </span>{' '}
              ул. Снежная.
            </p>
            <p>
              <span>
                <strong>Снаряга</strong>:
              </span>{' '}
              ул. Гагарина, 4. Тел. 8-905-066-98-22
            </p>
            <p>
              <span>
                <strong>SkiHouse</strong>:
              </span>{' '}
              ул. Снежная. Тел. 8-905-907-51-56
            </p>
            <p>
              <span>
                <strong>Старт</strong>:
              </span>{' '}
              ул. Весенняя, 21Б; ул. Спортивная, 19; ул. Туристическая, 11; ул. Снежная, 44/1. Тел. 8-800-500-67-51
            </p>
            <p>
              <span>
                <strong>Лыжная База</strong>:
              </span>{' '}
              Шерегеш, ул. Дзержинского, 17. Тел. 8-913-288-13-24
            </p>
            <p>
              <span>
                <strong>Легенда</strong>:
              </span>{' '}
              ул. Снежная, 8/2. Тел. 8-995-443-9595
            </p>
            <p>
              <span>
                <strong>Сектор Е</strong>:
              </span>{' '}
              тел. 8-800-550-3919
            </p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Elevator;
