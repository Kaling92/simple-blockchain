from blockchain import Blockchain

print('Testing register_node...')
chain = Blockchain()
chain.register_node('http://127.0.0.1:5000')
chain.register_node('127.0.0.1:5001')
assert '127.0.0.1:5000' in chain.nodes
assert '127.0.0.1:5001' in chain.nodes
print('OK')

print('Testing valid_chain and tampering...')
# Build a small chain
b1 = chain.chain[0]
proof = chain.proof_of_work(b1['proof'])
b2 = chain.new_block(proof, chain.hash(b1))
print('\nChain blocks:')
for i, b in enumerate(chain.chain):
    print(i, 'index:', b['index'], 'proof:', b['proof'], 'previous_hash:', b['previous_hash'])
print('\nComputed hash of block 0:', chain.hash(chain.chain[0]))
print('Block 1 previous_hash field:', chain.chain[1]['previous_hash'])

assert chain.valid_chain(chain.chain)
# Tamper by changing block 0 (this should break block 1's previous hash)
chain.chain[0]['transactions'] = [{'sender':'x','recipient':'y','amount':1000}]
assert not chain.valid_chain(chain.chain)
print('OK')

print('All tests passed.')
