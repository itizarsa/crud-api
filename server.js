const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const logger = require("morgan")
const chalk = require("chalk")
const path = require("path")
const { v4: uuidv4 } = require("uuid")

dotenv.config({ path: "./config/config.env" })

const app = express()
const PORT = process.env.PORT
const env = process.env.NODE_ENV
const green = chalk.green.bold
const cyan = chalk.cyan.bold
const red = chalk.red.bold

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

const firstName = [
	"Adam",
	"Alex",
	"Aaron",
	"Ben",
	"Carl",
	"Dan",
	"David",
	"Edward",
	"Fred",
	"Frank",
	"George",
	"Hal",
	"Hank",
	"Ike",
	"John",
	"Jack",
	"Joe",
	"Casal",
	"Cataldi",
	"Caswell",
	"Celedon",
	"Chambers",
	"Chapman",
	"Christensen",
	"Darnell",
	"Davidson",
	"Davis",
	"DeLorenzo",
	"Dinkins",
	"Doran",
	"Dugelman",
	"Dugan",
	"Duffman",
	"Eastman",
	"Ferro",
	"Ferry",
	"Fletcher",
	"Fietzer",
	"Hylan",
	"Hydinger",
	"Illingsworth",
	"Ingram",
	"Irwin",
	"Jagtap",
	"Jenson",
	"Johnson",
	"Johnsen",
	"Jones",
	"Jurgenson",
	"Kalleg",
	"Kaskel",
	"Keller",
	"Leisinger",
	"LePage",
	"Lewis",
	"Linde",
	"Lulloff",
	"Maki",
	"Martin",
	"McGinnis",
	"Mills",
	"Moody",
	"Moore",
	"Napier",
	"Nelson",
	"Norquist",
	"Nuttle",
	"Olson",
	"Ostrander",
	"Reamer",
	"Reardon",
	"Reyes",
	"Rice",
	"Ripka",
	"Roberts",
	"Rogers",
	"Root",
	"Sandstrom",
	"Sawyer",
	"Schlicht",
	"Schmitt",
	"Schwager",
	"Schutz",
	"Schuster",
	"Tapia",
	"Thompson",
	"Tiernan",
	"Tisler"
]

const lastName = [
	"Anderson",
	"Ashwoon",
	"Aikin",
	"Bateman",
	"Bongard",
	"Bowers",
	"Boyd",
	"Cannon",
	"Cast",
	"Deitz",
	"Dewalt",
	"Ebner",
	"Frick",
	"Hancock",
	"Haworth",
	"Hesch",
	"Hoffman",
	"Kassing",
	"Knutson",
	"Lawless",
	"Lawicki",
	"Mccord",
	"McCormack",
	"Miller",
	"Myers",
	"Nugent",
	"Ortiz",
	"Orwig",
	"Ory",
	"Paiser",
	"Pak",
	"Pettigrew",
	"Quinn",
	"Quizoz",
	"Ramachandran",
	"Resnick",
	"Sagar",
	"Schickowski",
	"Schiebel",
	"Sellon",
	"Severson",
	"Shaffer",
	"Solberg",
	"Soloman",
	"Sonderling",
	"Soukup",
	"Soulis",
	"Stahl",
	"Sweeney",
	"Tandy",
	"Trebil",
	"Trusela",
	"Trussel",
	"Turco",
	"Uddin",
	"Uflan",
	"Ulrich",
	"Upson",
	"Vader",
	"Vail",
	"Valente",
	"Van Zandt",
	"Vanderpoel",
	"Ventotla",
	"Vogal",
	"Wagle",
	"Wagner",
	"Wakefield",
	"Weinstein",
	"Weiss",
	"Woo",
	"Yang",
	"Yates",
	"Yocum",
	"Zeaser",
	"Zeller",
	"Ziegler",
	"Bauer",
	"Baxster"
]

const genUser = (_, index) => {
	return {
		userId: uuidv4(),
		firstName: firstName[index],
		lastName: lastName[index],
		id: index + 1
	}
}

const users = Array.from({ length: 50 }, genUser)

app.get("/users", (req, res, next) => {
	res.status(200).json({ message: "Success", users: users, count: users.length })
})

app.get("/user/:id", (req, res, next) => {
	try {
		const id = Number(req["params"]["id"])

		const user = users.find((elem) => elem["id"] === id)

		if (!user) throw new Error("User not found")

		res.status(200).json({ message: "Success", user: user })
	} catch (error) {
		error["status"] = error["message"] === "User not found" ? 404 : 500

		next(error)
	}
})

app.post("/users", (req, res, next) => {
	const { firstName, lastName } = req["body"]

	const user = {
		userId: uuidv4(),
		firstName: firstName,
		lastName: lastName,
		id: users.length + 1
	}

	users.push(user)

	res.status(201).json({ message: "Successfully Created", user: user })
})

app.put("/user/:id", (req, res, next) => {
	try {
		const { firstName, lastName } = req["body"]

		const id = Number(req["params"]["id"])

		const user = users.find((elem) => elem["id"] === id)

		if (!user) throw new Error("Id Not Found")

		users[id - 1]["firstName"] = firstName ? firstName : user["firstName"]

		users[id - 1]["lastName"] = lastName ? lastName : user["lastName"]

		res.status(200).json({ message: "Successfully Modified - PUT", user: users[id - 1] })
	} catch (error) {
		error["status"] = error["message"] === "Id Not Found" ? 404 : 500

		next(error)
	}
})

app.patch("/user/:id", (req, res, next) => {
	try {
		const { firstName, lastName } = req["body"]

		const id = Number(req["params"]["id"])

		const user = users.find((elem) => elem["id"] === id)

		if (!user) throw new Error("Id Not Found")

		users[id - 1]["firstName"] = firstName

		users[id - 1]["lastName"] = lastName

		res.status(200).json({ message: "Successfully Modified - PATCH", user: users[id - 1] })
	} catch (error) {
		error["status"] = error["message"] === "Id Not Found" ? 404 : 500

		next(error)
	}
})

app.delete("/user/:id", (req, res, next) => {
	try {
		const id = Number(req["params"]["id"])

		const user = users.find((elem) => elem["id"] === id)

		if (!user) throw new Error("Data Not Available!")

		users.splice(id, 1)

		res.status(200).json({ message: "Successfully Deleted", user: user })
	} catch (error) {
		error["status"] = error["message"] === "Data Not Available!" ? 404 : 500

		next(error)
	}
})

app.use((error, req, res, next) => {
	if (error.response) {
		res.status(error.response.status || 500).json({
			message: error.response.data === " " ? "Something Went Wrong" : error.response.data,
			stack: env === "production" ? "🍔" : error.stack
		})
	} else {
		res.status(error.status || 500).json({
			message: error.message,
			stack: env === "production" ? "🍔" : error.stack
		})
	}
})

process.on("unhandledRejection", (reason, p) => {
	throw reason
})

process.on("uncaughtException", (error) => {
	console.log(red("Uncaught Exception ✗", error))

	process.exit(1)
})

app.listen(PORT, () =>
	console.log(`${green("✓")} ${cyan(` App is running at port ${PORT} in ${env} mode.`)}`)
)
