ymaps.ready(init);

function init() {
    myMap = new ymaps.Map("map", {
            center: [55.73, 37.75],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });
    
    draw_polygon([
        [55.779925, 37.842169],
        [55.578971, 37.695932],
        [55.709596, 37.389032],
        [55.905406, 37.528244]
    ]);
}

function draw_polygon(coords=[]){
    myPolygon = new ymaps.Polygon([ coords ], {}, {
            editorDrawingCursor: "crosshair",
            editorMaxPoints: 90,
            fillColor: '#12ffde3b',
            strokeColor: '#ff12ff',
            strokeWidth: 3
        }
    );
        
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
	let coords = myPolygon.geometry.getCoordinates()[0];
    let arr = []
    for (i in coords) {
        arr.push(coords[i][1] + ' ' +  coords[i][0])
    }
	const el = document.getElementById('coords');
	el.innerHTML = arr.join(',<br/>')		
}


function coords_to_polygon() {
    myMap.geoObjects.removeAll();
    const el = document.getElementById('coords');
    txt = el.innerText    
    const arr = txt.split(",")
    let res_arr = []
    for (i in arr) {
        let xy_str = arr[i].trim()
        let xy_arr = xy_str.split(' ')
        let y = parseFloat(xy_arr[0])
        let x = parseFloat(xy_arr[1])
        res_arr.push([x, y])
    }    
    draw_polygon(res_arr)
}

