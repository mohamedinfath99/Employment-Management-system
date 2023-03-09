import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    nameWithInitials: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    employeeType: {
        type: String,
        required: true,
    },
    joinedDate: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    personalNotes: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);

export default User;