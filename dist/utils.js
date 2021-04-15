import { Role } from 'discord.js';
export const checkPermission = (member, permission) => {
    return member.permissions.has(permission) || false;
};
export const higherRole = (shouldBeHigher, shouldBeLower) => {
    return Role.comparePositions(shouldBeHigher, shouldBeLower) > 0 ? true : false;
};
export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};
export const clean = (text) => {
    if (typeof (text) === 'string') {
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    }
    else {
        return text;
    }
};
//# sourceMappingURL=utils.js.map