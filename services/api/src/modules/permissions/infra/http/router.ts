import express from 'express';

import { CreatePermissionController } from '../../use-cases/create-permission';
import { ListAllPermissionsController } from '../../use-cases/list-all-permissions';
import { DeletePermissionController } from '../../use-cases/delete-permission';
import { ListSpecificPermissionController } from '../../use-cases/list-specific-permission';
import { EditPermissionController } from '../../use-cases/edit-permission';

// eslint-disable-next-line new-cap
export const permissionsRouter = express.Router();

permissionsRouter.get('/', ListAllPermissionsController);
permissionsRouter.get('/:id', ListSpecificPermissionController);

permissionsRouter.post('/', CreatePermissionController);
permissionsRouter.put('/:id', EditPermissionController);
permissionsRouter.delete('/:id', DeletePermissionController);
