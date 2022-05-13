import React, { useRef, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({ setValue, initialValue }) => {
  const editor = useRef(null);
  // eslint-disable-next-line
  const [valueNew, setContent] = useState(initialValue);

  //Функция прослушивания изменений в переменной initialValue >> обновление текста в редакторе
  useEffect(() => {
    const jEditor = document.querySelector(".jodit-wysiwyg");
    jEditor.innerHTML = initialValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  const config = {
    readonly: false,
    buttons: ["bold", "italic", "underline", "|", "left", "center", "right", "justify", "|", "ul", "ol", "|", "table", "link", "hr", "|", "undo", "redo", "|", "eraser"],
    buttonsMD: ["bold", "italic", "underline", "|", "left", "center", "right", "justify", "|", "ul", "ol", "|", "table", "link", "hr", "|", "undo", "redo", "|", "eraser"],
    buttonsSM: ["bold", "italic", "underline", "|", "left", "center", "right", "justify", "|", "ul", "ol", "|", "table", "link", "hr", "|", "undo", "redo", "|", "eraser"],
    buttonsXS: ["bold", "italic", "underline", "|", "left", "center", "right", "justify", "|", "ul", "ol", "|", "table", "link", "hr", "|", "undo", "redo", "|", "eraser"],
  };

  // eslint-disable-next-line
  return useMemo(() => <JoditEditor ref={editor} onChange={(content) => setValue(content)} config={config} tabIndex={1} value={valueNew} />, []);
};

export default TextEditor;

//--- Конфиг ---
//height: "600"          - Высота
//toolbarAdaptive: false - Отключение адаптивности редактора

//Кнопки:
//   --- Добавленно ---
// bold          - Жирный текст
// italic        - Наклонный текст
// underline     - Подчёркивание
// left          - Выравнивание
// ul            - Маркированный список
// ol            - Нумерованный список
// table         - Таблица
// link          - Ссылка
// hr            - Вставить горизонтальную линию
// undo          - Отмена
// redo          - Повтор
// eraser        - Очистить форматирование

// --- Не добавленно ---
// fontsize      - Размер шрифта
// brush         - Цвет заливки или цвет текста
// paragraph     - Блочный элемент (Заголовок, Цитата, Код)
// image         - Изображение
// copyformat    - Формат краски
// strikethrough - Перечёркивание
// font          - Шрифт
// classSpan     - Вставить название класса
// lineHeight    - Высота линии
// superscript   - Верхний индекс
// subscript     - Нижний индекс
// file          - Вставить видео
// video         - Вставить документ
// cut           - Вырезать
// copy          - Скопировать
// paste         - Вставить
// selectall     - Выделить всё
// symbol        - Вставить специальный символ
// indent        - Увеличить отступ
// outdent       - Уменьшить отступ
// find          - Найти
// source        - Редактировать текст как HTML
// preview       - Превью текста
// print         - Печать
// spellcheck    - Проверка орфографии
// fullsize      - Открыть редактор на весь экран
// about         - О модуле Jodit