#!/bin/bash

allowed_url="https://webserial-demo.vercel.app/*"

json_policy_path="./chrome_policy.json"

echo "{" > "$json_policy_path"
echo "  \"SerialAllowUsbDevicesForUrls\": [" >> "$json_policy_path"
echo "    {" >> "$json_policy_path"
echo "      \"urls\": [\"$allowed_url\"]," >> "$json_policy_path"
echo "      \"devices\": [" >> "$json_policy_path"

lsusb | awk '{print $6}' | while IFS=: read -r vendor_id product_id
do
    echo "        {" >> "$json_policy_path"
    echo "          \"vendor_id\": $((16#$vendor_id))," >> "$json_policy_path"
    echo "          \"product_id\": $((16#$product_id))" >> "$json_policy_path"
    echo "        }," >> "$json_policy_path"
done

sed -i '$ s/,$//' "$json_policy_path"

echo "      ]" >> "$json_policy_path"
echo "    }" >> "$json_policy_path"
echo "  ]" >> "$json_policy_path"
echo "}" >> "$json_policy_path"

echo "Chrome policy file has been generated at $json_policy_path."
