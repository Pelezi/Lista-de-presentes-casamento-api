import app from "./app";

const port = process.env.APP_PORT || 3000;
const host = process.env.NODE_ENV;

app.get("/", (req, res) => {
    res.send("Modular Layer API Node + TypeScript!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port} and host ${host}!`);
});
