var User;
(function (User) {
    let UserType;
    (function (UserType) {
        UserType["company"] = "Admin";
        UserType["employee"] = "Dev";
        UserType["admin"] = "Demo";
    })(UserType = User.UserType || (User.UserType = {}));
})(User || (User = {}));
export { User };
