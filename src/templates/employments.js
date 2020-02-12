const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')
const nanoid = require('nanoid')
const config = require('../config')
const exists = require('../util/exists')

async function employmentsDirCreate() {
    const EMPLOYMENTS_URL = path.resolve(
        config.PUBLIC_DIRECTORY,
        config.REPORT_DIRECTORY,
        'employments'
    )

    if (!(await exists.existsDir(EMPLOYMENTS_URL))) {
        await new Promise((resolve, reject) => {
            fs.mkdir(EMPLOYMENTS_URL, {recursive: true}, (err) => {
                if (err) {
                    console.log(err)
                    reject({ error: 'There was an error in the creation of employment dir' })
                }
                resolve()
            })
        })
    }
}

exports.generateReport = async (orderByEnterpriseEmployments) => {
    let evaluateEnterprise = orderByEnterpriseEmployments[0].enterprise._id
    let cuantityEmploymentOnPage = 0
    const URL_REPORT = path.join(
        config.PUBLIC_DIRECTORY,
        config.REPORT_DIRECTORY,
        'employments',
        `${new Date().getTime()}-${nanoid()}.pdf`
    )
    const FINAL_URL = path.resolve(URL_REPORT)
    try {
        await employmentsDirCreate()
        const doc = new PDFDocument({ pdfVersion: '1.7', autoFirstPage: false })
        doc.pipe(fs.createWriteStream(FINAL_URL))

        doc.addPage({
            margin: 50
        })

        doc.font('Times-Roman')
            .fontSize(32)
            .text('Informe Empleados', {
                align: 'center'
            })

        doc.moveDown(1)

        doc.font('Times-Roman')
            .fontSize(24)
            .fillColor('blue')
            .text(
                `${orderByEnterpriseEmployments[0].enterprise.enterprise_name} [${orderByEnterpriseEmployments[0].enterprise.employment_cuantity} Empleado(s)]`
            )

        doc.moveDown(1)

        for (let i = 0; i < orderByEnterpriseEmployments.length; i++) {
            let employment = orderByEnterpriseEmployments[i]
            if (employment.enterprise._id === evaluateEnterprise) {
                if (cuantityEmploymentOnPage === 3) {
                    doc.addPage({
                        margin: 50
                    })
                    cuantityEmploymentOnPage = 0
                }

                doc.font('Times-Roman')
                    .fontSize(14)
                    .fillColor('red')
                    .list([`ID: ${employment._id}`])

                doc.moveDown(1)

                doc.font('Times-Roman')
                    .fontSize(14)
                    .fillColor('black')
                    .text(`     Nombre: ${employment.employment_name}`)

                doc.moveDown(1)

                doc.font('Times-Roman')
                    .fontSize(14)
                    .text(`     Posición: ${employment.position}`)

                doc.moveDown(1)

                doc.font('Times-Roman')
                    .fontSize(14)
                    .text(`     Departamento: ${employment.department}`)
            } else {
                evaluateEnterprise = employment.enterprise._id

                doc.addPage({
                    margin: 50
                })

                cuantityEmploymentOnPage = 0

                doc.font('Times-Roman')
                    .fontSize(24)
                    .fillColor('blue')
                    .text(
                        `${employment.enterprise.enterprise_name} [${employment.enterprise.employment_cuantity} Empleado(s)]`
                    )

                doc.moveDown(1)

                doc.font('Times-Roman')
                    .fontSize(14)
                    .fillColor('red')
                    .list([`ID: ${employment._id}`])

                doc.moveDown(1)

                doc.font('Times-Roman')
                    .fontSize(14)
                    .fillColor('black')
                    .text(`     Nombre: ${employment.employment_name}`)

                doc.moveDown(1)

                doc.font('Times-Roman')
                    .fontSize(14)
                    .text(`     Posición: ${employment.position}`)

                doc.moveDown(1)

                doc.font('Times-Roman')
                    .fontSize(14)
                    .text(`     Departamento: ${employment.department}`)
            }
            cuantityEmploymentOnPage++
            doc.moveDown(2)
        }

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
