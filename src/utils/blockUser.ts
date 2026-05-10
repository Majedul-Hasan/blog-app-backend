const blockUser = (user: any) => {
    if (user?.isBlocked) {
        throw new Error(`Access Denied, ${user?.firstName} is blocked`)
    }
}

export default blockUser