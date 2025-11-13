import express from "express";
import { prisma } from "db/client";

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/users", async (req, res) => {
    try{
        const users = await prisma.user.findMany();
        res.json(users)
    }catch(error){
        res.status(500).json({
            error: error instanceof Error ?  error.message : "Internal server error"
        })
    }
})

app.post("/user", async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).json({
            error: "email and password are required"
        })
        return;
    }

    try{
        const user = await prisma.user.create({
            data: {
                email,
                password
            }
        })
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({error: error instanceof Error ? error.message : "Something went wrong"})
    }
})

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});