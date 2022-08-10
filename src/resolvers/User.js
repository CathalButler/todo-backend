// // This resolver gathers tasks information for a User account.
function tasks(parent, args, context) {
    return context.prisma.user
        .findUnique({where: {id: parent.id}})
        .tasks();
}

// Exports tasks
module.exports = {
    tasks
};