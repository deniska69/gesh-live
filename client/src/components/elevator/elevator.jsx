import React from "react";
import "./elevator.css";
import imgElevator from "../../assets/img/elevator/elevator.jpg";

const Elevator = () => {
  return (
    <div className="card" id="card_cabinet">
      <div className="card-body">
        <div className="row">
          <div className="field-item even">
            <p>
              &nbsp;
              <strong>
                <span>
                  <span>Цены на прокат инвентаря</span>
                </span>
              </strong>
            </p>
            <table border="0">
              <tbody>
                <tr>
                  <td>&nbsp;Время</td>
                  <td>&nbsp;Цена за комплект</td>
                  <td>&nbsp;Лыжи / сноуборд</td>
                </tr>
                <tr>
                  <td>&nbsp;1-4 часа</td>
                  <td>&nbsp;400</td>
                  <td>&nbsp;200 / 200</td>
                </tr>
                <tr>
                  <td>&nbsp;4-8 часов</td>
                  <td>&nbsp;500</td>
                  <td>&nbsp;250 / 250</td>
                </tr>
              </tbody>
            </table>

            <p>Указаны самые низкие цены по Шерегешу. В поселке стоимость начинается от 500 руб за комплект и доходит до 1500 руб на горе Зеленая.&nbsp;&nbsp;</p>
            <p>&nbsp;</p>
            <p>
              <strong>
                <span>Цены на прокат аксессуаров</span>
              </strong>
              <span>&nbsp;</span>
            </p>

            <table border="0">
              <tbody>
                <tr>
                  <td>&nbsp;Время</td>
                  <td>&nbsp;Очки</td>
                  <td>&nbsp;Перчатки</td>
                  <td>&nbsp;Шлем</td>
                  <td>&nbsp;Куртка</td>
                  <td>&nbsp;Штаны</td>
                  <td>&nbsp;Комбинезон</td>
                </tr>
                <tr>
                  <td>&nbsp;1 день</td>
                  <td>&nbsp;200</td>
                  <td>&nbsp;200</td>
                  <td>&nbsp;200</td>
                  <td>&nbsp;200</td>
                  <td>&nbsp;200</td>
                  <td>&nbsp;200</td>
                </tr>
              </tbody>
            </table>

            <p>
              Размеры:&nbsp;<span>ботинки лыжные от 15 до 47;&nbsp;</span>
              <span>ботинки сноубордические от 31 до 46;&nbsp;</span>
              <span>одежда 44-54</span>
            </p>
            <p>&nbsp;</p>
            <p>
              <strong>
                <span>Стоимость занятия с инструктором</span>
                <span>&nbsp;</span>
              </strong>
            </p>

            <table border="0">
              <tbody>
                <tr>
                  <td>&nbsp;Время и количество человек</td>
                  <td>&nbsp;Стоимость</td>
                </tr>
                <tr>
                  <td>&nbsp;1 час индивидуально</td>
                  <td>&nbsp;2000 рублей</td>
                </tr>
                <tr>
                  <td>&nbsp;1 час два человека</td>
                  <td>&nbsp;по 1800 рублей каждый</td>
                </tr>
                <tr>
                  <td>&nbsp;1 час три человека</td>
                  <td>&nbsp;по 1500 рублей каждый</td>
                </tr>
                <tr>
                  <td>&nbsp;1 час четыре человека и более&nbsp;</td>
                  <td>&nbsp;по 1200 рублей каждый</td>
                </tr>
              </tbody>
            </table>

            <p>
              <span>Обучение детей катанию на горных лыжах с 3-х лет, на сноуборде с 6-ти лет. Индивидуальные и групповые занятия с инструктором для начинающих и опытных райдеров.&nbsp;</span>
              <span>Все цены указаны в рублях.</span>
            </p>
            <p>
              &nbsp;<span>&nbsp;</span>
            </p>

            <table border="0">
              <tbody>
                <tr>
                  <td valign="top">
                    <p>
                      <span>Горнолыжная школа Ski-Country</span>
                      <span>
                        <br />
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="middle">
                    {/* eslint-disable-next-line */}
                    <img src={imgElevator} width="150" height="113" />
                  </td>
                </tr>
                <tr>
                  <td align="left" valign="top">
                    <p>Телефон: 8-905-078-1818&nbsp;</p>
                  </td>
                </tr>
              </tbody>
            </table>

            <p>&nbsp;</p>
            <p>
              <strong>
                <span>Ваш Прокат</span>:
              </strong>{" "}
              Шерегеш, ул. Весенняя, 24. Тел. 8-913-139-87-27
            </p>
            <p>
              <span>
                <strong>Райдер</strong>:
              </span>{" "}
              "У шлагбаума", ул. Снежная, 20; "Приют райдера", ул. Снежная, 45;&nbsp; "Доска", ул. Снежная, 36. Тел. 8-929-300-00-07
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
              </span>{" "}
              ул. Снежная.&nbsp;
            </p>
            <p>
              <span>
                <strong>Снаряга</strong>:
              </span>{" "}
              ул. Гагарина, 4. Тел. 8-905-066-98-22
            </p>
            <p>
              <span>
                <strong>SkiHouse</strong>:
              </span>{" "}
              ул. Снежная. Тел. 8-905-907-51-56
            </p>
            <p>
              <span>
                <strong>Старт</strong>:
              </span>{" "}
              ул. Весенняя, 21Б; ул. Спортивная, 19; ул. Туристическая, 11; ул. Снежная, 44/1. Тел. 8-800-500-67-51
            </p>
            <p>
              <span>
                <strong>Лыжная База</strong>:
              </span>{" "}
              Шерегеш, ул. Дзержинского, 17. Тел. 8-913-288-13-24
            </p>
            <p>
              <span>
                <strong>Легенда</strong>:
              </span>{" "}
              ул. Снежная, 8/2. Тел. 8-995-443-9595
            </p>
            <p>
              <span>
                <strong>Сектор Е</strong>:
              </span>{" "}
              тел. 8-800-550-3919
            </p>
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Elevator;
