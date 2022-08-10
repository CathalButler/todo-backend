// This resolver gathers the 'createdBy' user account id to attach to a Task.
function createdBy(parent, args, context) {
    return context.prisma.task
        .findUnique({where: {id: parent.id}})
        .createdBy();
}


//Export createdBy
module.exports = {
    createdBy
};
