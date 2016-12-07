var express = require("express")
var path = require("path")
var bodyParser = require("body-parser")

var app = express()

app.use(require('prerender-node'))
app.use(express.static(__dirname+'/dist'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Initialize the app.
var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port
  console.log("App now running on port", port)
})

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason)
  res.status(code || 5000).json({"error": message})
}



var testResponse = function(req,res){
  res.send(200, req.originalUrl)
}
app.use(testResponse)

              //-------ROUTING------
/* "/payment"
* POST: Return the checkout object
*/
app.post("/payment", function(req, res) {
  console.log('req', req)
  console.log('res', res)
  var util = require('./lib/utils')
  /**
  * require the conctructor
  * @type {Constructor}
  */
  var PaysonPayment = require('./lib/index')

  /**
  * Get required environment variables
  * @type {string}
  */
  var vendorId = 1521 //process.env.vendorId
  var apiKey = '03bdcce4-5b50-4ecf-b53f-ff6891a0af34' //process.env.apiKey

  /**
  * Create instance
  * @type {object}
  */
  var payson = new PaysonPayment.Payson(vendorId, apiKey)

  // create a checkout
  var checkout = new PaysonPayment.Checkout('someId', 'http://localhost:5000/faq', 'https://www.example.com', 'https://www.example.com/api/incoming/payment', 'http://localhost:5000/webshop')

  /**
  * Create items
  * @type {PaysonPayment}
  */
  let items = req.body.data
  items.forEach(function(item) {
    // create item
    var item = new PaysonPayment.OrderItem(item[0], item[1], item[2], item[3])
    //add item to checkout
    checkout.addItem(item)
  })

  payson.create(checkout)
  .then(function(getBody) {
    console.log('Checkout created')
    console.log('================')
    console.log('id: ' + getBody.id)
    res.send(getBody.snippet)
  })
  .catch(function(err) {
    console.log('Problems... statuscode: ', err)
  })
})

/* "/email/VVSRequest"
* POST: Send email to specified address
*/
app.post("/email/VVSRequest", function(req, res) {
console.log('/email/VVSRequest req, res', req, res);
  var helper = require('sendgrid').mail
  var from_email = new helper.Email('test@example.com') //TODO: byt ut
  var to_email = new helper.Email('00badrumsboden@gmail.com')
  var subject = 'VVS-förfrågan från Badrumsboden.se'
  var content = new helper.Content(
    'text/html', 'test')
    var mail = new helper.Mail(from_email, subject, to_email, content)

    mail.personalizations[0].addSubstitution(new helper.Substitution('-namn-', req.body['namn']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-telefonnummer-', req.body['telefonnummer']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-epost-', req.body['epost']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-meddelande-', req.body['meddelande']))

    mail.setTemplateId(process.env.SENDGRID_TEMPLATE_VVS)

    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    })

    sg.API(request, function(error, response) {
      console.log(response.statusCode)
      console.log(response.body)
      console.log(response.headers)
    })
  })

  /* "/email/priskalkyl"
  * POST: Send email to specified address
  */

/* "/email/priskalkyl"
* POST: Send email to specified address
*/
app.post("/email/priskalkyl", function(req, res) {
  console.log(req.body)

  var helper = require('sendgrid').mail
  var from_email = new helper.Email('test@example.com')
  var to_email = new helper.Email('00badrumsboden@gmail.com')
  var subject = 'Priskalkyl från Badrumsboden.se'
  var content = new helper.Content(
    'text/html', 'test')
    var mail = new helper.Mail(from_email, subject, to_email, content)

    mail.personalizations[0].addSubstitution(new helper.Substitution('-namn-', req.body['first.namn']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-telefon-', req.body['first.telefon']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-epost-', req.body['first.epost']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-adress-', req.body['first.adress']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-byggar-', req.body['first.byggar']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-bredd-', req.body['first.bredd']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-langd-', req.body['first.langd']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-takhojd-', req.body['first.takhojd']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-fonster-', req.body['first.fonster']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-fonster2-', req.body['first.fonster']))

    mail.personalizations[0].addSubstitution(new helper.Substitution('-brunnar1-', req.body['second.brunnar']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-lageIFastigheten1-', req.body['second.lage']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-vattenror1-', req.body['second.vattenror']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-vaggmaterialBetong1-', req.body['second.vaggmaterialBefintligtBadrum.betong']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-vaggmaterialMuradvagg1-', req.body['second.vaggmaterialBefintligtBadrum.muradvagg']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-vaggmaterialGipsskivor1-', req.body['second.vaggmaterialBefintligtBadrum.gipsskivor']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-vaggmaterialAnnat1-', req.body['second.vaggmaterialBefintligtBadrum.annatvaggmaterial']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-golvmaterialTrabjalklag1-', req.body['second.golvmaterialBefintligtBadrum.trabjalklag']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-golvmaterialBetonggolv1-', req.body['second.golvmaterialBefintligtBadrum.betonggolv']))
    mail.personalizations[0].addSubstitution(new helper.Substitution('-golvmaterialAnnat1-', req.body['second.golvmaterialBefintligtBadrum.annat']))

    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaVaggTapet1-', req.body['third.ytskiktVaggBefintligtBadrum.tapet']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaVaggKakel1-', req.body['third.ytskiktVaggBefintligtBadrum.kakel']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaVaggAnnat1-', req.body['third.ytskiktVaggBefintligtBadrum.annatytskikt']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaGolvVatrumsmatta1-', req.body['third.ytskiktGolvBefintligtBadrum.vatrumsmatta']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaGolvKlinker1-', req.body['third.ytskiktGolvBefintligtBadrum.klinker']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaGolvAnnat1-', req.body['third.ytskiktGolvBefintligtBadrum.annat']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-golvVarme1-', req.body['third.golvvarme']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-handdukstorkElburet1-', req.body['third.handdukstorkElementBefintligtBadrum.elementelburet']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-handdukstorkVattenburet1-', req.body['third.handdukstorkElementBefintligtBadrum.elementvattenburet']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-handdukstorkHanddukstork1-', req.body['third.handdukstorkElementBefintligtBadrum.handdukstork']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-handdukstorkIngenH1-', req.body['third.handdukstorkElementBefintligtBadrum.ingenhanddukstork']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-handdukstork1IngetE-', req.body['third.handdukstorkElementBefintligtBadrum.ingetelement']))
    //
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-WCStol1-', req.body['fourth.inredningBefintligtBadrum.wcstol']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-duschplats1-', req.body['fourth.inredningBefintligtBadrum.duschplats']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-tvattstall1-', req.body['fourth.inredningBefintligtBadrum.tvattstall']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-torktumlare1-', req.body['fourth.inredningBefintligtBadrum.torktumlare']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-tvattbank1-', req.body['fourth.inredningBefintligtBadrum.tvattbank']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-bide1-', req.body['fourth.inredningBefintligtBadrum.bide']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-badkar1-', req.body['fourth.inredningBefintligtBadrum.badkar']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-tvattmaskin1-', req.body['fourth.inredningBefintligtBadrum.tvattmaskin']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-tarkskap1-', req.body['fourth.inredningBefintligtBadrum.torkskap']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ovrigt1-', req.body['fourth.ovrigt']))
    //
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaVaggVatrumsmatta2-', req.body['fifth.ytskiktVaggNyaBadrummet.vatrumsmatta']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaVaggVatrumsskivor2-', req.body['fifth.ytskiktVaggNyaBadrummet.vatrumsskivor']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaVaggKakel2-', req.body['fifth.ytskiktVaggNyaBadrummet.kakel']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaVagg2Annat-', req.body['fifth.ytskiktVaggNyaBadrummet.annatytskikt']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaGolvVatrumsmatta2-', req.body['fifth.ytskiktGolvNyaBadrummet.vatrumsmattagolv']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaGolvKlinker2-', req.body['fifth.ytskiktGolvNyaBadrummet.klinker']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaGolvAnnat2-', req.body['fifth.ytskiktGolvNyaBadrummet.annat']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-golvvarme2-', req.body['fifth.golvvarmeNyaBadrummet']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-elementLrHanddukstorkElement-', req.body['fifth.elementHanddukstorkNyaBadrummet.element']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-elementLrHanddukstorkHandduk-', req.body['fifth.elementHanddukstorkNyaBadrummet.handdukstork']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-elementLrHanddukstorkEjElement-', req.body['fifth.elementHanddukstorkNyaBadrummet.ejelement']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-elementLrHanddukstorkEjHandduk-', req.body['fifth.elementHanddukstorkNyaBadrummet.ejhanddukstork']))

    // mail.personalizations[0].addSubstitution(new helper.Substitution('-WCStol2-', req.body['sixth.onskadInredningNyaBadrummet.wcstol']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-duschplats2-', req.body['sixth.onskadInredningNyaBadrummet.duschplats']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-tvattstall2-', req.body['sixth.onskadInredningNyaBadrummet.tvattstall']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-torktumlare2-', req.body['sixth.onskadInredningNyaBadrummet.torktumlare']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-tvattmaskin2-', req.body['sixth.onskadInredningNyaBadrummet.tvattmaskin']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-torkskap2-', req.body['sixth.onskadInredningNyaBadrummet.torkskap']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-bide2-', req.body['sixth.onskadInredningNyaBadrummet.bide']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-badkar2-', req.body['sixth.onskadInredningNyaBadrummet.badkar']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-tvattstall2-', req.body['sixth.onskadInredningNyaBadrummet.tvattstall']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-torktumlare2-', req.body['sixth.onskadInredningNyaBadrummet.torktumlare']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-tvattbank2-', req.body['sixth.onskadInredningNyaBadrummet.tvattbank']))
    // mail.personalizations[0].addSubstitution(new helper.Substitution('-ovrigt2-', req.body['sixth.ovrigtNyaBadrummet']))

    //Attach file
    // var attachment = new helper.Attachment()
    // var file = fs.readFileSync('my_file.txt')
    // var base64File = new Buffer(file).toString('base64')
    // attachment.setContent(base64File)
    // attachment.setType('application/text')
    // attachment.setFilename('my_file.txt')
    // attachment.setDisposition('attachment')
    // mail.addAttachment(attachment)

    mail.setTemplateId(process.env.SENDGRID_TEMPLATE_PRISKALKYL)

    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    })

    sg.API(request, function(error, response) {
      console.log(response.statusCode)
      console.log(response.body)
      console.log(response.headers)
    })
  })

/* "*"
* GET: All other routes
*/
app.get("/*", function(req, res) {
 console.log('req', req)
 console.log('res', res)
 res.sendFile(path.resolve(__dirname, 'dist/index.html'))
})
