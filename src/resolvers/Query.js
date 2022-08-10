async function getTasks(parent, args, context, info) {
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
    });

    const count = await context.prisma.task.count({where});

    console.log(tasks);
    console.log(count);

    return tasks;
}

async function getUsers(parent, args, context, info) {
    return await context.prisma.user.findMany({})
}


module.exports = {
    getTasks,
    getUsers
};