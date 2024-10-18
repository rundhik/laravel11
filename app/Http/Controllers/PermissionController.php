<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Datatable
     */
    public function dataTable(Request $request)
    {
        $columns = [
            1 => 'id',
            2 => 'name',
            3 => 'guard_name',
            4 => 'updated_at',
        ];

        $search = [];

        $totalData = Permission::count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        if (empty($request->input('search.value'))) {
            $query = Permission::offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();
        } else {
            $search = $request->input('search.value');

            $query = Permission::where('name', 'LIKE', "%{$search}%")
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();

            $totalFiltered = Permission::where('name', 'LIKE', "%{$search}%")
                ->count();
        }

        $data = [];

        if(!empty($query)) {
            $ids = $start;

            foreach ($query as $q) {
                $nestedData['id'] = $q->id;
                $nestedData['name'] = $q->name;
                $nestedData['updated_at'] = $q->updated_at;

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
        //
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
