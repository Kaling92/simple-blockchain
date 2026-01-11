# Simple Blockchain

A simple Blockchain implementation in Python with a Flask REST API.

## Installation

1. Make sure you have Python installed.
2. Install the dependencies:

```bash
pip install -r requirements.txt
```

## Running the Server

Start the server:

```bash
python server.py
```

The server will start on `http://0.0.0.0:5000`.

## Web UI

A very small web UI is included at the project root and served by the Flask app. After starting the server, open:

```
http://127.0.0.1:5000/
```

Use the UI to mine blocks, create transactions, register nodes, and run consensus.
## API Endpoints

### Mine a Block
- **URL:** `/mine`
- **Method:** `GET`
- **Description:** Mines a new block, performs proof of work, and rewards the miner.

### Create a Transaction
- **URL:** `/transactions/new`
- **Method:** `POST`
- **Description:** Creates a new transaction to be added to the next block.
- **Body:**
    ```json
    {
     "sender": "address_of_sender",
     "recipient": "address_of_recipient",
     "amount": 5
    }
    ```

### Get the Chain
- **URL:** `/chain`
- **Method:** `GET`
- **Description:** Returns the full blockchain.

### Register Nodes
- **URL:** `/nodes/register`
- **Method:** `POST`
- **Description:** Register a list of new nodes with this node.
- **Body:**
    ```json
    {
      "nodes": ["http://192.168.0.5:5000", "http://192.168.0.6:5000"]
    }
    ```

### List Nodes
- **URL:** `/nodes`
- **Method:** `GET`
- **Description:** Returns a list of nodes registered with this node.

### Resolve Conflicts
- **URL:** `/nodes/resolve`
- **Method:** `GET`
- **Description:** Runs the consensus algorithm and resolves conflicts; if another node has a longer valid chain, replaces our chain with it.

## Testing

You can use the provided `test_requests.sh` script to test the endpoints (requires `curl`):

```bash
bash test_requests.sh
```

Or use Postman/curl manually.
