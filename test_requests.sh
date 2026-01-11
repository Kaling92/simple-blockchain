#!/bin/bash

echo "1. Mining a block..."
curl http://localhost:5000/mine
echo -e "\n"

echo "2. Creating a new transaction..."
curl -X POST -H "Content-Type: application/json" -d '{
 "sender": "d4ee26eee15148ee92c6cd394edd974e",
 "recipient": "someone-other-address",
 "amount": 5
}' http://localhost:5000/transactions/new
echo -e "\n"

echo "3. Mining another block to include the transaction..."
curl http://localhost:5000/mine
echo -e "\n"

echo "4. Getting the full chain..."
curl http://localhost:5000/chain
echo -e "\n"
