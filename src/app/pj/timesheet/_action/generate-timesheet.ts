import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

interface IGenerateTimesheet {
  name: string
  year: number
  month: number
  hoursPerDay: number
  daysPerWeek: number
  base64Img?: string
  deliveries: string[]
}

export async function generateTimesheet({
  name,
  year,
  month,
  hoursPerDay,
  daysPerWeek,
  base64Img,
  deliveries
}: IGenerateTimesheet) {
  const daysInMonth = new Date(year, month, 0).getDate()
  const workedDays = [...Array(daysInMonth + 1).keys()].filter(
    (day) => {
      const date = new Date(year, month - 1, day + 1)
      const dayOfWeek = date.getDay()
      return dayOfWeek !== 0 && dayOfWeek !== 6
    }
  )

  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Timesheet')

  if (base64Img) {
    const imageId = workbook.addImage({
      base64: base64Img,
      extension: 'png'
    })

    worksheet.addImage(imageId, {
      tl: { col: 0, row: 0 },
      ext: { width: 150, height: 50 }
    })
  }

  // Add title
  worksheet.mergeCells('A4:D4')
  worksheet.getRow(4).getCell('A').value = 'Monthly Status Report'
  worksheet.getRow(4).getCell('A').style = {
    font: { size: 18, bold: true },
    alignment: { horizontal: 'left' }
  }

  // Add month and year
  worksheet.getRow(5).getCell('A').value = 'Month:'
  worksheet.getRow(5).getCell('B').value = month
  worksheet.getRow(6).getCell('A').value = 'Year:'
  worksheet.getRow(6).getCell('B').value = year

  // Add headers
  worksheet.columns = [
    { header: 'Day', key: 'day', width: 10, font: { bold: true } },
    { header: 'Worked', key: 'worked', width: 10 },
    { header: 'Number of hours', key: 'hours', width: 15 }
  ]

  //remove header
  worksheet.getRow(1).values = []

  // Add Consultant Name
  worksheet.mergeCells('E1:G1')
  worksheet.mergeCells('H1:J1')
  worksheet.getRow(1).getCell('E').value = 'Name of the consultant'
  worksheet.getRow(1).getCell('E').font = { bold: true }
  worksheet.getRow(1).getCell('H').value = name

  // Move headers to row 10
  worksheet.getRow(10).values = worksheet.columns.map(
    (col) => col.header
  ) as ExcelJS.CellValue[]
  worksheet.getRow(10).font = { bold: true }

  let totalHours = 0

  for (let day = 0; day <= daysInMonth - 1; day++) {
    const date = new Date(year, month - 1, day + 1)
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const worked = isWeekend ? 'No' : 'Yes'
    const hours = isWeekend ? 0 : hoursPerDay

    if (!isWeekend) {
      totalHours += hours
    }

    const row = worksheet.addRow({
      day: day + 1,
      worked,
      hours
    })

    if (isWeekend) {
      row.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFA500' }
        }
      })
    }
  }

  // Add total hours row
  worksheet.addRow({})
  worksheet.addRow({
    day: 'Total',
    worked: workedDays.length,
    hours: totalHours,
    deliveries: ''
  })

  // Add borders
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber < 10) {
      return
    }
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    })
  })

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
  saveAs(blob, `${name}_Timesheet_${month}_${year}.xlsx`)
}
