async function getTasks(parent, args, context) {
    const where = args.filter
        ? {
            OR: [
                {category: {contains: args.filter}},
            ]
        }
        : {};

    const tasks = await context.prisma.task.findMany({
        where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy,
        include: {
            todo: true,
            createdBy: {
                // I don't want the email being returned in task into, so I am only selecting the id and name fields
                // from createdBy
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    const count = await context.prisma.task.count({where});

    console.log(tasks);
    console.log(count);

    return tasks;
}

async function getUsers(parent, args, context) {
    return await context.prisma.user.findMany({})
}


module.exports = {
    getTasks,
    getUsers
};