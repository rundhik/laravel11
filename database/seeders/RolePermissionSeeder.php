<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /**
         * The Permission scaffolding concept
        * +-------------------------+-------------------------------------------------------------------------- +
        * | Permission              | Description                                                               |
        * +-------------------------+-------------------------------------------------------------------------- +
        * | manage                  | handle list page (index)                                                  |
        * | create                  | handle create button and subsequent store process                         |
        * | edit                    | handle edit button and subsequent update process                          |
        * | delete                  | handle delete button and subsequent destroy process                       |
        * | view                    | handle specific record page (show)                                        |
        * | verify                  | handle verifiying user email                                              |
        * | assign                  | handle permission to role assignment                                      |
        * +-------------------------+-------------------------------------------------------------------------- +
            * Note: another permission rule could be updated later
            */
        $permissions = [
            'user'                 => ['manage', 'create', 'edit', 'delete', 'view', 'verify'],
            'role'                 => ['manage', 'create', 'edit', 'delete', 'view', 'assign'],
            'permission'           => ['manage', 'create', 'edit', 'delete', 'view'],
        ];

        $superadmin = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Super Admin']);

        foreach ($permissions as $module => $modulePermissions) {
            foreach ($modulePermissions as $permission) {
                $p = \Spatie\Permission\Models\Permission::firstOrCreate(['name' => $permission.'-'.$module]);
                $p->assignRole($superadmin);
            }
        }

        $admin = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Admin']);
        $admin->syncPermissions([
            'manage-user', 'view-user', 'verify-user',
            'manage-role', 'view-role',
            'manage-permission', 'view-permission',
        ]);
    }
}
