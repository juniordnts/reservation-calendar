// Host do servidor
var host = "http://" + window.location.host;
var y = 1;

// Pega as salas cadastradas
// $.ajax({
//   type: "GET", url: host + "/API/classroomAll/", dataType: "json",
//   success: function (response) {
//     response.forEach(item => {
//       // Adicioan os botões de salas no box-salas
//       $('#box-salas').append(`
//           <button class="btn btn-dark m-2" data-id='${item.id}' onclick="setSala(this)">${item.classroom} - (${item.floor})</button>
//         `);
//     });
//   },
// });

// Quando o botão de sala é clicado, set o form para aquela sala
// var salaSelecionada = 0;
// var mesSelecionado = 1;
// $("#tabela-de-salas").hide();
// $("#header-de-sala").hide();
// function setSala(t) { 
//   $("#tabela-de-salas").show(500);
//   $("#header-de-sala").show(500);
//   salaSelecionada = t.getAttribute('data-id');
//   $("#sala-selec").html(t.innerHTML);
//   $("#classFalse").html(`<option select value="${t.getAttribute('data-id')}">${t.innerHTML}</option>`);
//   $("#classroom").val(t.getAttribute('data-id'));
//   var showMesAtual = $("#escolheMes button");
//   showMesAtual[0].click();
// };

// Formatação do datepicker no form
// $('[data-toggle="datepicker"]').datepicker({
//   format: 'dd-mm-yyyy',
//   months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
//   daysMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
// });

// Nome dos meses
var mesNome = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
// Data atual
var dataAtual = new Date();
// Data do prox mês
var dataProx = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 1);
// Data daqui dois mesmes
var dataDeps = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 2, 1);
// Data daqui dois mesmes
var dataDepsD = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 3, 1);

// Add um botão com o mês atual
// $("#escolheMes").append(`<button onclick='getCalendar(this)' data-mes='${dataAtual.getMonth() + 1}' data-calend='atu' data-ano='${dataAtual.getFullYear()}' class="btn btn-dark">${mesNome[dataAtual.getMonth()]} / ${dataAtual.getFullYear()}</button>`)
// // Add um botão com o proximo mês
// $("#escolheMes").append(`<button onclick='getCalendar(this)' data-mes='${dataProx.getMonth() + 1}' data-calend='pro' data-ano='${dataProx.getFullYear()}' class="btn btn-dark">${mesNome[dataProx.getMonth()]} / ${dataProx.getFullYear()}</button>`)
// // Add um botão daqui dois meses
// $("#escolheMes").append(`<button onclick='getCalendar(this)' data-mes='${dataDeps.getMonth() + 1}' data-calend='dep' data-ano='${dataDeps.getFullYear()}' class="btn btn-dark">${mesNome[dataDeps.getMonth()]} / ${dataDeps.getFullYear()}</button>`)
// // Add um botão daqui dois meses
// $("#escolheMes").append(`<button onclick='getCalendar(this)' data-mes='${dataDepsD.getMonth() + 1}' data-calend='depd' data-ano='${dataDepsD.getFullYear()}' class="btn btn-dark">${mesNome[dataDepsD.getMonth()]} / ${dataDepsD.getFullYear()}</button>`)

// Quando botão do mês é clicado pega as info de mes e ano e gera a url
function getCalendar(t) {
  // Limpa o formuláro antes de fazer a requisição API
  var toClear = $("[data-parent] td");
  $.each(toClear, function (indexInArray, valueOfElement) { 
    valueOfElement.textContent = ''
    valueOfElement.classList = ''
    valueOfElement.setAttribute('data-dia', '');
    valueOfElement.setAttribute('title', '')
  });
  var showMesAtual = $("#escolheMes button");
  // Set dias no calendário respectivo ao mes
  // if(t.getAttribute('data-calend') == 'atu'){
  //   showMesAtual[0].classList = 'btn btn-success'
  //   showMesAtual[1].classList = 'btn btn-dark'
  //   showMesAtual[2].classList = 'btn btn-dark'
  //   showMesAtual[3].classList = 'btn btn-dark'
  //   mesSelecionado = 1;
  //   setDaysCalendar(dataAtual);
  // } else if (t.getAttribute('data-calend') == 'pro') {
  //   showMesAtual[0].classList = 'btn btn-dark'
  //   showMesAtual[1].classList = 'btn btn-success'
  //   showMesAtual[2].classList = 'btn btn-dark'
  //   showMesAtual[3].classList = 'btn btn-dark'
  //   mesSelecionado = 2;
  //   setDaysCalendar(dataProx);
  // } else if (t.getAttribute('data-calend') == 'dep') {
  //   showMesAtual[0].classList = 'btn btn-dark'
  //   showMesAtual[1].classList = 'btn btn-dark'
  //   showMesAtual[2].classList = 'btn btn-success'
  //   showMesAtual[3].classList = 'btn btn-dark'
  //   mesSelecionado = 3;
  //   setDaysCalendar(dataDeps);
  // } else if (t.getAttribute('data-calend') == 'depd') {
  //   showMesAtual[0].classList = 'btn btn-dark'
  //   showMesAtual[1].classList = 'btn btn-dark'
  //   showMesAtual[2].classList = 'btn btn-dark'
  //   showMesAtual[3].classList = 'btn btn-success'
  //   mesSelecionado = 4;
  //   setDaysCalendar(dataDepsD);
  // } else {
  //   showMesAtual[0].classList = 'btn btn-success'
  //   showMesAtual[1].classList = 'btn btn-dark'
  //   showMesAtual[2].classList = 'btn btn-dark'
  //   showMesAtual[3].classList = 'btn btn-dark'
  //   mesSelecionado = 1;
  //   setDaysCalendar(dataAtual);
  // }

  if (t.getAttribute('data-mes')){
    var mes = t.getAttribute('data-mes');
    var ano = t.getAttribute('data-ano');
  } else {
    var mes = dataAtual.getMonth();
    var ano = dataAtual.getFullYear();
  }
  $.ajax({
    type: "GET", 
    url: host + `/API/calendarReserve?year=${ano}&month=${mes}`, 
    dataType: "json",
    success: function (response) {
      console.log(response)
      // Gera o calendário com as reservas passando a resposta da API
      geraCalendario(response);
    }
  });
};

// Set os dias em suas posições no calendário
function setDaysCalendar(dataE){
  // Set os dias do mes
  var primeiroDia = new Date(dataE.getFullYear(), dataE.getMonth(), 1);
  var ultimoDia = new Date(dataE.getFullYear(), dataE.getMonth() + 1, 0);
  var primeiraSemana = new Date(dataE.getFullYear(), dataE.getMonth(), 1).getDay();
  var trs = $(".tr-dia td");

  // var coisaM = $("[data-turno='M'] td");
  // var coisaT = $("[data-turno='T'] td");
  // var coisaN = $("[data-turno='N'] td");
  for (var i = 1; i <= ultimoDia.getDate(); i++){
    // coisaM[i+ primeiraSemana -1].setAttribute('class', 'dia-livre')
    // coisaT[i+ primeiraSemana -1].setAttribute('class', 'dia-livre')
    // coisaN[i+ primeiraSemana -1].setAttribute('class', 'dia-livre')
    i == dataE.getDate()? trs[i + primeiraSemana - 1].setAttribute('class', 'dia-normal') : '';
    trs[i + primeiraSemana - 1].innerHTML = i;
    trs[i + primeiraSemana - 1].setAttribute('data-dia', i);
    // trs[i + primeiraSemana - 1].setAttribute('class', 'dia-normal');
  }
}
setDaysCalendar(dataAtual);

// Gera calendário com os dias em seus devidos lugares
function geraCalendario(data){
  $.each(data, function (i, v) {
    if (v.classroom == salaSelecionada){
      // Se retorna uma variável status exibe um alert
      if (data.status) { alert(data.status) }
      // Separa o dia que vem da API
      var vDia = v.date.split('-');
      vDia = vDia[0];
      // Se o dia tem caractere zero, remove
      while(vDia.charAt(0) === '0'){ vDia = vDia.substr(1); }
      var diaH = $(`[data-dia = '${vDia}']`);
      // Armazena a posição da linha e da coluna do item a ser colocado
      var infoTable= diaH.parent().attr("data-parent");
      var infoShift= v.shift;
      var infoWeek= diaH.attr("data-sem");
      // Pega os valores da coluna
      var itemDia = $(`[data-parent='${infoTable}'][data-turno='${infoShift}'] td`)
      // Pega a coluna e escolhe a posição da linha certa
      !v.isReserve ? (itemDia[infoWeek].classList = 'n-confirmado') : (itemDia[infoWeek].classList = 's-confirmado');
      itemDia[infoWeek].setAttribute('title', v.event)
      itemDia[infoWeek].textContent = v.event;
    }
  });
};

// Envia formulário de reserva
// $("#enviar-reserva").click(function (e) {
//   e.preventDefault();
//   $.ajax({
//     type: "POST", 
//     url: host + `/API/registerReserve/`, 
//     dataType: "json",
//     data: $("#form-reserva").serialize(),
//     success: function (response) {
//       $("#status-message").html(`
//       <div class="rounded-0 alert alert-${response.status=='sucesso'? 'success':'danger'} alert-dismissible fade show" role="alert">
//         <strong>${response.message}</strong>
//         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       `)
//       response.status=='sucesso'?  $('#form-reserva').trigger("reset") : '' ;
//     }
//   });
// });