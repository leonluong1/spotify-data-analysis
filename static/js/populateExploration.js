let thumb = document.getElementById('slider-thumb');
let container = document.querySelector('.slider-container');

var select1 = document.getElementById('years1');
var select2 = document.getElementById('years2');

var years = Array.from({length: 2023-1986+1}, (_, i) => 1986 + i);

years.forEach(year => {
    var option1 = document.createElement('option');
    var option2 = document.createElement('option');
    option1.text = year;
    option2.text = year;
    select1.add(option1);
    select2.add(option2);
});

select1.addEventListener('change', function() {
    var year1 = parseInt(select1.value);
    var year2 = parseInt(select2.value);
    if (year2 < year1) {
        select2.innerHTML = '';
        var selectedYears = Array.from({length: 2023-year1+1}, (_, i) => year1 + i);
        selectedYears.forEach(year => {
            var option = document.createElement('option');
            option.text = year;
            select2.add(option);    
        });
    }
});

select2.addEventListener('change', function() {
    var year1 = parseInt(select1.value);
    var year2 = parseInt(select2.value);
    if (year2 < year1) {
        select1.innerHTML = '';
        var selectedYears = Array.from({length: 2023-year2+1}, (_, i) => year2 + i);
        selectedYears.forEach(year => {
            var option = document.createElement('option');
            option.text = year;
            select1.add(option);
        });
    }
});