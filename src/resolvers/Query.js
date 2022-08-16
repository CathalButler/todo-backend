const {AuthenticationError} = require("apollo-server");

async function getAllUserTasksById(parent, args, context) {
    // If the user is not authenticated they can not retrieve data from the server
    if (!context.userId) return AuthenticationError;

    const tasks = await context.prisma.task.findMany({
        where: {
            createdBy: {
                id: context.userId
            }
        },
        take: args.take,
        orderBy: args.orderBy,
        include: {
            todos: true,
            createdBy: {
                // I don't want the email being returned in task into, so I am only selecting the id and name fields
                // from createdBy
                select: {
                    id: false,
                    name: true
                }
            }
        }
    });

    console.log(tasks);

    return tasks;
}

//
// async function getUsers(parent, args, context) {
//     return await context.prisma.user.findMany({})
// }


module.exports = {
    getAllUserTasksById,
    // getUsers,
};