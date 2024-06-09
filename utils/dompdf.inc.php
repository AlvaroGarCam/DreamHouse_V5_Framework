<?php

require __DIR__ . '/vendor/autoload.php';
use Dompdf\Dompdf;

class PDF
{
     public static function createDompdf($purchase, $products, $house)
     {
          // return ['purchase' => $purchase, 'products' => $products];

          // Convert purchase data to local variables
          $purchase_id = strval($purchase['purchase_id']);

          $file_download_path = SITE_ROOT . 'view/img/uploaded_files/pdf/DreamHouse_Invoice_Purchase_ID_' . $purchase_id . '.pdf';

          // Create html

          if (isset($purchase['purchase_id'], $purchase['order_id'], $purchase['date'], $purchase['total_price'])) {
               $purchase_id = strval($purchase['purchase_id']);
               $order_id = strval($purchase['order_id']);
               $date = strval($purchase['date']);
               $total_price = strval($purchase['total_price']);
               $username = strval($purchase['username']);
          }

          if (isset($house)) {
               $house_price = strval($house['price']);
               $house_description = strval($house['description']);
          }
          if (isset($products[0])) {
               $product1 = $products[0];
               $product1_price = strval($product1['price']);
               $product1_description = strval($product1['description']);
               $product1_quantity = strval($product1['quantity']);
          }

          if (isset($products[1])) {
               $product2 = $products[1];
               $product2_price = strval($product2['price']);
               $product2_description = strval($product2['description']);
               $product2_quantity = strval($product2['quantity']);
          }

          if (isset($products[2])) {
               $product3 = $products[2];
               $product3_price = strval($product3['price']);
               $product3_description = strval($product3['description']);
               $product3_quantity = strval($product3['quantity']);
          }



          // Start the HTML string
          $html = "<html><head><style>
                         body { font-family: Arial, sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8f8f8; }
                         .container { width: 80%; background-color: #fff; padding: 20px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1); }
                         h1 { color: #333; text-align: center; font-size: 2.5em; }
                         h2 { color: #666; margin-bottom: 20px; font-size: 1.5em; }
                         table { width: 100%; border-collapse: collapse; }
                         th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 1.2em; }
                         th { background-color: #007BFF; color: #fff; }
                         td { background-color: #f2f2f2; }
                         .total-price { text-align: right; font-size: 1.5em; color: #333; }
                         </style></head><body>";

          $html .= "<div class='container'>";
          $html .= "<h1>DreamHouse Invoice</h1>";

          // Add purchase information
          $html .= "<h2>Client: {$username}</h2>";
          $html .= "<h2>Purchase ID: {$purchase_id}</h2>";
          $html .= "<h2>Order ID: {$order_id}</h2>";
          $html .= "<h2>Date: {$date}</h2>";

          // Start the products table
          $html .= "<table>";
          $html .= "<tr><th>Description</th><th>Unit Price</th><th>Quantity</th></tr>";

          // Add the house to the table
          $html .= "<tr>";
          $html .= "<td>{$house_description}</td>";
          $html .= "<td>{$house_price} €</td>";
          $html .= "<td> 1 </td>";
          $html .= "</tr>";

          // Add each product to the table
          $html .= "<tr>";
          $html .= "<td>{$product1_description}</td>";
          $html .= "<td>{$product1_price} €</td>";
          $html .= "<td>{$product1_quantity}</td>";
          $html .= "</tr>";

          $html .= "<tr>";
          $html .= "<td>{$product2_description}</td>";
          $html .= "<td>{$product2_price} €</td>";
          $html .= "<td>{$product2_quantity}</td>";
          $html .= "</tr>";

          $html .= "<tr>";
          $html .= "<td>{$product3_description}</td>";
          $html .= "<td>{$product3_price} €</td>";
          $html .= "<td>{$product3_quantity}</td>";
          $html .= "</tr>";

          // End the products table
          $html .= "</table>";

          $html .= "<h2 class='total-price'>Total Price: {$total_price} €</h2>";
          $html .= "</div>"; // End of container

          $html .= "</body></html>";

          $dompdf = new Dompdf();
          $dompdf->loadHtml($html);
          $dompdf->setPaper('A4', 'portrait');
          $dompdf->render();

          $output = $dompdf->output();


          if (empty($output)) {
               error_log('DOMPDF output is empty');
               return 'DOMPDF output is empty';
          }

          $file_download_url = 'http://localhost/DREAMHOUSE_V5_FRAMEWORK/view/img/uploaded_files/pdf/DreamHouse_Invoice_Purchase_ID_' . $purchase_id . '.pdf';

          if (file_exists($file_download_path)) {
               return ['pdf_url' => $file_download_url];
          } else {
               $result = @file_put_contents($file_download_path, $output);

               if ($result === false) {
                    $error = error_get_last();
                    error_log('file_put_contents failed: ' . $error['message']);
                    return 'file_put_contents failed: ' . $error['message'];
               } else {
                    return ['pdf_url' => $file_download_url];
               }
          }

     }
}