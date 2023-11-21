import { User } from 'devflikrauth';

function fullnamer(user: User) {
    return `${user.firstname} ${user.lastname || ""}`.trim();
}

export default fullnamer;