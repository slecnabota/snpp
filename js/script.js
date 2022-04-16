ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [43.259477, 76.934470],
        zoom: 17
    });
    var myPlacemark = new ymaps.Placemark(
        [43.259477, 76.934470]       
        );
    myMap.geoObjects.add(myPlacemark);
}
