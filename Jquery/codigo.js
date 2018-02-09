$(document).ready(function(){
const marvelApiComics = "https://gateway.marvel.com/v1/public/comics";
const marvelApiCharacters = "https://gateway.marvel.com/v1/public/characters";
const PUBLIC_KEY = "934c13a024e5db0f35a8312752e09769";

var $pagination = $('#pagination'),
$pagination2 = $('#pagination2'),
totalRecords = 0,
totalRecords2 = 0,
records = [],
records2 = [],
displayRecords = [],
displayRecords2 = [],
recPerPage = 10,
page = 1,
totalPages2 = 0,
totalPages = 0;

/**
* Spinner
*/
$(this).ajaxStart(function() {
  var spinner = "<i class='fa fa-spinner fa-spin' style='font-size:54px'></i>";
  $("#spinner").append(spinner);
});

/**
* Consulta a la api devolviendo personajes
*/
$.ajax({
  url: marvelApiCharacters,
  data: { limit: 100, apikey: "934c13a024e5db0f35a8312752e09769" },
  async: true,
  dataType: 'json',
  success: function (response) {
              records = response.data.results;
              console.log(records);
              $("#spinner").empty();
              totalRecords = records.length;
              totalPages = Math.ceil(totalRecords / recPerPage);
              apply_pagination();
  },
  error: funtion (err) {
	console.log(err);
  }
});

/**
* Consulta a la api devolviendo comics
*/
$.ajax({
  url: marvelApiComics,
  data: { limit: 100, apikey: "934c13a024e5db0f35a8312752e09769" },
  async: true,
  dataType: 'json',
  success: function (response) {
              records2 = response.data.results;
              console.log(records2);
              totalRecords2 = records2.length;
              totalPages2 = Math.ceil(totalRecords2 / recPerPage);
              apply_pagination2();
  },
  error: funtion (err) {
	console.log(err);
  }
});

/**
* Generar tabla de personajes
*/
function generate_table() {
  var tr;
  $('#emp_body').html('');
  for (var i = 0; i < displayRecords.length; i++) {
        tr = $('<tr/>');
        tr.append("<td><img src='" + displayRecords[i].thumbnail.path + "/standard_xlarge." + displayRecords[i].thumbnail.extension + "'/></td>");
        tr.append("<td>" + displayRecords[i].name + "</td>");
        $('#emp_body').append(tr);
  }
}

/**
* Generar tabla comics
*/
function generate_table2() {
  var tr;
  $('#emp_body2').html('');
  for (var i = 0; i < displayRecords.length; i++) {
        tr = $('<tr/>');
        tr.append("<td><img src='" + displayRecords2[i].thumbnail.path + "/standard_xlarge." + displayRecords2[i].thumbnail.extension + "'/></td>");
        tr.append("<td>" + displayRecords2[i].title + "</td>");
        var description = displayRecords2[i].description;
        if (description == null)
        {
          tr.append("<td>Sin descripción</td>");
        }
        else {
          var textoAbreviado = description.substring(0,20);
          tr.append("<td><p><span>" + textoAbreviado + "</span><span class='completeDescrip'>" + description + "</span></p><a class='exercise'>Ver más</a></td>");
        }
        //tr.append("<td>" + displayRecords2[i].title + "</td>");
        $('#emp_body2').append(tr);
  }
  $(".exercise").on("click", function() {
    var texto1 = $(this).prev().find("span")[0];
    var texto2 = $(this).prev().find("span")[1];
    if ($(texto1).css("display") == "none")
    {
      $(texto1).show(1200);
      $(texto2).hide(900);
      $(this).text("Ver más");
    }
    else {
      $(texto1).hide();
      $(texto2).show(1000);
      $(this).text("Ver menos");
    }
  });
}

/**
* Paginacion de la lista de personajes
*/
function apply_pagination() {
$pagination.twbsPagination({
      totalPages: totalPages,
      visiblePages: 6,
      onPageClick: function (event, page) {
            displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
            endRec = (displayRecordsIndex) + recPerPage;

            displayRecords = records.slice(displayRecordsIndex, endRec);
            generate_table();
      }
});
}

/**
* Paginacion de la lista de comics
*/
function apply_pagination2() {
$pagination2.twbsPagination({
      totalPages: totalPages2,
      visiblePages: 6,
      onPageClick: function (event, page) {
            displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
            endRec = (displayRecordsIndex) + recPerPage;

            displayRecords2 = records2.slice(displayRecordsIndex, endRec);
            generate_table2();
      }
});
}
});
