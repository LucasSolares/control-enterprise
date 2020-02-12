const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')
const nanoid = require('nanoid')
const exists = require('../util/exists')
const config = require('../config')


async function enterprisesDirCreate() {
    const ENTERPRISE_URL = path.resolve(
        config.PUBLIC_DIRECTORY,
        config.REPORT_DIRECTORY,
        'enterprises'
    )

    if (!(await exists.existsDir(ENTERPRISE_URL))) {
        await new Promise((resolve, reject) => {
            fs.mkdir(ENTERPRISE_URL, {recursive: true}, (err) => {
                if (err) {
                    reject({ error: 'There was an error in the creation of enterprise dir' })
                }
                resolve()
            })
        })
    }
}

exports.generateReport = async (enterprises) => {
    const URL_REPORT = path.join(
        config.PUBLIC_DIRECTORY,
        config.REPORT_DIRECTORY,
        'enterprises',
        `${new Date().getTime()}-${nanoid()}.pdf`
    )
    const FINAL_URL = path.resolve(URL_REPORT)
    try {
        await enterprisesDirCreate()
        const doc = new PDFDocument({ pdfVersion: '1.7', autoFirstPage: false })
        doc.pipe(fs.createWriteStream(FINAL_URL))

        doc.addPage({
            margin: 50
        })

        doc.font('Times-Roman')
            .fontSize(32)
            .text('Informe Empresas', {
                align: 'center'
            })

        doc.moveDown(1)

        enterprises.forEach((enterprise) => {
            doc.font('Times-Roman')
                .fontSize(24)
                .fillColor('blue')
                .text(enterprise.enterprise_name)

            doc.moveDown(1)

            doc.font('Times-Roman')
                .fontSize(14)
                .fillColor('red')
                .list([`ID: ${enterprise._id}`])

            doc.moveDown(1)

            doc.font('Times-Roman')
                .fontSize(14)
                .text(`     Descripción: ${enterprise.description}`)

            doc.moveDown(1)

            doc.font('Times-Roman')
                .fontSize(14)
                .text(`     Cantidad de Empleados: ${enterprise.employment_cuantity}`)

            doc.moveDown(2)
        })       

        doc.end()
        return `http://${config.HOST}:${config.PORT}${URL_REPORT.replace(
            config.PUBLIC_DIRECTORY,
            ''
        )}`
    } catch (error) {
        console.error(error)
        throw error
    }
}
