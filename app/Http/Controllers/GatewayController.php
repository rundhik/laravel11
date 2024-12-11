<?php

namespace App\Http\Controllers;

use App\Models\Microservice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GatewayController extends Controller
{
    public function handle(Request $request, $microservice, $endpoint)
    {
        try {
            // Cari microservice berdasarkan slug
            $service = Microservice::where('slug', $microservice)->first();

            if (!$service) {
                return response()->json(['error' => 'Microservice not found'], 404);
            }

            // Tentukan method HTTP (GET, POST, PUT, DELETE)
            $method = strtolower($request->method());

            // Kirim permintaan ke microservice
            $url = rtrim($service->base_url, '/') . '/' . ltrim($endpoint, '/');

            // Menampung query parameter dalam request (jika method: POST)
            $data = request()->all();

            $response = Http::withToken($service->token)
                ->{$method}($url, $data);

            // Catat di log
            Log::info('Incoming Request', [
                'method' => $method,
                'url' => $url,
                'headers' => request()->headers->all(),
                'data' => $data,
            ]);
            Log::info('Outgoing Response', [
                'status' => $response->status(),
                'response' => $response->json(),
            ]);

            return response()->json($response->json(), $response->status());

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
