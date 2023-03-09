import User from '../models/user.js';
import {createError} from '../utils/error.js'
import validator  from 'validator'



// ** Create User

export const createUser = async (req, res, next) => {
    try {
        const { fullName, nameWithInitials, displayName, gender, dateOfBirth, email, mobileNumber, designation, employeeType, joinedDate, experience, salary, personalNotes, password } = req.body;

        const requiredFields = ['fullName', 'nameWithInitials', 'displayName', 'gender', 'dateOfBirth', 'email', 'mobileNumber', 'designation', 'employeeType', 'joinedDate', 'experience', 'salary', 'personalNotes'];

        const missingFields = requiredFields.filter(field => validator.isEmpty(req.body[field]));

        if (missingFields.length > 0) {
            return next(createError(400, `Missing required fields: ${missingFields.join(', ')}`));
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return next(createError(400, "User with this email already exists!"));
        }

        const newUser = new User({
            fullName,
            nameWithInitials,
            displayName,
            gender,
            dateOfBirth,
            email,
            mobileNumber,
            designation,
            employeeType,
            joinedDate,
            experience,
            salary,
            personalNotes,
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully!" });

    } catch (err) {
        next(err);
    }
}

// ** Read
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()

        res.status(200).json(users)
        console.log(users);

    }
    catch (err) {
        next(err)
    }
}


export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)

        res.status(200).json(user)

    }
    catch (err) {
        next(err)

    }
}


// ** Update
export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true
            })

        res.status(200).json(user)

    }
    catch (err) {
        next(err)
    }
}


// ** DELETE
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)

        res.status(204).json("User has been deleted!")

    }
    catch (err) {
        next(err)
    }
}