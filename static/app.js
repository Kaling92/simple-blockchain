const BASE = '' // same origin

function showMessage(msg, ok=true){
  const el = document.getElementById('message')
  el.textContent = msg
  el.className = ok ? 'message ok' : 'message error'
  setTimeout(()=>{ el.textContent = '' }, 4000)
}

async function refreshChain(){
  const res = await fetch('/chain')
  const data = await res.json()
  document.getElementById('chain').textContent = JSON.stringify(data, null, 2)
}

async function refreshNodes(){
  const res = await fetch('/nodes')
  const data = await res.json()
  const el = document.getElementById('nodesList')
  el.textContent = data.nodes.length ? data.nodes.join('\n') : '-' 
}

document.getElementById('mineBtn').addEventListener('click', async ()=>{
  const res = await fetch('/mine')
  const data = await res.json()
  if(res.ok) showMessage('Mined block: ' + data.index)
  else showMessage('Error mining', false)
  await refreshChain()
})

document.getElementById('resolveBtn').addEventListener('click', async ()=>{
  const res = await fetch('/nodes/resolve')
  const data = await res.json()
  showMessage(data.message)
  await refreshChain()
  await refreshNodes()
})

document.getElementById('txForm').addEventListener('submit', async (e)=>{
  e.preventDefault()
  const sender = document.getElementById('sender').value
  const recipient = document.getElementById('recipient').value
  const amount = Number(document.getElementById('amount').value)
  const res = await fetch('/transactions/new', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({sender, recipient, amount})
  })
  const data = await res.json()
  showMessage(data.message || 'Transaction created')
  document.getElementById('txForm').reset()
})

document.getElementById('nodesForm').addEventListener('submit', async (e)=>{
  e.preventDefault()
  const raw = document.getElementById('nodes').value
  const list = raw.split(',').map(s=>s.trim()).filter(Boolean)
  const res = await fetch('/nodes/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nodes: list})
  })
  if(res.status===201){
    const data = await res.json()
    showMessage(data.message)
    document.getElementById('nodes').value = ''
    await refreshNodes()
  } else {
    const text = await res.text()
    showMessage(text, false)
  }
})

// initial load
refreshChain()
refreshNodes()
