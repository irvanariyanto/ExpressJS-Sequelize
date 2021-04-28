const express = require("express");
const models = require("../models");

const{ Op } = require("sequelize");

const getAllUser = async (req, res) => {
    const User = await models.User.findAndCountAll({
        where: {
            createdAt: {
              [Op.lt]: new Date()
            },
        }
    });
    res.status(200).send({
       status: 200,
       message: "Berhasil get data user",
       data: User, 
    });
}

const postUser = async (req, res) => {
    try{
        const {firstName, lastName, email, phone_number} = req.body;
        console.log(req.body);
        const User = await models.User.create({
            firstName,
            lastName,
            email,
            phone_number
        });

        res.status(200).send({ status: 200, message: "User berhasil ditambahkan", data: User });
    }catch(error){
        res.status(500).send({ status: 500, message: error.message });
    }
}
module.exports = { getAllUser, postUser };