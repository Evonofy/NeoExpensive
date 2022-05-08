import express from 'express';

import { CreateRoleController } from '../../use-cases/create-role';
import { ListAllRolesController } from '../../use-cases/list-all-roles';
import { DeleteRoleController } from '../../use-cases/delete-role';
import { ListSpecificRoleController } from '../../use-cases/list-specific-role';
import { EditRoleController } from '../../use-cases/edit-role';

// eslint-disable-next-line new-cap
export const rolesRouter = express.Router();

rolesRouter.get('/', ListAllRolesController);
rolesRouter.get('/:id', ListSpecificRoleController);

rolesRouter.post('/', CreateRoleController);
rolesRouter.put('/:id', EditRoleController);
rolesRouter.delete('/:id', DeleteRoleController);
