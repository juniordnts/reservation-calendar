class ReservationCalendar {

  _defaultValues() {
    this.element = "reservation-calendar"
    this.weekName = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    this.dayName = "Dia"
    this.shiftSeparator = [
      {
        id: "M",
        name: "Manhã"
      },
      {
        id: "T",
        name: "Tarde"
      },
      {
        id: "N",
        name: "Noite"
      }
    ]
    this.varNames = {
      date: "date",
      event: "event",
      status: {
        name: "status",
        confirmed: "C",
        refused: "R",
        waiting: "W"
      },
      shift: "shift"
    }
    this.today = new Date()
  }

  _overwriteValues(data) {
    if (typeof (data) == "object") {
      $.each(data, (index, value) => {
        this[index] = value
      });
    } else {
      throw new Error("Missing object parameters!")
    }
  }

  constructor(data = false) {

    this._defaultValues()
    data ? this._overwriteValues(data) : NaN

    this._setUpCSS()

    this._createStruct()

  }

  _setUpCSS() {
    let _css = `.dia-livre{background-color:#ebffe3}.dia-ocupado{background-color:#fffae3}.n-confirmado{color: #ff3232;font-size:6px;vertical-align:middle}.y-confirmado{color: green;font-size:6px;vertical-align:middle}.w-confirmado{color: #ffc400;font-size:6px;vertical-align:middle}.dia-hoje{background-color:#afafaf}.dia-normal{background-color:#d3d3d3}table.reservation{table-layout: fixed;}.table.reservation td,.table.reservation th{padding:2px;font-size:14px;max-height:32px}.linha-dia{background-color:#c9c9c9}.linha-dia~td{text-align:right;padding-right:15px;font-weight:800;font-size:15px;background-color:#cacaca}th.linha-turno{padding:5px}.linha-turno~td div{padding:5px;font-size:11px;line-height:13px;max-height:32px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}tr.table-separador{background-color:#e7e7e7}tr.table-separador td{padding:3px}@media (max-width:768px){.table-reserva{overflow-x:scroll;margin:0 15px}}.background-home{padding-bottom:0}#nav-box .container hr:first-child{border-color:transparent}*{font-family:Raleway,sans-serif}.table td,.table th{vertical-align:middle}`

    let _head = document.head || document.getElementsByTagName('head')[0]
    let _style = document.createElement('style')
    _head.appendChild(_style)
    _style.type = 'text/css'
    _style.styleSheet ? _style.styleSheet.cssText = css : _style.appendChild(document.createTextNode(_css))
  }

  _addColToStruct(id) {
    let auxString = ""
    this.shiftSeparator.forEach(element => {
      auxString += `
          <tr data-parent="${id}" data-turno="${element.id}"><th class="linha-turno" scope="row">${element.name}</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          `
    })
    return auxString
  }

  _createStruct() {
    let template = `
          <div class="table-reserva d-flex justify-content-md-center"><div class="w-100"><table class="table reservation table-bordered text-center col-md-12 table-hover"><thead class="thead-dark"><tr><th scope="col"></th><th scope="col">${this.weekName[0]}</th><th scope="col">${this.weekName[1]}</th><th scope="col">${this.weekName[2]}</th><th scope="col">${this.weekName[3]}</th><th scope="col">${this.weekName[4]}</th><th scope="col">${this.weekName[5]}</th><th scope="col">${this.weekName[6]}</th></tr></thead><tbody><tr data-parent="1" class="tr-dia"><th id="semana-1" class="linha-dia" scope="row">${this.dayName}</th><td data-sem="0"></td><td data-sem="1"></td><td data-sem="2"></td><td data-sem="3"></td><td data-sem="4"></td><td data-sem="5"></td><td data-sem="6"></td></tr> ${this._addColToStruct(1)}<tr class="table-separador" data-separador="1"><th scope="row"></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr data-parent="2" class="tr-dia"><th id="semana-2" class="linha-dia" scope="row">${this.dayName}</th><td data-sem="0"></td><td data-sem="1"></td><td data-sem="2"></td><td data-sem="3"></td><td data-sem="4"></td><td data-sem="5"></td><td data-sem="6"></td></tr>${this._addColToStruct(2)}<tr class="table-separador" data-separador="2"><th scope="row"></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr data-parent="3" class="tr-dia"><th id="semana-3" class="linha-dia" scope="row">${this.dayName}</th><td data-sem="0"></td><td data-sem="1"></td><td data-sem="2"></td><td data-sem="3"></td><td data-sem="4"></td><td data-sem="5"></td><td data-sem="6"></td></tr>${this._addColToStruct(3)}<tr class="table-separador" data-separador="3"><th scope="row"></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr data-parent="4" class="tr-dia"><th id="semana-4" class="linha-dia" scope="row">${this.dayName}</th><td data-sem="0"></td><td data-sem="1"></td><td data-sem="2"></td><td data-sem="3"></td><td data-sem="4"></td><td data-sem="5"></td><td data-sem="6"></td></tr>${this._addColToStruct(4)}<tr class="table-separador" data-separador="4"><th scope="row"></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr data-parent="5" class="tr-dia"><th id="semana-5" class="linha-dia" scope="row">${this.dayName}</th><td data-sem="0"></td><td data-sem="1"></td><td data-sem="2"></td><td data-sem="3"></td><td data-sem="4"></td><td data-sem="5"></td><td data-sem="6"></td></tr>${this._addColToStruct(5)}<tr class="table-separador" data-separador="5"><th scope="row"></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr data-parent="6" class="tr-dia"><th id="semana-6" class="linha-dia" scope="row">${this.dayName}</th><td data-sem="0"></td><td data-sem="1"></td><td data-sem="2"></td><td data-sem="3"></td><td data-sem="4"></td><td data-sem="5"></td><td data-sem="6"></td></tr>${this._addColToStruct(6)}<tr class="table-separador" data-separador="6"><th scope="row"></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table></div></div>
        `
    $(`#${this.element}`).html(template)
    console.log("Struct created!")
  }

  _formatRealDate(date) {
    let arrayDate = date.split("-")
    let year = arrayDate[0]
    let month = arrayDate[1] - 1
    let day = arrayDate[2]
    return { year, month, day }
  }

  _realDate(date) {
    let dateFormated = this._formatRealDate(date)
    let realDate = new Date(
      dateFormated.year,
      dateFormated.month,
      dateFormated.day
    )
    return realDate
  }

  _formatDaysInMonth(date) {
    let arrayDate = date.split("-")
    let year = arrayDate[0]
    let month = arrayDate[1]
    let day = 0
    return { year, month, day }
  }

  _daysInMonth(date) {
    let dateFormated = this._formatDaysInMonth(date)
    let numberOfDaysInMonth = new Date(
      dateFormated.year,
      dateFormated.month,
      dateFormated.day
    ).getDate()
    return numberOfDaysInMonth
  }

  _formatDayOne(date) {
    let arrayDate = date.split("-")
    let year = arrayDate[0]
    let month = arrayDate[1] - 1
    let day = 1
    return { year, month, day }
  }

  _weekNumberDayOne(date) {
    let dateFormated = this._formatDayOne(date)
    let dayOne = new Date(
      dateFormated.year,
      dateFormated.month,
      dateFormated.day
    ).getDay()
    return dayOne
  }

  _dayBefore(date, daysBefore) {
    let dateFormated = this._formatDayOne(date)
    let dayBefore = new Date(
      dateFormated.year,
      dateFormated.month,
      dateFormated.day - daysBefore
    ).getDate()
    return dayBefore
  }

  _generateCalendar(date) {
    this._createStruct()
    let inputDate = this._realDate(date)
    let numberDaysInMonth = this._daysInMonth(date)
    let weekNumberDayOne = this._weekNumberDayOne(date)
    let trDia = $(".tr-dia [data-sem]")

    $.each(trDia, (index, value) => {
      if (index < weekNumberDayOne + numberDaysInMonth && weekNumberDayOne <= index) {
        trDia[index].innerText = index - weekNumberDayOne + 1;
      } else if (trDia[weekNumberDayOne + numberDaysInMonth - 1].parentElement.getAttribute("data-parent") < value.parentElement.getAttribute("data-parent")) {
        let dataParentExtra = value.parentElement.getAttribute("data-parent")
        $(`[data-parent = ${dataParentExtra}]`).remove()
        $(`[data-separador = ${dataParentExtra}]`).remove()
        return false;
      }
    });

  }

  extractDay(date) {
    let arrayDate = date.split("-")
    return parseInt(arrayDate[0])
  }

  _updateReservations(data) {
    $.each(data, (index, value) => {
      try {
        let eventDay = this.extractDay(value[this.varNames.date])
        let eventWeekDay = $(`.tr-dia td:contains(${eventDay})`).attr("data-sem")
        let parentNumber = $(`.tr-dia td:contains(${eventDay})`).parent().attr("data-parent")
        let arrayLine = $(`[data-parent='${parentNumber}'][data-turno='${value[this.varNames.shift.name]}'] td`)
        let indicatorBall = ""
        switch (value[this.varNames.status.name]) {
          case this.varNames.status.confirmed:
            indicatorBall = "y-confirmado"
            break;
          case this.varNames.status.refused:
            indicatorBall = "n-confirmado"
            break;
          case this.varNames.status.waiting:
            indicatorBall = "w-confirmado"
            break;
        }
        console.log(indicatorBall);
        arrayLine[eventWeekDay].innerHTML += `<div class='w-100 h-100' title='${value[this.varNames.event]}'><i class="fas fa-circle ${indicatorBall}"></i> ${value[this.varNames.event]} </div>`
      } catch {
        console.warn(`Something went wrong when field 'shift[${value.shift}]' was being filled! Check if this field was setted.`);
      }
    });
  }

  updateCalendar(data, date) {
    this._generateCalendar(date)
    this._updateReservations(data)
  }

}