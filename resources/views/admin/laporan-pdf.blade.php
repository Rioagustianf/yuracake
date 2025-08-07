<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Penjualan - YuraCake</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 9px;
            line-height: 1.2;
            color: #333;
            margin: 0;
            padding: 12px;
        }
        .header {
            text-align: center;
            margin-bottom: 12px;
            border-bottom: 2px solid #ec4899;
            padding-bottom: 8px;
        }
        .header h1 {
            color: #ec4899;
            margin: 0 0 6px 0;
            font-size: 16px;
            font-weight: bold;
        }
        .header p {
            margin: 2px 0;
            color: #666;
            font-size: 10px;
        }
        .info-section {
            margin-bottom: 10px;
            padding: 6px;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
        }
        .info-grid {
            width: 100%;
            margin-bottom: 10px;
        }
        .info-item {
            display: inline-block;
            width: 30%;
            text-align: center;
            padding: 8px;
            background-color: white;
            border: 1px solid #dee2e6;
            margin: 0 1%;
            vertical-align: top;
        }
        .info-label {
            font-weight: bold;
            color: #495057;
            margin-bottom: 2px;
            font-size: 8px;
        }
        .info-value {
            font-size: 11px;
            font-weight: bold;
            color: #ec4899;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
            font-size: 8px;
        }
        th {
            background-color: #ec4899;
            color: white;
            padding: 4px;
            text-align: left;
            font-weight: bold;
            border: 1px solid #ec4899;
        }
        td {
            padding: 3px 4px;
            border: 1px solid #dee2e6;
            vertical-align: top;
        }
        tr:nth-child(even) td {
            background-color: #f8f9fa;
        }
        .status {
            padding: 2px 4px;
            font-size: 7px;
            font-weight: bold;
            text-transform: uppercase;
            border: 1px solid;
        }
        .status-delivered { background-color: #d4edda; color: #155724; border-color: #c3e6cb; }
        .status-processing { background-color: #cce5ff; color: #004085; border-color: #b3d7ff; }
        .status-confirmed { background-color: #fff3cd; color: #856404; border-color: #ffeaa7; }
        .status-cancelled { background-color: #f8d7da; color: #721c24; border-color: #f5c6cb; }
        .status-pending { background-color: #e2e3e5; color: #383d41; border-color: #d6d8db; }
        .total-section {
            text-align: right;
            margin-top: 8px;
            padding: 6px;
            background-color: #ec4899;
            color: white;
        }
        .total-section h3 {
            margin: 0;
            font-size: 11px;
        }
        .footer {
            margin-top: 15px;
            text-align: center;
            font-size: 8px;
            color: #666;
            border-top: 1px solid #dee2e6;
            padding-top: 6px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>YuraCake</h1>
        <p>Laporan Penjualan</p>
        <p>Periode: {{ $filterLabel }}</p>
        <p>Dibuat pada: {{ $generatedAt }}</p>
    </div>

    <div class="info-section">
        <h3 style="margin-top: 0; color: #495057;">Ringkasan</h3>
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Total Pesanan</div>
                <div class="info-value">{{ $orders->count() }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Total Penjualan</div>
                <div class="info-value">Rp {{ number_format($totalPenjualan, 0, ',', '.') }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Rata-rata per Pesanan</div>
                <div class="info-value">
                    Rp {{ $orders->count() > 0 ? number_format($totalPenjualan / $orders->count(), 0, ',', '.') : '0' }}
                </div>
            </div>
        </div>
    </div>

    @if($orders->count() > 0)
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th>Nama Customer</th>
                    <th>No HP</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                @foreach($orders as $index => $order)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ \Carbon\Carbon::parse($order->created_at)->format('d/m/Y H:i') }}</td>
                        <td>{{ $order->customer_name }}</td>
                        <td>{{ $order->customer_phone }}</td>
                        <td>Rp {{ number_format($order->total_price, 0, ',', '.') }}</td>
                        <td>
                            <span class="status status-{{ $order->status }}">
                                {{ ucfirst($order->status) }}
                            </span>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div class="total-section">
            <h3>Total Penjualan: Rp {{ number_format($totalPenjualan, 0, ',', '.') }}</h3>
        </div>
    @else
        <div style="text-align: center; padding: 40px; color: #666;">
            <h3>Tidak ada data pesanan untuk periode yang dipilih</h3>
        </div>
    @endif

    <div class="footer">
        <p>Laporan ini dibuat secara otomatis oleh sistem YuraCake</p>
        <p>© {{ date('Y') }} YuraCake. All rights reserved.</p>
    </div>
</body>
</html> 