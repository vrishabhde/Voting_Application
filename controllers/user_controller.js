import Users from "../models/user.js";
import encrypt from "encryptjs";
import { CronJob } from "cron";



export const register = async (req, res) => {
    try {
        const { username, email, password, number } = req.body;

        const check_user_exist = await Users.findOne({ username }).exec();
        if (check_user_exist) return res.send("user already registered please proceeds to login..!");
        const secretkey = 'vrushabh';
        const plaintextForPassword = password;

        const ciphertextForPassword = encrypt.encrypt(plaintextForPassword, secretkey, 256);

        const chk = new Users({
            username: username,
            email: email,
            password: ciphertextForPassword,
            number: number
        });

        await chk.save();
        return res.status(200).json({ message: "registration success", status: "200" });

    } catch (err) {
        return res.send(err)
    }
}


let job = new CronJob('* * * * * *', async (req, res) => {


    const checkAdmin = await Users.findOne({ email: "admin" }).exec();

    if (checkAdmin) {
        console.log("admin already generated");
    } else {
        const newadmin = new Users({
            email: "admin",
            username: "admin",
            password: "admin",
            number: 12345,
            isadmin: true
        });
        await newadmin.save();
        console.log("admin generated successfully");
    }

})
// job.start();



export const check_login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username) return res.send("username is required");
        if (!password) return res.send("password is required");

        const check_user_register = await Users.findOne({ username }).exec();

        if (!check_user_register) return res.send("user not found please register");

        let secretkey = 'vrushabh';
        const decipherforpassword = encrypt.decrypt(check_user_register.password, secretkey, 256);

        if (decipherforpassword !== password) return res.send("credentials wrong");
        return res.send("login success");

    } catch (error) {
        return res.send(error);
    }
}


export const updatefields = async (req, res) => {
    try {
        const {username,password} = req.body;
        const user_exist = await Users.findOneAndUpdate({username},{username,email,password,number}).exec();
         return res.send("success");
    } catch (error) {
        return res.send(error);
    }
}
