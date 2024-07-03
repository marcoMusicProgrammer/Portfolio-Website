'use strict'

const http = require ("http") 
const express = require("express") 
const app = express() //Inizializza l'applicazione
const fs = require("fs")

const bodyParser  = require("body-parser")
const session = require("cookie-session")
const flashMiddleWare = require("./middleware/flash.js")

const path = require("path")
const ws = require("ws")
const cors = require("cors")
const helmet = require('helmet');

const server = http.createServer(app)
const PORT = process.env.PORT || 10002


// const wsServer = new ws.Server({server})

// wsServer.on("connection", (socket)=>{
//     console.log("A new user connected")
// })

const dataPath = path.resolve(__dirname, '../../../../../../data'); // Adjust this path as needed
const uploadPath = path.join(dataPath, 'uploads');
const dbFilePath = path.join(dataPath, 'database.json');

if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify([]));
}

app.use(express.static(__dirname+"/public"))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set("view engine","ejs")
app.use("/api",cors())


app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret: "prova",
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: "strict"
    }
}))

app.use(flashMiddleWare)

const staticRoutes = require ("./routes/static.route.js")
const apiRoutes = require ("./routes/api.route.js")
const contactRoutes = require ("./routes/contacts.route.js")
const servicesRouter = require("./routes/services.route.js")
const worksRouter = require("./routes/works.route.js")
const loginRouter = require("./routes/auth.route.js")
const { Cookie } = require("express-session")


app.use(staticRoutes)
app.use(apiRoutes)
app.use(contactRoutes)
app.use(servicesRouter)
app.use(worksRouter)
app.use(loginRouter)




// costruire pacchetto da mandare per la riproduzione di un file audio sul web

server.listen(PORT,()=>{
    console.log(`Server Listening on port  + ${PORT}`)
})

//comando per far partire: npm run devel