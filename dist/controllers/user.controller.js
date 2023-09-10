import { Permissions } from '../db/entity/permissions.entity.js';
import { Role } from '../db/entity/role.entity.js';
import { User } from '../db/entity/user.entity.js';
import { In } from 'typeorm';
const insertRole = async (payload) => {
    try {
        const role = new Role();
        role.name = payload.name;
        role.permissions = await Permissions.findBy({
            id: In(payload.permissions)
        });
        await role.save();
        return role;
    }
    catch (error) {
        throw ("Something went wrong");
    }
};
const insertPermission = async (payload) => {
    try {
        const permission = Permissions.create({
            name: payload.name
        });
        await permission.save();
        return permission;
    }
    catch (error) {
        console.log(error);
        throw ("Something went wrong" + error);
    }
};
const assignRoleToUser = async (payload) => {
    try {
        const user = await User.findOne({ where: { id: payload.userId } });
        const roles = await Role.findBy({id: In(payload.roleIds)});
        if (!user.roles) {
            user.roles = []; // Initialize roles as an empty array if it's undefined
          }
        user.roles.push(...roles);
        
        await user.save();
        return user.roles;
    }
    catch (error) {
        console.log(error);
        throw ("Something went wrong" + error);
    }
};
export { insertPermission, insertRole, assignRoleToUser };
