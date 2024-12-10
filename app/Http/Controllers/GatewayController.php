<?php

namespace App\Http\Controllers;

use App\Models\Microservice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GatewayController extends Controller
{
    public function handle(Request $request, $microservice, $endpoint)
    {
        // Cari microservice berdasarkan slug
        $service = Microservice::where('slug', $microservice)->first();

        if (!$service) {
            return response()->json(['error' => 'Microservice not found'], 404);
        }

        // Tentukan method HTTP (GET, POST, PUT, DELETE)
        $method = strtolower($request->method());

        // Kirim permintaan ke microservice
        $url = rtrim($service->base_url, '/') . '/' . ltrim($endpoint, '/');
        $response = Http::withToken($service->token)->{$method}($url, $request->all());

        return response()->json($response->json(), $response->status());
    }
}
