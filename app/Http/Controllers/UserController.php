<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Datatable
     */
    public function dataTable(Request $request)
    {
        $columns = [
            1 => 'id',
            2 => 'name',
            3 => 'username',
            4 => 'email',
            5 => 'email_verified_at',
        ];

        $search = [];

        $totalData = User::count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        if (empty($request->input('search.value'))) {
            $query = User::with('roles')
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();
        } else {
            $search = $request->input('search.value');

            $query = User::with('roles')
                ->where(function ($query) use ($search) {
                    $query->where('name', 'LIKE', "%{$search}%")
                        ->orWhere('email', 'LIKE', "%{$search}%")
                        ->orWhere('username', 'LIKE', "%{$search}%")
                        ->orWhereHas('roles', function ($q) use ($search) {
                            $q->where('name', 'LIKE', "%{$search}%");
                        });
                    })
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();

            $totalFiltered = User::where(function($query) use ($search) {
                $query->where('name', 'LIKE', "%{$search}%")
                        ->orWhere('email', 'LIKE', "%{$search}%")
                        ->orWhere('username', 'LIKE', "%{$search}%")
                        ->orWhereHas('roles', function ($q) use ($search) {
                            $q->where('name', 'LIKE', "%{$search}%");
                        });
                    })
                ->count();
        }

        $data = [];

        if(!empty($query)) {
            $ids = $start;

            foreach ($query as $q) {
                $nestedData['id'] = $q->id;
                $nestedData['fake_id'] = ++$ids;
                $nestedData['name'] = $q->name;
                $nestedData['username'] = $q->username;
                $nestedData['email'] = $q->email;
                $nestedData['role'] = $q->roles->first() ? $q->roles->first()->name : 'No Role';
                $nestedData['status'] = ($q->email_verified_at !== null ? 'Verified' : 'Unverified');
                $nestedData['avatar'] = $q->profile_photo_path;

                $data[] = $nestedData;
            }
        }

        if ($data) {
            return response()->json([
                'draw' => intval($request->input('draw')),
                'recordsTotal' => intval($totalData),
                'recordsFiltered' => intval($totalFiltered),
                'code' => 200,
                'data' => $data,
            ]);
        } else {
            return response()->json([
                'message' => __('Internal Server Error'),
                'code' => 500,
                'data' => [],
            ]);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['users'] = User::all()->count();
        $data['sessions'] = DB::table('sessions')->where('user_id', '!=', null)->get()->count();
        $data['roles'] = Role::all();
        return view('users.index',[
            'data' => $data,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->id) {
            $user = User::updateOrCreate([
                'id' => $request->id
            ], [
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
            ]);

            if (isset($request->photo)) {
                $user->updateProfilePhoto($request->photo);
            };

            $role = Role::findById(intval($request->role), 'web');

            $user->syncRoles($role);

            return response()->json(__('Updated'));

        } else {
            $user = User::updateOrCreate([
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            if (isset($request->photo)) {
                $user->updateProfilePhoto($request->photo);
            };

            $role = Role::findById(intval($request->role), 'web');

            $user->syncRoles($role);

            return response()->json(__('Created'));
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id): JsonResponse
    {
        $data = User::with('roles')->findOrFail($id);
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = User::where('id', $id)->delete();
    }
}
