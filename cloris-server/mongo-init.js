db.createUser(
    {
        user: "clorisowner",
        pwd: "clorisowner",
        roles: [
            {
                role: "readWrite",
                db: "cloris"
            }
        ]
    }
);