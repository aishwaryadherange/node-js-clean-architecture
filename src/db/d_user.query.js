import mysql from 'mysql2'
let TABLE_NAME = 'd_users';

export function getUser() {
    let query = `select id as user_id, name, email, age, weight, height, is_active, created_at, updated_at from ${TABLE_NAME} where is_active = 1`;
    return mysql.format(query);
}

export function addUser(data) {
    return mysql.format(
        `insert into ` + TABLE_NAME + ` (id, name, email, age, weight, height, is_active, created_at, updated_at)  
         values (null, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`,
        [data.name, data.email, data.age, data.weight, data.height]);
}

export function updateUser(data) {
    return mysql.format(
        `update ` + TABLE_NAME + `
         set age = ? , weight = ? , height = ?, updated_at = CURRENT_TIMESTAMP()
         where id = ? and is_active = 1 and id > 0;`,
        [data.age, data.weight, data.height, data.user_id]);
}

export function deleteUser(data) {
    return mysql.format(
        `update ` + TABLE_NAME + `
         set is_active = 0, updated_at = CURRENT_TIMESTAMP()
         where id = ? and is_active = 1 and id > 0;`,
        [data.user_id]);
}