import { Permissions } from '../db/entity/permissions.entity.js';
import { Role } from '../db/entity/role.entity.js';
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
export { insertPermission, insertRole, assignRoleToUser };
