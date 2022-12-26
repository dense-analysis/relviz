import * as ExcelJS from 'exceljs'

export interface Cell {
  value: string | number | boolean | Date
}

export interface Sheet {
  name: string
  data: Cell[][]
}

/**
 * A generic workbook with types not specific to any one library.
 */
export interface Workbook {
  sheets: Sheet[]
}

const isCellValueType = (obj: unknown): obj is Cell['value'] => {
  return typeof obj === 'number'
    || typeof obj === 'string'
    || typeof obj === 'boolean'
    || obj instanceof Date
}

const excelJSCellValueToCell = (rawValue: ExcelJS.CellValue): Cell => {
  let value: Cell['value'] = ''

  if (isCellValueType(rawValue)) {
    value = rawValue
  } else if (typeof rawValue === 'object' && rawValue !== null) {
    if ('richText' in rawValue) {
      value = rawValue.richText.map(x => x.text).join('')
    } else if ('text' in rawValue) {
      value = rawValue.text
    } else if ('result' in rawValue && isCellValueType(rawValue.result)) {
      value = rawValue.result
    }
  }

  return {value}
}

export const readExcelFile = async (filename: string): Promise<Workbook> => {
  const excelJSWorkbook = new ExcelJS.Workbook()

  await excelJSWorkbook.xlsx.readFile(filename)

  const workbook: Workbook = {sheets: []}

  excelJSWorkbook.worksheets.forEach(excelJSSheet => {
    const sheet: Sheet = {
      name: excelJSSheet.name,
      data: [],
    }

    excelJSSheet.getRows(1, excelJSSheet.rowCount)?.forEach(row => {
      const sparseValues = row.values
      // The first index is worthless.
      const values = Array.isArray(sparseValues) ? sparseValues.slice(1) : []

      sheet.data.push(values.map(excelJSCellValueToCell))
    })

    workbook.sheets.push(sheet)
  })

  return workbook
}

// highlight ALEVirtualTextError ctermfg=11 ctermbg=15 guifg=#ED6237 guibg=#F5F5F5
