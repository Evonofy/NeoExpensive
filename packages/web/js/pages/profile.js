import { useSelector } from '../hooks/useSelector.js';
import { useAuth } from '../hooks/useAuth.js';

const userName = useSelector('.profile--name span');
const userImg = useSelector('.profile--avatar img');

const { user } = useAuth();

userName.innerHTML = user.username;

/* just change the img src */
userImg.src = `https://avatars.dicebear.com/api/identicon/${user.id}.svg`;
