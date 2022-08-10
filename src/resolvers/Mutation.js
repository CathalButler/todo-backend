const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {APP_SECRET} = require('../utils');

// This function handles creating a new task
async function createTask(parent, args, context) {
    //Variables
    let createdBy = undefined
    // Constants
    const {userId} = context;
    // Get user ID

    if (userId) {
        createdBy = {connect: {id: userId}}
    }

    const newTask = await context.prisma.task.create({
        data: {
            title: args.title,
            category: args.category,
            createdBy
            // todo: args.todo
        }
    });

    return newTask;
}

// This function handles updating a task
async function updateTask(parent, args, context) {
    //Variables
    let createdBy = undefined
    // Constants
    const {userId} = context;
    const updateTask = await context.prisma.task.update({
        where: {
            id: args.id
        },
        data: {
            title: args.title,
            category: args.category,
            // createdBy
            // todo: args.todo
        }
    });

    if (userId) {
        createdBy = {connect: {id: userId}}
    }

    return updateTask;
}

// This function handles deleting a task
async function deleteTask(parent, args, context, info) {
    // Constants
    return await context.prisma.task.delete({
        where: {
            id: args.id
        }
    });
}


// This function handles creating, updating and deleting of a user account
async function signup(parent, args, context, info) {
    // Hash Password with bcrypt
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.user.create({
        data: {...args, password}
    });

    const token = jwt.sign({userId: user.id}, APP_SECRET);

    return {
        token,
        user
    };
}

// This function handles the login of a user account.
async function login(parent, args, context, info) {
    // User account is checked by email:
    console.log(args);

    const user = await context.prisma.user.findUnique({
        where: {email: args.email}
    });

    // If the user does not exist:
    if (!user) {
        throw new Error('No such user found');
    }

    // If user does exist, compare the password provided with the bcrypt once stored in the DB:
    const valid = await bcrypt.compare(
        args.password,
        user.password
    );

    if (!valid) {
        throw new Error('Invalid password');
    }

    // Create a new token once a user is authenticated
    const token = jwt.sign({userId: user.id}, APP_SECRET);

    return {
        token,
        user
    };
}

module.exports = {
    createTask, updateTask, deleteTask,
    signup,
    login,

}