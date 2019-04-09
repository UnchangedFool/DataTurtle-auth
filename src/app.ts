import express from 'express';
import jwt from 'jsonwebtoken';
import * as user from './models/user';
import { RepoFindResult, RepoCreateResult } from './models/types';

const port: number = 3030;
const portDeployed: number = parseInt(process.env.PORT);
const app: express.Application = express();

app.get("/auth", (req, res) => {
    const password: string = req.query.password;
    const username: string = req.query.username;

    const repo: user.UserRepository = new user.UserRepository();
    
    repo.validateLogin(username, password).then(() => {

    }).catch((result: RepoFindResult<user.IUser>) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ msg: result.msg }));
    });
});

app.get("/", (req, res) => {
    res.redirect("/auth");
});

app.listen(port, () => console.log(`Listening to port ${port}`));