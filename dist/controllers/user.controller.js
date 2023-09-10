import { User as userEntity } from '../db/entity/user.entity.js';
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
        const user = await userEntity.findOne({ where: { id: Number(payload.id) } });
        const roles = await Role.findBy({ id: In(payload.roles) });
        if (user) {
            if (!user.roles) {
                user.roles = []; // Initialize roles as an empty array if it's undefined
            }
            user.roles.push(...roles); // Use the spread operator to add multiple roles
            await user.save();
            return user;
        }
    }
    catch (error) {
        console.log(error);
        throw ("Something went wrong" + error);
    }
};
export { insertPermission, insertRole, assignRoleToUser };
