<?php

namespace App\Http\Controllers;

use App\Models\Microservice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class MicroserviceController extends Controller
{
    /**
     * Datatable
     */
    public function dataTable(Request $request)
    {
        $columns = [
            1 => 'id',
            2 => 'name',
            3 => 'slug',
            4 => 'base_url',
            5 => 'token',
            6 => 'methods',
        ];

        $search = [];

        $totalData = Microservice::count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        if (empty($request->input('search.value'))) {
            $query = Microservice::offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();
        } else {
            $search = $request->input('search.value');

            $query = Microservice::where('name', 'LIKE', "%{$search}%")
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();

            $totalFiltered = Microservice::where('name', 'LIKE', "%{$search}%")
                ->count();
        }

        $data = [];

        if(!empty($query)) {
            $ids = $start;

            foreach ($query as $q) {
                $nestedData['id'] = $q->id;
                $nestedData['fake_id'] = ++$ids;
                $nestedData['name'] = $q->name;
                $nestedData['slug'] = $q->slug;
                $nestedData['url'] = $q->base_url;
                $nestedData['token'] = $q->token;
                $nestedData['methods'] = $q->methods;

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
        return view('microservices.index');
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'name' => 'required|string',
                'url' => 'required|url',
                'token' => 'nullable|string',
                'methods' => 'required|array',
            ]);

            if ($request->id) {
                $data = Microservice::updateOrCreate(
                    ['id' => $request->id],
                    [
                        'name' => $validated['name'],
                        'slug' => Str::slug($validated['name']),
                        'base_url' => $validated['url'],
                        'token' => $validated['token'],
                        'methods' => $validated['methods'],
                    ],
                );

                return response()->json(__('Updated'));

            } else {
                $data = Microservice::where('name', $request->name)->first();

                if (empty($data)) {
                    // Generate token otomatis (opsional)
                    $response = Http::withHeaders([
                        'api-gateway-key' => config('variables.gateway'),
                    ])->post($validated['url'] . '/generate-token');

                    if (!$response->successful()) {
                        return response()->json($response->json(), $response->status());
                    } else {
                        $validated['token'] = $response->json('token');
                    }

                    $data = Microservice::updateOrCreate(
                        ['id' => $request->id],
                        [
                            'name' => $validated['name'],
                            'slug' => Str::slug($validated['name']),
                            'base_url' => $validated['url'],
                            'token' => $validated['token'],
                            'methods' => $validated['methods'],
                        ],
                    );
                    return response()->json(__('Created'));
                } else {
                    return response()->json(['message' => __('Already exists')], 422);
                }
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan!',
                'error' => $e->getMessage()
            ], 500);
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
        $data = Microservice::findOrFail($id);
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Microservice::where('id', $id)->delete();
    }
}
