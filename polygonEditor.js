ymaps.ready(init);

function init() {
    myMap = new ymaps.Map("map", {
            center: [55.73, 37.75],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });

    // Создаем многоугольник без вершин.
    myPolygon = new ymaps.Polygon([], {}, {
        // Курсор в режиме добавления новых вершин.
        editorDrawingCursor: "crosshair",
        // Максимально допустимое количество вершин.
        editorMaxPoints: 90,
        // Цвет заливки.
        fillColor: '#12ffde3b',
        // Цвет обводки.
        strokeColor: '#ff12ff',
        // Ширина обводки.
        strokeWidth: 3
    });
    // Добавляем многоугольник на карту.
    myMap.geoObjects.add(myPolygon);

    // В режиме добавления новых вершин меняем цвет обводки многоугольника.
    var stateMonitor = new ymaps.Monitor(myPolygon.editor.state);
    stateMonitor.add("drawing", function (newValue) {
        myPolygon.options.set("strokeColor", newValue ? '#FF0000' : '#0000FF');
    });

    // Включаем режим редактирования с возможностью добавления новых вершин.
    myPolygon.editor.startDrawing();
}


function show_coords() {
	coords = myPolygon.geometry.getCoordinates()[0];
	const el = document.getElementById('coords');
	el.innerHTML = coords.join(';<br/>')		
}

