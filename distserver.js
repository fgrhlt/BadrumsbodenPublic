var express = require("express")
var path = require("path")
var bodyParser = require("body-parser")
var cloudinary = require('cloudinary')

var multer  = require('multer')
var upload = multer({ dest: 'uploads/', limits: {fileSize: 1000 * 1000 * 15}})

var mongodb = require("mongodb")
var ObjectID = mongodb.ObjectID
var fs = require('fs')

var PRODUCTS_COLLECTION = 'products'
var CAMPAIGN_COLLECTION = 'campaign'
var GALLERY_COLLECTION = 'gallery'
var CATEGORIES_COLLECTION = 'categories'

var app = express()

app.use(require('prerender-node'))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw({limit: '15mb'}))

cloudinary.config({
  cloud_name: process.env.cloduinary_cloud_name,
  api_key: process.env.cloduinary_api_key,
  api_secret: process.env.cloduinary_api_secret
})

// INITIALIZE DATABASE
var db
// Connect to the database before starting the application server.
  mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    // Save database object from the callback for reuse.
    db = database
    console.log("Database connection ready")

    // Initialize the app.
    var server = app.listen(process.env.PORT || 5000, function () {
      var port = server.address().port
      console.log("App now running on port", port)
    })
  })

//-------ROUTING------

// Generic error handler used by all endpoints.
  function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason)
    res.status(code || 500).json({"error": message})
  }

// "/products"

  app.post("/products", function(req, res) {
    var newProduct = req.body
    newProduct.createDate = new Date()

    db.collection(PRODUCTS_COLLECTION).insertOne(newProduct, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.")
      } else {
        res.status(201).json(doc.ops[0])
      }
    })
  })

  app.get("/products/:query/:value", function(req, res) {
    var query = req.params.query
    var value = req.params.value
    if (query=="starred") {
      if (value=="true") {
        value = true
      }else {
        value = false
      }
    }

    if (query=="articleNr") {
      db.collection(PRODUCTS_COLLECTION).findOne({[query]: value}, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to get contact");
        } else {
          res.status(200).json(doc);
        }
      })
     } else if(query=="search"){
      db.collection(PRODUCTS_COLLECTION).find({ $or:[{ "productName": {$regex : ".*"+value+".*"} }, { "articleNr": {$regex : ".*"+value+".*"} }] }).toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get products.");
        } else {
          res.status(200).json(docs);
        }
      })
    }
     else {
      db.collection(PRODUCTS_COLLECTION).find({[query]: value}).toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get products.");
        } else {
          res.status(200).json(docs);
        }
      })
    }
  })

  app.get("/products/:query/:value/:value2", function(req, res) {
    var query = req.params.query
    var value = req.params.value
    var value2 = req.params.value2

    if(query=="fetchSupplier"){
      db.collection(PRODUCTS_COLLECTION).find({ $and:[{ "subcategory": {$regex : ".*"+value+".*"} }, { "supplier": {$regex : ".*"+value2+".*"} }] }).toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get products.");
        } else {
          res.status(200).json(docs);
        }
      })
    } else if(query=="fetchSeries"){
      db.collection(PRODUCTS_COLLECTION).find({ $and:[{ "supplier": {$regex : ".*"+value+".*"} }, { "series": {$regex : ".*"+value2+".*"} }] }).toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get products.");
        } else {
          res.status(200).json(docs);
        }
      })
    }
  })

  app.put("/products/:id", function(req, res) {
    db.collection(PRODUCTS_COLLECTION).updateOne(
      {_id: new ObjectID(req.params.id)},
      {$set: { "starred" : req.body.starred }}, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to get contact");
        } else {
          res.status(200).json(doc);
        }
      })
  })

  app.delete("/products/:id", function(req, res) {
    db.collection(PRODUCTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete product")
      } else {
        res.status(204).end();
      }
    })
  })

  // "/campaign"
  app.get("/campaign/:type", function(req, res) {
    var type = req.params.type

    db.collection(CAMPAIGN_COLLECTION).find({ type }).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get products.")
      } else {
        res.status(200).json(docs)
      }
    })
  })

  app.post("/campaign/:type", function(req, res) {
    var body = req.body
    var type = req.params.type
    let err = null

    try {
      db.collection(CAMPAIGN_COLLECTION).updateOne(
        { type },
        { $set: body },
        { upsert: true }
      )
    }catch (error) {
      err = error
      print(error);
    }

    if (!err) {
      res.send('success!')
    }
  })

  // "/gallery"

  app.post("/gallery", function(req, res) {
    var newProduct = req.body;
    newProduct.createDate = new Date();

    db.collection(GALLERY_COLLECTION).insertOne(newProduct, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    })
  })

  app.get("/gallery/:type", function(req, res) {
    var type = req.params.type

    db.collection(GALLERY_COLLECTION).find({ type }).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get products.");
      } else {
        res.status(200).json(docs);
      }
    })
  })

  app.delete("/gallery/:id", function(req, res) {
    db.collection(GALLERY_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete product");
      } else {
        res.status(204).end();
      }
    });
  })

  // "/categories"

  app.get("/categories", function(req, res) {
    db.collection(CATEGORIES_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get products.");
      } else {
        res.status(200).json(docs);
      }
    });
  });

  // "/image"
  app.post('/image', upload.single('file'), function (req, res, next) {
    cloudinary.uploader.upload(req.file.path, function(result) {
      res.send({url: result.secure_url, img_id: result.public_id})
    })
  })

  app.delete('/image/:id', function (req, res, next) {
    var arr = []
    arr.push(req.params.id)
    cloudinary.api.delete_resources(arr,
      function(result){
        res.send({'result': result})
      })
    })

  /* "/payment"
  * POST: Return the checkout object
  */
  app.post("/payment", function(req, res) {
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
    var vendorId = process.env.vendorId
    var apiKey = process.env.paysonApiKey

    /**
    * Create instance
    * @type {object}
    */
    var payson = new PaysonPayment.Payson(vendorId, apiKey, true)

    // create a checkout TODO
    var checkout = new PaysonPayment.Checkout('Webbshop', 'http://localhost:5000/webshop/confirmation', 'https://www.example.com', 'https://www.example.com/api/incoming/payment', 'http://localhost:5000/webshop')

    /**
    * Create items
    * @type {PaysonPayment}
    */
    let items = req.body.data
    if (items) {
      items.forEach(function(item) {
        // create item
        var item = new PaysonPayment.OrderItem(item[0], item[1], item[2], item[3])
        //add item to checkout
        checkout.addItem(item)
      })
    }

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
    var helper = require('sendgrid').mail
    var from_email = new helper.Email(req.body['epost'])
    var to_email = new helper.Email('00badrumsboden@gmail.com')
    var subject = 'VVS-förfrågan från Badrumsboden.se'
    var content = new helper.Content(
      'text/html', 'test')
      var mail = new helper.Mail(from_email, subject, to_email, content)

      mail.personalizations[0].addSubstitution(new helper.Substitution('-namn-', req.body['namn']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-telefonnummer-', req.body['telefonNummer']))
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
        res.sendStatus(response.statusCode)
      })
  })

  /* "/email/priskalkyl"
  * POST: Send email to specified address
  */
  app.post("/email/priskalkyl", upload.single('file'), function(req, res) {
    let data = JSON.parse(req.body.data)

    var helper = require('sendgrid').mail
    var from_email = new helper.Email(data['first.Epost'])
    var to_email = new helper.Email('00badrumsboden@gmail.com')
    var subject = 'Priskalkyl från Badrumsboden.se'
    var content = new helper.Content('text/html', 'test')
    var mail = new helper.Mail(from_email, subject, to_email, content)

      mail.personalizations[0].addSubstitution(new helper.Substitution('-namn-', data['first.Namn']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-telefon-', data['first.Telefon']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-epost-', data['first.Epost']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-adress-', data['first.Adress']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-byggar-', data['first.Byggår']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-bredd-', data['first.Bredd']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-langd-', data['first.Längd']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-takhojd-', data['first.Takhöjd']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-fonster-', data['first.Fönster']))

      mail.personalizations[0].addSubstitution(new helper.Substitution('-brunnar1-', data['second.Brunnar']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-lageIFastigheten1-', data['second.Läge']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-vattenror1-', data['second.Vattenrör']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-vaggmaterialBetong1-', data['second.VäggmaterialBefintligtBadrum.Betong']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-vaggmaterialMuradvagg1-', data['second.VäggmaterialBefintligtBadrum.Murad_vägg']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-vaggmaterialGipsskivor1-', data['second.VäggmaterialBefintligtBadrum.Gipsskivor']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-vaggmaterialAnnat1-', data['second.VäggmaterialBefintligtBadrum.Annat_väggmaterial']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-golvmaterialTrabjalklag1-', data['second.GolvmaterialBefintligtBadrum.Träbjälklag']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-golvmaterialBetonggolv1-', data['second.GolvmaterialBefintligtBadrum.Betonggolv']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-golvmaterialAnnat1-', data['second.GolvmaterialBefintligtBadrum.Annat']))

      mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaVaggTapet1-', data['third.YtskiktVÄggBefintligtBadrum.Tapet']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaVaggKakel1-', data['third.YtskiktVÄggBefintligtBadrum.Kakel']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaVaggAnnat1-', data['third.YtskiktVÄggBefintligtBadrum.Annat_ytskikt']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaGolvVatrumsmatta1-', data['third.YtskiktGolvBefintligtBadrum.Våtrumsmatta']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaGolvKlinker1-', data['third.YtskiktGolvBefintligtBadrum.Klinker']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaGolvAnnat1-', data['third.YtskiktGolvBefintligtBadrum.Annat']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-tredjegolvvarme-', data['third.Golvvärme']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-handdukstork1-', data['third.HanddukstorkElementBefintligtBadrum.Element_elburet']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-handdukstork2-', data['third.HanddukstorkElementBefintligtBadrum.Inget_element']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-handdukstork3-', data['third.HanddukstorkElementBefintligtBadrum.Ingen_handdukstork']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-handdukstork4-', data['third.HanddukstorkElementBefintligtBadrum.Element_vattenburet']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-handdukstork5-', data['third.HanddukstorkElementBefintligtBadrum.Handdukstork']))

      mail.personalizations[0].addSubstitution(new helper.Substitution('-WCStol1-', data['fourth.InredningBefintligtBadrum.WC_stol']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-duschplats1-', data['fourth.InredningBefintligtBadrum.Duschplats']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-tvattstall1-', data['fourth.InredningBefintligtBadrum.Tvättställ']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-torktumlare1-', data['fourth.InredningBefintligtBadrum.Torktumlare']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-tvattbank1-', data['fourth.InredningBefintligtBadrum.Tvättbänk']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-bide1-', data['fourth.InredningBefintligtBadrum.Bidé']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-badkar1-', data['fourth.InredningBefintligtBadrum.Badkar']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-tvattmaskin1-', data['fourth.InredningBefintligtBadrum.Tvättmaskin']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-tarkskap1-', data['fourth.InredningBefintligtBadrum.Torkskåp']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-ovrigt1-', data['fourth.Övrigt']))

      mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaVaggVatrumsmatta2-', data['fifth.YtskiktVäggNyaBadrummet.Våtrumsmatta']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaVaggVatrumsskivor2-', data['fifth.YtskiktVäggNyaBadrummet.Våtrumsskivor']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaVaggKakel2-', data['fifth.YtskiktVäggNyaBadrummet.Kakel']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaVagg2Annat-', data['fifth.YtskiktVäggNyaBadrummet.Annat_ytskikt']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaGolvVatrumsmatta2-', data['fifth.YtskiktGolvNyaBadrummet.Våtrumsmatta_golv']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaGolvKlinker2-', data['fifth.YtskiktGolvNyaBadrummet.Klinker']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-ytskiktPaGolvAnnat2-', data['fifth.YtskiktGolvNyaBadrummet.Annat']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-golvvarme2-', data['fifth.GolvvärmeNyaBadrummet']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-elementLrHanddukstorkElement-', data['fifth.ElementHanddukstorkNyaBadrummet.Element']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-elementLrHanddukstorkEjElement-', data['fifth.ElementHanddukstorkNyaBadrummet.Ej_element']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-elementLrHanddukstorkHandduk-', data['fifth.ElementHanddukstorkNyaBadrummet.Handdukstork']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-elementLrHanddukstorkEjHandduk-', data['fifth.ElementHanddukstorkNyaBadrummet.Ej_handdukstork']))

      mail.personalizations[0].addSubstitution(new helper.Substitution('-WCStol2-', data['sixth.ÖnskadInredningNyaBadrummet.WC_stol']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-duschplats2-', data['sixth.ÖnskadInredningNyaBadrummet.Duschplats']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-tvattstall2-', data['sixth.ÖnskadInredningNyaBadrummet.Tvättställ']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-torktumlare2-', data['sixth.ÖnskadInredningNyaBadrummet.Torktumlare']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-tvattmaskin2-', data['sixth.ÖnskadInredningNyaBadrummet.Tvättmaskin']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-torkskap2-', data['sixth.ÖnskadInredningNyaBadrummet.Torkskåp']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-bide2-', data['sixth.ÖnskadInredningNyaBadrummet.Bidé']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-badkar2-', data['sixth.ÖnskadInredningNyaBadrummet.Badkar']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-tvattstall2-', data['sixth.ÖnskadInredningNyaBadrummet.Tvättställ_med_underskåp']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-tvattbank2-', data['sixth.ÖnskadInredningNyaBadrummet.Tvättbänk']))
      mail.personalizations[0].addSubstitution(new helper.Substitution('-ovrigt2-', data['sixth.ÖvrigtNyaBadrummet']))

      var filesent = false
      //Attach file
      if (req.file) {
        var attachment = new helper.Attachment()
        var file = fs.readFileSync(req.file.path)
        var base64File = new Buffer(file).toString('base64')
        attachment.setContent(base64File)
        attachment.setType(req.file.mimetype)
        attachment.setFilename(req.file.originalname)
        attachment.setDisposition('attachment')
        mail.addAttachment(attachment)
        filesent = true
      }
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
        res.sendStatus(response.statusCode)
      }, () => {
        if (filesent) {
          //remove local file
          fs.unlink(req.file.path, function(err) {
            if (err) { return console.error(err) }
          })
        }
      }
    )
  })

  /* "*"
  * USE: All other routes
  */
  app.use('*', express.static(path.join(__dirname, 'dist')))